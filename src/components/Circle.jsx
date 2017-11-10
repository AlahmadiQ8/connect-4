import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SvgAboslute = styled.svg`
  position: absolute;
`;

const Circle = ({ size, color, className, circleRef }) => (
  <SvgAboslute innerRef={circleRef} className={className} width={`${size}px`} height={`${size}px`} viewBox="0 0 100 100">
    <circle fill={color} cx="50" cy="50" r="50" />
  </SvgAboslute>
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
