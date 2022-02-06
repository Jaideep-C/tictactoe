import Player from "./PlayerEnum";
class Board {
  cells;
  level;
  lastMoveBy;
  winner;

  constructor(level) {
    this.level = parseInt(level);
    this.lastMoveBy = Player.bot;
    this.activateCells();
    this.winner = null;
  }
  activateCells() {
    this.cells = Array(this.level * this.level);
    this.cells.fill(Player.default);
  }
  resetBoard() {
    this.activateCells();
    this.lastMoveBy = Player.bot;
    this.winner = null;
  }
  getGameCells() {
    return this.cells;
  }
  isCellEmpty(at) {
    return this.cells[at] === Player.default;
  }
  markCell(at) {
    if (this.winner) return;
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
    this.isGameComplete();
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
  isGameComplete() {
    if (this.winner) return true;
    const cells = this.cells;
    const stringIsSet = this.stringIsSet;
    const level = this.level;
    // row wise
    for (let row = 0; row < level; row++) {
      var str = cells.slice(level * row, level * (row + 1));
      if (stringIsSet(str.join(""), level)) {
        this.winner = cells[level * row];
        return true;
      }
    }
    // col wise
    for (let col = 0; col < level; col++) {
      const str = cells
        .filter((val, ind) => (ind - col) % level === 0)
        .join("");

      if (stringIsSet(str, level)) {
        this.winner = str[0];
        return true;
      }
    }
    /*
      diag wise
    */
    const l2r = cells.filter((val, ind) => ind % (level + 1) === 0).join("");
    if (stringIsSet(l2r, level)) {
      this.winner = l2r[0];
      return true;
    }
    const r2l = cells
      .filter(
        (val, ind) =>
          ind && ind % (level - 1) === 0 && ind <= level * (level - 1)
      )
      .join("");
    if (stringIsSet(r2l, level)) {
      this.winner = r2l[0];
      return true;
    }
    return false;
  }
  stringIsSet(s, level) {
    if (s.length !== level)
      throw Error(`String "${s}" is of wrong length ${s.length}`);
    return s === "XXX" || s === "OOO";
  }
}

export default Board;
