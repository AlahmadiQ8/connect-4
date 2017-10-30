import { createStore } from 'redux';

import { reducer as gameReducer } from './game';

/* istanbul ignore next */
const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
      gameReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )
    : createStore(gameReducer);

export default store;
