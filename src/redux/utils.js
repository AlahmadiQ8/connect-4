import range from 'lodash/range';
import { curry } from 'ramda';
import leftPad from 'left-pad';
import Immutable from 'immutable';

export const getRowIndexes = (rows, cols, rowIndex) => {
  if (rowIndex >= rows || rowIndex < 0) {
    throw new Error('rowIndex out of range');
  }
  return range(cols * rowIndex, cols * (rowIndex + 1));
};

export const getColIndexes = (rows, cols, colIndex) => {
  if (colIndex >= cols || colIndex < 0) {
    throw new Error('colIndex out of range');
  }
  return range(colIndex, cols * (rows - 1) + colIndex + 1, cols);
};

export const getValidIndexInCol = curry((grid, rows, cols, colIndex) => {
  const indexes = getColIndexes(rows, cols, colIndex);
  for (let i = indexes.length; i >= 0; i -= 1) {
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
  const str = range(0, rows)
    .map(currentRow =>
      range(0, cols)
        .map(i => leftPad(`${grid.get(currentRow * cols + i)}`, 4))
        .join('  ')
    )
    .join('\n');
  console.log(str);
};

/*
 * Could be optimized by only checking win around the last inserted checker
 * For now, we just loop through the entire board
 */
export const checkHorizontalWin = (grid, rows, cols, playerIndex) => {
  for (let i = 0; i < rows; i += 1) {
    const indexes = getRowIndexes(rows, cols, i);
    if (_scanIndexes(grid, indexes, playerIndex)) return true;
  }
  return false;
};

export const checkVerticalWin = (grid, rows, cols, playerIndex) => {
  for (let i = 0; i < cols; i += 1) {
    const colIndexes = getColIndexes(rows, cols, i);
    if (_scanIndexes(grid, colIndexes, playerIndex)) return true;
  }
  return false;
};

export const checkDiagonalWinLeftToRight = (grid, rows, cols, playerIndex) => {
  for (let i = 1; i < cols - 3; i += 1) {
    const indexes = range(i, (rows - i + 1) * cols, cols + 1);
    if (_scanIndexes(grid, indexes, playerIndex)) return true;
  }

  const colIndexes = getColIndexes(rows, cols, 0).slice(0, rows - 3);
  for (let i = 0; i < colIndexes.length; i += 1) {
    const indexes = range(colIndexes[i], rows * cols - i - 1, cols + 1);
    if (_scanIndexes(grid, indexes, playerIndex)) return true;
  }

  return false;
};

export const checkDiagonalWinRightToLeft = (grid, rows, cols, playerIndex) => {
  for (let i = cols - 2; i >= 3; i -= 1) {
    const indexes = range(i, i * cols + 1, rows);
    if (_scanIndexes(grid, indexes, playerIndex)) return true;
  }

  for (let i = cols - 1; i < cols * (rows - 3); i += cols) {
    const indexes = range(
      i,
      cols * rows - (cols - 2) + Math.floor(i / cols),
      rows
    );
    if (_scanIndexes(grid, indexes, playerIndex)) return true;
  }

  return false;
};

function _scanIndexes(grid, indexes, playerIndex) {
  for (let j = 0; j < indexes.length - 3; j += 1) {
    const test = indexes.slice(j, j + 4);
    if (_testWin(grid, test, playerIndex)) return true;
  }
  return false;
}

function _keyIn(...keys) {
  const keySet = Immutable.Set(keys);
  return function hasKey(v, k) {
    return keySet.has(k);
  };
}

function _testWin(grid, testIndexes, playerIndex) {
  const didWin = grid
    .filter(_keyIn(...testIndexes))
    .every(val => val !== null && val === playerIndex);
  if (didWin) {
    return true;
  }

  return false;
}