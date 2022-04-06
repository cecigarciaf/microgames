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
import {Howler} from 'howler';

import Offcanvas  from 'react-bootstrap/Offcanvas';

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

manageAudio(){
    Howler.stop();
}


render(){    
    return (
        <BrowserRouter >  
            
                <div className ="d-xs-block d-lg-none">
                <Navbar onToggle={this.setNavExpanded}
                expanded={this.state.navExpanded} expand="lg" className="flex-column">
                    <Container>
                
                        <Navbar.Toggle aria-controls="offcanvasNavbar " />
                       
                        <Navbar.Offcanvas
                            id="offcanvasNavbar "
                            aria-labelledby="offcanvasNavbarLabel"
                            placement="start"
                            className = "offcanvas-start-lg"
                        >
            
                            <Nav  onSelect={this.closeNav} defaultActiveKey="/home" className="flex-column">
        
                                <Nav.Link onClick= {this.manageAudio} className= "mt-4 text-secondary sideButton" as={Link} to="/senku" eventKey="link-2"><tx className = "sideText font-face-zkgam">SENKU</tx></Nav.Link>   
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/bombs"  eventKey="link-4" ><tx className = "sideText font-face-zkgam">BOMBS</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/battle"  eventKey="link-5"><tx className = "sideText font-face-zkgam">BATTLE</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/guess4"  eventKey="link-6"><tx className = "sideText font-face-zkgam">GUESS4</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/tetris"  eventKey="link-7"><tx className = "sideText font-face-zkgam">TETRIS</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="./tones"  eventKey="link-1"><tx className = "sideText font-face-zkgam">TONES</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "hideOnPhone text-secondary sideButton" as={Link} to="/piczle"  eventKey="link-3"><tx className = "sideText font-face-zkgam">PICZLE</tx></Nav.Link>
                            
                            </Nav>
                  
                            </Navbar.Offcanvas>


                    </Container>
                </Navbar>
                </div>
            
                <div className = "col-3 d-none d-lg-block">
                <Navbar 
               className="flex-column">
                    <Container>
                
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                            <Navbar.Collapse id="responsive-navbar-nav">
                            
                            <Nav  defaultActiveKey="/home" className="flex-column">
        
                                <Nav.Link onClick= {this.manageAudio} className= "mt-4 text-secondary sideButton" as={Link} to="/senku" eventKey="link-2"><tx className = "sideText font-face-zkgam">SENKU</tx></Nav.Link>   
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/bombs"  eventKey="link-4" ><tx className = "sideText font-face-zkgam">BOMBS</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/battle"  eventKey="link-5"><tx className = "sideText font-face-zkgam">BATTLE</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/guess4"  eventKey="link-6"><tx className = "sideText font-face-zkgam">GUESS4</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="/tetris"  eventKey="link-7"><tx className = "sideText font-face-zkgam">TETRIS</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "text-secondary sideButton" as={Link} to="./tones"  eventKey="link-1"><tx className = "sideText font-face-zkgam">TONES</tx></Nav.Link>
                                <Nav.Link onClick= {this.manageAudio} className= "hideOnPhone text-secondary sideButton" as={Link} to="/piczle"  eventKey="link-3"><tx className = "sideText font-face-zkgam">PICZLE</tx></Nav.Link>
                            
                            </Nav>

                            </Navbar.Collapse>

                    </Container>
                </Navbar>
                </div>
                  
                    <Routes>
                        <Route path= "/tones" element= {<GameOne/>}/>
                        <Route path= "/senku" element= {<GameTwo/>}/>
                        <Route path= "/piczle" element= {<GameThree/>}/>
                        <Route path= "/bombs" element= {<GameFour/>}/>
                        <Route path= "/battle" element= {<GameFive/>}/>
                        <Route path= "/guess4" element= {<GameSix/>}/>
                        <Route path= "/tetris" element= {<GameSeven/>}/>
                    </Routes>
                
         </BrowserRouter>
         

    )
}
}

export default Sidebar;