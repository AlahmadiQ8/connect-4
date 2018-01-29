import { fromJS, List } from 'immutable';
import times from 'lodash/times';
import { createActions, handleActions } from 'redux-actions';

import {
  getValidIndexInCol,
  checkHorizontalWin,
  checkVerticalWin,
  checkDiagonalWinLeftToRight,
  checkDiagonalWinRightToLeft,
} from './utils';

export const { game: actions } = createActions({
  game: {
    INITIALIZE_BOARD: (rows, cols) => ({ rows, cols }),
    // VALID_INDEXES: undefined,
    INSERT_CHECKER: colIndex => ({ colIndex }),
    CHECK_WINNER: undefined,
    TOGGLE_PLAYER: undefined,
  },
});

const checkWinner = state => {
  const args = [
    state.get('grid'),
    state.get('rows'),
    state.get('cols'),
    state.get('currentPlayerIndex'),
  ];
  const winningIndexes =
    checkHorizontalWin(...args) ||
    checkVerticalWin(...args) ||
    checkDiagonalWinLeftToRight(...args) ||
    checkDiagonalWinRightToLeft(...args);
  if (winningIndexes) {
    return state
      .set('winner', state.get('currentPlayerIndex'))
      .set('winningIndexes', fromJS(winningIndexes));
  }
  return state;
};

const defaultState = fromJS({
  grid: [],
  cols: 7,
  rows: 6,
  currentPlayerIndex: 0,
  winner: null,
  winningIndexes: [],
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
});

export const reducer = handleActions(
  {
    [actions.initializeBoard]: (state, { payload: { rows, cols } }) =>
      state
        .set('grid', List(times(rows * cols, () => null)))
        .set('cols', cols)
        .set('rows', rows)
        .set('winner', null)
        .set('currentPlayerIndex', 0)
        .set('winningIndexes', [])
        .setIn(['players', 0, 'availableCheckers'], rows * cols / 2)
        .setIn(['players', 1, 'availableCheckers'], rows * cols / 2),

    [actions.togglePlayer]: state =>
      state.update('currentPlayerIndex', val => 1 - val),
    [actions.insertChecker]: (state, { payload: { colIndex } }) => {
      const curPlayerIndex = state.get('currentPlayerIndex');
      const index = getValidIndexInCol(
        state.get('grid'),
        state.get('rows'),
        state.get('cols'),
        colIndex
      );
      if (index < 0) {
        return state;
      }
      const newState = state
        .setIn(['grid', index], curPlayerIndex)
        .updateIn(
          ['players', curPlayerIndex, 'availableCheckers'],
          val => val - 1
        );

      return checkWinner(newState).update('currentPlayerIndex', val => 1 - val);
    },

    [actions.checkWinner]: checkWinner,
  },
  defaultState
);
