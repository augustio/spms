import { combineReducers } from 'redux';
import portfolioReducer from './portfolioReducer';

export default combineReducers({
  portfolios: portfolioReducer
});
