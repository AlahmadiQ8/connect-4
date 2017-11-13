import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../Circle';

const boardColor = '#2196F3';

const BoardSquare = ({ children, checkerSize, squareSize, actions }) => {
  const boxStyles = {
    backgroundColor: boardColor,
    height: `${squareSize}px`,
    width: `${squareSize}px`,
  };
  return (
    <div
      color={boardColor}
      className="BoardSquare-box"
      size={`${squareSize}px`}
      style={boxStyles}
      onClick={actions.insertChecker}
      role="button"
    >
      <Circle size={checkerSize} />
      {children}
    </div>
  );
};

BoardSquare.propTypes = {
  children: PropTypes.element,
  checkerSize: PropTypes.number,
  squareSize: PropTypes.number,
  actions: PropTypes.shape({
    insertChecker: PropTypes.func,
  }).isRequired,
};

BoardSquare.defaultProps = {
  children: null,
  checkerSize: 50,
  squareSize: 50 * 1.4,
};

export default BoardSquare;
