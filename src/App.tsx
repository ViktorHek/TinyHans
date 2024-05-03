import Toolbar from "./components/Toolbar";
import HandleEditorFocus from "./funk/HandleEditorFucus";
import useKeys from "./funk/use-keys";

function App() {
  const { ref, isEditorFocused, setIsEditorFocused } = HandleEditorFocus(true);

  useKeys((event: React.KeyboardEvent<HTMLElement>): void => {
    event.preventDefault();
    if (!isEditorFocused) return;
    handleKeys(event);
  });

  function handleKeys(event: React.KeyboardEvent<HTMLElement>): void {
    const dir = event.code.toLowerCase();
    if (dir.length !== 4) return
    const placeholder: HTMLElement | null = document.getElementById("placeholder");
    const newPlaceHolder: HTMLElement = document.createElement("p");
    const tag: HTMLElement = document.createElement("p");
    newPlaceHolder.id = "placeholder";
    newPlaceHolder.className = "placeholder";
    tag.innerText = dir.replace("key", "");
    if (placeholder) {
      placeholder.insertAdjacentElement("beforebegin", tag);
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
          <Toolbar />
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
