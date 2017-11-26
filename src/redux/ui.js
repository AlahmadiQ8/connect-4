import { fromJS, Map, List } from 'immutable';
import { createActions, handleActions } from 'redux-actions';
import times from 'lodash/times';

import { domRectToObject } from '../utils';

export const { ui: actions } = createActions({
  ui: {
    SET_DASH_CHECKER_RECT: (rect, side) => ({ rect, side }),
    INITIALIZE_UI: (rows, cols) => ({ rows, cols }),
    SAVE_SINGLE_BOX_POSITION: (rect, index) => ({ rect, index }),
    START_ANIMATING: undefined,
    ANIMATING_COMPLETE: undefined,
    SET_CURRENT_HOVERED_COLUMN: (colIndex, val) => ({ colIndex, val }),
    CLEAR_HOVERED_COLUMNS: cols => ({ cols }),
  },
});

const defaultState = fromJS({
  isAnimating: false,
  leftDashChecker: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  },
  rightDashChecker: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  },
  grid: [],
  hoveredColumns: List(),
});

export const reducer = handleActions(
  {
    [actions.setDashCheckerRect]: (state, { payload: { rect, side } }) => {
      if (side !== 'left' && side !== 'right') {
        throw new TypeError(
          `side must be either 'left' or 'right'. Given ${side}`
        );
      }
      if (side === 'left') {
        return state.set('leftDashChecker', Map(domRectToObject(rect)));
      }
      return state.set('rightDashChecker', Map(domRectToObject(rect)));
    },
    [actions.initializeUi]: (state, { payload: { cols } }) => {
      return state.set('hoveredColumns', List(times(cols, () => null)));
      // .set('grid', List(times(rows * cols, () => null)))
    },
    [actions.saveSingleBoxPosition]: (state, { payload: { rect, index } }) => {
      return state.setIn(['grid', index], Map(domRectToObject(rect)));
    },
    [actions.startAnimating]: state => state.set('isAnimating', true),
    [actions.animatingComplete]: state => state.set('isAnimating', false),
    [actions.setCurrentHoveredColumn]: (
      state,
      { payload: { colIndex, val } }
    ) => {
      return state.setIn(['hoveredColumns', colIndex], val);
    },
    [actions.clearHoveredColumns]: (state, { payload: { cols } }) =>
      state.set('hoveredColumns', List(times(cols, () => null))),
  },
  defaultState
);
