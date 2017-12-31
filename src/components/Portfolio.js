import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import _ from 'lodash';
import {
  Panel,
  Col,
  Button,
  ButtonToolbar,
  ButtonGroup,
  Label
} from 'react-bootstrap';
import StockTable from './StockTable';
import NewStockForm from './NewStockForm';
import PerformanceGraph from './PerformanceGraph';

class Portfolio extends Component{

  deleteStock(){
    let symbols = this.props.stocks.length;
    this.props.stocks.forEach(s =>{
      if(s.selected){
        if(symbols === 1){
          this.props.deleteAllPortfolioStock(s.pId);
        }else{
          this.props.deleteStock(s.id, s.pId);
        }
        symbols -= 1;
      }
    });
  }

  deletePortfolio(){
    let pId = this.props.portfolio.id;
    this.props.deleteAllPortfolioStock(pId);
    this.props.deletePortfolio(pId);
  }

  calculateTotalStockValue(){
    let tValue = this.props.stocks.reduce(
      (t, s) => { return t += s.unitValue * s.quantity}, 0);
    return (tValue * this.props.portfolio.currencyRate).toFixed(2);
  }

  changeCurrency(from, to){
    this.props.setCurrencyRate(from, to, this.props.portfolio.id);
  }

  render(){
    return (
      <Col lg={6} md={6} sm={6} >
        <Panel header={this.props.portfolio.name} bsStyle="info">
          <ButtonToolbar className="pull-right">
            <ButtonGroup bsSize="xsmall">
              <Button
                bsStyle="primary"
                onClick={() => this.changeCurrency('eur', 'usd')}
              >
                Show in
                &nbsp;
                <i className="fa fa-usd"></i>
              </Button>
              <Button
                bsStyle="primary"
                onClick={() => this.changeCurrency('usd', 'eur')}
              >
                Show in
                &nbsp;
                <i className="fa fa-eur"></i>
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => this.deletePortfolio()}>
                Delete
                &nbsp;
                <i className="fa fa-trash-o"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div className="stock-table-container">
            <StockTable
              stocks={this.props.stocks}
              rate={this.props.portfolio.currencyRate}
              currency={this.props.portfolio.currency}
              updateStockValue={this.props.updateStockValue}
              toggleSelectStock={this.props.toggleSelectStock}
            />
          </div>
          <div className="portfolio-total-label">
            <Label>
              Total value of {this.props.portfolio.name}: {this.calculateTotalStockValue()}
              &nbsp;
              {
                this.props.portfolio.currency === 'usd' ?
                  <i className="fa fa-usd"></i> :
                  <i className="fa fa-eur"></i>
              }
            </Label>
          </div>
          <NewStockForm
            pId={this.props.portfolio.id}
            numStock={Object.keys(this.props.stocks).length}
            onSubmit={this.props.addStock}
          />
          <PerformanceGraph
            title={this.props.portfolio.name}
            stocks={this.props.stocks}
            getPerfData={this.props.getPerformanceData}
            portfolio={this.props.portfolio}
          />
          <Button
            className="pull-right"
            bsSize="xsmall"
            bsStyle="danger"
            onClick={() => this.deleteStock()}>
            Remove Stock
            &nbsp;
            <i className="fa fa-trash-o"></i>
          </Button>
        </Panel>
      </Col>
    );
  }
}

function mapStateToProps(state, ownprops){
  let _stocks = {...state.stocks[ownprops.portfolio.id]};
  return {
    stocks: _.sortBy(_.values(_stocks), ['created'])
  };
}

export default connect(mapStateToProps, actions)(Portfolio);
