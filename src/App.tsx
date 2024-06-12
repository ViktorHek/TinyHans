import Toolbar from "./components/Toolbar";
import HandleEditorFocus from "./funk/HandleEditorFucus";
import useKeys from "./funk/use-keys";
import { useEffect, useState } from "react";
import { letterStyle } from "./utils/interface";
import handleKeys from "./funk/handleKeys";


function App() {
  const { ref, isEditorFocused, setIsEditorFocused } = HandleEditorFocus(true);
  const [boldActive, setBoldActive] = useState(false);
  const [italicActive, setItalicActive] = useState(false);
  const [pos, setPos] = useState("left");
  const arrowKeys: string[] = ["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"];

  useEffect(() => {
    window.addEventListener("mousedown", clickOut);
    return () => {
      window.removeEventListener("mousedown", clickOut);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useKeys((event: KeyboardEvent): void => {
    event.preventDefault(); console.log(event.code);
    if (!isEditorFocused) return;
    if (arrowKeys.includes(event.code)) {
      movePlaceholder(event.code.replace("Arrow", "").toLowerCase());
    } else {
      handleKeys(event, getStyle());
    }
  });

  function movePlaceholder(where: string) {
    const editor: HTMLElement | null = document.getElementById("editor");
    let placeholder: any = document.getElementById("placeholder") ? document.getElementById("placeholder") : editor?.lastChild?.lastChild?.lastChild;
    const newPlaceHolder: HTMLElement = document.createElement("p");
    newPlaceHolder.id = "placeholder";
    newPlaceHolder.className = "placeholder";
    if (editor?.lastElementChild?.lastElementChild?.lastElementChild?.id === "placeholder") {
      if (placeholder?.previousElementSibling.innerHTML === "&nbsp;" && where === "left") {
        if (placeholder.parentElement?.previousElementSibling) {
          placeholder.parentElement.previousElementSibling.appendChild(newPlaceHolder);
          placeholder.remove();
          return;
        }
      }
    }
    const siblings: HTMLElement[] = Array.from(placeholder.parentElement.children);
    const currentIndex: number = siblings.indexOf(placeholder);
    const sibling: "previousElementSibling" | "nextElementSibling" = where === "left" ? "previousElementSibling" : "nextElementSibling";
    const child: "lastChild" | "firstChild" = where === "left" ? "lastChild" : "firstChild";
    const ajust: "beforebegin" | "afterend" = where === "left" ? "beforebegin" : "afterend";
    const isInit = currentIndex === 0 && where === "left";
    const isWordStart = currentIndex === 1 && where === "left";
    const isWordEnd = currentIndex === siblings.length - 1 && where === "right";
    if (!isWordStart && !isWordEnd && !isInit) {
      if (placeholder[sibling]) {
        placeholder[sibling].insertAdjacentElement(ajust, newPlaceHolder);
        placeholder.remove();
      }
    } else {
      const firstSibling: any = editor?.firstChild?.firstChild?.firstChild?.nextSibling
      const lastEl: any = editor?.lastChild?.lastChild?.lastChild;
      if (firstSibling?.id === "placeholder" || lastEl.id === "placeholder") {
        return;
      }
      const target: any = placeholder.parentElement[sibling] ? placeholder.parentElement[sibling][child] : placeholder?.parentElement?.parentElement[sibling][child][child];
      target.insertAdjacentElement("afterend", newPlaceHolder);
      placeholder.remove();

    }
  }

  function clickOut(event: any) {
    if (!isEditorFocused) return;
    if (!document.getElementById("placeholder")) return;
    if (event?.target?.parentElement === null) return;
    if (event.target.parentElement.parentElement === null) return;
    if (event?.target?.parentElement?.parentElement?.parentElement === null) return;
    if (
      event.target.parentElement.parentElement.parentElement?.id === "editor" ||
      event.target.parentElement.parentElement.id === "editor" ||
      event.target.parentElement.id === "editor" ||
      event.target.id !== "editorbackground"
    ) {
      const tag: HTMLElement = document.createElement("p");
      const placeholder = document.getElementById("placeholder");
      tag.id = "placeholder";
      tag.className = "placeholder";
      console.log({ event });
      if (event.target.parentElement.parentElement.parentElement.id === "editor") {
        event.target.insertAdjacentElement("afterend", tag);
      } else {
        const editor = document.getElementById("editor");
        editor?.lastChild?.lastChild?.appendChild(tag);
      }
      placeholder?.remove();
    }
  }

  function getStyle() {
    let arr: letterStyle[] = [];
    if (italicActive) {
      arr.push({ type: "fontStyle", val: "italic" });
    }
    if (boldActive) {
      arr.push({ type: "fontWeight", val: "bold" });
    }
    return arr;
  }

  function changePos(type: string) {
    setPos(type);
    const ph: any = document.getElementById("placeholder");
    switch (type) {
      case "left":
        ph.parentElement.parentElement.style.justifyContent = "flex-start";
        break;
      case "center":
        ph.parentElement.parentElement.style.justifyContent = "center";
        break;
      case "right":
        ph.parentElement.parentElement.style.justifyContent = "flex-end";
        break;
      case "strech":
        ph.parentElement.parentElement.style.justifyContent = "space-evenly";
        break;
      default:
        break;
    }
  }

  function handleStyle(val: string) {
    if (val === 'bold') {
      setBoldActive(!boldActive);
    };
    if (val === 'italic') {
      setItalicActive(!italicActive)
    }
  }

  return (
    <div className="app-container">
      <div className="app-inner-container">
        <div className="header-container">
          <div className="header-min-btn btn">
            <span></span>
          </div>
          <span className="header-text">TinyHans</span>
          <div className="header-close-btn btn">
            <span></span>
            <span></span>
          </div>
        </div>
        <div
          id="box"
          ref={ref}
          onClick={() => setIsEditorFocused(true)}
          className={`${isEditorFocused ? "box-active " : ""} box`}>
          <Toolbar pos={pos} handleChangePos={changePos} handleStyle={handleStyle} />
          <div
            className="editor-backgrond"
            id="editorbackground">
            <div
              id="editor"
              className="editor">
              <span>
                <span>
                  <span className="placeholder" id="placeholder"></span>
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
