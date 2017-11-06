import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Motion, spring } from 'react-motion';
// import { fromJS } from 'immutable';
import styled from 'styled-components';

import { hwAcceleration } from '../../styles';

const colors = {
  red: {
    primary: '#F48FB1',
    secondary: '#F8BBD0',
  },
  yellow: {
    primary: '#FFEB3B',
    secondary: '#FFF59D',
  },
};

const CheckerSvg = ({ color, size, className, checkerRef }) => (
  <svg
    className={className}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 200 200"
    ref={checkerRef}
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

const AnimatedChecker = styled(CheckerSvg)`
  ${hwAcceleration}
  transform: translate3d(${props => props.x}px, ${props => props.y}px, 0);
  opacity: ${props => props.opacity};
`;

const Checker = ({
  color,
  size,
  className,
  type,
  checkerRef,
  isInitialized,
  leftDashChecker,
  rightDashChecker,
  initialPosition,
}) => {
  const moveTo = color === 'red' ? rightDashChecker.toJS() : leftDashChecker.toJS();
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
          opacity: !shouldMove ? 1 : spring(0),
        }}
      >
        {({ x, y, opacity }) => (
          <AnimatedChecker
            x={x}
            y={y}
            opacity={opacity}
            size={size}
            color={color}
            className={className}
            checkerRef={checkerRef}
          />
        )}
      </Motion>
    );
  }
  return (
    <CheckerSvg
      size={size}
      color={color}
      className={className}
      checkerRef={checkerRef}
    />
  );
};

Checker.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']).isRequired,
  size: PropTypes.number,
  className: PropTypes.string,
  type: PropTypes.oneOf(['ui', 'dash']).isRequired,
  setDashCheckerRect: PropTypes.func,
  getRectDirection: PropTypes.string,
  gridIndex: PropTypes.number,
};

Checker.defaultProps = {
  size: 50,
  className: '',
  type: 'ui',
  setDashCheckerRect: () => {},
  getRectDirection: '',
  gridIndex: -1,
};

export default Checker;
