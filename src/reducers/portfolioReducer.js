import uuid4 from 'uuid/v4';
import u from 'updeep';
import moment from 'moment';
import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO,
  SET_CUR_RATE,
  GET_PERF_DATA
} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case ADD_PORTFOLIO:
      let id = uuid4();
      return {
        ...state,
        [id]: {
          name: action.name,
          id,
          created: moment.now(),
          currencyRate: 1,
          currency: 'usd'
        }
      }
    case DELETE_PORTFOLIO:
      return u(u.omit([action.id]), state);
    case SET_CUR_RATE:
      return u(
        {[action.pId]: {currencyRate: action.rate, currency: action.toCurrency}}, state);
    case GET_PERF_DATA:
      return u(
        {[action.pId]: {[action.symbol]: action.data}},
        state
      );
    default:
      return state;
  }
}
