import React, { useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import "./App.css";
import Mailer from './components/Mailer'
import About from './components/About'
import NavDropdown  from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';



function NavbarTop () {
    
    const { t, i18n } = useTranslation();
    const [show, setShow] = useState(false)
    const [showAbout, setShowAbout] = useState(false)
    
    function handleClick(lang){
        i18n.changeLanguage(lang);
    
    }

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
            <button onClick={() => handleClick("eng")}> ingles </button>
            <div>{t('saludo, 1')}</div>
            <div>{t('despedida, 1')}</div>
            <Navbar.Collapse className="justify-content-end">
                <NavDropdown title="Languaje" id="basic-nav-dropdown">
                    <NavDropdown.Item onClick={() => handleClick("eng")} >English</NavDropdown.Item>
                    <NavDropdown.Item onClick={() => handleClick("esp")} >Spanish</NavDropdown.Item>
                </NavDropdown>   
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