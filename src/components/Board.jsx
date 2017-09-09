import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checker from './Checker';

const boardColor = '#2196F3'

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

Circle.propTypes = {
  size: PropTypes.number,
  color: PropTypes.string,
}

Circle.defaultProps = {
  size: 50, 
  color: '#fff',
}


const Board = ({checkerSize, rows, cols}) => {
  const checkerContainerSize = Number.parseInt(checkerSize * 1.4);
  const boardWidth = checkerContainerSize * cols; 

  return (<div style={{width:`${boardWidth}px`}} className="d-flex flex-wrap">
    {[...Array(rows * cols).keys()].map((val, index) =>
      <Box key={index} color={boardColor} size={`${checkerContainerSize}px`}>
        <Circle size={checkerSize} color='#fff'/>
      </Box>
    )}
  </div>);
}

Board.propTypes = {
  checkerSize: PropTypes.number,
  rows: PropTypes.number,
  cols: PropTypes.number
}

Board.defaultProps = {
  checkerSize: 50, 
  rows: 6, 
  cols: 7,
}

export default Board;
