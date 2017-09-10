import { fromJS, List } from 'immutable';
import times from 'lodash/times'; 
import { 
  createActions, 
  handleActions, 
} from 'redux-actions';

export const actions = createActions({
  INITIALIZE_BOARD: (rows, cols) => ({ rows, cols }),
  // VALID_INDEXES: undefined,
  INSERT_CHECKER: undefined,
  CHECK_WINNER: undefined,
  TOGGLE_PLAYER: undefined,
});

const defaultState = fromJS({
  grid: [],
  cols: 0,
  rows: 0,
  currentPlayerIndex: 0,
  players: [
    {
      name: 'A',
      availableCheckers: 0,
    }, 
    {
      name: 'A',
      availableCheckers: 0,
    }
  ],
});

export const reducer = handleActions({
  
  [actions.initializeBoard]: (state, { payload: { rows, cols }}) => (
    state
      .set('grid', List(times(rows * cols, () => null)))
      .set('cols', cols)
      .set('rows', rows)
      .setIn(['players', 0, 'availableCheckers'], rows * cols / 2)
      .setIn(['players', 1, 'availableCheckers'], rows * cols / 2)
  ),

  [actions.togglePlayer]: state => {
    const current = state.get('currentPlayerIndex');
    return state.set('currentPlayerIndex', 1 - current);
  }

}, defaultState);
