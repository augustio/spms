import React from 'react';
import { Link } from 'react-router-dom';
import {
  Navbar,
  Nav
} from 'react-bootstrap';
import RouteNavItem from './RouteNavItem';

const Header = () => {
  return (
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <Link
            to={'/'}
            className="left brand-logo"
          >
            SPMS
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav pullRight>
        <RouteNavItem href="/dashboard">
          Dashboard
        </RouteNavItem>
      </Nav>
    </Navbar>
  );
};

export default Header;
