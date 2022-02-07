import PLAYER from "./enums/PlayerEnum";
const minimax = (board, isItAiTurn) => {
  if (board.gameOver) return mapResultState(board.winner);
  if (isItAiTurn) {
    var bestScore = -Infinity;
    for (let at = 0; at < board.level * board.level; at++) {
      if (!board.isCellEmpty(at)) continue;
      const score = minimax(board, true);
      board.clearCell(at);
      bestScore = Math.max(bestScore, score);
    }
    return bestScore;
  } else {
    var worstScore = Infinity;
    for (let at = 0; at < board.level * board.level; at++) {
      if (!board.isCellEmpty(at)) continue;
      const score = minimax(board, true);
      board.clearCell(at);
      worstScore = Math.max(worstScore, score);
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
