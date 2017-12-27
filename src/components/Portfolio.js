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

class Portfolio extends Component{

  deleteStock(){
    this.props.stocks.forEach(s =>{
      if(s.selected){
        this.props.deleteStock(s.id, s.pId)
      }
    });
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
                onClick={() => this.props.deletePortfolio(this.props.portfolio.id)}>
                Delete
                &nbsp;
                <i className="fa fa-trash-o"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
          <div className="stock-table-container">
            <StockTable
              stocks={
                this.props.stocks || []
              }
              rate={this.props.portfolio.currencyRate}
              currency={this.props.portfolio.currency}
            />
          </div>
          <div className="portfolio-total-label">
            <Label>
              Total value of {this.props.portfolio.name}: 0.00
            </Label>
          </div>
          <NewStockForm
            pId={this.props.portfolio.id}
            onSubmit={this.props.addStock}
          />
          <ButtonToolbar className="pull-right">
            <ButtonGroup bsSize="xsmall">
              <Button bsStyle="info">
                Perf graph
                &nbsp;
                <i className="fa fa-line-chart"></i>
              </Button>
              <Button
                bsStyle="danger"
                onClick={() => this.deleteStock()}>
                Remove Stock
                &nbsp;
                <i className="fa fa-trash-o"></i>
              </Button>
            </ButtonGroup>
          </ButtonToolbar>
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
