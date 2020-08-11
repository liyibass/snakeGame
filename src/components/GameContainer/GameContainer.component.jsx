import React, { useState, useEffect } from "react";
import "./GameContainer.style.scss";
import SnakeDots from "../SnakeDot/SnakeDots.component";

function GameContainer() {
  const [snakePosition, setSnakePosition] = useState([
    [0, 5],
    [1, 5],
    [2, 5],
    [3, 5],
  ]);
  const [foodPosition, setFoodPosition] = useState([]);
  const [moveDirection, setMoveDirection] = useState("ArrowRight");
  const [speed, setSpeed] = useState(100);

  const snakeMove = () => {
    let newSnakeArray = [...snakePosition];
    let head = newSnakeArray[newSnakeArray.length - 1];
    switch (moveDirection) {
      case "ArrowRight":
        head = [(head[0] + 1) % 18, head[1]];

        break;

      case "ArrowLeft":
        head = [(head[0] + 17) % 18, head[1]];
        break;

      case "ArrowDown":
        head = [head[0], (head[1] + 1) % 12];
        break;

      case "ArrowUp":
        head = [head[0], (head[1] + 11) % 12];
        break;

      default:
        break;
    }
    newSnakeArray.push(head);
    newSnakeArray.shift();

    setSnakePosition(newSnakeArray);
  };

  const onKeydown = (e) => {
    switch (e.code) {
      case "ArrowLeft":
        if (moveDirection === "ArrowRight") break;
        setMoveDirection("ArrowLeft");
        break;

      case "ArrowRight":
        if (moveDirection === "ArrowLeft") break;
        setMoveDirection("ArrowRight");

        break;

      case "ArrowUp":
        if (moveDirection === "ArrowDown") break;
        setMoveDirection("ArrowUp");
        break;

      case "ArrowDown":
        if (moveDirection === "ArrowUp") break;
        setMoveDirection("ArrowDown");
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    document.onkeydown = (e) => onKeydown(e);
    const interval = setInterval(() => {
      snakeMove();
    }, speed);
    return () => {
      clearInterval(interval);
    };
  }, [snakePosition]);

  return (
    <div className="GameContainer">
      <div className="scoreSection">
        <h1>190</h1>

        <h1>{moveDirection}</h1>

        <div className="life">
          <i className="fas fa-heart"></i>
          <h1>17</h1>
        </div>
      </div>
      <div className="Gamepad">
        <SnakeDots snakePosition={snakePosition} />
      </div>
    </div>
  );
}

export default GameContainer;
