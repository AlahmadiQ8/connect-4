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
  result = reducer(result, actions.insertChecker(0, 2));
  result = reducer(result, actions.insertChecker(0, 3));
  result = reducer(result, actions.insertChecker(0, 4));
  result = reducer(result, actions.insertChecker(0, 5));
  result = reducer(result, actions.insertChecker(0, 5));
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(14);
  const expextedGrid = List(times(35, () => null)).concat(List(times(7, () => 0)));
  expect(result.get('grid').equals(expextedGrid)).toBe(true);
});

test('insertChecker reducer should not alter state if insertChecker is applied on full column', () => {
  let result = reducer(initialState, actions.initializeBoard(6, 7));
  times(100).reduce(
    result => reducer(result, actions.insertChecker(0, 0)),
    reducer(initialState, actions.initializeBoard(6, 7))
  );
  expect(result.getIn(['players', 0, 'availableCheckers'])).toBe(15);
  const expextedGrid = List(times(36, () => null)).concat(List(times(6, () => 0)));
  expect(result.get('grid').equals(expextedGrid)).toBe(true);
});

test('insertChecker reducer should not alter state if player twice in a row', () => {
  fail();
});
