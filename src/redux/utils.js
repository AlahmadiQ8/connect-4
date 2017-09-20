import range from 'lodash/range';
import { curry } from 'ramda';
import leftPad from 'left-pad';

export const getRowIndexes = (rows, cols, rowIndex) => {
  if (rowIndex >= rows || rowIndex < 0) {
    throw new Error('rowIndex out of range');
  }
  return range(cols * rowIndex, cols * rowIndex + 7);
};

export const getColIndexes = (rows, cols, colIndex) => {
  if (colIndex >= cols || colIndex < 0) {
    throw new Error('colIndex out of range');
  }
  return range(colIndex, cols * (rows - 1) + colIndex + 1, cols);
};

export const getValidIndexInCol = curry((grid, rows, cols, colIndex) => {
  let indexes = getColIndexes(rows, cols, colIndex);
  for (let i = indexes.length; i >= 0; i--) {
    if (grid.get(indexes[i]) === null) {
      return indexes[i];
    }
  }
  return -1;
});

export const getValidIndexes = (grid, rows, cols) =>
  range(0, cols).reduce((acc, cur) => {
    const index = getValidIndexInCol(grid, rows, cols, cur);
    return index >= 0 ? [...acc, index] : acc;
  }, []);

export const printGrid = (grid, rows, cols) => {
  const str = range(0, rows).map((currentRow) => (
    range(0, cols)
      .map(i => (leftPad(`${grid.get(currentRow*cols+i)}`, 4)))
      .join('  ')
  )).join('\n');
  console.log(str);
};
