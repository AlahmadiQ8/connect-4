import { createStore } from 'redux';
import { fromJS, List } from 'immutable';
import times from 'lodash/times';
import { compose, ifElse } from 'ramda';
import { createActions, handleActions } from 'redux-actions';
import {
  getValidIndexInCol,
  checkHorizontalWin,
  checkVerticalWin,
  checkDiagonalWinLeftToRight,
  checkDiagonalWinRightToLeft,
} from './utils';

export const actions = createActions({
  INITIALIZE_BOARD: (rows, cols) => ({ rows, cols }),
  // VALID_INDEXES: undefined,
  INSERT_CHECKER: (playerIndex, colIndex) => ({ playerIndex, colIndex }),
  CHECK_WINNER: undefined,
  TOGGLE_PLAYER: undefined,
});

const defaultState = fromJS({
  grid: [],
  cols: 0,
  rows: 0,
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
});

export const reducer = handleActions(
  {
    [actions.initializeBoard]: (state, { payload: { rows, cols } }) =>
      state
        .set('grid', List(times(rows * cols, () => null)))
        .set('cols', cols)
        .set('rows', rows)
        .setIn(['players', 0, 'availableCheckers'], rows * cols / 2)
        .setIn(['players', 1, 'availableCheckers'], rows * cols / 2),

    [actions.togglePlayer]: state => {
      const current = state.get('currentPlayerIndex');
      return state.set('currentPlayerIndex', 1 - current);
    },

    [actions.insertChecker]: (
      state,
      { payload: { playerIndex, colIndex } }
    ) => {
      const curPlayerIndex = state.get('currentPlayerIndex');
      return compose(
        ifElse(
          i => i < 0,
          () => state,
          index =>
            state
              .setIn(['grid', index], curPlayerIndex)
              .updateIn(
                ['players', curPlayerIndex, 'availableCheckers'],
                val => val - 1
              )
        ),
        getValidIndexInCol(
          state.get('grid'),
          state.get('rows'),
          state.get('cols')
        )
      )(colIndex);
    },

    [actions.checkWinner]: state => {
      const args = [
        state.get('grid'),
        state.get('rows'),
        state.get('cols'),
        state.get('currentPlayerIndex'),
      ];
      if (
        checkHorizontalWin(...args) ||
        checkVerticalWin(...args) ||
        checkDiagonalWinLeftToRight(...args) ||
        checkDiagonalWinRightToLeft(...args)
      ) {
        return state.set('winner', state.get('currentPlayerIndex'));
      }
      return state;
    },
  },
  defaultState
);

let store;

if (process.env.NODE_ENV === 'development') {
  /* istanbul ignore next */
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(reducer);
}

export default store;
