import { fromJS } from 'immutable';
import { _isInitialized } from './selectors';

test('isInitialized selector returns true when row or columns != zero', () => {
  let state = fromJS({
    cols: 1,
    rows: 0,
  });
  let result = _isInitialized(state);
  expect(result).toBeTruthy;
  state = fromJS({
    cols: 0,
    rows: 1,
  });
  result = _isInitialized(state);
  expect(result).toBeTruthy;
});
test('isInitialized selector returns false when row and columns = zero', () => {
  const state = fromJS({
    cols: 0,
    rows: 0,
  });
  const result = _isInitialized(state);
  expect(result).toBeFalsy;
});
