import React from 'react';
import PropTypes from 'prop-types';

import { shuffleArray } from '../../utils';

import Checker from '../Checker';
import Circle from '../Circle';

const boardColor = '#2196F3';

const Board = ({ checkerSize, isInitialized, grid, rows, cols }) => {
  if (!isInitialized) {
    rows = 6;
    cols = 7;
  }

  const checkerContainerSize = Number.parseInt(checkerSize * 1.4, 10);
  const boardWidth = checkerContainerSize * cols;

  const currGrid = [
    ...Array(rows * cols / 2).fill(0),
    ...Array(rows * cols / 2).fill(1),
  ];
  shuffleArray(currGrid);

  const boxStyles = {
    backgroundColor: boardColor,
    height: `${checkerContainerSize}px`,
    width: `${checkerContainerSize}px`,
  };
  const sectionStyles = {
    width: `${boardWidth}px`,
  };

  return (
    <div style={sectionStyles} className="Board-Section">
      {currGrid.map((val, index) => (
        <div
          key={index}
          color={boardColor}
          className="Board-Box"
          size={`${checkerContainerSize}px`}
          style={boxStyles}
        >
          <Circle size={checkerSize} />
          <Checker
            size={checkerSize}
            color={val ? 'red' : 'yellow'}
            gridIndex={index}
          />
        </div>
      ))}
    </div>
  );
};

Board.propTypes = {
  checkerSize: PropTypes.number,
};

Board.defaultProps = {
  checkerSize: 50,
  rows: 6,
  cols: 7,
};

export default Board;
