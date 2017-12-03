import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import BoardSquare from '../BoardSquare';
import Checker from '../Checker';

const Board = ({ checkerSize, grid, cols }) => {
  const checkerContainerSize = Number.parseInt(checkerSize * 1.4, 10);
  const boardWidth = checkerContainerSize * cols;

  const sectionStyles = {
    width: `${boardWidth}px`,
  };

  return (
    <div style={sectionStyles} className="Board-Section">
      {grid.map((val, index) => (
        <BoardSquare
          checkerSize={checkerSize}
          squareSize={checkerContainerSize}
          key={index}
          index={index}
        >
          {val !== null ? (
            <Checker
              size={checkerSize}
              color={val ? 'red' : 'yellow'}
              index={index}
            />
          ) : (
            <div />
          )}
        </BoardSquare>
      ))}
    </div>
  );
};

Board.propTypes = {
  grid: PropTypes.oneOfType([PropTypes.instanceOf(List), PropTypes.array]).isRequired,
  checkerSize: PropTypes.number,
  cols: PropTypes.number,
};

Board.defaultProps = {
  checkerSize: 50,
  cols: 7,
};

export default Board;
