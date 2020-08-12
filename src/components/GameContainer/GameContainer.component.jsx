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
  const [dotWidth, setDotWidth] = useState(15);
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

  // 初始長寬
  useEffect(() => {
    const div = document.getElementById("GameContainer");
    const rowdots = Math.floor(div.offsetWidth / dotWidth);
    const coldots = Math.floor(div.offsetHeight / dotWidth) - 5;

    setTotalRowDots(rowdots);
    setTotalColDots(coldots);
  }, []);

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
    if (
      head.row < 0 ||
      head.col < 0 ||
      head.row > totalRowDots - 1 ||
      head.col > totalColDots - 1
    ) {
      if (life > 1) {
        // setLife((life) => life - 1);
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
