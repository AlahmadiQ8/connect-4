import React from 'react';
import PropTypes from 'prop-types';

import { shuffleArray } from '../../utils';

import BoardSquare from '../BoardSquare';
import Checker from '../Checker';

const Board = ({ checkerSize, isInitialized, grid, rows, cols }) => {

  const checkerContainerSize = Number.parseInt(checkerSize * 1.4, 10);
  const boardWidth = checkerContainerSize * cols;

  const currGrid = [
    ...Array(rows * cols / 2).fill(0),
    ...Array(rows * cols / 2).fill(1),
  ];
  shuffleArray(currGrid);

  const sectionStyles = {
    width: `${boardWidth}px`,
  };

  return (
    <div style={sectionStyles} className="Board-Section">
      {currGrid.map((val, index) => (
        <BoardSquare
          checkerSize={checkerSize}
          squareSize={checkerContainerSize}
          key={index}
          index={index}
        >
          <Checker
            size={checkerSize}
            color={val ? 'red' : 'yellow'}
            gridIndex={index}
          />
        </BoardSquare>
      ))}
    </div>
  );
};

Board.propTypes = {
  isInitialized: PropTypes.bool.isRequired,
  checkerSize: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number,
};

Board.defaultProps = {
  checkerSize: 50,
  rows: 6,
  cols: 7,
};

export default Board;
