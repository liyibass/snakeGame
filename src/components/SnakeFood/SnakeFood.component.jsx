import React, { useEffect } from "react";
import "./SnakeFood.style.scss";

function SnakeFood({ foodPosition, foodScore, setFoodScore }) {
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
        left: `${foodPosition.row * 20}px`,
        top: `${foodPosition.col * 20}px`,
      }}
    />
  );
}

export default SnakeFood;
