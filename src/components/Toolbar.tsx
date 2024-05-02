import { useState } from "react";
import AlignAnimation from "./AlignAnimation";

function Toolbar() {
  const [openPositionDropdown, setOpenPositionDropdown] = useState(false);
  const [pos, setPos] = useState('left');

  function handleOpenDropdown(type: string) {
    if (type === "pos") {
      setOpenPositionDropdown(!openPositionDropdown);
    }
  }

  function changePos(pos: string) {
    if (openPositionDropdown) {
      setOpenPositionDropdown(!openPositionDropdown);
    }
    setPos(pos);
  }

  return (
    <>
      <div className="top-toolbar">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Tools</span>
        <span>Help</span>
      </div>
      <div id="toolbar" className="toolbar">
        <div
          id="bold"
          className="btn"
        >
          <strong>B</strong>
        </div>
        <div
          id="italic" className="btn"
        >
          <p style={{ fontStyle: "italic" }}>I</p>
        </div>
        <div style={{ position: "relative", height: "100%" }}>
          <div
            onClick={() => handleOpenDropdown("pos")}
            className={`btn ${openPositionDropdown ? "btn-dropdown-open" : "btn-dropdown"}`}
          >
            {openPositionDropdown ? (
              <div className="dropdown-list">
                <span onClick={() => changePos("left")}>
                  <AlignAnimation type={"left"} />
                </span>
                <span onClick={() => changePos("center")}>
                  <AlignAnimation type={"center"} />
                </span>
                <span onClick={() => changePos("right")}>
                  <AlignAnimation type={"right"} />
                </span>
                <span onClick={() => changePos("strech")}>
                  <AlignAnimation type={"strech"} />
                </span>
              </div>
            ) : (
              <div style={{ height: "18px", width: "18px" }}>
                <AlignAnimation type={pos} />
              </div>
            )}
            <span className="arrow-down"></span></div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;
