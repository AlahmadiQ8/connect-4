import { createSelector } from 'reselect';

const uiSelector = state => state.get('ui');

export const leftDashCheckerSelector = createSelector(uiSelector, ui => ({
  left: ui.getIn(['leftDashChecker', 'left']),
  top: ui.getIn(['leftDashChecker', 'top']),
}));

export const rightDashCheckerSelector = createSelector(uiSelector, ui => ({
  left: ui.getIn(['rightDashChecker', 'left']),
  top: ui.getIn(['rightDashChecker', 'top']),
}));

export const isAnimatingSelector = createSelector(uiSelector, ui =>
  ui.get('isAnimating')
);

export const columnsHoverStatusSelector = createSelector(uiSelector, ui =>
  ui.get('hoveredColumns')
);
