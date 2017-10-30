import { fromJS, Map } from 'immutable';

import { reducer, actions } from './ui';

const initialState = fromJS({
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
});

const rect = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 40,
  width: 50,
  height: 60,
  x: 70,
  y: 80,
};

test('Reducer should return initial state if no action is given', () => {
  const result = reducer(initialState, { type: '' });
  expect(result).toEqual(initialState);
});

test('setDashCheckerRect reducer should update leftDashChecker', () => {
  const action = actions.setDashCheckerRect(rect, 'left');
  const result = reducer(initialState, action);
  expect(result.get('leftDashChecker').equals(Map(rect))).toBe(true);
  expect(result.get('rightDashChecker').equals(Map(rect))).toBe(false);
});

test('setDashCheckerRect reducer should update rightDashChecker', () => {
  const action = actions.setDashCheckerRect(rect, 'right');
  const result = reducer(initialState, action);
  expect(result.get('leftDashChecker').equals(Map(rect))).toBe(false);
  expect(result.get('rightDashChecker').equals(Map(rect))).toBe(true);
});

test('setDashCheckerRect reducer should throw error if no side given', () => {
  const action = actions.setDashCheckerRect(rect);
  expect(() => reducer(initialState, action)).toThrow();
});
