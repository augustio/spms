import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Header from './Header';
import Landing from './Landing';
import Dashboard from './Dashboard';

class App extends Component{
  render(){
    const supportsHistory = 'pushState' in window.history;
    return (
      <div>
        <BrowserRouter forceRefresh={!supportsHistory}>
          <div>
            <Header />
            <Route exact path="/"
              component={Landing}
            />
            <Route exact path="/dashboard"
              component={Dashboard}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default connect(null, actions)(App);
