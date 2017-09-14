import { fromJS, List } from 'immutable';
import times from 'lodash/times';

import { reducer, actions } from './index';

const initialState = fromJS({
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
    },
  ],
});

test('reducer should initialize board with grid given cols and arrows', () => {
  const action = actions.initializeBoard(6, 7);
  const result = reducer(initialState, action);
  expect(result.get('grid').equals(List(times(42, () => null)))).toBe(true);
  expect(result.get('rows')).toBe(6);
  expect(result.get('cols')).toBe(7);
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(21);
  expect(result.getIn(['players', 1, 'availableCheckers'])).toBe(21);
});

test('reducer should toggle player', () => {
  const action = actions.togglePlayer();
  let result = reducer(initialState, action);
  expect(result.get('currentPlayerIndex')).toBe(1);
  result = reducer(result, action);
  expect(result.get('currentPlayerIndex')).toBe(0);
  result = reducer(result, action);
  expect(result.get('currentPlayerIndex')).toBe(1);
});
