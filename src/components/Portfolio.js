import React, { Component } from 'react';

class Portfolio extends Component{

  render(){
    return (
      <div className="col s6">
        <div className="card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">{this.props.name}</span>
            <span>
              <a
                className="btn-floating btn waves-effect waves-light">
                <i className="material-icons">attach money</i>
              </a>
            </span>
            <span>
              <a
                className="btn-floating btn waves-effect waves-light">
                <i className="material-icons">euro symbol</i>
              </a>
            </span>
            <span>
              <a
                className="btn-floating btn waves-effect waves-light">
                <i className="material-icons">cancel</i>
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default Portfolio;
