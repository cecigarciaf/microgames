import React from 'react';
import './gameFour.css';
import PlayStopButton from './playButton';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import NavDropdown  from 'react-bootstrap/NavDropdown';

function UserBomb(props){
    var style = {
        color: "red",
        fontSize: "60",
        textAlign: "center",
        backgroundColor: "white",
        border:"1px solid grey"
    }

    return (
        <span style = {style}>{props.text}</span>
    )
}



function Cell(props){
var color = "rgb(199, 196, 196)"

if(props.cell === "b"){
    color = "red"
}
else if(props.cell === "c"){
    color = "white"
} else if(props.userBombs === "bomba") {
    color = "green"
   
}

var style = {
    height:50,
    width:50,
    border:"1px solid grey",

    backgroundColor: color

}

return (
    <div  userBombs = {props.userBombs} style = {style} cell = {props.cell} onContextMenu = {() => props.handleRightClick(props.row,props.col)} onClick = {() => props.handleClick(props.row,props.col)}>
        <tx> {props.result} </tx>
    </div>
)
}

function Row(props) {
var style = {
    display: "flex"
}

var row = []
    for (let i=0; i<8; i++) {
        row.push(<Cell userBombs = {props.userBombs[props.row][i]} result = {props.result[props.row][i]} key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleRightClick={props.handleRClick} handleClick = {props.handleClick}/>)
    }

return (
    <div style = {style}>
    {row}
    </div>
)
}

function Board(props) {
var board = []
    for (let i=0; i<8; i++) {
        board.push(<Row userBombs = {props.userBombs} result = {props.result} key = {i} row = {i} cells = {props.cells[i]} handleRClick = {props.handleRClick} handleClick = {props.handleClick}/>)
    }

return (
    <div className = "row m-5" > 
    {board}
    </div>
)
}


class GameFour extends React.Component{
constructor(props){
    super(props)

    var result = []
    for(let i = 0; i < 8; i++ ){
    result.push(new Array(8).fill(""))
    }

    var userBombs = []
    for(let i = 0; i < 8; i++ ){
    userBombs.push(new Array(8).fill(""))
    }

    var cells = []
    for(let i = 0; i < 8; i++ ){
    cells.push(new Array(8).fill(0))
}

    this.state = {level: 8, playingState: false, bombsleft:"-", cells:cells, correctCells: [], result:result, userBombs: userBombs}
    this.playClick = this.playClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRClick = this.handleRClick.bind(this)
    this.handleLevel = this.handleLevel.bind(this)
}

handleLevel(event) {
    var level = event.target.id
    
    this.setState({level:level})
    console.log(this.state.level)
}

handleRClick(row, col) {
    //event.preventDefault();    
    console.log("RClick")
    console.log("result" + this.state.result)
    console.log("row" + row)
    var tempuserBombs = this.state.userBombs.slice()
    var bombsleftTemp = this.state.bombsleft
    console.log("tempuserBombs" + tempuserBombs)
    if (tempuserBombs[row][col] === "") {
    bombsleftTemp--
    tempuserBombs[row][col] =  "bomba"
    this.setState({bombsleft:bombsleftTemp, userBombs:tempuserBombs})
    console.log("tempuserBombs[row][col]" + tempuserBombs[row][col])
    //event.preventDefault();    
    }
}

playClick() {
    console.log("cells al play click" + this.state.cells) 

    var tempcells = JSON.parse(JSON.stringify(this.state.cells))
 
    console.log("new tempcells " +  tempcells)

    let i = 0  
    var bombAmount = this.state.level
    while (i<= bombAmount ) {

        var index1 = Math.round(Math.random() * 7)
        var index2 = Math.round(Math.random() * 7)

            if (tempcells[index1][index2] === 0) {

                tempcells[index1][index2] = "a";
                i++
          
                if(index1 < 7  && !(tempcells[(index1 + 1)][index2] ===   "a")){
                    tempcells[index1 + 1][index2] = tempcells[(index1 + 1)][index2] + 1
                };

                if(index1 > 0 && !(tempcells[index1 - 1][index2] ===   "a")){
                tempcells[index1 - 1][index2] = tempcells[index1 - 1][index2] + 1
                }

                if(index2 < 7 && !(tempcells[index1][index2 + 1] ===   "a")){
                tempcells[index1][index2 + 1] = tempcells[index1][index2 + 1] + 1
                }

                if(index2 > 0 && !(tempcells[index1][index2 - 1] ===   "a")){
                tempcells[index1][index2 - 1] = tempcells[index1][index2 - 1] + 1
                }

                if(index2 > 0 && index1 > 0 && !(tempcells[index1 - 1][index2 - 1] === "a")){
                tempcells[index1 - 1][index2  - 1] = tempcells[index1 - 1][index2  - 1] + 1
                }

                if(index2 < 7 && index1 < 7 && !(tempcells[index1 + 1][index2 + 1] === "a")){
                tempcells[index1 + 1][index2  + 1] = tempcells[index1 + 1][index2  + 1] + 1
                }

                if(index1 < 7 && index2 > 0 && !(tempcells[index1 + 1][index2 - 1] === "a")){
                tempcells[index1 + 1][index2 - 1] = tempcells[index1 + 1][index2 - 1] + 1
                }

                if(index1 > 0 && index2 < 7 && !(tempcells[index1 - 1][index2 + 1] === "a")){
                tempcells[index1 - 1][index2 + 1] = tempcells[index1 - 1][index2 + 1] + 1
                }
            
                 } 
                }  
      
                
    
  

    


    console.log("cells 2" + this.state.cells) 
    var tempCorrectCells = JSON.parse(JSON.stringify(tempcells))
    this.setState({cells:tempcells, correctCells:tempCorrectCells, bombsleft:10, playingState: true  })
    console.log("cells final" + this.state.cells) 
    console.log("new tempcells final " +  tempcells)
    console.log("correct c final " +  this.state.correctCells)
}

down(row,col, tempcells){
var tempresult = this.state.result.slice()
var localrow = row + 1 
var localcol = col
if ((localrow >= 0) && (localrow < 8) && (localcol >= 0) && (localcol < 8)) {
    if (tempcells[localrow][localcol] === 0) {
        tempcells[localrow][localcol] = "c";
        this.down(localrow,localcol, tempcells);
        this.up(localrow,localcol, tempcells);
        this.left(localrow,localcol, tempcells);
        this.right(localrow,localcol, tempcells)
    } else if (tempcells[localrow][localcol] > 0){
        tempcells[localrow][localcol] = "c";
        tempresult[localrow][localcol] = this.state.correctCells[localrow][localcol]

    }
}
}
up(row,col, tempcells){
var tempresult = this.state.result.slice()
var localrow = row - 1 
var localcol = col
if ((localrow >= 0) && (localrow < 8) && (localcol >= 0) && (localcol < 8)) {
    if (tempcells[localrow][localcol] === 0) {
            tempcells[localrow][localcol] = "c";
            this.down(localrow,localcol, tempcells);
            this.up(localrow,localcol, tempcells);
            this.left(localrow,localcol, tempcells);
            this.right(localrow,localcol, tempcells)
    } else if (tempcells[localrow][localcol] > 0){
        tempcells[localrow][localcol] = "c";
        tempresult[localrow][localcol] = this.state.correctCells[localrow][localcol]

    }
}
}

left(row,col, tempcells){
var tempresult = this.state.result.slice()
var localrow = row 
var localcol = col - 1 
if ((localrow >= 0) && (localrow < 8) && (localcol >= 0) && (localcol < 8)) {
    if (tempcells[localrow][localcol] === 0) {
            tempcells[localrow][localcol] = "c";
            this.down(localrow,localcol, tempcells);
            this.up(localrow,localcol, tempcells);
            this.left(localrow,localcol, tempcells);
            this.right(localrow,localcol, tempcells)
    } else if (tempcells[localrow][localcol] > 0){
        tempcells[localrow][localcol] = "c";
        tempresult[localrow][localcol] = this.state.correctCells[localrow][localcol]

    }
}
}

right(row,col, tempcells){
var tempresult = this.state.result.slice()
var localrow = row 
var localcol = col + 1 
if ((localrow >= 0) && (localrow < 8) && (localcol >= 0) && (localcol < 8)) {
    if (tempcells[localrow][localcol] === 0) {
            tempcells[localrow][localcol] = "c";
            this.down(localrow,localcol, tempcells);
            this.up(localrow,localcol, tempcells);
            this.left(localrow,localcol, tempcells);
            this.right(localrow,localcol, tempcells)
    } else if (tempcells[localrow][localcol] > 0){
        tempcells[localrow][localcol] = "c";
        tempresult[localrow][localcol] = this.state.correctCells[localrow][localcol]

    }
}
}
handleClick(row,col) {
    console.log("cells! " + this.state.cells) 
    console.log("correct cells! " +  this.state.correctCells)  


    var tempcells = this.state.cells.slice()
    var tempresult = this.state.result.slice()
if (this.state.playingState === true) {
    // si hay bomba se pone roja
    if (tempcells[row][col] === "a") {
        tempcells[row][col] = "b"
        this.setState({cells:tempcells, playingState: false})
    } else {
    // si hay bombas adjacentes se pone blanca
        if (tempcells[row][col] > 0) {
            tempcells[row][col] = "c"
            tempresult[row][col] = this.state.correctCells[row][col]

    } else {
        // si no hay nada....
                     // se pone blanca

                   
        if (tempcells[row][col] === 0) {
            tempcells[row][col] = "c";
            console.log("1")
            this.down(row,col, tempcells);
            console.log("2")
            this.up(row,col, tempcells);
            console.log("3")
            this.left(row,col, tempcells);
            console.log("4")
            this.right(row,col, tempcells);
            console.log("4")


        }
                this.setState({cells:tempcells, result:tempresult})
            
    console.log("row: " + row + " | col: " + col)


}
}
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
                <NavDropdown.Item onClick={this.handleLevel} id="4">Small</NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleLevel} id="8" >Medium</NavDropdown.Item>
                <NavDropdown.Item onClick={this.handleLevel} id="10" >Large</NavDropdown.Item>
              </NavDropdown>
              </Nav>
            </Container>
          </Navbar>
        </div>



        <div className = "row" > 
            <div className ="col-6">
                <Board  userBombs = {this.state.userBombs} result = {this.state.result != "bomba" ? this.state.result : ""} cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
            </div>   
        </div>

        <div className = "row mt-4 align-items-center" >
            <div className = "col-3 text-center" >
                <UserBomb text = {this.state.bombsleft}/>
            </div>

            <div className = "col-3 text-center" >
                <PlayStopButton text= "PLAY" onButtonClick = {this.playClick}/>
            </div>
        </div> 
    </div> 
  
        )
        }
} 


export default GameFour;