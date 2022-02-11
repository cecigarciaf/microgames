import React from 'react';
import Nav  from 'react-bootstrap/Nav';
import "../App.css";
import {
    BrowserRouter,
    Routes,
    Route,Link
  } from "react-router-dom";

import GameOne from './gameOne';
import GameTwo from './gameTwo';
import GameThree from './gameThree';

function Sidebar () {
    return (
        <BrowserRouter> 
      
            <div className ="col-3">
                <Nav defaultActiveKey="/home" className="flex-column">
                    <Nav.Link className= " sideButton text-dark" >Home</Nav.Link>
                    <Nav.Link className= "text-secondary sideButton" as={Link} to="./gameOne" >TONE Test</Nav.Link>
                    <Nav.Link className= "text-secondary sideButton"as={Link} to="/gameTwo" eventKey="link-2">SENKU</Nav.Link>
                    <Nav.Link className= "text-secondary sideButton" as={Link} to="/gameThree">PICZLE</Nav.Link>
                     
             
                </Nav>
                </div>
                  
                    <Routes>
                        <Route path= "/gameOne" element= {<GameOne/>}/>
                        <Route path= "/gameTwo" element= {<GameTwo/>}/>
                        <Route path= "/gameThree" element= {<GameThree/>}/>
                    </Routes>

         </BrowserRouter>
         

    )
}

export default Sidebar;