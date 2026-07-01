// Minimal LZFSE stream decoder — supports uncompressed (`bvx-`) and LZVN
// (`bvxn`) blocks, which is what Apple wraps small payloads (Shortcuts, AEA
// archives) in. FSE-compressed blocks (`bvx1`/`bvx2`) are not implemented.
//
// LZVN opcode decoding is a direct port of Apple's reference implementation:
// https://github.com/lzfse/lzfse/blob/master/src/lzvn_decode_base.c
// (BSD-3-Clause, Copyright (c) 2015-2016 Apple Inc.)

// Opcode categories, indexed by opcode byte. Mirrors the `opc_tbl` jump table
// in lzvn_decode_base.c exactly.
const SML_D = 1,
  MED_D = 2,
  LRG_D = 3,
  PRE_D = 4,
  SML_M = 5,
  LRG_M = 6,
  SML_L = 7,
  LRG_L = 8,
  NOP = 9,
  EOS = 10,
  UDEF = 0;

const CAT = buildCategoryTable();

function buildCategoryTable(): Uint8Array {
  const t = new Uint8Array(256); // default 0 = UDEF
  // Rows of 8, following the reference jump table.
  const D_ROW = [SML_D, SML_D, SML_D, SML_D, SML_D, SML_D, 0, LRG_D]; // slot 6 varies
  const setRow = (base: number, slot6: number) => {
    for (let i = 0; i < 8; i++) t[base + i] = i === 6 ? slot6 : D_ROW[i];
  };
  // 0-7: slot6 = eos
  setRow(0, EOS);
  // 8-15, 16-23: slot6 = nop
  setRow(8, NOP);
  setRow(16, NOP);
  // 24-63: slot6 = udef
  setRow(24, UDEF);
  setRow(32, UDEF);
  setRow(40, UDEF);
  setRow(48, UDEF);
  setRow(56, UDEF);
  // 64-111: slot6 = pre_d
  setRow(64, PRE_D);
  setRow(72, PRE_D);
  setRow(80, PRE_D);
  setRow(88, PRE_D);
  setRow(96, PRE_D);
  setRow(104, PRE_D);
  // 112-127: all udef
  for (let i = 112; i < 128; i++) t[i] = UDEF;
  // 128-159: slot6 = pre_d
  setRow(128, PRE_D);
  setRow(136, PRE_D);
  setRow(144, PRE_D);
  setRow(152, PRE_D);
  // 160-191: med_d
  for (let i = 160; i < 192; i++) t[i] = MED_D;
  // 192-207: slot6 = pre_d
  setRow(192, PRE_D);
  setRow(200, PRE_D);
  // 208-223: all udef
  for (let i = 208; i < 224; i++) t[i] = UDEF;
  // 224: lrg_l, 225-239: sml_l
  t[224] = LRG_L;
  for (let i = 225; i < 240; i++) t[i] = SML_L;
  // 240: lrg_m, 241-255: sml_m
  t[240] = LRG_M;
  for (let i = 241; i < 256; i++) t[i] = SML_M;
  return t;
}

function lzvnDecodeBlock(
  src: Uint8Array,
  srcStart: number,
  srcEnd: number,
  dst: Uint8Array,
  dstStart: number,
): number {
  let sp = srcStart;
  let dp = dstStart;
  let D = 0;

  const copyMatch = (M: number) => {
    if (D === 0 || D > dp - dstStart) throw new Error("lzvn: invalid match distance");
    for (let i = 0; i < M; i++) dst[dp + i] = dst[dp - D + i];
    dp += M;
  };

  while (sp < srcEnd) {
    const opc = src[sp];
    const cat = CAT[opc];
    let L = 0,
      M = 0,
      opcLen = 0;
    const rem = srcEnd - sp;

    switch (cat) {
      case EOS:
        return dp;
      case NOP:
        sp += 1;
        continue;
      case UDEF:
        throw new Error("lzvn: undefined opcode 0x" + opc.toString(16));
      case SML_D:
        opcLen = 2;
        L = (opc >> 6) & 3;
        M = ((opc >> 3) & 7) + 3;
        if (rem <= opcLen + L) return dp;
        D = ((opc & 7) << 8) | src[sp + 1];
        break;
      case MED_D: {
        opcLen = 3;
        L = (opc >> 3) & 3;
        if (rem <= opcLen + L) return dp;
        const opc23 = src[sp + 1] | (src[sp + 2] << 8);
        M = (((opc & 7) << 2) | (opc23 & 3)) + 3;
        D = (opc23 >> 2) & 0x3fff;
        break;
      }
      case LRG_D:
        opcLen = 3;
        L = (opc >> 6) & 3;
        M = ((opc >> 3) & 7) + 3;
        if (rem <= opcLen + L) return dp;
        D = src[sp + 1] | (src[sp + 2] << 8);
        break;
      case PRE_D:
        opcLen = 1;
        L = (opc >> 6) & 3;
        M = ((opc >> 3) & 7) + 3;
        if (rem <= opcLen + L) return dp;
        break; // D carried over
      case SML_M:
        opcLen = 1;
        if (rem <= opcLen) return dp;
        M = opc & 0x0f;
        sp += opcLen;
        copyMatch(M);
        continue;
      case LRG_M:
        opcLen = 2;
        if (rem <= opcLen) return dp;
        M = src[sp + 1] + 16;
        sp += opcLen;
        copyMatch(M);
        continue;
      case SML_L:
        opcLen = 1;
        L = opc & 0x0f;
        if (rem <= opcLen + L) return dp;
        sp += opcLen;
        for (let i = 0; i < L; i++) dst[dp + i] = src[sp + i];
        dp += L;
        sp += L;
        continue;
      case LRG_L:
        opcLen = 2;
        if (rem <= 2) return dp;
        L = src[sp + 1] + 16;
        if (rem <= opcLen + L) return dp;
        sp += opcLen;
        for (let i = 0; i < L; i++) dst[dp + i] = src[sp + i];
        dp += L;
        sp += L;
        continue;
    }

    // Shared copy_literal_and_match path for SML_D / MED_D / LRG_D / PRE_D.
    sp += opcLen;
    for (let i = 0; i < L; i++) dst[dp + i] = src[sp + i];
    dp += L;
    sp += L;
    copyMatch(M);
  }
  return dp;
}

const u32 = (b: Uint8Array, o: number) =>
  (b[o] | (b[o + 1] << 8) | (b[o + 2] << 16) | (b[o + 3] << 24)) >>> 0;

const magicAt = (b: Uint8Array, o: number) =>
  String.fromCharCode(b[o], b[o + 1], b[o + 2], b[o + 3]);

/** Decode a full LZFSE stream (one or more blocks, terminated by `bvx$`). */
export function lzfseDecode(input: Uint8Array): Uint8Array {
  const chunks: Uint8Array[] = [];
  let pos = 0;
  while (pos + 4 <= input.length) {
    const magic = magicAt(input, pos);
    if (magic === "bvx$") {
      pos += 4;
      break;
    } else if (magic === "bvx-") {
      const nRaw = u32(input, pos + 4);
      const start = pos + 8;
      chunks.push(input.slice(start, start + nRaw));
      pos = start + nRaw;
    } else if (magic === "bvxn") {
      const nRaw = u32(input, pos + 4);
      const nPayload = u32(input, pos + 8);
      const start = pos + 12;
      const dst = new Uint8Array(nRaw);
      lzvnDecodeBlock(input, start, start + nPayload, dst, 0);
      chunks.push(dst);
      pos = start + nPayload;
    } else if (magic === "bvx1" || magic === "bvx2") {
      throw new Error(
        "This file uses LZFSE FSE-compressed blocks (" +
          magic +
          "), which aren't supported yet. Only LZVN/uncompressed blocks are handled.",
      );
    } else {
      throw new Error("Unknown LZFSE block magic: " + JSON.stringify(magic));
    }
  }
  const total = chunks.reduce((n, c) => n + c.length, 0);
  const out = new Uint8Array(total);
  let o = 0;
  for (const c of chunks) {
    out.set(c, o);
    o += c.length;
  }
  return out;
}

/**
 * Find and decode the LZFSE stream inside a buffer (e.g. an AEA profile-0
 * payload). Scans for the first LZFSE block magic and decodes from there.
 */
export function findAndDecodeLzfse(buf: Uint8Array): Uint8Array | null {
  for (let i = 0; i + 4 <= buf.length; i++) {
    if (buf[i] !== 0x62 || buf[i + 1] !== 0x76 || buf[i + 2] !== 0x78) continue; // "bvx"
    const t = buf[i + 3];
    if (t === 0x6e /*n*/ || t === 0x2d /*-*/ || t === 0x31 /*1*/ || t === 0x32 /*2*/) {
      return lzfseDecode(buf.subarray(i));
    }
  }
  return null;
}
