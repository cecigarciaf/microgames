import React from 'react';
import Nav  from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import './gameTwo.css';

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
      
       <Button className = "font-face-zkgam"  id="playbutton" size="lg" variant="outline-dark"  onClick={this.handleClick}>{this.props.text}</Button>
     
  
    )
    }
  }  

function Cell(props){
    var color = "black"
    if(props.cell === "empty"){
        color = "white"
    } else if (props.cell === "clicked") {
        color = "violet"
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
        for (let i=2; i<9; i++) {
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
        for (let i=2; i<4; i++) {
            row.push(<NoCell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} />)
        }
        for (let i=4; i<7; i++) {
            row.push(<Cell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
        }
        for (let i=7; i<9; i++) {
            row.push(<NoCell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} />)
        }

    return (
        <div className= "justify-content-center" style = {style}>
        {row}
        </div>
    )
}


function Board(props) {
    var board = []
        for (let i=2; i<4; i++) {
            board.push(<ShortRow key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
        }
        for (let i=4; i<7; i++) {
            board.push(<LongRow key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
        }
        for (let i=7; i<9; i++) {
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

        // en realidad son 7 rows de 7 pero puse mas para arreglar un error en el handleClick: IGUAL NO ANDA AUN
    
    var cells2 = []
    for(let i = 0; i < 12; i++ ){
    cells2.push(new Array(12).fill("full"))
    }    
    cells2[5][5] = "empty"
    this.state = {cells:cells2, selectedCell: "no", resultText: ""}
    this.handleClick = this.handleClick.bind(this)
    this.handleReset = this.handleReset.bind(this)

    }

    handleClick(row,col) {
        var tempcells = this.state.cells.slice()
        var tempSelectedCell = this.state.selectedCell
        var resultTextCopy = this.state.resultText


        // Casos 1er click:
        if ( tempSelectedCell === 'no'){
            // 1er clic en casilla ocupada la pone violet
            if (tempcells[row][col] === "full") {
                tempcells[row][col] = "clicked"
                tempSelectedCell = "si"
                resultTextCopy = ""
                
            } 
            //1er clic en casilla vacia da error
            else if (tempcells[row][col] === "empty" ) {
                resultTextCopy = "That's not a valid cell"
              }

               // Casos 2do click:  
        } 
        
        else if ( tempSelectedCell === 'si') {
         
        // 2 clic en casilla ocupada error:
        if (tempcells[row][col] === "full") {
            resultTextCopy = "That's not a valid cell"
        } 

        //2do clic en casilla seleccionada la desselecciona:
        else if (tempcells[row][col] === "clicked") {
            tempcells[row][col] = "full"
            tempSelectedCell = "no"

            }
        else if ((tempcells[row][col + 2] === "clicked") && (tempcells[row][col] === "empty" )) {
            tempcells[row][col] = "full";
            tempcells[row][col + 2] = "empty";
            tempcells[row][col + 1] = "empty";
            tempSelectedCell = "no"
        }     



        else if ((tempcells[row][col - 2] === "clicked") && (tempcells[row][col] === "empty" )) {
                tempcells[row][col] = "full";
                tempcells[row][col - 2] = "empty";
                tempcells[row][col - 1] = "empty";
                tempSelectedCell = "no"
        }
        else if ((tempcells[row + 2][col] === "clicked") && (tempcells[row][col] === "empty" )) {
           
            tempcells[row][col] = "full";
            tempcells[row + 2][col] = "empty";
            tempcells[row + 1][col] = "empty";
            tempSelectedCell = "no"
    } 

    else if ((tempcells[row - 2][col] === "clicked") && (tempcells[row][col] === "empty" )) {
        
            tempcells[row][col] = "full";
            tempcells[row - 2][col] = "empty";
            tempcells[row - 1][col] = "empty";
            tempSelectedCell = "no"         
        }
    

        }

        this.setState({cells:tempcells, selectedCell: tempSelectedCell, resultText: resultTextCopy})
    }






    handleReset() {
        var tempcells = []
        var tempSelectedCell = "no"

 
        for(let i = 0; i < 12; i++ ){
        tempcells.push(new Array(12).fill("full"))
        }
        tempcells[5][5] = "empty"
        this.setState({cells:tempcells, selectedCell:tempSelectedCell})
        console.log("cells al reset" + this.state.cells)
        console.log("tcells al reset" + tempcells)
    }

    render(){
        // nav bar vacia , no se que poner
        return (
       
            <div className ="col-9">
                <div className = "row" > 
                    <Navbar bg="white" variant="light">
                        <Container >
                        <Nav className="me-auto mx-auto">
                            <Nav.Link href="#opcion 1"></Nav.Link>
                            <Nav.Link href="#opcion 2"></Nav.Link>
                        </Nav>
                        </Container>
                    </Navbar>
                </div>

                <div className = "row" > 
                    <div className ="col-6">
                        <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
                    </div>
                </div>
                
                <div className = "row mt-4 align-items-center" >
                    <div className = "col-3 text-center" > <PlayStopButton  text = "Reset" onButtonClick= {this.handleReset}/> </div>
                    <div className = "col-3" > <h1 className = "font-face-zkga" id = "result">{this.state.resultText}</h1> </div>
                </div>
             </div>

        )
    }
}


export default GameTwo