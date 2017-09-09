import { fromJS, List } from 'immutable';
import { repeat } from 'ramda'; 


import { reducer, actions } from './index';

describe('reducer', () => {

  const initialState = fromJS({
    grid: [],
    cols: 0,
    rows: 0,
    currentPlayerIndex: 0,
    players: ['A', 'B'],
  });

  test('should initialize board with grid given cols and arrows', () => {
    const action = actions.initializeBoard(6, 7);
    const result = reducer(initialState, action);
    expect(result.get('grid').equals(List(repeat('', 42))));
    expect(result.get('rows')).toBe(6);
    expect(result.get('cols')).toBe(7);
  });

  test('should toggle player', () => {
    const action = actions.togglePlayer();
    let result = reducer(initialState, action);
    expect(result.get('currentPlayerIndex')).toBe(1);
    result = reducer(result, action);
    expect(result.get('currentPlayerIndex')).toBe(0);
    result = reducer(result, action);
    expect(result.get('currentPlayerIndex')).toBe(1);
  });

})