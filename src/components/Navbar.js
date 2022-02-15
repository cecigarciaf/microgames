import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import "../App.css";

function NavbarTop () {
    return(
        <Navbar bg="light">

        <Container>

            <Navbar.Brand href="#home">
            <img
                src="./logo.png"
                width="60"
                height="50"
                className="d-inline-block align-top"
                alt="CG logo"/>
            </Navbar.Brand>

            <Navbar.Collapse className="justify-content-end">
                <Nav.Link className= "text-dark" href="#home">Contact</Nav.Link>
            </Navbar.Collapse>

        </Container>
        </Navbar>
    )
}

export default NavbarTop;