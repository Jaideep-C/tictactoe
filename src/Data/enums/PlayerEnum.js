const PLAYER = Object.freeze({
  default: "_",
  bot: "O",
  user: "X",
  nextMove: (move) => (move === PLAYER.bot ? PLAYER.user : PLAYER.bot),
  lastMove: (move) => PLAYER.nextMove(move),
});
export default PLAYER;
