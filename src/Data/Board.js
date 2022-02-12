import PLAYER from "./enums/PlayerEnum";
class Board {
  cells;
  level;
  lastMoveBy;
  winner;
  gameOver;

  constructor(level) {
    this.level = parseInt(level);
    this.reActivateCells();
  }
  reActivateCells() {
    this.cells = Array(this.level * this.level).fill(PLAYER.default);
    this.lastMoveBy = PLAYER.bot;
    this.winner = null;
    this.gameOver = false;
  }
  isCellEmpty(at) {
    return this.cells[at] === PLAYER.default;
  }
  markCell(at) {
    if (this.gameOver) return;
    // checking for Exception
    if (at >= this.cells.length)
      throw Error(
        `Cannot mark because ${at} is out of the boards range ${this.cells.length}.`
      );
    if (!this.isCellEmpty(at))
      throw Error(`Cannot mark because ${at} cell is occupied.`);
    // Marking a cell and updating lastMove
    this.cells[at] = PLAYER.nextMove(this.lastMoveBy);
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
    this.cells[at] = PLAYER.default;
    this.lastMoveBy = PLAYER.lastMove(this.lastMoveBy);
    this.gameOver = false;
    this.isGameComplete();
  }
  isGameComplete() {
    if (this.gameOver) return this.gameOver;
    const cells = this.cells;
    const stringIsSet = this.stringIsSet;
    const level = this.level;
    // row wise
    for (let row = 0; row < level; row++) {
      var str = cells.slice(level * row, level * (row + 1)).join("");
      if (stringIsSet(str, level)) {
        this.winner = cells[level * row];
        this.gameOver = true;
        return this.gameOver;
      }
    }
    // col wise
    for (let col = 0; col < level; col++) {
      const str = cells
        .filter((val, ind) => (ind - col) % level === 0)
        .join("");

      if (stringIsSet(str, level)) {
        this.winner = str[0];
        this.gameOver = true;
        return this.gameOver;
      }
    }
    /*
      diag wise
      l2r->left to right
      r2l->right to left
    */
    const l2r = cells.filter((val, ind) => ind % (level + 1) === 0).join("");
    if (stringIsSet(l2r, level)) {
      this.winner = l2r[0];
      this.gameOver = true;
      return this.gameOver;
    }
    const r2l = cells
      .filter(
        (val, ind) =>
          ind && ind % (level - 1) === 0 && ind <= level * (level - 1)
      )
      .join("");
    if (stringIsSet(r2l, level)) {
      this.winner = r2l[0];
      this.gameOver = true;
      return this.gameOver;
    }
    this.gameOver = !cells.includes(PLAYER.default);
    this.winner = null;
    return this.gameOver;
  }
  stringIsSet(s, level) {
    if (s.length !== level)
      throw Error(`String "${s}" is of wrong length ${s.length}`);
    return s === PLAYER.bot.repeat(level) || s === PLAYER.user.repeat(level);
  }
}

export default Board;
