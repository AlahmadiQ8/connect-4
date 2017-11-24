import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

import CheckerSvg from './CheckerSvg';

const Checker = ({
  color,
  size,
  checkerRef,
  isInitialized,
  leftDashChecker,
  rightDashChecker,
  initialPosition,
}) => {
  const moveTo =
    color === 'red' ? rightDashChecker : leftDashChecker;
  const { left, top } = moveTo;
  const distanceX = left - initialPosition.left;
  const distanceY = top - initialPosition.top;
  const shouldMove = isInitialized;
  return (
    <Motion
      style={{
        x: spring(shouldMove ? distanceX : 0),
        y: spring(shouldMove ? distanceY : 0),
      }}
    >
      {({ x, y }) => {
        return (
          <CheckerSvg
            x={x}
            y={y}
            size={size}
            color={color}
            className=".hwAcceleration"
            checkerRef={checkerRef}
            style={{
              transform: `translate3d(${x}px, ${y}px, 0)`,
            }}
          />
        );
      }}
    </Motion>
  );
};

const recBoundaryPropTypes = PropTypes.shape({
  top: PropTypes.num,
  left: PropTypes.num,
});

Checker.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow', 'white']),
  size: PropTypes.number,
  checkerRef: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  leftDashChecker: recBoundaryPropTypes,
  rightDashChecker: recBoundaryPropTypes,
  initialPosition: recBoundaryPropTypes.isRequired,
};

Checker.defaultProps = {
  color: 'white',
  size: 50,
  leftDashChecker: { left: 0, top: 0 },
  rightDashChecker: { left: 0, top: 0 },
};

export default Checker;
