import minMax from "./minMax";
const botMove = (board) => {
  var bestMove;
  var bestScore = -Infinity;
  for (let at = 0; at < board.cells.length; at++) {
    if (!board.isCellEmpty(at)) continue;
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
export default botMove;
