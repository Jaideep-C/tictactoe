import minMax from "./minMax";
const botMove = (board) => {
  var bestMove;
  var bestScore = Math.inf;
  for (let at = 0; at < board.level * board.level; at++) {
    if (board.isCellEmpty(at)) {
      board.markCell(at);
      var score = minMax(board, true);
      board.clearCell(at);
      if (score > bestScore) {
        bestMove = at;
        bestScore = score;
      }
    }
  }
  return bestMove;
};
export default botMove;
