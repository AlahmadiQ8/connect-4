import { fromJS } from 'immutable';
import store, { rootReducer } from './index';

const expected = fromJS({
  ui: {
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
  },
  game: {
    grid: [],
    cols: 7,
    rows: 6,
    currentPlayerIndex: 0,
    winner: null,
    players: [
      {
        name: 'A',
        availableCheckers: 0,
      },
      {
        name: 'B',
        availableCheckers: 0,
      },
    ],
  },
});

test('store dispatches', () => {
  store.dispatch({ type: 'INITIALIZE_BOARD', payload: { rows: 6, cols: 7 } });
  expect(store.getState().equals(expected)).toBe(true);
});
