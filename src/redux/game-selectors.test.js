import { fromJS } from 'immutable';
import { isInitializedSelector } from './game-selectors';

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

