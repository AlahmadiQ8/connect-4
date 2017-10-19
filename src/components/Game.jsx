import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';

import Board from './Board';

const H1 = styled.h1`
  text-align: center;
  font-size: 2.6rem;
  color: #90CAF9;
`;

const Section = styled.div`
  margin-top: 150px;
`;

const jiggleAnimation = keyframes`
  0% {
    transform: rotate(5deg);
  }
  50% {
    transform: rotate(-5deg);
  }
`
const Link = styled.span`
  color: #F48FB1;
  animation: .75s infinite reverse ${jiggleAnimation};
  animation-timing-function: linear;
  transform: rotate(5deg);
  display: inline-block;
  transition: color .25s;
  cursor: default;
  &:hover {
    color: #F06292;
  }
`;

class Game extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Section className="col">
            <H1>Welcome! To start a new game, click <Link>play</Link></H1>
            <Board rows={6} cols={7} />
          </Section>
        </div>
      </div>
    );
  }
}

export default Game;
