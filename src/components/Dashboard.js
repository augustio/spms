import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import NewPortfolioForm from './NewPortfolioForm';
import Portfolio from './Portfolio';

class Dashboard extends Component{

  state = { showForm: false};

  open = () => this.setState({showForm: true});

  close = () => this.setState({showForm: false});

  renderForm = () => {
    if(this.state.showForm){
      return (
        <NewPortfolioForm
          open={this.open}
          close={this.close}
          portfolios={this.props.portfolios || []}
          onSubmit={name => this.props.addPortfolio(name)}
         />
      );
    }
  };

  renderPortfolios = () => (
    <div className="row">
      {
        this.props.portfolios.map(p => (
          <Portfolio key={p.id} name={p.name} />
        ))
      }
    </div>
  );

  render(){
    return (
      <div
        style={{margin: "10px 0"}}>
        <div className="row">
          <div className="col s3">
            <a
              className="waves-effect blue btn"
              style={{
                fontSize: '10px',
                padding: '1px 10px'
              }}
              onClick={this.open}
            >
              Add New Portfolio
            </a>
          </div>
          {this.renderForm()}
        </div>
        {this.renderPortfolios()}
      </div>
    );
  }
};

function mapStateToProps({ portfolios }){
  return { portfolios };
}

export default connect(mapStateToProps, actions)(Dashboard);
