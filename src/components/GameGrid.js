import "../styles/GameGrid.css";
import PropTypes from "prop-types";
function GameGrid(props) {
  const { onCellClick, board } = props;
  return (
    <div className="GameGrid">
      {board.getGameCells().map((value, index) => {
        return (
          <div
            className="GameCell"
            key={`${index},${value}`}
            onClick={() => onCellClick(index)}
          >
            {value}
          </div>
        );
      })}
    </div>
  );
}
GameGrid.propTypes = {
  onCellClick: PropTypes.func.isRequired,
  board: PropTypes.object.isRequired,
};
export default GameGrid;
