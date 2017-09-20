import React, { Component } from 'react';

import Board from './Board';

class Game extends Component {
  render() {
    return (
      <div className="container">
        <div className="row justify-content-center">
          <div className="col">
            <Board rows={6} cols={7} />
          </div>
        </div>
      </div>
    );
  }
}

export default Game;
