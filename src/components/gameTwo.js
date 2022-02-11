import React from 'react';
import Nav  from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { NavDropdown } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

class PlayStopButton extends React.Component {
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this)
    }
  
    handleClick (event){
      this.props.onButtonClick(event)
    }
    render () { 
    return (
      
       <Button  id="playbutton" size="lg" variant="outline-dark"  onClick={this.handleClick}>{this.props.text}</Button>
     
  
    )
    }
  }  

function Cell(props){
    var color = "black"
    if(props.cell === "empty"){
        color = "white"
    } else if (props.cell === "clicked") {
        color = "green"
    } 
    

    var style = {
        height:50,
        width:50,
        border:"2px solid black",
        backgroundColor: color
    }

    return (
        <div className= "rounded-circle" style = {style} cell = {props.cell} onClick = {() => props.handleClick(props.row,props.col)}>
        </div>
    )
}
function NoCell(props){
    var color = "white"


    var style = {
        height:50,
        width:50,
        backgroundColor: color
    }


    return (
        <div style = {style} cell = {props.cell} >
        </div>
    )
}

function LongRow(props) {
    var style = {
        display: "flex"
    }

    var row = []
        for (let i=0; i<7; i++) {
            row.push(<Cell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
        }

    return (
        <div className = "justify-content-center" style = {style}>
        {row}
        </div>
    )
}

function ShortRow(props) {
    var style = {
        display: "flex"
    }

    var row = []
        for (let i=0; i<2; i++) {
            row.push(<NoCell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
        }
        for (let i=2; i<5; i++) {
            row.push(<Cell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
        }
        for (let i=5; i<7; i++) {
            row.push(<NoCell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
        }

    return (
        <div className= "justify-content-center" style = {style}>
        {row}
        </div>
    )
}


function Board(props) {
    var board = []
        for (let i=0; i<2; i++) {
            board.push(<ShortRow key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
        }
        for (let i=2; i<5; i++) {
            board.push(<LongRow key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
        }
        for (let i=5; i<7; i++) {
            board.push(<ShortRow key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
        }

    return (
        
            <div className = "row" > 
                {board}
            </div>
   
    )
}

class GameTwo extends React.Component{
    constructor(props){
        super(props)


    var cells2 = []
    for(let i = 0; i < 7; i++ ){
    cells2.push(new Array(7).fill("full"))
    }    
    cells2[3][3] = "empty"
    this.state = {cells:cells2, selectedCell: "no", resultText: ""}
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)

    }

    handleClick(row,col) {
        var tempcells = this.state.cells.slice()
        var tempSelectedCell = this.state.selectedCell

       
        // 1er clic en casilla ocupada la pone verde
        if (( tempSelectedCell === 'no') && (tempcells[row][col] === "full")) {
           
        tempcells[row][col] = "clicked"
        tempSelectedCell = "si"
        console.log(this.state.cells[row][col] + this.state.selectedCell)
        
        console.log("1" + this.state.cells[row][col] + "2" + this.state.selectedCell)
        }

        // 2 clic en casilla ocupada error:
        else if ((tempcells[row][col] === "full") && (tempSelectedCell === "si")) {
                    this.setState({resultText:"That's not a valid cell"})
        }

        //2do clic en casilla seleccionada la desselecciona
        else if ((tempcells[row][col] === "clicked") && (tempSelectedCell === "si" )) {
            tempcells[row][col] = "full"
            tempSelectedCell = "no"

            }

        //1er clic en casilla vacia da error
        else if (tempcells[row][col] === "empty" && tempSelectedCell === "no") {
                this.setState({resultText:"That's not a valid cell"})
                }
    
        else if (tempcells[row][col + 2] === "clicked" && tempcells[row][col] === "empty" ) {
                tempcells[row][col] = "full";
                tempcells[row][col + 2] = "empty";
                tempcells[row][col + 1] = "empty";
                tempSelectedCell = "no"

            }
            
        else if (tempcells[row][col - 2] === "clicked" && tempcells[row][col] === "empty" ) {
                tempcells[row][col] = "full";
                tempcells[row][col - 2] = "empty";
                tempcells[row][col - 1] = "empty";
                tempSelectedCell = "no"
            }

        else if (tempcells[row + 2][col] === "clicked" && tempcells[row][col] === "empty" ) {
                tempcells[row][col] = "full";
                tempcells[row + 2][col] = "empty";
                tempcells[row + 1][col] = "empty";
                tempSelectedCell = "no"

            }

        else if (tempcells[row - 2][col] === "clicked" && tempcells[row][col] === "empty" ) {
                tempcells[row][col] = "full";
                tempcells[row - 2][col] = "empty";
                tempcells[row - 1][col] = "empty";
                tempSelectedCell = "no"
                
            }
            this.setState({cells:tempcells, selectedCell: tempSelectedCell})
    }
    

     
    

    handleReset() {
        var tempcells = []
        var tempSelectedCell = "no"

 
        for(let i = 0; i < 7; i++ ){
        tempcells.push(new Array(7).fill("full"))
        }
        tempcells[3][3] = "empty"
        this.setState({cells:tempcells, selectedCell:tempSelectedCell})
        console.log("cells al reset" + this.state.cells)
        console.log("tcells al reset" + tempcells)
    }

    render(){
        return (
       
            <div className ="col-9">
            <div className = "row" > 

            <Navbar bg="white" variant="light">
                <Container >
                <Nav className="me-auto mx-auto">
                    <Nav.Link href="#opcion 1">tbd</Nav.Link>
                    <Nav.Link href="#opcion 2">tbd</Nav.Link>
                </Nav>
                </Container>
            </Navbar>

            </div>
        <div className = "row" > 
        <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
        </div>
        <div className = "row mt-4 align-items-center" >
            <div className = "col-1" > </div>
            <div className = "col-2 text-center" > <PlayStopButton  text = "Reset" onButtonClick= {this.handleReset}/> </div>
            <div className = "col-3" > <h1 className = "font-face-zkga" id = "result">{this.state.resultText}</h1> </div>
          
            <div className = "col-1" > </div>
      </div>

        </div>
        
        )
    }
}


export default GameTwo