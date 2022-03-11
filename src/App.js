import React, {Component, useState} from "react"
import Sidebar from "./components/Sidebar"
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import "./App.css";
import Mailer from './components/Mailer'
import About from './components/About'
import NavDropdown  from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import Footer from "./components/footer"


function App () {
  const { t, i18n } = useTranslation();
  const [show, setShow] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  
const handleClick = (lang)=> {
      i18n.changeLanguage(lang);
  
  }


    return(
      
    <div className = "page-container">
      <div className= "content-wrap" >
          <div class="row">
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
                <NavDropdown className= "font-face-zkgam " id="topBarText" title={t('idioma')} >
                    <NavDropdown.Item className= "text-dark font-face-zkgam " onClick={() => handleClick('en')} ><tx className="topBarText">{t('Inglés')}</tx></NavDropdown.Item>
                    <NavDropdown.Item className= "text-dark font-face-zkgam " onClick={() => handleClick('esp')} ><tx className="topBarText">{t('Español')}</tx></NavDropdown.Item>
                </NavDropdown>   
                <Nav.Link className= "text-dark font-face-zkgam " onClick={() => setShowAbout(true)} ><tx className="topBarText">About</tx></Nav.Link>
                <Nav.Link className= "text-dark font-face-zkgam " onClick={() => setShow(true)} ><tx className="topBarText">{t('Contact')}</tx></Nav.Link>
            </Navbar.Collapse>

        </Container>
        <Mailer close = {() => setShow(false)} show = {show} />
        <About close = {() => setShowAbout(false)} show = {showAbout} />
       
        </Navbar>
          </div>
          
          <div className = "row" style={{minHeight: "80vh"}}>    
            <Sidebar/>
          </div>
          <div className = "row" > 
        
            <Footer/>
            </div>
     </div>
    </div>
    )
  
}

export default App 