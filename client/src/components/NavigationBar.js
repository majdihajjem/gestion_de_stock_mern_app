import React from 'react'
import {Container,Nav,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom'
function NavigationBar() {
  return (
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand href="#home">OMEGA</Navbar.Brand>
            <Nav className="me-auto">
            <Link to="/">Home</Link>
            <Link to="/Login">Login</Link>
            <Link to="/Register">Register</Link>
            <Link to="/Product">Product</Link>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavigationBar