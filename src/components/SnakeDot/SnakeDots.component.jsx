import React from "react";
import "./SnakeDots.style.scss";
import { nanoid } from "nanoid";

function SnakeDots({ dotWidth, snakePosition }) {
  return (
    <div className="SnakeDots">
      {snakePosition.map((position) => {
        return (
          <div
            key={nanoid()}
            className="dot"
            style={{
              width: `${dotWidth - 1}px`,
              height: `${dotWidth - 1}px`,
              left: `${position.row * dotWidth}px`,
              top: `${position.col * dotWidth}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default SnakeDots;
