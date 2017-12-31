import u from 'updeep';
import moment from 'moment';
import {
  ADD_STOCK,
  TOGGLE_SELECT_STOCK,
  DELETE_STOCK,
  DELETE_ALL_PORTFOLIO_STOCK,
  UPDATE_STOCK_VALUE
} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case ADD_STOCK:
      let stock = action.stock;
      let stocks = state[stock.pId] || {};
      if(stocks.hasOwnProperty(stock.symbol)){
        let quantity = state[stock.pId][stock.symbol].quantity;
        quantity += stock.quantity;
        return u({[stock.pId]:{[stock.symbol]: {quantity}}}, state);
      }
      const _stock = {
        ...stock,
        id: stock.symbol,
        cur: 'usd',
        created: moment.now(),
        selected: false
      };
      return u({[_stock.pId]:{[_stock.id]: _stock}}, state);
    case TOGGLE_SELECT_STOCK:
      let selectState = state[action.pId][action.sId].selected;
      return u({[action.pId]: {[action.sId]:{selected: !selectState}}}, state);
    case UPDATE_STOCK_VALUE:
      let stockToUpdate = state[action.pId][action.sId];
      if(!stockToUpdate){
        return state;
      }
      return u(
        {[action.pId]: {[action.sId]:{
          unitValue: action.unitValue
        }}}, state);
    case DELETE_STOCK:
      return u({[action.pId]: u.omit([action.sId])}, state);
    case DELETE_ALL_PORTFOLIO_STOCK:
      let _state = {...state};
      delete _state[action.pId];
      return _state;
    default:
      return state;
  }
}
