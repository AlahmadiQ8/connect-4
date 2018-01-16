import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import { reducer as gameReducer } from './game';
import { reducer as uiReducer } from './ui';

const rootReducer = combineReducers({
  ui: uiReducer,
  game: gameReducer,
});

let store;

/* istanbul ignore next */
if (process.env.NODE_ENV === 'development') {
  store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(rootReducer);
}

export default store;
