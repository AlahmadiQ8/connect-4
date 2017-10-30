import React, { Component } from 'react';
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

const Section = styled.section`
  height: 718px;
  display: ${props => { return props.show ? 'flex' : 'none'; }};
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

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = () => {
    console.log(this.elLeftDashChecker);
    console.log(this.elRightDashChecker);
  };

  componentDidMount() {
    console.log('omg');
    console.log(this.elLeftDashChecker.getBoundingClientRect());
    console.log(this.elRightDashChecker.getBoundingClientRect());
  }

  componentDidUpdate() {
    console.log('omg');
    console.log(this.elLeftDashChecker.getBoundingClientRect());
    console.log(this.elRightDashChecker.getBoundingClientRect());
  }

  render() {
    const { isInitialized, initializeBoard } = this.props;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <Section className="col d-flex flex-column align-items-center justify-content-end order-2">
            {!isInitialized && (
              <H1>
                Welcome! To start a new game, click{' '}
                <Button onClick={() => initializeBoard(6, 7)}>play</Button>
              </H1>
            )}
            <Board rows={6} cols={7} />
          </Section>
          <Section
            show={isInitialized}
            className="col flex-column align-items-center justify-content-end order-1"
          >
            <CloudTextBox />
            <PlayerDash
              color="yellow"
              total={21}
              used={15}
              checkerSvgRef={el => {
                this.elLeftDashChecker = el;
              }}
            />
            <button onClick={this.handleClick}>Test</button>
          </Section>
          <Section
            show={isInitialized}
            className="col flex-column align-items-center justify-content-end order-3"
          >
            <PlayerDash
              color="red"
              total={21}
              used={15}
              checkerSvgRef={el => {
                this.elRightDashChecker = el;
              }}
            />
            <button onClick={this.handleClick}>Test</button>
          </Section>
        </div>
      </div>
    );
  }
}

Game.propTypes = selectorPropTypes;

export default Game;
