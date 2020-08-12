import React from "react";
import "./Nokia.style.scss";
import nokiaImage from "../../images/nokia.png";
import GameContainer from "../GameContainer/GameContainer.component";

function Nokia() {
  return (
    <div className="Nokia">
      <div className="nokiaBody">
        <div className="screen">
          <GameContainer />
        </div>
        <img src={nokiaImage} alt="nokia" className="nokiaImage" />
      </div>
    </div>
  );
}

export default Nokia;
