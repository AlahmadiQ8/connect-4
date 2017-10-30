import { createSelector, createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

export const isInitialized = state => (
  state.get('grid').size !== 0
);

const currentPlayerIndex = state => state.get('currentPlayerIndex');

export const selectorPropTypes = {
  isInitialized: PropTypes.bool.isRequired,
  cols: PropTypes.number.isRequired,
  rows: PropTypes.number.isRequired,
  currentPlayerIndex: PropTypes.number,
};

export default createStructuredSelector({
  isInitialized,
  grid: state => state.get('grid'),
  cols: state => state.get('cols'),
  rows: state => state.get('rows'),
  currentPlayerIndex,
});
