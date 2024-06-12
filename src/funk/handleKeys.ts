import { letterStyle } from "../utils/interface";

function handleKeys(event: KeyboardEvent, styles: letterStyle[]) {
  const dir: string = event.code.toLowerCase();
  const placeholder: HTMLSpanElement | null = document.getElementById("placeholder");
  const editor: HTMLElement | null = document.getElementById("editor");
  if (!placeholder || !editor || !placeholder.parentElement || !placeholder.parentElement.parentElement) return
  const nph: HTMLElement = document.createElement("p");
  nph.id = "placeholder";
  nph.className = "placeholder";

  switch (dir) {
    case `key${dir.slice(-1)}`:
      const letterTag: HTMLElement = document.createElement("p");
      styles.forEach((el) => {
        letterTag.style[el.type] = el.val;
      });
      letterTag.innerHTML = dir.replace("key", "");
      if (placeholder.parentElement?.className === "space") {
        const tag: HTMLElement = document.createElement("span");
        placeholder.parentElement.insertAdjacentElement("afterend", tag);
        placeholder.remove();
        tag.appendChild(letterTag);
        tag.appendChild(nph);
      } else {
        if (placeholder) {
          placeholder.insertAdjacentElement("beforebegin", letterTag);
        }
      }
      break;
    case "space":
      if (placeholder?.nextElementSibling) {
        let tempTag = document.createElement("span");
        placeholder.parentElement.insertAdjacentElement("afterend", tempTag);
        let firstWord = document.createElement("span");
        let secondWord = document.createElement("span");
        let puchFirst = true;

        Array.prototype.forEach.call(placeholder.parentElement.children, function (el) {
          if (el.id === "placeholder") {
            puchFirst = false;
          } else {
            if (puchFirst) {
              let p = document.createElement("p");
              p.innerHTML = el.innerHTML;
              firstWord.appendChild(p);
            } else {
              let p = document.createElement("p");
              p.innerHTML = el.innerHTML;
              secondWord.appendChild(p);
            }
          }
        });
        tempTag.insertAdjacentElement("afterend", firstWord);
        let tag = document.createElement("span");
        tag.className = "space";
        tag.innerHTML =
          '<p>&nbsp;</p><p className="placeholder" class="placeholder" id="placeholder"></p>';
        firstWord.insertAdjacentElement("afterend", tag);
        tag.insertAdjacentElement("afterend", secondWord);
        tempTag.remove();
        placeholder.parentElement.remove();
      } else {
        let tag = document.createElement("span");
        tag.className = "space";
        tag.innerHTML =
          '<p>&nbsp;</p><p className="placeholder" class="placeholder" id="placeholder"></p>';
        placeholder.parentElement.insertAdjacentElement("afterend", tag);
        placeholder.remove();
      }
      break;
    case "enter":
    case "digit1": // for texting
      let line = document.createElement("span");
      line.innerHTML = '<span><p class="placeholder" id="placeholder"></p></span>';
      placeholder.parentElement.parentElement.insertAdjacentElement("afterend", line);
      placeholder.remove();
      break;
    case "backspace":
      if (!editor) return
      if (
        editor.children.length === 1 &&
        editor.firstElementChild?.children.length === 1 &&
        editor.firstElementChild?.firstElementChild?.children.length === 1
      ) {
        break;
      }
      if (placeholder.previousElementSibling) {
        placeholder.previousElementSibling.remove()
      } else {
        if (placeholder.parentElement.previousElementSibling) {
          placeholder.parentElement.previousElementSibling.appendChild(nph);
        } else {
          if (placeholder.parentElement.parentElement.previousElementSibling?.lastChild) {
            placeholder.parentElement.parentElement.previousElementSibling.lastChild.appendChild(
              nph
            );
          }
          placeholder.parentElement.parentElement.remove();
        }
        placeholder.parentElement.remove()
      }
      break;
    default:
      break;
  }
  return;
}

export default handleKeys;
