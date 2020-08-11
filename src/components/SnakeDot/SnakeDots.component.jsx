import React from "react";
import "./SnakeDots.style.scss";
import { nanoid } from "nanoid";

function SnakeDots({ snakePosition }) {
  return (
    <div className="SnakeDots">
      {snakePosition.map((position) => {
        return (
          <div
            key={nanoid()}
            className="dot"
            style={{
              left: `${position.row * 20}px`,
              top: `${position.col * 20}px`,
            }}
          />
        );
      })}
    </div>
  );
}

export default SnakeDots;
