import { createSelector } from 'reselect';
import { colsSelector } from './game-selectors';

// import { createSelector } from 'reselect';

export const leftDashCheckerSelector = state => ({
  left: state.getIn(['ui', 'leftDashChecker', 'left']),
  top: state.getIn(['ui', 'leftDashChecker', 'top']),
});

export const rightDashCheckerSelector = state => ({
  left: state.getIn(['ui', 'rightDashChecker', 'left']),
  top: state.getIn(['ui', 'rightDashChecker', 'top']),
});

export const isAnimatingSelector = state => state.getIn(['ui', 'isAnimating']);

export const hoveredColumnsSelector = state =>
  state.getIn(['ui', 'hoveredColumns']);
