import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Checker from '../Checker';
import Circle from './Circle';

import { selectorPropTypes } from '../../redux/game-selectors';

const boardColor = '#2196F3';

const Box = styled.div`
  background-color: ${props => props.color};
  height: ${props => props.size};
  width: ${props => props.size};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Section = styled.div`
  width: ${props => props.boardWidth}px;
  margin-top: 50px;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-wrap: wrap;
`;

const Board = ({ checkerSize, isInitialized, grid, rows, cols }) => {
  if (!isInitialized) {
    rows = 6;
    cols = 7;
  }

  const checkerContainerSize = Number.parseInt(checkerSize * 1.4, 10);
  const boardWidth = checkerContainerSize * cols;

  // const currGrid = isInitialized
  //   ? grid
  //   : [...Array(rows * cols)].map(_ => Math.floor(Math.random() * 2));
  const currGrid = [...Array(rows * cols)].map(_ => Math.floor(Math.random() * 2));

  return (
    <Section boardWidth={boardWidth}>
      {currGrid.map((val, index) => (
        <Box key={index} color={boardColor} size={`${checkerContainerSize}px`}>
          <Circle size={checkerSize} />
          <Checker
            size={checkerSize}
            color={val ? 'red' : 'yellow'}
            gridIndex={index}
          />
        </Box>
      ))}
    </Section>
  );
};

Board.propTypes = Object.assign(
  {
    checkerSize: PropTypes.number,
  },
  selectorPropTypes
);

Board.defaultProps = {
  checkerSize: 50,
  rows: 6,
  cols: 7,
};

export default Board;
