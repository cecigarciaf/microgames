import React from 'react';
import Nav  from 'react-bootstrap/Nav';
import Navbar  from 'react-bootstrap/Navbar';
import Container  from 'react-bootstrap/Container';
import "../App.css";
import {
    BrowserRouter,
    Routes,
    Route,Link
  } from "react-router-dom";

import GameOne from './gameOne';
import GameTwo from './gameTwo';
import GameThree from './gameThree';
import GameFour from './gameFour';
import GameFive from './gameFive';
import GameSix from './gameSix';
import GameSeven from './gameSeven';

class Sidebar extends React.Component{
    constructor(props){
        super(props)
        this.state = {navExpanded: false}
        this.closeNav = this.closeNav.bind(this)
        this.setNavExpanded = this.setNavExpanded.bind(this)
       
}
setNavExpanded(expanded) {
    this.setState({ navExpanded: expanded });
  }

  closeNav() {
    this.setState({ navExpanded: false });
  }
render(){    
    return (
        <BrowserRouter >  
            
                <div className ="col-3">
                <Navbar onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded} expand="lg" className="flex-column">
                    <Container>
                
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                        
                        <Nav onSelect={this.closeNav} defaultActiveKey="/home" className="flex-column">
                        <Nav.Link className= "sideButton text-dark" >Home</Nav.Link>
                        <Nav.Link className= "text-secondary sideButton " as={Link} to="./gameOne"  eventKey="link-1"><tx className = "sideText font-face-zkgam">TONES</tx></Nav.Link>
                        <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameTwo" eventKey="link-2"><tx className = "sideText font-face-zkgam">SENKU</tx></Nav.Link>   
                        <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameFour"  eventKey="link-3" ><tx className = "sideText font-face-zkgam">MINES</tx></Nav.Link>
                        <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameFive"  eventKey="link-4"><tx className = "sideText font-face-zkgam">BATTLE</tx></Nav.Link>
                        <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameSix"  eventKey="link-5"><tx className = "sideText font-face-zkgam">NUMBERS</tx></Nav.Link>
                        <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameSeven"  eventKey="link-6"><tx className = "sideText font-face-zkgam">TETRIS</tx></Nav.Link>
                        <Nav.Link className= "hideOnPhone text-secondary sideButton" as={Link} to="/gameThree"  eventKey="link-7"><tx className = "sideText font-face-zkgam">PICZLE</tx></Nav.Link>
                        </Nav>

                        </Navbar.Collapse>

                    </Container>
                </Navbar>
                </div>
            
                
                  
                    <Routes>
                        <Route path= "/gameOne" element= {<GameOne/>}/>
                        <Route path= "/gameTwo" element= {<GameTwo/>}/>
                        <Route path= "/gameThree" element= {<GameThree/>}/>
                        <Route path= "/gameFour" element= {<GameFour/>}/>
                        <Route path= "/gameFive" element= {<GameFive/>}/>
                        <Route path= "/gameSix" element= {<GameSix/>}/>
                        <Route path= "/gameSeven" element= {<GameSeven/>}/>
                    </Routes>
                
         </BrowserRouter>
         

    )
}
}

export default Sidebar;