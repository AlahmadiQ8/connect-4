import React from 'react';
import PropTypes from 'prop-types';

const Circle = ({ size, color, className, circleRef }) => (
  <svg
    ref={circleRef}
    className={className}
    width={`${size}px`}
    height={`${size}px`}
    viewBox="0 0 100 100"
    style={{ position: 'absolute' }}
  >
    <circle fill={color} cx="50" cy="50" r="50" />
  </svg>
);

Circle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
  className: PropTypes.string,
};

Circle.defaultProps = {
  size: 50,
  color: '#fff',
  className: '',
};

export default Circle;
