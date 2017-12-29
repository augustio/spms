import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import Stock from './Stock';

class StockTable extends Component{

  renderStocks = () => this.props.stocks.map(
    s => <Stock
      key={s.id}
      stock={s}
      currency={this.props.currency}
      rate={this.props.rate}
      updateStockValue={this.props.updateStockValue}
      toggleSelectStock={this.props.toggleSelectStock}
    />
  );

  render(){
    return(
      <Table responsive striped bordered condensed hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Unit Value</th>
            <th>Quantity</th>
            <th>Total Value</th>
            <th>Select</th>
          </tr>
        </thead>
        <tbody className="table-scroll">
          {this.renderStocks()}
        </tbody>
      </Table>
    );
  }
};

export default StockTable;
