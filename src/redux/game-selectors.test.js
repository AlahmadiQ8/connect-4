import { fromJS } from 'immutable';
import selectors, { isInitializedSelector } from './game-selectors';

const gameState = fromJS({ game: {} });

test('isInitializedSelector returns true when grid size != 0', () => {
  let state = gameState.set('game', fromJS({ grid: [null, null] }));
  let result = isInitializedSelector(state);
  expect(result).toBeTruthy;
  state = gameState.set('game', fromJS({ grid: [undefined, undefined] }));
  result = isInitializedSelector(state);
  expect(result).toBe(true);
});
test('isInitializedSelector returns false when grid size = 0', () => {
  const state = gameState.set('game', fromJS({ grid: [] }));
  const result = isInitializedSelector(state);
  expect(result).toBe(false);
});

test('selectors returns the grid, row, and col', () => {
  const state = gameState.set(
    'game',
    fromJS({
      grid: ['test'],
      cols: 6,
      rows: 7,
    })
  );
  const [grid, rows, cols] = [
    selectors(state).grid.toJS(),
    selectors(state).rows,
    selectors(state).cols,
  ];
  expect(grid).toEqual(['test']);
  expect(rows).toEqual(7);
  expect(cols).toEqual(6);
});
