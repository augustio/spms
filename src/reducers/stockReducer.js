import uuid4 from 'uuid/v4';
import u from 'updeep';
import _ from 'lodash';
import {
  ADD_STOCK,
  TOGGLE_SELECT_STOCK,
  DELETE_STOCK
} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case ADD_STOCK:
      const dummy = {
        id: uuid4(),
        pId: action.pId,
        symbol: "ABC",
        unit_value: 20,
        currency: "usd",
        quantity: 30,
        created: Date.now(),
        selected: false
      };
      return u({[action.pId]:{[dummy.id]: dummy}}, state);
    case TOGGLE_SELECT_STOCK:
      let selectState = state[action.pId][action.sId].selected;
      console.log(selectState);
      return u({[action.pId]: {[action.sId]:{selected: !selectState}}}, state);
    case DELETE_STOCK:
      return u({[action.pId]: u.omit([action.sId])}, state);
    default:
      return state;
  }
}
