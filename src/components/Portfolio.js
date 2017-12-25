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

class Portfolio extends Component{

  deleteStock(){
    this.props.stocks.forEach(s =>{
      if(s.selected){
        this.props.deleteStock(s.id, s.pId)
      }
    });
  }

  render(){
    return (
      <Col lg={6} sm={6} >
        <Panel header={this.props.portfolio.name} bsStyle="info">
          <ButtonToolbar className="pull-right">
            <ButtonGroup bsSize="xsmall">
              <Button bsStyle="primary">
                Show in
                &nbsp;
                <i className="fa fa-usd"></i>
              </Button>
              <Button bsStyle="primary">
                Show in
                &nbsp;
                <i className="fa fa-eur"></i>
              </Button>
              <Button bsStyle="danger">
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
              onSelect={this.props.toggleSelectStock}
            />
          </div>
          <div className="portfolio-total-label">
            <Label>
              Total value of {this.props.portfolio.name}: 0.00
            </Label>
          </div>
          <ButtonToolbar className="pull-right">
            <ButtonGroup bsSize="xsmall">
              <Button
                bsStyle="primary"
                onClick={() => this.props.addStock("UAC", this.props.portfolio.id)}>
                Add Stock
                &nbsp;
                <i className="fa fa-plus"></i>
              </Button>
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
  let portfolio = state.portfolios.find(p => p.name = ownprops.name);
  let _stocks = {...state.stocks[portfolio.id]};
  return {
    portfolio,
    stocks: _.sortBy(_.values(_stocks), ['created'])
  };
}

export default connect(mapStateToProps, actions)(Portfolio);
