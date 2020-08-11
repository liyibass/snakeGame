import React from "react";
import "./Nokia.style.scss";
import nokiaImage from "../../images/nokia.png";
import GameContainer from "../GameContainer/GameContainer.component";

function Nokia() {
  return (
    <div className="Nokia">
      <GameContainer />
      <div className="screen"></div>
      <img src={nokiaImage} alt="nokia" className="nokiaImage" />
    </div>
  );
}

export default Nokia;
