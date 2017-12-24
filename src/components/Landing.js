import React from 'react';
import { Jumbotron } from 'react-bootstrap';

const Landing = () => {
  return (
    <Jumbotron style={{ textAlign: 'center' }}>
      <h4 style={{ color: 'steelblue'}}>
        Stock Portfolio Management System
      </h4>
      <span style={{fontStyle: 'italic'}}>Mananage your stocks easily and efficiently</span>
    </Jumbotron>
  );
};

export default Landing;
