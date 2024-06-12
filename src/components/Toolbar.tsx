import { useState } from "react";
import AlignAnimation from "./AlignAnimation";

function Toolbar(
  props: { 
    pos: string, 
    handleChangePos: (pos: string) => void, 
    handleStyle: (val: string) => void 
  }
) {
  const [openPositionDropdown, setOpenPositionDropdown] = useState(false);

  function handleOpenDropdown(type: string) {
    return
    if (type === "pos") {
      setOpenPositionDropdown(!openPositionDropdown);
    }
  }

  function changePos(pos: string) {
    if (openPositionDropdown) {
      setOpenPositionDropdown(!openPositionDropdown);
    }
    props.handleChangePos(pos)
  }

  function handleStyle(val: string) {
    props.handleStyle(val)
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
          onClick={() => handleStyle('bold')}
        >
          <strong>B</strong>
        </div>
        <div
          id="italic"
          className="btn"
          onClick={() => handleStyle('italic')}
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
                <AlignAnimation type={props.pos} />
              </div>
            )}
            <span className="arrow-down"></span></div>
        </div>
      </div>
    </>
  );
}

export default Toolbar;
