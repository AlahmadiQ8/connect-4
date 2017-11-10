import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

export const gridSelector = state => state.getIn(['game', 'grid']);
export const colsSelector = state => state.getIn(['game', 'cols']);
export const rowsSelector = state => state.getIn(['game', 'rows']);
export const playersSelector = state => state.getIn(['game', 'players']);
const currentPlayerIndexSelector = state =>
  state.getIn(['game', 'currentPlayerIndex']);

export const isInitializedSelector = createSelector(
  gridSelector,
  grid => grid.size !== 0
);

export const selectorPropTypes = {
  isInitialized: PropTypes.bool.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  currentPlayerIndex: PropTypes.number,
};

export const totalSelector = createSelector(
  [rowsSelector, colsSelector],
  (rows, cols) => rows * cols / 2
);

export const CheckersAvailSelector = (state, props) => (
  state.getIn(['game', 'players', props, 'availableCheckers'])
);

export default createStructuredSelector({
  isInitialized: isInitializedSelector,
  grid: gridSelector,
  cols: colsSelector,
  rows: rowsSelector,
  players: playersSelector,
  currentPlayerIndex: currentPlayerIndexSelector,
});
