import React, { useState } from "react";
import Board from "../Data/Board";
import PLAYER from "../Data/enums/PlayerEnum";
import PropTypes from "prop-types";
import GameGrid from "./GameGrid";
function TicTacToe({ level }) {
  const [board, setBoard] = useState(new Board(level));
  return (
    <div>
      <p>{`${gameStatus()}`}</p>
      <GameGrid onCellClick={onCellClick} board={board} />
      <button onClick={resetBoard}>Reset</button>
    </div>
  );
  function resetBoard() {
    var newBoard = getNewObject(board);
    newBoard.reActivateCells();
    setBoard(newBoard);
    // console.log(newBoard);
  }
  function onCellClick(index) {
    var newBoard = getNewObject(board);
    newBoard.markCell(index);
    setBoard(newBoard);
  }
  function getNewObject(obj) {
    return Object.assign(Object.create(Object.getPrototypeOf(obj)), obj);
  }
  function gameStatus() {
    if (board.winner) return `${board.winner} is the winner`;
    if (!board.winner && board.gameOver) return "It is a draw";
    return `${PLAYER.nextMove(board.lastMoveBy)}'s turn`;
  }
}
TicTacToe.propTypes = { level: PropTypes.number.isRequired };

export default TicTacToe;
