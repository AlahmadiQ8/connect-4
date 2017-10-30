import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

export const isInitializedSelector = state =>
  state.getIn(['game', 'grid']).size !== 0;

const currentPlayerIndexSelector = state =>
  state.getIn(['game', 'currentPlayerIndex']);

export const selectorPropTypes = {
  isInitialized: PropTypes.bool.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  currentPlayerIndex: PropTypes.number,
};

export default createStructuredSelector({
  isInitialized: isInitializedSelector,
  grid: state => state.getIn(['game', 'grid']),
  cols: state => state.getIn(['game', 'cols']),
  rows: state => state.getIn(['game', 'rows']),
  currentPlayerIndex: currentPlayerIndexSelector,
});
