import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TransitionMotion, spring } from 'react-motion';

import { selectorPropTypes } from '../../redux/game-selectors';

import Board from '../Board';
import PlayerDash from '../PlayerDash';
import CloudTextBox from '../CloudTextBox';
import * as styles from '../../styles';

const H1 = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  color: #90caf9;
  min-width: 585px;
`;

const Section = styled.section`height: 718px;`;

const BoardSection = styled(Section)`
  min-width: 600px;
`;

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

const Game = ({ rows, cols, isInitialized, initializeBoard }) => {
  const transitionStyles = !isInitialized
    ? [{ key: '0', style: { opacity: 1 } }]
    : [];
  return (
    <div className="container">
      <div className="row justify-content-center">
        <BoardSection className="col d-flex flex-column align-items-center justify-content-end order-2">
          <TransitionMotion
            willLeave={() => ({ opacity: spring(0) })}
            styles={transitionStyles}
          >
            {configs => (
              <div>
                {configs.map(config => (
                  <H1 key={config.key} style={config.style}>
                    Welcome! To start a new game, click{' '}
                    <Button onClick={() => initializeBoard(rows, cols)}>
                      play
                    </Button>
                  </H1>
                ))}
              </div>
            )}
          </TransitionMotion>
          <Board rows={rows} cols={cols} />
        </BoardSection>
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
};

Game.propTypes = selectorPropTypes;

export default Game;
