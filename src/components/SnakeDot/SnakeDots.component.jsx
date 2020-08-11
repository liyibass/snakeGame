import React from "react";
import "./SnakeDots.style.scss";

function SnakeDots({ snakePosition }) {
  return (
    <div className="SnakeDots">
      {snakePosition.map((position) => {
        return (
          <div
            key={position}
            className="dot"
            style={{
              left: `${position[0] * 20}px`,
              top: `${position[1] * 20}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default SnakeDots;
