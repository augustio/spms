import { ADD_PORTFOLIO, DELETE_PORTFOLIO } from '../actions/types';

export default function(state = [], action){
  switch(action.type){
    case ADD_PORTFOLIO:
      return [
        ...state,
        {name: action.payload}
      ];
    case DELETE_PORTFOLIO:
      return state.filter(portfolio => portfolio.name !== action.payload);
    default:
      return state;
  }
}
