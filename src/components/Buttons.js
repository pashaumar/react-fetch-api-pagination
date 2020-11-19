import React from "react";

function Buttons({ item, handleButtonClick, currentButton }) {
  return (
    <button
      className={currentButton === item ? "active" : ""}
      onClick={() => handleButtonClick(item)}
    >
      {item}
    </button>
  );
}

export default Buttons;
