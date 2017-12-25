import '../node_modules/font-awesome/css/font-awesome.min.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger';

import App from './components/App';
import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(logger),
    persistState()
  )
);

// const store = createStore(
//   reducers,
//   {}
// );

ReactDom.render(
  <Provider store={store}><App /></Provider>, document.querySelector('#root')
);
