import React, { Component } from 'react';
import {
  Modal,
  Button,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap';

class NewStockForm extends Component{

  state = {
    symbol: "",
    quantity: 0,
    showForm: false
  };

  close = () => this.setState({
    showForm: false,
    symbol: "",
    quantity: 0
  });

  open = () => this.setState({showForm: true});

  handleChange = e =>{
    let value = e.target.value.trim();
    let key = e.target.name.trim();
    this.setState({[key]: value});
  }

  handleSubmit = () => {
    this.props.onSubmit(
      this.props.pId,
      this.state.symbol.toUpperCase(),
      this.state.quantity
    );
    this.close();
  }

  render(){
    return(
      <span>
        <Button
          className="pull-right"
          bsSize="xsmall"
          bsStyle="primary"
          onClick={this.open}
        >
          Add New Stock
          &nbsp;
          <i className="fa fa-plus"></i>
        </Button>
        <Modal
          show={this.state.showForm}
          onHide={this.close}
          bsSize="small"
        >
          <Modal.Header closeButton>
            <Modal.Title>New Stock Form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <FormGroup
                controlId="pForm"
              >
                <ControlLabel>Stock Symbol</ControlLabel>
                <FormControl
                  type="text"
                  name="symbol"
                  value={this.state.symbol}
                  placeholder="Enter Stock Symbol"
                  onChange={this.handleChange}
                />
                <ControlLabel>Quantity</ControlLabel>
                <FormControl
                  type="number"
                  name="quantity"
                  value={this.state.quantity}
                  placeholder="Enter Quantity"
                  onChange={this.handleChange}
                />
              </FormGroup>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              bsSize="small"
              bsStyle="success"
              onClick={() => this.handleSubmit()}>
              Submit
              &nbsp;
              <i className="fa fa-check-square-o"></i>
            </Button>
          </Modal.Footer>
        </Modal>
      </span>
    );
  }
};

export default NewStockForm;
