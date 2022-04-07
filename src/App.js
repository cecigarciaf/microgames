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
 
  

  const Style = (lenguaje) => {
    
    var style
    if(i18n.resolvedLanguage === lenguaje){
      style= { display : "none"}
    } else {
      style= { display : "unset"}
    }
    return style
  }


  const lngs = {
    en: { nativeName: 'English' },
    esp: { nativeName: 'Español' }
  };


    return(
      
    <div className = "page-container" >
      <div className= "content-wrap d-flex flex-column min-vh-100" >
          <div  id= "headerContainerRow"  className="row">
          <Navbar bg="light" variant="light">

        <Container>

            <Navbar.Brand >
            <img
                src="./logo.png"
                width="60"
                height="50"
                className="d-inline-block align-top"
                alt="CG logo"/>
            </Navbar.Brand>  

            <Navbar.Collapse className="justify-content-end">
                <NavDropdown className= "font-face-zkgam " id="basic-nav-dropdown" title={ lngs[i18n.resolvedLanguage].nativeName} >
                    <NavDropdown.Item style= { Style("en")} id= "English" className= "select  font-face-zkgam " onClick={() => i18n.changeLanguage("en")} ><tx className="topBarText">{lngs["en"].nativeName}</tx></NavDropdown.Item>
                    <NavDropdown.Item style= { Style("esp")} id= "Español" className= "select  font-face-zkgam " onClick={() => i18n.changeLanguage("esp")} ><tx className="topBarText">{lngs["esp"].nativeName}</tx></NavDropdown.Item>
                </NavDropdown>   
                <Nav.Link className= "font-face-zkgam " onClick={() => setShowAbout(true)} ><tx className="topBarText">Info</tx></Nav.Link>
                <Nav.Link className= "font-face-zkgam " onClick={() => setShow(true)} ><tx className="topBarText">{t('Contact')}</tx></Nav.Link>
            </Navbar.Collapse>

        </Container>
        <Mailer close = {() => setShow(false)} show = {show} />
        <About close = {() => setShowAbout(false)} show = {showAbout} />
       
        </Navbar>
          </div>
          
          <div id= "sidebarContainerRow" className = "row" >    
            <Sidebar/>
          </div>
          <div id= "footerContainerRow" className = "mt-auto row" > 
        
            <Footer/>
            </div>
     </div>
    </div>
    )
  
}

export default App 