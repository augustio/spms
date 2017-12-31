import React, { Component } from 'react';
import { Checkbox } from 'react-bootstrap';

class Stock extends Component{

  componentDidMount(){
    this.intervalId = setInterval(
      () => {
        let {stock, updateStockValue} = this.props;
        updateStockValue(stock.pId, stock.id, stock.symbol);
      },
      60000
    );
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  setCurrency(){
    switch(this.props.currency){
      case 'eur':
        return <i className="fa fa-eur"></i>;
      default:
        return <i className="fa fa-usd"></i>
    }
  }

  render(){
    let {stock, toggleSelectStock} = this.props;
    return (
      <tr>
        <td>{stock.symbol}</td>
        <td>
          {(stock.unitValue * this.props.rate).toFixed(2)}
          &nbsp;
          {this.setCurrency()}
        </td>
        <td>{stock.quantity}</td>
        <td>
          {(stock.unitValue * stock.quantity * this.props.rate).toFixed(2)}
          &nbsp;
          {this.setCurrency()}
        </td>
        <td>
          <Checkbox
            checked={stock.selected}
            onChange={() => {
              toggleSelectStock(stock.id,stock.pId);
            }} />
        </td>
      </tr>
    );
  }
}

export default Stock;
