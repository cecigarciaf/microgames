import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import "../App.css";
import Mailer from './Mailer'
import About from './About'

function Instructions(showTemp){
    
    if(showTemp === false){
        showTemp = true
    } else if (showTemp === true){
        showTemp = false
    }
    return showTemp
    } 


function NavbarTop () {
    const [show, setShow] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    


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
                <Nav.Link className= "text-dark font-face-zkgam " onClick={() => setShowAbout(true)} ><tx className="topBarText">About</tx></Nav.Link>
                <Nav.Link className= "text-dark font-face-zkgam " onClick={() => setShow(true)} ><tx className="topBarText">Contact</tx></Nav.Link>
            </Navbar.Collapse>

        </Container>
        <Mailer close = {() => setShow(false)} show = {show} />
        <About close = {() => setShowAbout(false)} show = {showAbout} />
        </Navbar>

        
    )
}

export default NavbarTop;