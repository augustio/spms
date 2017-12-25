import React, { Component } from 'react';
import {
  Table,
  Checkbox
} from 'react-bootstrap';

class StockTable extends Component{
  renderStocks = () =>{
    return this.props.stocks.map(s => {
      return (
        <tr key={s.id}>
          <td>{s.symbol}</td>
          <td>{s.unit_value}</td>
          <td>{s.quantity}</td>
          <td>{s.unit_value * s.quantity}</td>
          <td>
            <Checkbox
              checked={s.selected}
              onChange={() => {
                this.props.onSelect(s.id, s.pId);
              }} />
          </td>
        </tr>
      );
    });
  };

  render(){
    return(
      <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Unit Value</th>
            <th>Quantity</th>
            <th>total Value</th>
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
