import React, { Component } from 'react';

import Board from './Board';

class Game extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col col-middle">
            <h1 className="text-center">Welcome! To start a new game, click <span className="play-link">play</span></h1>
            <Board rows={6} cols={7} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
