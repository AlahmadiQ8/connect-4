import { List } from 'immutable';
import range from 'lodash/range';
import times from 'lodash/times';

import { getRowIndexes, getColIndexes, getValidIndexes } from './utils';

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
const gridFull = List(times(42, () => "test"));

test('getRowIndexes returns a list of indexes for the correct row', () => {
  expect(getRowIndexes(6, 7, 5)).toEqual(range(35,42));
  expect(getRowIndexes(6, 7, 4)).toEqual(range(28,35));
  expect(getRowIndexes(6, 7, 3)).toEqual(range(21,28));
  expect(getRowIndexes(6, 7, 2)).toEqual(range(14,21));
  expect(getRowIndexes(6, 7, 1)).toEqual(range(7,14));
  expect(getRowIndexes(6, 7, 0)).toEqual(range(0,7));
});

test('getRowIndexes throws error given out of range index', () => {
  const getRowIndexesError = getRowIndexes.bind(null, 6, 7, 6);
  expect(getRowIndexesError).toThrow();
});

test('getColIndexes returns a list of indexes for the correct row', () => {
  expect(getColIndexes(6, 7, 0)).toEqual(range(0, 36, 7));
  expect(getColIndexes(6, 7, 1)).toEqual(range(1,37, 7));
  expect(getColIndexes(6, 7, 2)).toEqual(range(2,38, 7));
  expect(getColIndexes(6, 7, 3)).toEqual(range(3,39, 7));
  expect(getColIndexes(6, 7, 4)).toEqual(range(4,40, 7));
  expect(getColIndexes(6, 7, 5)).toEqual(range(5,41, 7));
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
  expect(validIndexes).toEqual(
    [35, 29, 23, 17, 25, 33, 34]
  );
  validIndexes = getValidIndexes(gridFull, 6, 7);
  expect(validIndexes).toEqual([]);
});