import { fromJS, Map, List } from 'immutable';
import { createActions, handleActions } from 'redux-actions';
import times from 'lodash/times';

export const { ui: actions } = createActions({
  ui: {
    SET_DASH_CHECKER_RECT: (rect, side) => ({ rect, side }),
    INITIALIZE_UI_GRID: (rows, cols) => ({ rows, cols }),
  },
});

const defaultState = fromJS({
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
        return state.set(
          'leftDashChecker',
          Map({
            top: rect.top,
            right: rect.right,
            bottom: rect.bottom,
            left: rect.left,
            width: rect.width,
            height: rect.height,
            x: rect.x,
            y: rect.y,
          })
        );
      }
      return state.set(
        'rightDashChecker',
        Map({
          top: rect.top,
          right: rect.right,
          bottom: rect.bottom,
          left: rect.left,
          width: rect.width,
          height: rect.height,
          x: rect.x,
          y: rect.y,
        })
      );
    },
    [actions.initializeUiGrid]: (state, { payload: { rows, cols } }) => {
      return state.set('grid', List(times(rows * cols, () => null)));
    },
  },
  defaultState
);
