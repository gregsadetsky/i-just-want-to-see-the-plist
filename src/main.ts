import "./style.css";
import { BinaryPlistParserService } from "./binary-plist-parser.service";

window.addEventListener("load", function (event) {
  document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
    <h2 class='dropHere'>drop your .plist file here!</h2>
  `;

  const dropZoneEl = document.querySelector(".dropHere");
  console.log("dropZoneEl", dropZoneEl);

  function dragHandlerFunction(e) {
    console.log("dragHandlerFunction");

    e.preventDefault();
    e.stopPropagation();
    dropZoneEl.classList.remove("fileBeingDraggedOver");

    // extract base64 content from dragged file
    const file = e.dataTransfer.files[0];
    // read file content and convert to base64
    const toBase64 = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
      });
    toBase64(file).then((base64Content) => {
      const base64ContentNoPrefix = base64Content.split(",")[1];

      document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
      <button id='copyit' style="color:blue;font-size:25px">click here to copy the json'ified plist into your clipboard!!</button>
    `;
      const copyItButtonEl =
        document.querySelector<HTMLButtonElement>("#copyit")!;

      copyItButtonEl.addEventListener("click", (e) => {
        const service = new BinaryPlistParserService();
        navigator.clipboard.writeText(
          JSON.stringify(service.parse64Content(base64ContentNoPrefix)),
        );
        copyItButtonEl.innerText = "copied! click again to copy again";
      });
    });
  }

  function bindTheDragHandlers(el) {
    el.addEventListener(
      "dragenter",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneEl.classList.add("fileBeingDraggedOver");
      },
      false,
    );
    el.addEventListener(
      "dragleave",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
        dropZoneEl.classList.remove("fileBeingDraggedOver");
      },
      false,
    );
    el.addEventListener(
      "dragover",
      (e) => {
        e.preventDefault();
        e.stopPropagation();
      },
      false,
    );
    el.addEventListener("drop", dragHandlerFunction, false);
  }

  bindTheDragHandlers(dropZoneEl);
});
