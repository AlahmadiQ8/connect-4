import React from 'react';
import PropTypes from 'prop-types';
import Circle from '../Circle';

const boardColor = 'rgba(33, 150, 243, 1)';
const boardColorHovered = 'rgba(107, 170, 240, 1)';
const scaleRatio = 1.1;

const transformStyle = {
  transform: `scale(1, ${scaleRatio})`,
  transformOrigin: 'bottom',
  transition: 'transform 0.2s ease-out',
  backgroundColor: boardColorHovered,
};

const cancelParentScaleStyle = {
  transform: `scale(1, ${1 / scaleRatio})`,
  transformOrigin: 'bottom',
  transition: 'transform 0.2s ease-out',
};

const BoardSquare = ({ children, checkerSize, squareSize, actions, isColumnHovered }) => {
  const boxStyles = {
    backgroundColor: boardColor,
    height: `${squareSize}px`,
    width: `${squareSize}px`,
    ...isColumnHovered ? transformStyle : {},
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
      <Circle
        size={checkerSize}
        style={isColumnHovered ? cancelParentScaleStyle : {}}
      />
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
