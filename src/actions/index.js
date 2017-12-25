import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO,
  ADD_STOCK,
  TOGGLE_SELECT_STOCK,
  DELETE_STOCK
} from './types';

export const addPortfolio = portfolioName =>
  ({type: ADD_PORTFOLIO, payload: portfolioName});

export const deletePortfolio = portfolioName =>
  ({type: DELETE_PORTFOLIO, payload: portfolioName});

export const addStock = (symbol, pId) =>
  ({type: ADD_STOCK, symbol, pId});

export const toggleSelectStock = (sId, pId) =>
  ({type: TOGGLE_SELECT_STOCK, sId, pId});

export const deleteStock = (sId, pId) =>
  ({type: DELETE_STOCK, sId, pId});
