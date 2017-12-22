import React from 'react';
import { Link } from 'react-router-dom';

import {
  Navbar,
  NavItem,
  Nav
} from 'react-bootstrap';

const Header = () => {
  return (
    <Navbar inverse collapseOnSelect>
      <Navbar.Header className="nav-wrapper">
        <Navbar.Brand>
          <Link
            to={'/'}
            className="left brand-logo"
          >
            SPMS
          </Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem>
            <Link to={'/dashboard'}>
              Dashboard
            </Link>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
