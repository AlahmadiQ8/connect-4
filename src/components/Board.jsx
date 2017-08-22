import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checker from './Checker';

const color = '#2196F3'

const Box = styled.div`
  background-color: ${props => props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Circle = ({size, color}) => (
  <svg width={`${size}px`} height={`${size}px`} viewBox={`0 0 100 100`}>
      <circle fill={color} cx="50" cy="50" r="50"></circle>
  </svg>
);

export const Board = () => {
  return (<div style={{width:'490px'}} className="d-flex flex-wrap">
    {[...Array(42).keys()].map(() =>
      <Box color={color} size='70px'>
        <Circle size='50' color='#fff'/>
      </Box>
    )}
  </div>);
}


export default Board;
