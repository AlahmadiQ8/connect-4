import { fromJS, List } from 'immutable';
import { repeat } from 'ramda'; 
import { 
  createActions, 
  handleActions, 
} from 'redux-actions';

export const actions = createActions({
  INITIALIZE_BOARD: (rows, cols) => ({ rows, cols }),
  VALID_INDEXES: undefined,
  INSERT_CHECKER: undefined,
  CHECK_WINNER: undefined,
  TOGGLE_PLAYER: undefined,
});

const defaultState = fromJS({
  grid: [],
  cols: 0,
  rows: 0,
  currentPlayerIndex: 0,
  players: ['A', 'B'],
});

export const reducer = handleActions({
  
  [actions.initializeBoard]: (state, { payload: { rows, cols }}) => (
    state
      .set('grid', List(repeat('', rows * cols)))
      .set('cols', cols)
      .set('rows', rows)
  ),

  [actions.togglePlayer]: state => {
    const current = state.get('currentPlayerIndex');
    return state.set('currentPlayerIndex', 1 - current);
  }

}, defaultState);
