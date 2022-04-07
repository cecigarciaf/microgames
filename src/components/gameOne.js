import React, { useState, useEffect } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import GameOneMelodies from './gameOneMelodies';
import GameOneRandom from './gameOneRandom';
import { useTranslation } from 'react-i18next';
import './gameOne.css';

function GameOne(props) {
  const [game, setGame] = useState("")  
  const { t, i18n } = useTranslation();

  function renderGame(){
        if (game === "gameOneRandom") {
            return <GameOneRandom/>
        }
        else if (game === "gameOneMelodies") {
            return <GameOneMelodies/>
        }
    }

      return (
      
       <div  className ="col-xs-12 col-lg-9">
         <div className = "row" > 
           <Navbar bg="white" variant="light">
           
            <Container >
              <Nav  onSelect={(selectedKey) => setGame(selectedKey)} className="me-auto mx-auto">
                <Nav.Link  eventKey= "gameOneRandom">{t("Random")}</Nav.Link>
                <Nav.Link  eventKey= "gameOneMelodies"> {t("Famous Melodies")}</Nav.Link>
                
              </Nav>
            </Container>
           </Navbar>
        </div>
          <div className= "row">
              {renderGame()}
          </div>
          </div>
      )
}  
  
  
  

  export default GameOne;