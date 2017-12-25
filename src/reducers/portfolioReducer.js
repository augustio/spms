import uuid4 from 'uuid/v4';
import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO
} from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case ADD_PORTFOLIO:
      let id = uuid4();
      let next = [
        ...state,
        {id, name: action.payload}
      ]
      return next;
    case DELETE_PORTFOLIO:
      return state.filter(portfolio => portfolio.name !== action.payload);
    default:
      return state;
  }
}
