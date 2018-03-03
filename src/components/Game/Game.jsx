import React from 'react';
import PropTypes from 'prop-types';
import { TransitionMotion, spring } from 'react-motion';

import Board from '../Board';
import PlayerDash from '../PlayerDash';
import CloudTextBox from '../CloudTextBox';

const Game = ({
  rows,
  cols,
  isInitialized,
  actions,
  currentPlayerIndex,
  winner,
  isGameComplete,
}) => {
  const initialTextTransitionStyles = !isInitialized
    ? [{ key: '0', style: { opacity: 1 } }]
    : [];

  const init = () => {
    actions.initializeBoard(rows, cols);
    actions.initializeUi(rows, cols);
  };
  const shouldShowCloud = index =>
    currentPlayerIndex === index && winner === null;

  return (
    <div>
      <div className={isGameComplete ? 'pyro' : ''}>
        <div className="before" />
        <div className="after" />
      </div>
      <div className="container">
        <div className="row justify-content-center">
          <section className="Game-BoardSection col d-flex flex-column align-items-center justify-content-end order-2">
            {isGameComplete && (
              <h1 className="Game-h1">
                Congrats! Click{' '}
                <span role="button" className="Game-Button" onClick={init}>
                  Restart
                </span>{' '}
                to play again
              </h1>
            )}

            <div>
              <a href="https://github.com/AlahmadiQ8/connect-4">
                Project Github Link
              </a>
            </div>
            <TransitionMotion
              willLeave={() => ({ opacity: spring(0) })}
              styles={initialTextTransitionStyles}
            >
              {configs => (
                <div>
                  {configs.map(config => (
                    <h1
                      className="Game-h1"
                      key={config.key}
                      style={config.style}
                    >
                      Welcome! To start a new game, click{' '}
                      <span
                        role="button"
                        className="Game-Button"
                        onClick={init}
                      >
                        play
                      </span>
                    </h1>
                  ))}
                </div>
              )}
            </TransitionMotion>
            <Board rows={rows} cols={cols} />
          </section>
          {isInitialized &&
            !isGameComplete && (
              <section className="Game-section col d-flex flex-column align-items-center justify-content-end order-1">
                {shouldShowCloud(0) && <CloudTextBox />}
                <PlayerDash color="yellow" playerId={0} used={15} />
              </section>
            )}
          {isInitialized &&
            !isGameComplete && (
              <section className="col d-flex flex-column align-items-center justify-content-end order-3">
                {shouldShowCloud(1) && <CloudTextBox />}
                <PlayerDash color="red" playerId={1} used={15} />
              </section>
            )}
        </div>
      </div>
    </div>
  );
};

Game.propTypes = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  actions: PropTypes.shape({
    initializeBoard: PropTypes.func.isRequired,
  }).isRequired,
  currentPlayerIndex: PropTypes.number,
  winner: PropTypes.number,
  isGameComplete: PropTypes.bool.isRequired,
};

Game.defaultProps = {
  currentPlayerIndex: 0,
  winner: null,
};

export default Game;
