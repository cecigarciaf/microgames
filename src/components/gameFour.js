import React from 'react';
import './gameFour.css';
import PlayStopButton from './playButton';
import Instructions from './Instructions'
import InstructionsButton from './InstructionsButton';
import HowToPlay from './HowToPlay'
import Container from 'react-bootstrap/Container';
import SecondarySelector from './SecondarySelector'
import Board from './Board'


const howtoplay = () => {
    return (
        <HowToPlay gameInstructions= "InstruccionesBombs"/>
    )
}

//cuadro con cantidad de bombas:
function UserBomb(props){
    var style = {
        display: "flex",
        justifyContent: "center",
        color: "rgb(223, 164, 176)",
        backgroundColor: "white",
        border:"2px solid grey",
        fontWeight: "bold",
        height: "25px",
        width: "5px",
       
   
    }
    return (
        <div  className = " rounded mt-1 mx-auto"  style = {style}><div  style={{fontSize: "17px", lineHeight: "20px"}}>{props.text}</div></div>
    )
}




class GameFour extends React.Component{
constructor(props){
    super(props)

    var result = []
    for(let i = 0; i < 10; i++ ){
    result.push(new Array(10).fill(""))
    }

    var userBombs = []
    for(let i = 0; i < 10; i++ ){
    userBombs.push(new Array(10).fill(""))
    }

    var cells = []
    for(let i = 0; i < 10; i++ ){
    cells.push(new Array(10).fill(0))
}

    this.state = {show: false, level: 0, playingState: false, bombsleft:"", cells:cells, correctCells: [], result:result, userBombs: userBombs}
    this.playClick = this.playClick.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleRClick = this.handleRClick.bind(this)
    this.handleLevel = this.handleLevel.bind(this)
    this.instructions = this.instructions.bind(this)
}

handleLevel(event) {
    var level = event.target.id
    var cells = []
    for(let i = 0; i < 10; i++ ){
    cells.push(new Array(10).fill(0))
    }

    var result = []
    for(let i = 0; i < 10; i++ ){
    result.push(new Array(10).fill(""))
    }
   if (this.state.playingState === false){
    this.setState({level:level, cells:cells, result:result})
    

    }
    else if (this.state.playingState === true){
        this.setState({level:level, cells:cells, result:result, playingState:false})
        }
}

handleRClick(row, col, e) {
    console.log("aca")
    var tempuserBombs = this.state.userBombs.slice()
    var bombsleftTemp = this.state.bombsleft
    e.preventDefault()
    
    if ((this.state.playingState === true) && (tempuserBombs[row][col] === "")) {
    bombsleftTemp--
    tempuserBombs[row][col] =  "bomba"
        
    } else if ((this.state.playingState === true) && (tempuserBombs[row][col] === "bomba")) {
        bombsleftTemp++
        tempuserBombs[row][col] =  ""
    }
    this.setState({bombsleft:bombsleftTemp, userBombs:tempuserBombs})
}

playClick() {
    var result = []
    for(let i = 0; i < 10; i++ ){
    result.push(new Array(10).fill(""))
    }

    var userBombs = []
    for(let i = 0; i < 10; i++ ){
    userBombs.push(new Array(10).fill(""))
    }

    var cells = []
    for(let i = 0; i < 10; i++ ){
    cells.push(new Array(10).fill(0))
}

    var tempcells = JSON.parse(JSON.stringify(cells))
    let i = 0  
    var bombAmount = this.state.level

    if ((this.state.playingState === false) && (this.state.level > 0)) {
        while (i< bombAmount ) {    

            var index1 = Math.round(Math.random() * (bombAmount - 1))
            var index2 = Math.round(Math.random() * (bombAmount - 1))

                if (tempcells[index1][index2] === 0) {

                    tempcells[index1][index2] = "a";
                    i++
            
                    if(index1 < (bombAmount - 1)  && !(tempcells[(index1 + 1)][index2] ===   "a")){
                        tempcells[index1 + 1][index2] = tempcells[(index1 + 1)][index2] + 1
                    };

                    if(index1 > 0 && !(tempcells[index1 - 1][index2] ===   "a")){
                    tempcells[index1 - 1][index2] = tempcells[index1 - 1][index2] + 1
                    }

                    if(index2 < (bombAmount - 1) && !(tempcells[index1][index2 + 1] ===   "a")){
                    tempcells[index1][index2 + 1] = tempcells[index1][index2 + 1] + 1
                    }

                    if(index2 > 0 && !(tempcells[index1][index2 - 1] ===   "a")){
                    tempcells[index1][index2 - 1] = tempcells[index1][index2 - 1] + 1
                    }

                    if(index2 > 0 && index1 > 0 && !(tempcells[index1 - 1][index2 - 1] === "a")){
                    tempcells[index1 - 1][index2  - 1] = tempcells[index1 - 1][index2  - 1] + 1
                    }

                    if(index2 < (bombAmount - 1) && index1 < (bombAmount - 1) && !(tempcells[index1 + 1][index2 + 1] === "a")){
                    tempcells[index1 + 1][index2  + 1] = tempcells[index1 + 1][index2  + 1] + 1
                    }

                    if(index1 < (bombAmount - 1) && index2 > 0 && !(tempcells[index1 + 1][index2 - 1] === "a")){
                    tempcells[index1 + 1][index2 - 1] = tempcells[index1 + 1][index2 - 1] + 1
                    }

                    if(index1 > 0 && index2 < (bombAmount - 1) && !(tempcells[index1 - 1][index2 + 1] === "a")){
                    tempcells[index1 - 1][index2 + 1] = tempcells[index1 - 1][index2 + 1] + 1
                    }
                
                } 
        }  
      
    var tempCorrectCells = JSON.parse(JSON.stringify(tempcells))
    var tempBombsLeft = this.state.level
    this.setState({result:result, cells:tempcells, correctCells:tempCorrectCells, bombsleft:tempBombsLeft , playingState: true  })
    console.log("cells" + tempcells)
    } else if (this.state.playingState === true) {
        this.setState({result:result, level: 0, playingState: false, bombsleft:"", cells:cells, correctCells: [], result:result, userBombs: userBombs})
    }
}

down(row,col, tempcells){
var rowcolAmount = this.state.level
var tempresult = this.state.result.slice()
var localrow = row + 1 
var localcol = col
    if ((localrow >= 0) && (localrow < (rowcolAmount)) && (localcol >= 0) && (localcol < (rowcolAmount))) {
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
var rowcolAmount = this.state.level
var tempresult = this.state.result.slice()
var localrow = row - 1 
var localcol = col
if ((localrow >= 0) && (localrow < rowcolAmount) && (localcol >= 0) && (localcol < rowcolAmount)) {
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
var rowcolAmount = this.state.level
var tempresult = this.state.result.slice()
var localrow = row 
var localcol = col - 1 
if ((localrow >= 0) && (localrow < rowcolAmount) && (localcol >= 0) && (localcol < rowcolAmount)) {
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
var rowcolAmount = this.state.level
var tempresult = this.state.result.slice()
var localrow = row 
var localcol = col + 1 
if ((localrow >= 0) && (localrow < rowcolAmount) && (localcol >= 0) && (localcol < rowcolAmount)) {
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
    var tempcells = this.state.cells.slice()
    var tempresult = this.state.result.slice()
    var tempcells2 = tempcells.slice()
    var tempuserBombs = this.state.userBombs.slice()
    if ((this.state.playingState === true)&& (!(tempuserBombs[row][col] ===  "bomba"))) {
        // si hay bomba se pone roja
        if (tempcells[row][col] === "a") {
            
           
           var localcol = 0
        while (localcol < this.state.level) {
            var localrow = 0
            while (localrow < this.state.level) {
                if (tempcells2[localrow][localcol] === "a"){
                    tempcells2[localrow][localcol] = "b"

                } else if (tempcells2[localrow][localcol] > 0) {
                    tempcells2[localrow][localcol] = "c"
                    tempresult[localrow][localcol] = this.state.correctCells[localrow][localcol]
                } else if (tempcells2[localrow][localcol]  === 0) {
                    tempcells2[localrow][localcol] = "c";
                  
                }
                localrow++
            }
            localcol++
        }
            //tempcells[row][col] = "b"
            

            this.setState({cells:tempcells2, result: tempresult, playingState: false})
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
            }
          }
    }
}

instructions(){
    var showTemp = this.state.show
    if(showTemp === false){
        showTemp = true
    } else if (showTemp === true){
        showTemp = false
    }
    this.setState({show: showTemp})
}   

cellsStyle(cells, statusarray){

var color = "rgb(199, 196, 196)"
var cN = "text-center justify-content-center"
var backgroundColor = "rgb(199, 196, 196)"


var containerStyle = {
    border:"0.5px solid rgb(230, 212, 247)",
    backgroundColor: {backgroundColor }
}
if(cells === "b"){
    color = "rgb(223, 164, 176)"
}
else if(cells === "c"){
    color = "white"
} else if(statusarray === "bomba") {
    color = "black";
    cN = "text-center justify-content-center rounded-circle ";
}
var style = {
    width: "1.8rem",
    height: "1.8rem",
    backgroundColor: color,
    lineHeight: "1.8",
    fontSize: "30"
}


return style
}


cN(statusarray1, statusarray2){
    var cN = "text-center justify-content-center"

        if(statusarray2 === "bomba") {
            cN = "text-center justify-content-center rounded-circle ";
        }
        return cN
        }

containerStyle(){
    var backgroundColor = "rgb(199, 196, 196)"  
    var containerStyle = {
        border:"0.5px solid rgb(230, 212, 247)",
        backgroundColor: {backgroundColor}
    }       
        return containerStyle
}

render(){  
    return (
        <div className ="col-9">
            <div className = "row mt-4 " >
                <div className = "col-10 text-end " >
                    <InstructionsButton instructions = {this.instructions}/>     
                    <Instructions instructions = {this.instructions} show= {this.state.show} instructDetails= {howtoplay()} /> 
                </div>
            </div>
            <div className = "row" > 
            <SecondarySelector  menuTitle="Level" texts= {["NivelesBombs.1", "NivelesBombs.2", "NivelesBombs.3"]} ids={["4", "8", "10"]}handleLevel= {this.handleLevel}/>
        </div>

            <Container>


                <div className = "align-items-center justify-content-center row" > 
                    <div className ="col-6">
                        <div>
                            <div style={{height: "30px"}}>
                                <div className= "row " style={{display: this.state.playingState === false?  "none" : "block" }}id="userBombs" >
                                    <UserBomb   text = {this.state.bombsleft}/>
                                </div>
                            </div>
                            <Board boardclass = "align-items-center justify-content-center row m-2" cellStyle={this.cellsStyle} statusarray1 = {this.state.cells} statusarray2 = {this.state.userBombs} containerStyle = {this.containerStyle} cN = {this.cN} initCell = {0} lastCell= {this.state.level}  result = {this.state.result != "bomba" ? this.state.result : ""} cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
                        </div>
                    </div>   
                </div>

                <div className = "row mt-4 align-items-center justify-content-center" >



                        <div className = "col-sm-12 col-md-6 col-lg-2 col-xl-2 d-md-block text-center" >
                            <PlayStopButton text= {this.state.playingState === false?  "PLAY" : "QUIT"} onButtonClick = {this.playClick}/>
                        </div>
                
                </div> 
            </Container>
        </div> 

            )
        }
} 


export default GameFour;