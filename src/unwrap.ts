// Peels the container formats that Apple wraps binary plists in, so the
// existing bplist parser only ever sees a real `bplist00`:
//
//   .shortcut            -> AEA1 (signed) -> LZFSE -> Apple Archive -> bplist
//   .automatonworkflow   -> often zipped  -> bplist (NSKeyedArchiver)
//   plain .plist / .zip  -> handled directly
//
// Everything is pure client-side: no decryption keys are needed because the
// AEA files Shortcuts produces use profile 0 (signed, *not* encrypted).

import { unzipSync } from "fflate";
import { lzfseDecode, findAndDecodeLzfse } from "./lzfse";

export interface UnwrapResult {
  /** The unwrapped `bplist00` bytes, ready for the plist parser. */
  bplist: Uint8Array;
  /** Human-readable description of each layer that was peeled. */
  steps: string[];
}

const hasMagic = (b: Uint8Array, magic: number[], at = 0) =>
  b.length >= at + magic.length && magic.every((m, i) => b[at + i] === m);

const BPLIST = [0x62, 0x70, 0x6c, 0x69, 0x73, 0x74]; // "bplist"
const AEA1 = [0x41, 0x45, 0x41, 0x31]; // "AEA1"
const AA01 = [0x41, 0x41, 0x30, 0x31]; // "AA01"
const ZIP = [0x50, 0x4b, 0x03, 0x04]; // "PK\x03\x04"
const BVX = [0x62, 0x76, 0x78]; // "bvx"

const u16 = (b: Uint8Array, o: number) => b[o] | (b[o + 1] << 8);
const u32 = (b: Uint8Array, o: number) =>
  (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;

/** Recognizable container/plist magic — used to pick the right zip member. */
function looksUnwrappable(b: Uint8Array): boolean {
  return (
    hasMagic(b, BPLIST) ||
    hasMagic(b, AEA1) ||
    hasMagic(b, AA01) ||
    hasMagic(b, ZIP) ||
    hasMagic(b, BVX)
  );
}

/**
 * Extract the first file entry that carries data from an Apple Archive
 * (`AA01`). Archives Shortcuts produce hold a single `Shortcut.wflow`.
 */
function extractAppleArchive(buf: Uint8Array): { name: string; data: Uint8Array } {
  let p = 0;
  while (p + 6 <= buf.length && hasMagic(buf, AA01, p)) {
    const headerSize = u16(buf, p + 4); // bytes from magic through end of fields
    const fieldsEnd = p + headerSize;
    let fp = p + 6;
    let name = "";
    let dataSize: number | null = null;
    while (fp < fieldsEnd) {
      const key = String.fromCharCode(buf[fp], buf[fp + 1], buf[fp + 2]);
      const type = String.fromCharCode(buf[fp + 3]);
      fp += 4;
      if (type === "1" || type === "2" || type === "4" || type === "8") {
        const n = parseInt(type, 10);
        const v = n <= 4 ? u32(buf, fp) : u32(buf, fp) + u32(buf, fp + 4) * 2 ** 32;
        if (key === "DAT") dataSize = v;
        fp += n;
      } else if (type === "P") {
        const len = u16(buf, fp);
        fp += 2;
        if (key === "PAT") name = new TextDecoder().decode(buf.subarray(fp, fp + len));
        fp += len;
      } else if (type === "T") {
        fp += 12; // timespec
      } else if (type === "A") {
        // Blob field (DAT): size stored as a uint16, data follows the header.
        if (key === "DAT") dataSize = u16(buf, fp);
        fp = fieldsEnd; // DAT is the last field in the header
      } else {
        fp = fieldsEnd; // unknown field type: stop parsing this header defensively
      }
    }
    if (dataSize != null) {
      const start = fieldsEnd;
      return { name, data: buf.subarray(start, start + dataSize) };
    }
    // Directory / no-data entry: advance to the next header.
    p = fieldsEnd;
  }
  throw new Error("Apple Archive: no file data found");
}

/** Pick the meaningful member of a zip (skip macOS resource-fork junk). */
function pickZipMember(files: Record<string, Uint8Array>): { name: string; data: Uint8Array } {
  const entries = Object.entries(files).filter(
    ([name, data]) =>
      !name.startsWith("__MACOSX/") &&
      !name.endsWith("/") &&
      !name.split("/").pop()!.startsWith("._") &&
      data.length > 0,
  );
  if (entries.length === 0) throw new Error("Zip archive is empty");
  // Prefer a member we know how to unwrap; otherwise take the first file.
  const chosen = entries.find(([, data]) => looksUnwrappable(data)) ?? entries[0];
  return { name: chosen[0], data: chosen[1] };
}

/** Recursively unwrap container formats down to a `bplist00`. */
export function unwrapToBplist(input: Uint8Array, steps: string[] = [], depth = 0): UnwrapResult {
  if (depth > 8) throw new Error("Too many nested container layers");

  if (hasMagic(input, BPLIST)) {
    return { bplist: input, steps };
  }

  if (hasMagic(input, AEA1)) {
    // Profile-0 AEA: signed, not encrypted. The payload is an LZFSE stream.
    const decoded = findAndDecodeLzfse(input);
    if (decoded) {
      steps.push("AEA1 signed archive → LZFSE-decompressed");
      return unwrapToBplist(decoded, steps, depth + 1);
    }
    // Fallback: uncompressed AEA — the Apple Archive sits inline.
    const aaIdx = indexOfMagic(input, AA01, 12);
    if (aaIdx >= 0) {
      steps.push("AEA1 signed archive (uncompressed)");
      return unwrapToBplist(input.subarray(aaIdx), steps, depth + 1);
    }
    throw new Error("AEA1 archive: could not locate payload (unsupported profile?)");
  }

  if (hasMagic(input, BVX)) {
    steps.push("LZFSE-decompressed");
    return unwrapToBplist(lzfseDecode(input), steps, depth + 1);
  }

  if (hasMagic(input, AA01)) {
    const { name, data } = extractAppleArchive(input);
    steps.push(`Apple Archive → ${name || "entry"}`);
    return unwrapToBplist(data, steps, depth + 1);
  }

  if (hasMagic(input, ZIP)) {
    const files = unzipSync(input);
    const { name, data } = pickZipMember(files);
    steps.push(`Zip archive → ${name}`);
    return unwrapToBplist(data, steps, depth + 1);
  }

  throw new Error(
    "Unrecognized file. Expected a binary plist, or an AEA/Apple Archive/zip wrapping one.",
  );
}

function indexOfMagic(b: Uint8Array, magic: number[], from = 0): number {
  outer: for (let i = from; i + magic.length <= b.length; i++) {
    for (let j = 0; j < magic.length; j++) if (b[i + j] !== magic[j]) continue outer;
    return i;
  }
  return -1;
}
