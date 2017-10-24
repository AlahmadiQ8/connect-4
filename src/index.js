import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store, { actions } from './redux';

import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

import Game from './components/Game';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Game />
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();
