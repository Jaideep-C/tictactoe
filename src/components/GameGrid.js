import React, { useState } from "react";
import "../styles/GameGrid.css";
function GameGrid(props) {
  const [board, setBoard] = useState(props.board);
  const onCellClick = (index) => {
    board.markCell(index);
    setBoard(Object.create(board));
  };
  return (
    <div className="GameGrid">
      {board.getGameCells().map((value, index) => {
        return (
          <div
            className="GameCell"
            key={index}
            onClick={() => onCellClick(index)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}

export default GameGrid;
