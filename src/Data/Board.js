import Player from "./PlayerEnum";
class Board {
  cells;
  level;
  lastMoveBy;
  constructor(level) {
    this.level = parseInt(level);
    this.lastMoveBy = Player.bot;
    this.activateCells();
  }
  activateCells() {
    this.cells = Array(this.level * this.level);
    this.cells.fill(Player.default);
  }
  resetBoard() {
    this.activateCells();
    this.lastMoveBy = Player.bot;
  }
  getGameCells() {
    return this.cells;
  }
  isCellEmpty(at) {
    return this.cells[at] === Player.default;
  }
  markCell(at) {
    // checking for Exception
    if (at >= this.cells.length)
      throw Error(
        `Cannot mark because ${at} is out of the boards range ${this.cells.length}.`
      );
    if (!this.isCellEmpty(at))
      throw Error(`Cannot mark because ${at} cell is occupied.`);
    // Marking a cell and updating lastMove
    this.cells[at] = Player.nextMove(this.lastMoveBy);
    this.lastMoveBy = this.cells[at];
  }
  clearCell(at) {
    // checking for Exception
    if (at >= this.cells.length)
      throw Error(
        `Cannot clear because cell ${at} is out of the boards range ${this.cells.length}.`
      );
    if (this.isCellEmpty())
      throw Error(`Cannot clear because  cell ${at} is already empty.`);
    // Clearing a cell and updating lastMove
    this.cells[at] = "";
    this.lastMoveBy = this.lastMoveBy === Player.bot ? Player.user : Player.bot;
  }

  isGameComplete() {}
}

export default Board;
