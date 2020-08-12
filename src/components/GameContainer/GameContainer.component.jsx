import React, { useState, useEffect } from "react";
import "./GameContainer.style.scss";
import SnakeDots from "../SnakeDot/SnakeDots.component";
import SnakeFood from "../SnakeFood/SnakeFood.component";

const default_food_point = 10;
const default_speed = 100;
const default_snake = [
  { row: 0, col: 0 },
  { row: 1, col: 0 },
  { row: 2, col: 0 },
  { row: 3, col: 0 },
];
const default_life = 3;

function GameContainer() {
  const [snakePosition, setSnakePosition] = useState(default_snake);
  const [moveDirection, setMoveDirection] = useState("ArrowRight");
  const [foodPosition, setFoodPosition] = useState(generateFood());
  const [speed, setSpeed] = useState(default_speed);
  const [score, setScore] = useState(0);
  const [foodScore, setFoodScore] = useState(default_food_point);

  const [life, setLife] = useState(default_life);
  const [deadFlag, setDeadFlag] = useState(false);

  const [tiktok, setTiktok] = useState(true);

  function onKeydown(e) {
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

      case "Enter":
        resetGame();
        break;

      default:
        break;
    }
  }

  function snakeMove() {
    let newSnakeArray = [...snakePosition];
    // 1找到頭
    let head = newSnakeArray[newSnakeArray.length - 1];
    // 2根據不同方向新增新頭
    switch (moveDirection) {
      case "ArrowRight":
        head = { ...head, row: head.row + 1 };

        break;

      case "ArrowLeft":
        head = { ...head, row: head.row - 1 };
        break;

      case "ArrowDown":
        head = { ...head, col: head.col + 1 };
        break;

      case "ArrowUp":
        head = { ...head, col: head.col - 1 };
        break;

      default:
        break;
    }
    if (head.row < 0 || head.col < 0 || head.row > 17 || head.col > 11) {
      if (life > 1) {
        setLife((life) => life - 1);
        startNewGame();
        return;
      } else {
        setDeadFlag(true);
        return;
      }
    }

    //  檢查當前的頭是否跟身體任何一段位置一樣（相撞）
    newSnakeArray.forEach((dot) => {
      if (head.row === dot.row && head.col === dot.col) {
        // 確認相撞 檢查生命數 若仍有一條以上的命則繼續遊戲
        if (life > 1) {
          setLife((life) => life - 1);
          startNewGame();
        } else {
          setDeadFlag(true);
        }
      }
    });

    newSnakeArray.push(head);
    if (head.row === foodPosition.row && head.col === foodPosition.col) {
      // 3 當吃到食物時 不用去尾以延長蛇身 並重置食物位置
      setFoodPosition(generateFood());
      setScore((score) => score + foodScore);
      setFoodScore(default_food_point);
    } else {
      // 3 正常行進 去尾
      newSnakeArray.shift();
    }

    setSnakePosition(newSnakeArray);
  }

  function generateFood() {
    const row = Math.floor(Math.random() * 18);
    const col = Math.floor(Math.random() * 12);

    return { row: row, col: col };
  }

  function startNewGame() {
    console.log("------restart------");
    setSnakePosition(default_snake);
    setMoveDirection("ArrowRight");
    setFoodPosition(generateFood());
  }

  function resetGame() {
    setDeadFlag(false);
    setLife(default_life);
    setSnakePosition(default_snake);
    setMoveDirection("ArrowRight");
    setFoodPosition(generateFood());
    setTiktok(!tiktok);
  }

  useEffect(() => {
    // 檢測方向
    document.onkeydown = (e) => onKeydown(e);
    snakeMove();
    // 移動
    const moveInterval = setTimeout(() => {
      setTiktok(!tiktok);
    }, speed);
    if (deadFlag) clearTimeout(moveInterval);
  }, [tiktok]);

  if (!deadFlag) {
    return (
      <div className="GameContainer">
        <div className="scoreSection">
          <h1>{score}</h1>
          <div className="life">
            <i className="fas fa-heart"></i>
            <h1>{life}</h1>
          </div>
        </div>
        <div className="Gamepad">
          <SnakeDots snakePosition={snakePosition} />
          <SnakeFood
            foodPosition={foodPosition}
            foodScore={foodScore}
            setFoodScore={setFoodScore}
          />
        </div>
      </div>
    );
  } else {
    return (
      <div className="GameContainer">
        <div className="gameover" onClick={() => resetGame()}>
          <h1>Game Over</h1>
          <h3>Click screen or press Enter to restart</h3>
        </div>
      </div>
    );
  }
}

export default React.memo(GameContainer);
