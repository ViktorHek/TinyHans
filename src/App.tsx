import Toolbar from "./components/Toolbar";
import HandleEditorFocus from "./funk/HandleEditorFucus";


function App() {
  const { ref, isEditorFocused, setIsEditorFocused } = HandleEditorFocus(true);

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
