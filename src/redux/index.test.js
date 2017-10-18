import { fromJS, List } from 'immutable';
import times from 'lodash/times';
import range from 'lodash/range';

import { reducer, actions } from './index';
import { printGrid } from './utils';

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

test('initializeBoard reducer should return initial state if no action is given', () => {
  const result = reducer(initialState, { type: '' });
  expect(result).toEqual(initialState);
})

test('initializeBoard reducer should initialize board with grid given cols and arrows', () => {
  const action = actions.initializeBoard(6, 7);
  const result = reducer(initialState, action);
  expect(result.get('grid').equals(List(times(42, () => null)))).toBe(true);
  expect(result.get('rows')).toBe(6);
  expect(result.get('cols')).toBe(7);
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(21);
  expect(result.getIn(['players', 1, 'availableCheckers'])).toBe(21);
});

test('togglePlayer reducer should toggle player', () => {
  const action = actions.togglePlayer();
  let result = reducer(initialState, action);
  expect(result.get('currentPlayerIndex')).toBe(1);
  result = reducer(result, action);
  expect(result.get('currentPlayerIndex')).toBe(0);
  result = reducer(result, action);
  expect(result.get('currentPlayerIndex')).toBe(1);
});

test('insertChecker reducer should insert checker with column has empty slots', () => {
  let result = reducer(initialState, actions.initializeBoard(6, 7));
  result = reducer(result, actions.insertChecker(0, 0));
  result = reducer(result, actions.insertChecker(0, 1));
  result = reducer(result, actions.insertChecker(0, 1));
  result = reducer(result, actions.insertChecker(0, 2));
  result = reducer(result, actions.insertChecker(0, 3));
  result = reducer(result, actions.insertChecker(0, 3));
  result = reducer(result, actions.insertChecker(0, 3));
  result = reducer(result, actions.insertChecker(0, 4));
  result = reducer(result, actions.insertChecker(0, 5));
  result = reducer(result, actions.insertChecker(0, 6));
  result = reducer(result, actions.insertChecker(0, 6));
  let expextedGrid = List(times(34, () => null)).concat(
    List(times(8, () => 0))
  );
  expextedGrid = expextedGrid.set(31, 0);
  expextedGrid = expextedGrid.set(24, 0);
  expextedGrid = expextedGrid.set(29, 0);
  // for debuging only
  // printGrid(result.get('grid'), result.get('rows'), result.get('cols'));
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(10);
  expect(result.get('grid').equals(expextedGrid)).toBe(true);
});

test('insertChecker reducer should not alter state if insertChecker is applied on full column', () => {
  let result = reducer(initialState, actions.initializeBoard(6, 7));
  times(100).forEach(i => {
    result = reducer(result, actions.insertChecker(0, 0))
  });
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(15);
  let expextedGrid = List(times(42, () => null));
  range(0, 36, 7).forEach(i => {
    expextedGrid = expextedGrid.set(i, 0);
  })
  // for debuging only
  // printGrid(result.get('grid'), result.get('rows'), result.get('cols'));
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(15);
  expect(result.get('grid').equals(expextedGrid)).toBe(true);
});
