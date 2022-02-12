import "../styles/GameGrid.css";
import PropTypes from "prop-types";
import PLAYER from "../Data/enums/PlayerEnum";
function GameGrid(props) {
  const { onCellClick, board } = props;
  return (
    <div
      className="GameGrid"
      style={{ gridTemplateColumns: `repeat(${board.level}, 1fr)` }}
    >
      {board.cells.map((value, index) => {
        return (
          <div
            className="GameCell"
            key={`${index},${value}`}
            style={{ color: `${getCellColor(value)}` }}
            onClick={() => onCellClick(index)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
  function getCellColor(val) {
    switch (val) {
      case PLAYER.bot:
        return "red";
      case PLAYER.user:
        return "green";
      default:
        return "black";
    }
  }
}
GameGrid.propTypes = {
  onCellClick: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
};
export default GameGrid;
