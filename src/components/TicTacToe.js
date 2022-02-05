import React, { useState } from "react";
import Board from "../Data/Board";
import GameGrid from "./GameGrid";
function TicTacToe(props) {
  const level = props.level;
  const [board, setBoard] = useState(new Board(level));
  return (
    <div>
      <GameGrid board={board} />
      <br />
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
  function resetBoard() {
    board.resetBoard();
    setBoard(Object.create(board));
  }
}
export default TicTacToe;
