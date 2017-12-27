import uuid4 from 'uuid/v4';
import u from 'updeep';
import moment from 'moment';
import {
  ADD_STOCK,
  TOGGLE_SELECT_STOCK,
  DELETE_STOCK,
  UPDATE_STOCK_VALUE
} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case ADD_STOCK:
      const _stock = {
        ...action.stock,
        id: uuid4(),
        cur: 'usd',
        created: moment.now(),
        selected: false
      };
      return u({[_stock.pId]:{[_stock.id]: _stock}}, state);
    case TOGGLE_SELECT_STOCK:
      let selectState = state[action.pId][action.sId].selected;
      console.log(selectState);
      return u({[action.pId]: {[action.sId]:{selected: !selectState}}}, state);
    case UPDATE_STOCK_VALUE:
      return u(
        {[action.pId]: {[action.sId]:{
          unitValue: action.unitValue
        }}}, state);
    case DELETE_STOCK:
      return u({[action.pId]: u.omit([action.sId])}, state);
    default:
      return state;
  }
}
