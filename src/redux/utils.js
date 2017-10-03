import range from 'lodash/range';
import { curry } from 'ramda';
import leftPad from 'left-pad';
import Immutable from 'immutable';

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
  for (let i = 0; i < rows * cols; i += cols) {
    for (let j = i; j < i + cols - 4 + 1; j += 1) {
      const test = grid.slice(j, j + 4);
      const didWin = test.every(val => val !== null && val === playerIndex);
      if (didWin) {
        return true;
      }
    }
  }
  return false;
};

export const checkVerticalWin = (grid, rows, cols, playerIndex) => {
  for (let i = 0; i < cols; i += 1) {
    const colIndexes = getColIndexes(rows, cols, i).slice(0, rows - 3);
    for (let j = 0; j < colIndexes.length; j += 1) {
      const test = range(colIndexes[j], colIndexes[j] + cols * 4, cols);
      if (TestWin(grid, test, playerIndex)) return true;
    }
  }
  return false;
};

// NOT COMPLETE
export const checkDiagonalWin = (grid, rows, cols, playerIndex) => {
  for (let i = 0; i < cols - 3; i += 1) {
    const indexes = getSouthEastHorizDirIndexes(rows, cols, i);
    const indexesToCheck = indexes.slice(0, indexes.length - 3);
    for (let j = 0; j < indexesToCheck.length; j += 1) {
      const test = indexes.slice(j, j + 4);
      if (TestWin(test)) return true;
    }
  }

  return false;
};

//   // for (1 .. rows-3) * cols
// };

function keyIn(...keys) {
  var keySet = Immutable.Set(keys);
  return function(v, k) {
    return keySet.has(k);
  };
}

function TestWin(grid, testIndexes, playerIndex) {
  const didWin = grid
    .filter(keyIn(...testIndexes))
    .every(val => val !== null && val === playerIndex);
  if (didWin) {
    return true;
  }
}
