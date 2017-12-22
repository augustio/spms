import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect } from 'react-redux';

const Header = () => {
  return (
    <h1>SPMS</h1>
  );
};

const Dashboard = () => {
  return (
    <div>
      <button>Add Portfolio</button>
    </div>
  )
}

class App extends Component{
  render(){
    return (
      <div className="container">
        <BrowserRouter>
          <div>
            <Header />
            <Route exact path="/"
              component={Dashboard}
            />
          </div>
        </BrowserRouter>
      </div>
    );
  }
};

export default App;
