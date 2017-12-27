import axios from 'axios';
import _ from 'lodash';
import moment from 'moment';
import {
  ADD_PORTFOLIO,
  DELETE_PORTFOLIO,
  ADD_STOCK,
  TOGGLE_SELECT_STOCK,
  DELETE_STOCK,
  UPDATE_STOCK_VALUE,
  SET_CUR_RATE
} from './types';
import * as apiCfg from '../config/stock';

export const addPortfolio = name =>
  ({type: ADD_PORTFOLIO, name});

export const deletePortfolio = id =>
  ({type: DELETE_PORTFOLIO, id});

export const addStock = (pId, symbol, quantity) => async dispatch => {
  const url = `${apiCfg.base_url}query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiCfg.key}`;
  const res = await axios.get(url);
  const data = _.mapKeys(_.get(res, ['data', 'Time Series (1min)']), (value, key) => moment(key).unix());
  const key = _.reduce(
    _.keys(data),(max, k) => k > max ? k : max
  );
  let unitValue = Number.parseFloat(_.get(data[key], '4. close'));
  dispatch({
    type: ADD_STOCK,
    stock:{
      symbol,
      pId,
      quantity: Number.parseInt(quantity, 10),
      unitValue
    }
  });
};

export const updateStockValue = (pId, sId, symbol) => async dispatch => {
  const url = `${apiCfg.base_url}query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=1min&apikey=${apiCfg.key}`;
  const res = await axios.get(url);
  const data = _.mapKeys(_.get(res, ['data', 'Time Series (1min)']), (value, key) => moment(key).unix());
  const key = _.reduce(
    _.keys(data),(max, k) => k > max ? k : max
  );
  let unitValue = Number.parseFloat(_.get(data[key], '4. close'));
  if(unitValue){
    dispatch({
      type: UPDATE_STOCK_VALUE,
      pId,
      sId,
      unitValue
    });
  }
};

export const setCurrencyRate = (fromCurrency, toCurrency, pId) => async dispatch => {
  let rate = 1
  if(toCurrency !== 'usd'){
    const url = `${apiCfg.base_url}query?function=CURRENCY_EXCHANGE_RATE&from_currency=${fromCurrency}&to_currency=${toCurrency}&apikey=${apiCfg.key}`;
    const res = await axios.get(url);
    rate = _.get(res, ['data', 'Realtime Currency Exchange Rate', '5. Exchange Rate']);
  }
  dispatch({type: SET_CUR_RATE, rate: Number.parseFloat(rate), pId, toCurrency});
};

export const toggleSelectStock = (sId, pId) =>
  ({type: TOGGLE_SELECT_STOCK, sId, pId});

export const deleteStock = (sId, pId) =>
  ({type: DELETE_STOCK, sId, pId});
