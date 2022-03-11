import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import NavDropdown  from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';


function Option(props){

    return(
        <NavDropdown.Item onClick={(e) => props.handleLevel(e)} className = "select font-face-zkgam " id={props.id} > {props.text} </NavDropdown.Item>
    )
}



function SecondarySelector(props){
    const { t, i18n } = useTranslation();

    var levelOptions = []
    var amount = props.ids.length

    for(let i= 0; i<amount; i++){
        levelOptions.push(<Option key= {i} handleLevel={props.handleLevel} id={props.ids[i]} text= {t(props.texts[i])}/>)
    }

    return(


            <Navbar bg="white" variant="light">
                <Container >
                    <Nav className="me-auto mx-auto">
                        <NavDropdown  className = "font-face-zkgam " title={t(props.menuTitle)} id="basic-nav-dropdown">
                            
                            
                            {levelOptions}


                        </NavDropdown>
                    </Nav>
                </Container>
            </Navbar>

    )
}

export default SecondarySelector;