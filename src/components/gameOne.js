import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import GameOneMelodies from './gameOneMelodies';
import GameOneRandom from './gameOneRandom';

class GameOne extends React.Component {
    constructor(props) {
      super(props);
      this.state = {game: ""}
    }
  
    renderGame(){
        if (this.state.game === "gameOneRandom") {
            return <GameOneRandom/>
        }
        else if (this.state.game === "gameOneMelodies") {
            return <GameOneMelodies/>
        }
    }




    render () { 
      return (
      

      
       <div className ="col-9">
         <div className = "row" > 
           <Navbar bg="white" variant="light">
           
            <Container >
              <Nav  onSelect={(selectedKey) => this.setState({game: selectedKey})} className="me-auto mx-auto">
                <Nav.Link  eventKey= "gameOneRandom">Random</Nav.Link>
                <Nav.Link  eventKey= "gameOneMelodies"> Famous Melodies</Nav.Link>
                
              </Nav>
            </Container>
           </Navbar>
        </div>
          <div className= "row">
              {this.renderGame()}
          </div>
          </div>
      )
    }  
  }
  
  

  export default GameOne;