import range from 'lodash/range';

export const getRowIndexes = (rows, cols, rowIndex) => {
  if (rowIndex >= rows || rowIndex < 0) {
    throw new Error("rowIndex out of range");
  }
  return range(cols*rowIndex, cols*rowIndex+7)
}

export const getColIndexes = (rows, cols, colIndex) => {
  if (colIndex >= cols || colIndex < 0) {
    throw new Error("rowIndex out of range");
  }
  return range(colIndex, cols * (rows - 1) + colIndex + 1, cols);
}

export const getValidIndexInCol = (grid, rows, cols, colIndex) => {
  let indexes = getColIndexes(rows, cols, colIndex);
  for (let i=indexes.length; i>=0; i--) {
    if (grid.get(indexes[i]) === null) {
      return indexes[i];
    }
  }
  return -1;
}

export const getValidIndexes = (grid, rows, cols) => (
  range(0, cols).reduce((acc, cur) => {
    const index = getValidIndexInCol(grid, rows, cols, cur);
    return index >= 0 ? [...acc, index] : acc;
  }, [])
);