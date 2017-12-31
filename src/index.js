import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import persistState from 'redux-localstorage';
import logger from 'redux-logger';
import reduxThunk from 'redux-thunk';

import App from './components/App';
import reducers from './reducers';

const store = createStore(
  reducers,
  {},
  compose(
    applyMiddleware(reduxThunk, logger),
    persistState()
  )
);

ReactDom.render(
  <Provider store={store}><App /></Provider>, document.querySelector('#root')
);
