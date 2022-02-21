import React from 'react';
//import './gameFour.css';
import PlayStopButton from './playButton';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import NavDropdown  from 'react-bootstrap/NavDropdown';

function UserClicks(props){
    var style = {
        color: "grey",
        fontSize: "60",
        textAlign: "center",
        backgroundColor: "white",
        border:"1px solid #212529",
        height: "3rem",
        width: "3rem"
    }
    return (
        <div className = "mx-auto rounded" id= "clicks" style = {style}>{props.text}</div>
    )
}

function Cell(props){
var color = "rgb(199, 196, 196)"

if(props.userShoots > 0){
    color = "brown"
}
else if(props.userShoots === 0){
    color = "blue"
} else if(props.userShoots === "safe") {
    color = "white";
}

var cN = "text-center justify-content-center"
var style = {
    width: "2rem",
    height: "2rem",
    border:"1px solid grey",
    backgroundColor: color
}

var containerStyle = {
    backgroundColor: "grey"
}
return (
    <div style= {containerStyle }>
    <div userShoots = {props.userShoots} className= {cN}  style = {style} cell = {props.cell} onContextMenu = {() => props.handleRightClick(props.row,props.col)} onClick = {() => props.handleClick(props.row,props.col)}>
        <tx >  </tx>
    </div>
    </div>
    )
}

function Row(props) {
    var style = {
        display: "flex",
    }
    var row = []
        for (let i=2; i < 12; i++) {
            row.push(<Cell userShoots  = {props.userShoots[props.row][i]} text = {props.text[props.row][i]} key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleRightClick={props.handleRClick} handleClick = {props.handleClick}/>)
        }

    return (
        <div className= "text-center justify-content-center" style = {style}>
        {row }
        </div>

    )
}

function Board(props) {
    var board = []
        for (let i=2; i<12; i++) {
            board.push(<Row userShoots = {props.userShoots} text = {props.text} key = {i} row = {i} cells = {props.cells[i]} handleRClick = {props.handleRClick} handleClick = {props.handleClick}/>)
        }
        return (
            <div  className = "align-items-center justify-content-center row m-5" > 
            {board}
            </div>
        )
}



class GameFive extends React.Component{
    constructor(props){
        super(props)
        
        var cells = []
        for(let i = 0; i < 14; i++ ){
        cells.push(new Array(14).fill(0))
    }
        var userShoots = []
        for(let i = 0; i < 14; i++ ){
        userShoots.push(new Array(14).fill("empty"));

        this.state = {cells:cells, playingState:false, userShoots:userShoots, leftClics: 0}
        this.playClick = this.playClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleRClick = this.handleRClick.bind(this)
        }
    }

handleRClick(row, col) {
    if(this.state.playingState === true) {
        var tempUserShoots = this.state.userShoots.slice()
        if(tempUserShoots[row][col] === "empty" ){
            tempUserShoots[row][col] = "safe"
        } else if (tempUserShoots[row][col] === "safe" ){
            tempUserShoots[row][col] = "empty"

    }
    this.setState({userShoots:tempUserShoots})
    }
}
handleClick(row, col) {
    if(this.state.playingState === true) {
        var tempcells = this.state.cells.slice()
        var tempUserShoots = this.state.userShoots.slice()
        var tempClics = this.state.leftClics
        if ((tempUserShoots[row][col] === "empty") || (tempUserShoots[row][col] < 1 )){

            tempUserShoots[row][col] = tempcells[row][col]
        }
        tempClics++
        this.setState({userShoots:tempUserShoots, leftClics:tempClics})
    }
}

playClick(){
var tempPlayingState = this.state.playingState
if(tempPlayingState === false) {
  
    var tempCells = this.state.cells.slice()

    //0=horindontal   1=vertical
 
    //1 de 4:
    var orient4 = Math.floor(Math.random() * (2 - 0)) + 0;
    var localrow
    var localcol

    if(orient4 ===0) {
        localcol = Math.floor(Math.random() * (9 - 2)) + 2;
        localrow = Math.floor(Math.random() * (12 - 2)) + 2;

        tempCells[localrow][localcol] = 4
        tempCells[localrow][localcol + 1] = 4
        tempCells[localrow][localcol + 2] = 4
        tempCells[localrow][localcol + 3] = 4
    } else if(orient4 === 1){
        localrow = Math.floor(Math.random() * (9 - 2)) + 2;
        localcol = Math.floor(Math.random() * (12 - 2)) + 2;   
        tempCells[localrow][localcol] = 4
        tempCells[localrow + 1][localcol] = 4
        tempCells[localrow + 2][localcol] = 4
        tempCells[localrow + 3][localcol] = 4   
    }
    
    console.log("despues del de4" + tempCells)
   
    //2 de 3:
   
    
    var orient3
    let amount = 0
    do {
    orient3 = Math.floor(Math.random() * (2 - 0)) + 0;
    

    if(orient3 === 0) {
            localcol = Math.floor(Math.random() * (10 - 2)) + 2;
            localrow = Math.floor(Math.random() * (12 - 2)) + 2;
            if ((tempCells[localrow][localcol - 1] + tempCells[localrow][localcol] + tempCells[localrow][localcol + 1] + tempCells[localrow][localcol + 2] + tempCells[localrow][localcol + 3] + 
                tempCells[localrow - 1][localcol - 1] + tempCells[localrow - 1][localcol] + tempCells[localrow - 1][localcol + 1] + tempCells[localrow - 1][localcol + 2] + tempCells[localrow - 1][localcol + 3] + 
                tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 1][localcol] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 1][localcol + 2] + tempCells[localrow + 1][localcol + 3]) === 0) {
                tempCells[localrow][localcol] = 3
                tempCells[localrow][localcol + 1] = 3
                tempCells[localrow][localcol + 2] = 3
                amount++
            }
        
    

    } else if (orient3 === 1) {
       localcol = Math.floor(Math.random() * (12 - 2)) + 2;
       localrow = Math.floor(Math.random() * (10 - 2)) + 2;
            if ((tempCells[localrow - 1][localcol] + tempCells[localrow][localcol] + tempCells[localrow + 1][localcol] + tempCells[localrow + 2][localcol] + tempCells[localrow + 3][localcol] +
            tempCells[localrow - 1][localcol - 1] + tempCells[localrow][localcol - 1] + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 2][localcol - 1] + tempCells[localrow + 3][localcol - 1]  +
            tempCells[localrow - 1][localcol + 1] + tempCells[localrow][localcol + 1] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 2][localcol + 1] + tempCells[localrow + 3][localcol + 1]) === 0) {
                tempCells[localrow][localcol] = 3
                tempCells[localrow + 1][localcol] = 3
                tempCells[localrow + 2][localcol] = 3
                amount++
            }
     }
      } while (amount < 2);


    //3 de 2:
    
        
    var orient2
    let amount2 = 0
    do {
    orient2 = Math.floor(Math.random() * (2 - 0)) + 0;
    

    if(orient2 === 0) {
        localcol = Math.floor(Math.random() * (11 - 2)) + 2;
        localrow = Math.floor(Math.random() * (12 - 2)) + 2;
            if ((tempCells[localrow][localcol - 1] + tempCells[localrow][localcol] + tempCells[localrow][localcol + 1] + tempCells[localrow][localcol + 2] 
               + tempCells[localrow - 1][localcol - 1] + tempCells[localrow - 1][localcol] + tempCells[localrow - 1][localcol + 1] + tempCells[localrow - 1][localcol + 2] 
               + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 1][localcol] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 1][localcol + 2]) === 0) {
                     tempCells[localrow][localcol] = 2
                     tempCells[localrow][localcol + 1] = 2
                     amount2++
            }
    } else if (orient2 === 1) {
       localcol = Math.floor(Math.random() * (12 - 2)) + 2;
       localrow = Math.floor(Math.random() * (11 - 2)) + 2;
            if ((tempCells[localrow - 1][localcol] + tempCells[localrow][localcol] + tempCells[localrow + 1][localcol] + tempCells[localrow + 2][localcol] 
               + tempCells[localrow - 1][localcol - 1] + tempCells[localrow][localcol - 1] + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 2][localcol - 1] 
               + tempCells[localrow - 1][localcol + 1] + tempCells[localrow][localcol + 1] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 2][localcol + 1]) === 0) {
                 tempCells[localrow][localcol] = 2
                 tempCells[localrow + 1][localcol] = 2
                 amount2++
            }
    }
    } while (amount2 < 3);

    //4 de 1:
        
            
    let amount1 = 0
    do {
        localcol = Math.floor(Math.random() * (12 - 2)) + 2;
        localrow = Math.floor(Math.random() * (12 - 2)) + 2;
            if ((tempCells[localrow][localcol - 1] + tempCells[localrow][localcol] + tempCells[localrow][localcol + 1]
                + tempCells[localrow - 1][localcol - 1] + tempCells[localrow - 1][localcol] + tempCells[localrow - 1][localcol + 1]
                    + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 1][localcol] + tempCells[localrow + 1][localcol + 1]) === 0) {
                        tempCells[localrow][localcol] = 1
                        amount1++
            }
    }
     while (amount1 < 4);
     this.setState({cells:tempCells, playingState:true})

} else if(this.state.playingState === true) {

        var tempcells = []
        for(let i = 0; i < 14; i++ ){
        tempcells.push(new Array(14).fill(0))
    }
        var tempuserShoots = []
        for(let i = 0; i < 14; i++ ){
        tempuserShoots.push(new Array(14).fill("empty"));  
    }
   
    this.setState({cells:tempcells, userShoots:tempuserShoots, playingState:false, leftClics:0})
    }
}
      

    render(){  
        return (
            <div className ="col-9">
                <div className = "row" > 
                <Navbar bg="white" variant="light">
                    <Container >
                    <Nav className="me-auto mx-auto">
                    <NavDropdown title="Level" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={this.handleLevel} id="4" > Small </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleLevel} id="8" > Medium </NavDropdown.Item>
                        <NavDropdown.Item onClick={this.handleLevel} id="10"> Large </NavDropdown.Item>
                    </NavDropdown>
                    </Nav>
                    </Container>
                </Navbar>
                </div>
                <div className = "row" > 
                    <div className ="col-sm-12 col-md-6  d-md-block text-center">
                    <Board  userShoots = {this.state.userShoots} text = {this.state.cells} cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
                    </div>
                    <div className ="col-sm-12 col-md-6  d-md-block text-center">
                        
                    </div>
                </div>

                <div className = "row mt-4 align-items-center justify-content-center"> 
                    <div className = "col-sm-12 col-md-4 col-lg-2 col-xl-2 d-md-block text-center" >
                      <UserClicks  text = {this.state.leftClics}/>
                    </div>
                    <div className = "col-sm-12 col-md-4 col-lg-2 col-xl-2 d-md-block text-center" >
                        <PlayStopButton text= {this.state.playingState === false?  "PLAY" : "QUIT"} onButtonClick = {this.playClick}/>
                    </div> 
                </div> 
                </div> 
                )
            }
    } 
export default GameFive;