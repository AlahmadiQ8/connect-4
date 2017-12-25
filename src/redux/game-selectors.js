import { createSelector } from 'reselect';

export const gridSelector = state => state.getIn(['game', 'grid']);
export const colsSelector = state => state.getIn(['game', 'cols']);
export const rowsSelector = state => state.getIn(['game', 'rows']);
export const playersSelector = state => state.getIn(['game', 'players']);
export const winnerSelector = state => state.getIn(['game', 'winner']);
export const currentPlayerIndexSelector = state =>
  state.getIn(['game', 'currentPlayerIndex']);
export const checkersAvailSelector = (state, props) =>
  state.getIn(['game', 'players', props, 'availableCheckers']);

export const isInitializedSelector = createSelector(
  gridSelector,
  grid => grid.size !== 0
);

export const totalSelector = createSelector(
  [rowsSelector, colsSelector],
  (rows, cols) => rows * cols / 2
);

export const colIndexSelector = createSelector(
  colsSelector,
  (_, props) => props.index,
  (cols, index) => index % cols
);
