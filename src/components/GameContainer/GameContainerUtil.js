export const checkIfDead = (life, setLife, startNewGame, setDeadFlag) => {
  console.log("CHECK");
  if (life > 1) {
    setLife((life) => life - 1);
    startNewGame();
    return true;
  } else {
    setDeadFlag(true);
    return true;
  }
};

export const addNewHead = (head, moveDirection) => {
  switch (moveDirection) {
    case "ArrowRight":
      return { ...head, row: head.row + 1 };

    case "ArrowLeft":
      return { ...head, row: head.row - 1 };

    case "ArrowDown":
      return { ...head, col: head.col + 1 };

    case "ArrowUp":
      return { ...head, col: head.col - 1 };

    default:
      return head;
  }
};

// head小於or大於邊界時 移動到象限另一邊
export const ignoreWall = (head, totalRowDots, totalColDots) => {
  let adjustHead;
  if (head.row < 0) {
    adjustHead = { ...head, row: totalRowDots - 1 };
  } else if (head.row > totalRowDots - 1) {
    adjustHead = { ...head, row: 0 };
  } else if (head.col < 0) {
    adjustHead = { ...head, col: totalColDots - 1 };
  } else if (head.col > totalColDots - 1) {
    adjustHead = { ...head, col: 0 };
  }

  return adjustHead;
};
