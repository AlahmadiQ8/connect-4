import React from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';

const colors = {
  red: {
    primary: '#F48FB1',
    secondary: '#F8BBD0',
  },
  yellow: {
    primary: '#FFEB3B',
    secondary: '#FFF59D',
  },
  white: {
    primary: '#FFFFFF',
    secondary: '#FFFFFF',
  },
};

const CheckerSvg = ({ color, size, className, checkerRef, style }) => (
  <svg
    className={className}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 200 200"
    ref={checkerRef}
    style={{ ...style, zIndex: 100 }}
  >
    <title>Checker</title>
    <circle
      fill={colors[color].primary}
      id="path-1"
      cx="100"
      cy="100"
      r="100"
    />
    <circle fill={colors[color].secondary} cx="100" cy="100" r="78.5123967" />
    <polygon
      id="Star"
      fill={colors[color].primary}
      points="100.098808 135.743802 56.6221307 158.600844 64.9254373 110.188852 29.7520661 75.9032884 78.3604696 68.840074 100.098808 24.7933884 121.837147 68.840074 170.445551 75.9032884 135.27218 110.188852 143.575486 158.600844"
    />
  </svg>
);

const Checker = ({
  color,
  size,
  type,
  checkerRef,
  isInitialized,
  leftDashChecker,
  rightDashChecker,
  initialPosition,
}) => {
  const moveTo =
    color === 'red' ? rightDashChecker.toJS() : leftDashChecker.toJS();
  const { left, top } = moveTo;
  const distanceX = left - initialPosition.left;
  const distanceY = top - initialPosition.top;
  const shouldMove = isInitialized;
  if (type === 'ui') {
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
  }
  return <CheckerSvg checkerRef={checkerRef} size={size} color={color} />;
};

// const recBoundaryPropTypes = {
//   top: PropTypes.num,
//   right: PropTypes.num,
//   bottom: PropTypes.num,
//   left: PropTypes.num,
//   width: PropTypes.num,
//   height: PropTypes.num,
//   x: PropTypes.num,
//   y: PropTypes.num,
// };

Checker.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow', 'white']),
  size: PropTypes.number,
  type: PropTypes.oneOf(['ui', 'dash']).isRequired,
  checkerRef: PropTypes.func.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  // leftDashChecker: recBoundaryPropTypes,
  // rightDashChecker: recBoundaryPropTypes,
  // initialPosition: recBoundaryPropTypes.isRequired,
};

Checker.defaultProps = {
  color: 'white',
  size: 50,
  className: '',
  type: 'ui',
};

export default Checker;
