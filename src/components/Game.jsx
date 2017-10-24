import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import Board from './Board';
import PlayerDash from './PlayerDash';
import CloudTextBox from './CloudTextBox';

const H1 = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  color: #90caf9;
`;

const Section = styled.section`
  margin-top: 150px;
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

const Link = styled.span`
  color: #f48fb1;
  animation: ${jiggleAnimation} 0.75s infinite reverse linear;
  display: inline-block;
  transition: color 0.25s;
  cursor: default;
  &:hover {
    color: #f06292;
  }
`;

class Game extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Section className="col order-2">
            <H1>
              Welcome! To start a new game, click <Link>play</Link>
            </H1>
            <Board rows={6} cols={7} />
          </Section>
          <Section className="col d-flex flex-column align-items-center justify-content-end order-1">
            <CloudTextBox />
            <PlayerDash color="yellow" total={21} used={15} />
          </Section>
          <Section className="col d-flex flex-column align-items-center justify-content-end order-3">
            <PlayerDash color="red" total={21} used={15} />
          </Section>
        </div>
      </div>
    );
  }
}

export default Game;
