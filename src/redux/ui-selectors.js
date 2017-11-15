// import { createSelector } from 'reselect';

export const leftDashCheckerSelector = state =>
  state.getIn(['ui', 'leftDashChecker']);

export const rightDashCheckerSelector = state =>
  state.getIn(['ui', 'rightDashChecker']);

export const isAnimatingSelector = state =>
  state.getIn(['ui', 'isAnimating']);
