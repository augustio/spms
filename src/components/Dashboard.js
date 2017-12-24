import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewPortfolioForm from './NewPortfolioForm';
import Portfolio from './Portfolio';

import { Grid } from 'react-bootstrap';


class Dashboard extends Component{

  renderPortfolios(){
    return this.props.portfolios.map(p => (
      <Portfolio key={p.id} name={p.name.toUpperCase()}></Portfolio>
    ));
  }

  render(){
    return (
      <div>
        <div className="dashboard">
            <NewPortfolioForm
              portfolios={this.props.portfolios}
              onSubmit={this.props.addPortfolio}
            />
        </div>
        <Grid>
          {this.renderPortfolios()}
        </Grid>
      </div>
    );
  }
};

function mapStateToProps({ portfolios }){
  return { portfolios };
}

export default connect(mapStateToProps, actions)(Dashboard);
