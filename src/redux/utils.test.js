import { List } from 'immutable';
import range from 'lodash/range';
import times from 'lodash/times';

import {
  getRowIndexes,
  getColIndexes,
  getValidIndexes,
  checkHorizontalWin,
  checkVerticalWin,
  checkDiagonalWinLeftToRight,
  checkDiagonalWinRightToLeft,
  printGrid,
} from './utils';

const gridEmpty = List(times(42, () => null));
const gridPartiallyFilled = gridEmpty
  .set(36, 'test')
  .set(37, 'test')
  .set(38, 'test')
  .set(39, 'test')
  .set(40, 'test')
  .set(41, 'test')
  .set(30, 'test')
  .set(31, 'test')
  .set(32, 'test')
  .set(24, 'test');
const gridFull = List(times(42, () => 'test'));

test('getRowIndexes returns a list of indexes for the correct row', () => {
  expect(getRowIndexes(6, 7, 5)).toEqual(range(35, 42));
  expect(getRowIndexes(6, 7, 4)).toEqual(range(28, 35));
  expect(getRowIndexes(6, 7, 3)).toEqual(range(21, 28));
  expect(getRowIndexes(6, 7, 2)).toEqual(range(14, 21));
  expect(getRowIndexes(6, 7, 1)).toEqual(range(7, 14));
  expect(getRowIndexes(6, 7, 0)).toEqual(range(0, 7));
});

test('getRowIndexes throws error given out of range index', () => {
  const getRowIndexesError = getRowIndexes.bind(null, 6, 7, 6);
  expect(getRowIndexesError).toThrow();
});

test('getColIndexes returns a list of indexes for the correct row', () => {
  expect(getColIndexes(6, 7, 0)).toEqual(range(0, 36, 7));
  expect(getColIndexes(6, 7, 1)).toEqual(range(1, 37, 7));
  expect(getColIndexes(6, 7, 2)).toEqual(range(2, 38, 7));
  expect(getColIndexes(6, 7, 3)).toEqual(range(3, 39, 7));
  expect(getColIndexes(6, 7, 4)).toEqual(range(4, 40, 7));
  expect(getColIndexes(6, 7, 5)).toEqual(range(5, 41, 7));
  expect(getColIndexes(6, 7, 6)).toEqual(range(6, 42, 7));
});

test('getColIndexes throws error given out of range index', () => {
  const getColIndexesError = getColIndexes.bind(null, 6, 7, 7);
  expect(getColIndexesError).toThrow();
});

test('getValidIndexes returns valid indexes to insert checker', () => {
  let validIndexes = getValidIndexes(gridEmpty, 6, 7);
  expect(validIndexes).toEqual(range(35, 42));
  validIndexes = getValidIndexes(gridPartiallyFilled, 6, 7);
  expect(validIndexes).toEqual([35, 29, 23, 17, 25, 33, 34]);
  validIndexes = getValidIndexes(gridFull, 6, 7);
  expect(validIndexes).toEqual([]);
});

test('checkHorizontalWin returns false given a grid of nulls', () => {
  const gridEmpty = List(times(42, () => null));
  expect(checkHorizontalWin(gridEmpty, 6, 7, 0)).toBe(false);
  expect(checkHorizontalWin(gridEmpty, 6, 7, 1)).toBe(false);
});

test('checkHorizontalWin returns true when there is a horizontal win for player index', () => {
  let grid = List(times(42, i => i))
    .set(37, 0)
    .set(38, 0)
    .set(39, 0)
    .set(40, 0);
  expect(checkHorizontalWin(grid, 6, 7, 0)).toBe(true);
  expect(checkHorizontalWin(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => i))
    .set(21, 1)
    .set(22, 1)
    .set(23, 1)
    .set(24, 1);
  expect(checkHorizontalWin(grid, 6, 7, 0)).toBe(false);
  expect(checkHorizontalWin(grid, 6, 7, 1)).toBe(true);
});

test('checkVerticalWin returns false given a grid of nulls', () => {
  const gridEmpty = List(times(42, () => null));
  expect(checkVerticalWin(gridEmpty, 6, 7, 0)).toBe(false);
  expect(checkVerticalWin(gridEmpty, 6, 7, 1)).toBe(false);
});

test('checkVerticalWin returns true when there is a Vertical win for player index', () => {
  let grid = List(times(42, () => null))
    .set(14, 0)
    .set(21, 0)
    .set(28, 0)
    .set(35, 0);
  expect(checkVerticalWin(grid, 6, 7, 0)).toBe(true);
  expect(checkVerticalWin(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => null))
    .set(6, 1)
    .set(13, 1)
    .set(20, 1)
    .set(27, 1);
  expect(checkVerticalWin(grid, 6, 7, 0)).toBe(false);
  expect(checkVerticalWin(grid, 6, 7, 1)).toBe(true);
  grid = List(times(42, i => null))
    .set(11, 1)
    .set(18, 1)
    .set(25, 1)
    .set(32, 1);
  expect(checkVerticalWin(grid, 6, 7, 0)).toBe(false);
  expect(checkVerticalWin(grid, 6, 7, 1)).toBe(true);
});

test('checkDiagonalWinLeftToRight returns false given a grid of nulls', () => {
  const gridEmpty = List(times(42, () => null));
  expect(checkDiagonalWinLeftToRight(gridEmpty, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(gridEmpty, 6, 7, 1)).toBe(false);
});

test('checkDiagonalWinLeftToRight return true when there is a diagonal win from top left to bottom right', () => {
  let grid = List(times(42, i => null))
    .set(0, 0)
    .set(8, 0)
    .set(16, 0)
    .set(24, 0);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(true);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => i))
    .set(16, 1)
    .set(24, 1)
    .set(32, 1)
    .set(40, 1);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(true);
  grid = List(times(42, i => null))
    .set(3, 0)
    .set(11, 0)
    .set(19, 0)
    .set(27, 0);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(true);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => i))
    .set(7, 1)
    .set(15, 1)
    .set(23, 1)
    .set(31, 1);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(true);
  grid = List(times(42, i => i))
    .set(14, 1)
    .set(22, 1)
    .set(30, 1)
    .set(38, 1);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(true);
});

test('checkDiagonalWinLeftToRight returns false given a grid with only three diagonal matches', () => {
  let grid = List(times(42, i => null))
    .set(0, 0)
    .set(8, 0)
    .set(16, 0);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => null))
    .set(21, 0)
    .set(29, 0)
    .set(37, 0);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinLeftToRight(grid, 6, 7, 1)).toBe(false);
});

test('checkDiagonalWinRightToLeft return true when there is a diagonal win from top right to bottom left', () => {
  let grid = List(times(42, i => null))
    .set(6, 0)
    .set(12, 0)
    .set(18, 0)
    .set(24, 0);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(true);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => i))
    .set(18, 1)
    .set(24, 1)
    .set(30, 1)
    .set(36, 1);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(true);
  grid = List(times(42, i => null))
    .set(3, 0)
    .set(9, 0)
    .set(15, 0)
    .set(21, 0);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(true);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => i))
    .set(13, 1)
    .set(19, 1)
    .set(25, 1)
    .set(31, 1);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(true);
  grid = List(times(42, i => i))
    .set(20, 1)
    .set(26, 1)
    .set(32, 1)
    .set(38, 1);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(true);
});

test('checkDiagonalWinRightToLeft returns false given a grid with only three diagonal matches', () => {
  let grid = List(times(42, i => null))
    .set(6, 0)
    .set(12, 0)
    .set(18, 0);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(false);
  grid = List(times(42, i => null))
    .set(27, 0)
    .set(33, 0)
    .set(39, 0);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 0)).toBe(false);
  expect(checkDiagonalWinRightToLeft(grid, 6, 7, 1)).toBe(false);
});
