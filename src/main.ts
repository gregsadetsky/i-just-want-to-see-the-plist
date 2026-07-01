import "./style.css";
import { BinaryPlistParserService } from "./binary-plist-parser.service";
import { unwrapToBplist } from "./unwrap";

const DROP_PROMPT = `drop your (binary) .plist file here!<br/>
<span class="hint">(also works with other files like <code>.shortcut</code> that are actually .plist's...!)</span>`;

window.addEventListener("load", function () {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  app.innerHTML = `<h2 class='dropHere'>${DROP_PROMPT}</h2>`;
  const dropZoneEl = document.querySelector<HTMLElement>(".dropHere")!;

  function handleDrop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    dropZoneEl.classList.remove("fileBeingDraggedOver");
    const file = e.dataTransfer?.files[0];
    if (!file) return;
    file
      .arrayBuffer()
      .then((buf) => showResult(file.name, new Uint8Array(buf)))
      .catch((err) => showError(file.name, err));
  }

  function bindTheDragHandlers(el: HTMLElement) {
    el.addEventListener("dragenter", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZoneEl.classList.add("fileBeingDraggedOver");
    });
    el.addEventListener("dragleave", (e) => {
      e.preventDefault();
      e.stopPropagation();
      dropZoneEl.classList.remove("fileBeingDraggedOver");
    });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
    });
    el.addEventListener("drop", handleDrop as EventListener);
  }

  bindTheDragHandlers(dropZoneEl);
});

function showResult(fileName: string, bytes: Uint8Array) {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  try {
    const { bplist } = unwrapToBplist(bytes);
    const service = new BinaryPlistParserService();
    const parsed = service.parse64Content(toBase64(bplist));
    const json = JSON.stringify(parsed, jsonReplacer, 2);

    const stepsHtml = `<div class="steps"><code>${escapeHtml(fileName)}</code></div>`;

    app.innerHTML = `
      <div class="toolbar">
        <button id="copyit">copy JSON to clipboard</button>
        <button id="reset">convert another file</button>
      </div>
      ${stepsHtml}
      <pre id="preview" class="preview"></pre>
    `;
    // Use textContent so the raw JSON (incl. emoji) renders safely & exactly.
    document.querySelector<HTMLPreElement>("#preview")!.textContent = json;

    const copyBtn = document.querySelector<HTMLButtonElement>("#copyit")!;
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(json);
      copyBtn.textContent = "copied! click to copy again";
    });
    document
      .querySelector<HTMLButtonElement>("#reset")!
      .addEventListener("click", () => window.location.reload());
  } catch (err) {
    showError(fileName, err);
  }
}

function showError(fileName: string, err: unknown) {
  const app = document.querySelector<HTMLDivElement>("#app")!;
  const msg = err instanceof Error ? err.message : String(err);
  app.innerHTML = `
    <div class="error">
      <strong>couldn't convert <code>${escapeHtml(fileName)}</code></strong>
      <div>${escapeHtml(msg)}</div>
    </div>
    <button id="reset">try another file</button>
  `;
  document
    .querySelector<HTMLButtonElement>("#reset")!
    .addEventListener("click", () => window.location.reload());
}

/** Make plist-specific values (binary data blobs, bigints) JSON-friendly. */
function jsonReplacer(_key: string, value: any) {
  if (
    value &&
    typeof value === "object" &&
    typeof value !== "string" &&
    typeof value.length === "number" &&
    value.buffer instanceof ArrayBuffer
  ) {
    const bytes: Uint8Array =
      value instanceof Uint8Array ? value : Uint8Array.from(value);
    return `<${bytes.length} bytes: ${toHex(bytes, 32)}${
      bytes.length > 32 ? "…" : ""
    }>`;
  }
  if (typeof value === "bigint") return value.toString();
  return value;
}

function toHex(bytes: Uint8Array, max: number) {
  let s = "";
  for (let i = 0; i < Math.min(bytes.length, max); i++)
    s += bytes[i].toString(16).padStart(2, "0");
  return s;
}

function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(binary);
}

function escapeHtml(s: string): string {
  return s.replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
}
