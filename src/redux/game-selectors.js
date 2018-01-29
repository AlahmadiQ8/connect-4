import { createSelector } from 'reselect';

const gameSelector = state => state.get('game');

export const gridSelector = createSelector(
  gameSelector,
  game => game.get('grid')
);

export const colsSelector = createSelector(
  gameSelector,
  game => game.get('cols')
);

export const rowsSelector = createSelector(
  gameSelector,
  game => game.get('rows')
);

export const playersSelector = createSelector(
  gameSelector,
  game => game.get('players')
);

export const winnerSelector = createSelector(
  gameSelector,
  game => game.get('winner')
);

export const winningIndexesSelector = createSelector(
  gameSelector,
  game => game.get('winningIndexes')
);

export const currentPlayerIndexSelector = createSelector(
  gameSelector,
  game => game.get('currentPlayerIndex')
);

export const makeCheckersAvailSelector = () => createSelector(
  gameSelector,
  (_, props) => props.playerId,
  (game, playerId) => game.getIn(['players', playerId, 'availableCheckers'])
);

export const isInitializedSelector = createSelector(
  gridSelector,
  grid => grid.size !== 0
);

export const totalSelector = createSelector(
  [rowsSelector, colsSelector],
  (rows, cols) => rows * cols / 2
);

export const makeColIndexSelector = () =>
  createSelector(
    colsSelector,
    (_, props) => props.index,
    (cols, index) => index % cols
  );

export const makeIsWinningIndexSelector = () =>
  createSelector(
    winningIndexesSelector,
    (_, props) => props.index,
    (winningIndexes, index) => winningIndexes.includes(index)
  );

export const isGameCompleteSelector = createSelector(
  winnerSelector,
  winner => typeof winner === 'number'
);
