import { combineReducers } from 'redux';
import portfolioReducer from './portfolioReducer';
import stockReducer from './stockReducer';

export default combineReducers({
  portfolios: portfolioReducer,
  stocks: stockReducer
});
