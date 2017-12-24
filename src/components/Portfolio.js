import React, { Component } from 'react';
import {
  Panel,
  Col,
  Button,
  ButtonToolbar,
  ButtonGroup
} from 'react-bootstrap';

class Portfolio extends Component{

  render(){
    return (
      <Col lg={6} sm={6} >
        <Panel header={this.props.name} bsStyle="info">
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
        </Panel>
      </Col>
    );
  }
}

export default Portfolio;
