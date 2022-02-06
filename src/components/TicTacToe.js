import React, { useState } from "react";
import Board from "../Data/Board";
import Player from "../Data/PlayerEnum";
import PropTypes from "prop-types";
import GameGrid from "./GameGrid";
function TicTacToe({ level }) {
  const [board, setBoard] = useState(new Board(level));
  return (
    <div>
      <p>
        {board.winner
          ? `${board.winner} is the winner`
          : `${Player.nextMove(board.lastMoveBy)}'s turn`}
      </p>
      <GameGrid onCellClick={onCellClick} board={board} />
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
  function resetBoard() {
    var newBoard = getNewObject(board);
    newBoard.resetBoard();
    setBoard(newBoard);
    console.log(newBoard);
  }
  function onCellClick(index) {
    var newBoard = getNewObject(board);
    newBoard.markCell(index);
    setBoard(newBoard);
  }
  function getNewObject(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
  }
}
TicTacToe.propTypes = { level: PropTypes.number.isRequired };

export default TicTacToe;
