import { ADD_PORTFOLIO, DELETE_PORTFOLIO } from './types';

export const addPortfolio = portfolioName =>
  ({type: ADD_PORTFOLIO, payload: portfolioName});

export const deletePortfolio = portfolioName =>
  ({type: DELETE_PORTFOLIO, payload: portfolioName});
