import React, { useEffect } from "react";
import "./SnakeFood.style.scss";

function SnakeFood({ dotWidth, foodPosition, foodScore, setFoodScore }) {
  // 食物出現開始倒數
  useEffect(() => {
    const foodTimeout = setTimeout(() => {
      if (foodScore > 1) {
        setFoodScore((foodscore) => foodscore - 1);
      }
    }, 500);
    return () => {
      clearInterval(foodTimeout);
    };
  }, [foodScore]);

  return (
    <div
      className="SnakeFood"
      style={{
        width: `${dotWidth - 1}px`,
        height: `${dotWidth - 1}px`,
        left: `${foodPosition.row * dotWidth}px`,
        top: `${foodPosition.col * dotWidth}px`,
      }}
    />
  );
}

export default SnakeFood;
