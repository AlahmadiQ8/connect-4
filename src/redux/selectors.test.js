import { fromJS } from 'immutable';
import { isInitialized } from './selectors';

test('isInitialized selector returns true when row or columns != zero', () => {
  let state = fromJS({
    grid: [null, null],
  });
  let result = isInitialized(state);
  expect(result).toBeTruthy;
  state = fromJS({
    grid: [undefined, undefined],
  });
  result = isInitialized(state);
  expect(result).toBe(true);
});
test('isInitialized selector returns false when row and columns = zero', () => {
  const state = fromJS({
    grid: [],
  });
  const result = isInitialized(state);
  expect(result).toBe(false);
});
