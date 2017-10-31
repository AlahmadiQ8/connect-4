import React from 'react';
// import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';

import { selectorPropTypes } from '../../redux/game-selectors';

import Board from '../Board';
import PlayerDash from '../PlayerDash';
import CloudTextBox from '../CloudTextBox';
import * as styles from '../../styles';

const H1 = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  color: #90caf9;
`;

const Section = styled.section`height: 718px;`;

const jiggleAnimation = keyframes`
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
  100% {
    transform: rotate(5deg);
  }
`;

const Button = styled.span`
  color: #f48fb1;
  animation: ${jiggleAnimation} 0.75s infinite reverse linear;
  display: inline-block;
  transition: color 0.25s;
  cursor: pointer;
  &:hover {
    color: #f06292;
  }
`;

const Game = ({
  rows,
  cols,
  isInitialized,
  initializeBoard,
}) => (
  <div className="container">
    <div className="row justify-content-center">
      <Section className="col d-flex flex-column align-items-center justify-content-end order-2">
        {!isInitialized && (
          <H1>
            Welcome! To start a new game, click{' '}
            <Button onClick={() => initializeBoard(rows, cols)}>play</Button>
          </H1>
        )}
        <Board rows={rows} cols={cols} />
      </Section>
      {isInitialized && (
        <Section className="col d-flex flex-column align-items-center justify-content-end order-1">
          <CloudTextBox />
          <PlayerDash
            color="yellow"
            total={21}
            used={15}
            getRectDirection="left"
          />
        </Section>
      )}
      {isInitialized && (
        <Section className="col d-flex flex-column align-items-center justify-content-end order-3">
          <PlayerDash
            color="red"
            total={21}
            used={15}
            getRectDirection="right"
          />
        </Section>
      )}
    </div>
  </div>
);

Game.propTypes = selectorPropTypes;

export default Game;
