import uuid4 from 'uuid/v4';
import u from 'updeep';
import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO
} from '../actions/types';

export default function(state = {}, action){
  switch(action.type){
    case ADD_PORTFOLIO:
      let id = uuid4();
      return {
        ...state,
        [id]: {name: action.name, id, created: Date.now()}
      }
    case DELETE_PORTFOLIO:
      return u(u.omit([action.id]), state);
    default:
      return state;
  }
}
