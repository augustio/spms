import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PortfolioForm from './modals/PortfolioForm';
import { Button } from 'react-bootstrap';

class Dashboard extends Component{

  state = { showForm: false };

  close = () => this.setState({showForm: false});

  open = () => this.setState({showForm: true});

  render(){
    console.log(this.props);
    return (
      <div style={{margin: "10px 0"}}>
        <Button
          bsStyle="primary"
          bsSize="small"
          onClick={() => this.open()}
        > Add Portfolio</Button>
        <PortfolioForm
          close={this.close}
          open={this.open}
          showForm={this.state.showForm}
          onSubmitForm={name => {
            this.props.addPortfolio(name);
            this.close();
          }}
        />
      </div>
    );
  }
};

function mapStateToProps({ portfolios }){
  return { portfolios };
}

export default connect(mapStateToProps, actions)(Dashboard);
