import Toolbar from "./components/Toolbar";

function App() {
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
          className="box">
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
