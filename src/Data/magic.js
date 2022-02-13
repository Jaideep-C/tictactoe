import minMax from "./minMax";
import PLAYER from "./enums/PlayerEnum";
export const minMaxMove = (board) => {
  var bestMove;
  var bestScore = -Infinity;
  for (let at = 0; at < board.cells.length; at++) {
    if (!board.isCellEmpty(at)) continue;
    // if (bestScore >= 10) break;
    board.markCell(at);
    var score = minMax(board, false);
    board.clearCell(at);
    if (score > bestScore) {
      bestMove = at;
      bestScore = score;
    }
  }
  return bestMove;
};
export const randomMove = (board) => {
  return board.cells.findIndex((cell) => cell === PLAYER.default);
};
