// import { createSelector, createStructuredSelector } from 'reselect';

export const leftDashCheckerSelector = state =>
  state.getIn(['ui', 'leftDashChecker']);

export const rightDashCheckerSelector = state =>
  state.getIn(['ui', 'rightDashChecker']);
