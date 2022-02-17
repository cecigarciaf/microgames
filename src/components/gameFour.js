import React from 'react';


function UserBomb(props){
    var style = {
        color: "red",
        fontSize: "60",
        textAlign: "center",
        backgroundColor: "black"
    }

    return (
        <span style = {style}>{props.text}</span>
)
}


function Button(props){

var style = {
    color: "red",
    fontSize: "45",
    textAlign: "center",
    backgroundColor: "black"
}

return (
    <button style = {style} onClick = {() => props.playClick()}>PLAY</button>
)
}


function Cell(props){
var color = "grey"
if(props.cell == "b"){
    color = "red"
}
else if(props.cell == "c"){
    color = "white"
}

var style = {
    height:50,
    width:50,
    border:"1px solid black",

    backgroundColor: color

}

return (
    <div style = {style} cell = {props.cell} onClick = {() => props.handleClick(props.row,props.col)}>
    </div>
)
}

function Row(props) {
var style = {
    display: "flex"
}

var row = []
    for (let i=0; i<8; i++) {
        row.push(<Cell  key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
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
        board.push(<Row key = {i} row = {i} cells = {props.cells[i]} handleClick = {props.handleClick}/>)
    }

return (
    <div className = "row" > 
    {board}
    </div>
)
}

class GameFour extends React.Component{
constructor(props){
    super(props)

    var cells = []
    for(let i = 0; i < 8; i++ ){
    cells.push(new Array(8).fill(0))
}

    var bombsaround = []
    for(let i = 0; i < 8; i++ ){
    bombsaround.push(new Array(8).fill(0))
    }

    this.state = {bombsleft:"-", cells:cells}
    this.playClick = this.playClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
}

playClick(row,col) {
    this.setState({bombsleft:10})
    var tempcells = this.state.cells.slice()

    
    for (var i = 0; i<10; i++) {
        var index1 = Math.round(Math.random() * 7)
        var index2 = Math.round(Math.random() * 7)
        
            if (tempcells[index1][index2] == 0) {

                tempcells[index1][index2] = "a";
                if(index1 < 7  && !(tempcells[(index1 + 1)][index2] ==   "a")){
                    tempcells[index1 + 1][index2] = tempcells[(index1 + 1)][index2] + 1
                };

                if(index1 > 0 && !(tempcells[index1 - 1][index2] ==   "a")){
                tempcells[index1 - 1][index2] = tempcells[index1 - 1][index2] + 1
                }

                if(index2 < 7 && !(tempcells[index1][index2 + 1] ==   "a")){
                tempcells[index1][index2 + 1] = tempcells[index1][index2 + 1] + 1
                }

                if(index2 > 0 && !(tempcells[index1][index2 - 1] ==   "a")){
                tempcells[index1][index2 - 1] = tempcells[index1][index2 - 1] + 1
                }

                if(index2 > 0 && index1 > 0 && !(tempcells[index1 - 1][index2 - 1] == "a")){
                tempcells[index1 - 1][index2  - 1] = tempcells[index1 - 1][index2  - 1] + 1
                }

                if(index2 < 7 && index1 < 7 && !(tempcells[index1 + 1][index2 + 1] == "a")){
                tempcells[index1 + 1][index2  + 1] = tempcells[index1 + 1][index2  + 1] + 1
                }

                if(index1 < 7 && index2 > 0 && !(tempcells[index1 + 1][index2 - 1] == "a")){
                tempcells[index1 + 1][index2 - 1] = tempcells[index1 + 1][index2 - 1] + 1
                }

                if(index1 > 0 && index2 < 7 && !(tempcells[index1 - 1][index2 + 1] == "a")){
                tempcells[index1 - 1][index2 + 1] = tempcells[index1 - 1][index2 + 1] + 1
                }
            
                i++
                }  
    }
    
    this.setState({cells:tempcells})
    console.log(this.state.cells)   
} 


handleClick(row,col) {
    var tempcells = this.state.cells.slice()
    // si hay bomba se pone roja
    if (tempcells[row][col] == "a") {
        tempcells[row][col] = "b"
        this.setState({cells:tempcells})
    } else {
    // si hay bombas adjacentes se pone blanca
        if (tempcells[row][col] > 0) {
            tempcells[row][col] = "c"
    } else {
        // si no hay nada....
                     // se pone blanca
        if (tempcells[row][col] == 0) {
            tempcells[row][col] = "c"
            
            var i = 1
            var b = 1
            var d = 1
            // pone blancas a las de la derecha si la de la derecha no es bomba y sigue loop si esa no tiene bombas adjacente 
            while (i < (8 - col) && !(tempcells[row][(col + i)] == "a") && tempcells[row][(col + i)] == 0) {            
                tempcells[row][(col + i)] = "c"
                // pone blanca a la de abajo de la derecha si no tiene bombas y sigue loop si esa no tiene bombas adjacente 
                while (b < (8 - row) && !(tempcells[row + b][(col + i)] == "a") && tempcells[row + b][(col + i)] == 0) {                   
                tempcells[row + b][(col + i)] = "c"
                b++
                } // pone blanca a la de abajo de la derecha si no tiene bombas y para loop si esa tiene bombas adjacente 
                while (b < (8 - row) && !(tempcells[row + b][(col  + i)] == "a") && tempcells[row + b][(col  + i)] > 0) {
                tempcells[row + b][(col  + i)] = "c"
                }

                i++;
            }
                // pone blancas a las de la derecha si la de la derecha no es bomba y para el loop porque esa tiene bombas adjacente
            while (i < (8 - col) && !(tempcells[row][(col + i)] == "a") && tempcells[row][(col + i)] > 0) { 
                    tempcells[row][(col + i)] = "c"
                // pone blanca a la de abajo de la derecha si no tiene bombas y sigue loop si esa no tiene bombas adjacente 
                while (d < (8 - row) && !(tempcells[row + d][(col + i)] == "a") && tempcells[row + d][(col + i)] == 0) {                   
                tempcells[row + b][(col + i)] = "c"
                b++
                } // pone blanca a la de abajo de la derecha si no tiene bombas y para loop si esa tiene bombas adjacente 
                while (d < (8 - row) && !(tempcells[row + d][(col  + i)] == "a") && tempcells[row + d][(col  + i)] > 0) {
                tempcells[row + d][(col  + i)] = "c"
                }
            }


            var n = 1
            while (n < (col + 1) && !(tempcells[row][(col - n)] == "a") && tempcells[row][(col - n)] == 0) {                   
                tempcells[row][(col - n)] = "c"
                n++;
            }
            
            while (n < (col + 1) && !(tempcells[row][(col - n)] == "a") && tempcells[row][(col - n)] > 0) { 
                tempcells[row][(col - n)] = "c"
            }
            
            
            var c = 1
            while (c < (8 - row) && !(tempcells[row + c][(col)] == "a") && tempcells[row + c][(col)] == 0) {                   
                tempcells[row + c][(col)] = "c"
                c++;
            }
            
            while (c < (8 - row) && !(tempcells[row + c][(col)] == "a") && tempcells[row + c][(col)] > 0) {
                tempcells[row + c][(col)] = "c"
            }  
            
            var t = 1
            while ((t < (row + 1)) && !(tempcells[row - t][(col)] == "a")&& tempcells[row - t][(col)] == 0) {                   
                tempcells[row - t][(col)] = "c"
                t++;
            }
            while ((t < (row + 1)) && !(tempcells[row - t][(col)] == "a")&& tempcells[row - t][(col)] == 0) {                   
            tempcells[row - t][(col)] = "c"
            }

        }
                this.setState({cells:tempcells})
            
    console.log("row: " + row + " | col: " + col)
    console.log(this.state.cells)

}
}
}
render(){
return (

    <div className ="col-9">

        <div className = "row" > 
            <div className ="col-6">
                <Board cells = {this.state.cells} handleClick = {this.handleClick}/>
            </div>
        </div>

        <div className = "row mt-4 align-items-center" >
            <div className = "col-3 text-center" >
                <UserBomb text = {this.state.bombsleft}/>
            </div>
            <div className = "col-3 text-center" >
                <Button playClick = {this.playClick}/>
            </div>
        </div> 
    </div> 
  
        )
        }
} 


export default GameFour