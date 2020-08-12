import React, { useState, useEffect } from "react";
import "./GameContainer.style.scss";
import SnakeDots from "../SnakeDot/SnakeDots.component";
import SnakeFood from "../SnakeFood/SnakeFood.component";
import { checkIfDead, addNewHead, ignoreWall } from "./GameContainerUtil";

const default_food_point = 10;
const default_speed = 100;
const default_snake = [
  { row: 0, col: 4 },
  { row: 1, col: 4 },
  { row: 2, col: 4 },
  { row: 3, col: 4 },
];
const default_life = 3;

function GameContainer() {
  const [dotWidth, setDotWidth] = useState(20);
  const [totalRowDots, setTotalRowDots] = useState();
  const [totalColDots, setTotalColDots] = useState();

  const [snakePosition, setSnakePosition] = useState(default_snake);
  const [moveDirection, setMoveDirection] = useState("ArrowRight");
  const [foodPosition, setFoodPosition] = useState({ row: 5, col: 5 });

  const [speed, setSpeed] = useState(default_speed);
  const [score, setScore] = useState(0);
  const [foodScore, setFoodScore] = useState(default_food_point);

  const [life, setLife] = useState(default_life);
  const [deadFlag, setDeadFlag] = useState(false);

  const [tiktok, setTiktok] = useState(true);
  const [wallFlag, setWallFlag] = useState(false);

  // 初始長寬
  useEffect(() => {
    const div = document.getElementById("GameContainer");
    if (Math.floor(div.offsetHeight / dotWidth) - 5 < 8) {
      setDotWidth(15);
      setTotalRowDots(Math.floor(div.offsetWidth / 15));
      setTotalColDots(Math.floor(div.offsetHeight / 15) - 5);
    } else {
      setTotalRowDots(Math.floor(div.offsetWidth / 20));
      setTotalColDots(Math.floor(div.offsetHeight / 20) - 5);

      setDotWidth(20);
    }
  }, []);

  const onKeydown = (direction) => {
    switch (direction) {
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
  };

  const snakeMove = () => {
    let newSnakeArray = [...snakePosition];
    // 1找到頭
    let head = newSnakeArray[newSnakeArray.length - 1];
    // 2根據不同方向新增新頭
    head = addNewHead(head, moveDirection);

    // 檢查是否撞牆
    if (
      head.row < 0 ||
      head.col < 0 ||
      head.row > totalRowDots - 1 ||
      head.col > totalColDots - 1
    ) {
      if (wallFlag) {
        if (checkIfDead(life, setLife, startNewGame, setDeadFlag)) {
          return;
        }
      } else {
        // 無視牆壁
        head = ignoreWall(head, totalRowDots, totalColDots);
      }
    }

    //  檢查當前的頭是否跟身體任何一段位置一樣（相撞）
    for (let i = 0; i < newSnakeArray.length; i++) {
      const dot = newSnakeArray[i];
      if (head.row === dot.row && head.col === dot.col) {
        // 確認相撞 檢查生命數 若仍有一條以上的命則繼續遊戲
        if (checkIfDead(life, setLife, startNewGame, setDeadFlag)) {
          return;
        }
      }
    }

    newSnakeArray.push(head);
    // 3 當吃到食物時 不用去尾以延長蛇身 並重置食物位置
    if (head.row === foodPosition.row && head.col === foodPosition.col) {
      setFoodPosition(generateFood(totalColDots, totalColDots));
      setScore((score) => score + foodScore);
      setFoodScore(default_food_point);
    } else {
      // 3 正常行進 去尾
      newSnakeArray.shift();
    }

    setSnakePosition(newSnakeArray);
  };

  const generateFood = (totalRowDots, totalColDots) => {
    const row = Math.floor(Math.random() * totalRowDots);
    const col = Math.floor(Math.random() * totalColDots);
    console.log("generateFood");
    return { row: row, col: col };
  };

  const startNewGame = () => {
    console.log("------restart------");
    setSnakePosition(default_snake);
    setMoveDirection("ArrowRight");
    setFoodPosition(generateFood(totalRowDots, totalColDots));
  };

  const resetGame = () => {
    setDeadFlag(false);
    setLife(default_life);
    setSnakePosition(default_snake);
    setMoveDirection("ArrowRight");
    setFoodPosition(generateFood(totalRowDots, totalColDots));
    setTiktok(!tiktok);
  };

  useEffect(() => {
    // 檢測方向
    document.onkeydown = (e) => onKeydown(e.code);

    // 移動
    snakeMove();
    const moveInterval = setTimeout(() => {
      setTiktok(!tiktok);
    }, speed);
    if (deadFlag) clearTimeout(moveInterval);
  }, [tiktok]);

  return (
    <div className="GameContainer" id="GameContainer">
      <div
        className="scoreSection"
        style={{
          width: `${totalRowDots * dotWidth}px`,
        }}
      >
        <h1>{score}</h1>
        <div className="life">
          <i className="fas fa-heart"></i>
          <h1>{life}</h1>
        </div>
      </div>
      <div
        className="Gamepad"
        style={{
          width: `${totalRowDots * dotWidth}px`,
          height: `${totalColDots * dotWidth}px`,
        }}
      >
        <SnakeDots dotWidth={dotWidth} snakePosition={snakePosition} />
        <SnakeFood
          dotWidth={dotWidth}
          foodPosition={foodPosition}
          foodScore={foodScore}
          setFoodScore={setFoodScore}
        />
      </div>

      <div className="arrowButton">
        <div className="button up" onClick={() => onKeydown("ArrowUp")}></div>
        <div
          className="button down"
          onClick={() => onKeydown("ArrowDown")}
        ></div>
        <div
          className="button left"
          onClick={() => onKeydown("ArrowLeft")}
        ></div>
        <div
          className="button right"
          onClick={() => onKeydown("ArrowRight")}
        ></div>
      </div>

      {deadFlag ? (
        <div className="gameover" onClick={() => resetGame()}>
          <h1>Game Over</h1>
          <h3>Click screen or press Enter to restart</h3>
        </div>
      ) : null}
    </div>
  );
}

export default React.memo(GameContainer);
