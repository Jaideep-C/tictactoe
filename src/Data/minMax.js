import PLAYER from "./enums/PlayerEnum";
const minimax = (board, isItAiTurn) => {
  if (board.gameOver) return mapResultState(board.winner);
  if (isItAiTurn) {
    var bestScore = -Infinity;
    for (
      let at = board.cells.findIndex((cell) => cell === PLAYER.default);
      at < board.cells.length;
      at++
    ) {
      if (!board.isCellEmpty(at)) continue;
      board.markCell(at);
      const score = minimax(board, false);
      board.clearCell(at);
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    var worstScore = Infinity;
    for (
      let at = board.cells.findIndex((cell) => cell === PLAYER.default);
      at < board.cells.length;
      at++
    ) {
      if (!board.isCellEmpty(at)) continue;
      board.markCell(at);
      const score = minimax(board, true);
      board.clearCell(at);
      worstScore = Math.min(worstScore, score);
    }
    return worstScore;
  }
};
const mapResultState = (winner) => {
  switch (winner) {
    case PLAYER.bot:
      return 10;
    case PLAYER.user:
      return -10;
    default:
      return 0;
  }
};
export default minimax;
