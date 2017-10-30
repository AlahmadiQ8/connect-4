import { createStore } from 'redux';
import { combineReducers } from 'redux-immutable';

import { reducer as gameReducer } from './game';
import { reducer as uiReducer } from './ui';

const rootReducer = combineReducers({
  ui: uiReducer,
  game: gameReducer,
});

/* istanbul ignore next */
const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : createStore(rootReducer);

export default store;
