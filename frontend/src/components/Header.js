import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <Navbar.Brand href='/'>ProShop</Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ms-auto'>
              {/* ms : margin from start (start is left = ml in bootstrap 4). me : margin from end (end is right = mr in bootstrap 4) */}
              <Nav.Link href='/cart'>
                <i className='fas fa-shopping-cart pe-1'></i>
                Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i className='fas fa-user pe-1'></i>
                Sign In
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
