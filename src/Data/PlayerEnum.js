const Player = Object.freeze({
  default: "_",
  bot: "O",
  user: "X",
  nextMove: (lastMove) => (lastMove === Player.bot ? Player.user : Player.bot),
});
export default Player;
