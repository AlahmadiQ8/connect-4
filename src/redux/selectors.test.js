import { fromJS } from 'immutable';
import selectors, { isInitialized } from './selectors';

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

test('selectors returns the grid, row, and col', () => {
  const state = fromJS({
    grid: ['test'],
    cols: 6,
    rows: 7,
  });
  const [grid, rows, cols] = [
    selectors(state).grid.toJS(),
    selectors(state).rows,
    selectors(state).cols,
  ];
  expect(grid).toEqual(['test']);
  expect(rows).toEqual(7);
  expect(cols).toEqual(6);
});
