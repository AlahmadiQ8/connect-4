import React from 'react';
import PropTypes from 'prop-types';

const colors = {
  red: {
    primary: '#F48FB1',
    secondary: '#F8BBD0',
  },
  yellow: {
    primary: '#FFEB3B',
    secondary: '#FFF59D',
  }
}

const Checker = (props) => {
  const color = props.color;
  return (
    <svg width={`${props.size}px`} height={`${props.size}px`} viewBox={`0 0 200 200`}>
        <title>Checker</title>
        <g id="circle">
          <circle fill={colors[color].primary} id="path-1" cx="100" cy="100" r="100"></circle>
          <circle fill={colors[color].secondary} mask="url(#mask-2)" cx="100" cy="100" r="78.5123967"></circle>
        </g>
        <polygon id="Star" fill={colors[color].primary} points="100.098808 135.743802 56.6221307 158.600844 64.9254373 110.188852 29.7520661 75.9032884 78.3604696 68.840074 100.098808 24.7933884 121.837147 68.840074 170.445551 75.9032884 135.27218 110.188852 143.575486 158.600844"></polygon>
    </svg>
  );
}

Checker.propTypes = {
  color: PropTypes.oneOf(['red', 'yellow']).isRequired,
  size: PropTypes.number
}

Checker.defaultProps = {
  color: 'red',
  size: 50,
};

export default Checker;
