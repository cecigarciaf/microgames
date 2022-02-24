import React from 'react';
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

function UserSub(props){
    var color
 
    if(props.size === "4"){
        color = "brown"
    } else if(props.size === "3"){
        color = "chocolate"
    } else if(props.size === "2"){
        color = "coral"
    } else if(props.size ==="1"){
        color = "burlywood"
    }

    var style = {
        width: `${props.size * 2}rem`,
        height: "2rem",
        border:"1px solid grey",
        backgroundColor: color,
        display: "flex",
        margin: "4px"
    }

    return (
        <div className= "text-center justify-content-center" >
        <div   id = {props.id} size = {props.size} style = {style} onClick = {() => props.handleClick(props.size, props.id)}>   
        </div>
        </div>
    )
}

function Cell(props){

var cN = "text-center justify-content-center"


var containerStyle = {
    backgroundColor: "grey"
}
return (
    <div style= {containerStyle }>
    <div  shoots = {props.shoots} className= {cN}  style = {props.style(props.shoots)} cell = {props.cell} onContextMenu = {() => props.handleRightClick(props.row,props.col)} onClick = {() => props.handleClick(props.row,props.col)}>
        <tx ></tx>
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
            row.push(<Cell style= {props.style} color = {props.color} shoots  = {props.shoots[props.row][i]} text = {props.text[props.row][i]} key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleRightClick={props.handleRClick} handleClick = {props.handleClick}/>)
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
            board.push(<Row style= {props.style} color = {props.color} shoots = {props.shoots} text = {props.text} key = {i} row = {i} cells = {props.cells[i]} handleRClick = {props.handleRClick} handleClick = {props.handleClick}/>)
        }
        return (
            <div  className = "align-items-center justify-content-center row m-5" > 
            {board}
            </div>
        )
}

class UserBoard extends React.Component{
    constructor(props){
        super(props)
        

        //tablero derecha
        var userCells = []
        for(let i = 0; i < 14; i++ ){
        userCells.push(new Array(14).fill("x"))
        }
        var systemShoots = []
        for(let i = 0; i < 14; i++ ){
        systemShoots.push(new Array(14).fill("empty"));
        }    
        
        var shipsLocations = []
        for(let i = 0; i < 10; i++ ){
        shipsLocations.push(new Array(1).fill(0));
        }    
        
        this.state = {status: "pending" ,click1: 0, userCells:userCells, systemShoots:systemShoots, subSelected: 0, shipsLocations:shipsLocations, shipsToPlace:["4", "3", "3", "2", "2", "2", "1", "1", "1", "1"]}
        this.handleClick = this.handleClick.bind(this)
        this.handleBoardClick = this.handleBoardClick.bind(this)
        this.handleRClick = this.handleRClick.bind(this)
        this.confirmClick = this.confirmClick.bind(this)
    }

    handleClick(size, id){
        var subSelectedTemp = this.state.subSelected
        
        subSelectedTemp = [size, id]
     
        console.log("subSelectedTemp" + subSelectedTemp)
        this.setState({subSelected:subSelectedTemp})



    }
    rightstyle(shoots){
        var color 

        if(shoots=== "0")    {
            color = "brown"
        } else if((shoots=== "1") || (shoots=== "2")){
            color = "chocolate"
        } else if((shoots=== "3") || (shoots=== "4") || (shoots=== "5") ) {
            color = "coral"
        } else if((shoots=== "6") || (shoots=== "7") || (shoots=== "8") || (shoots=== "9")){
            color = "burlywood"
        } else {
            color = "rgb(199, 196, 196)"
        }

        var style = {
            width: "2rem",
            height: "2rem",
            border:"1px solid grey",
            backgroundColor: color
        }
        return style;
    }

    handleBoardClick(row, col){
    var userCellsTemp = this.state.userCells.slice()
    var subSelectedTemp = this.state.subSelected
    var shipsToPlaceTemp = this.state.shipsToPlace
    var shipsLocationsTemp = this.state.shipsLocations.slice()
    var sizeTemp =  parseInt(subSelectedTemp[0])
    var idTemp = subSelectedTemp[1]
    var click1Temp = this.state.click1
    if(this.state.status === "pending") {
    
        // click 1:
    if((click1Temp === 0) && (userCellsTemp[row][col] === "x")) {
        click1Temp = [row,col]
    } 
    // click 2:
    else if (click1Temp !== 0) {
    var check1
    var checksum1 = 0
	for(let i = -1; (i < (sizeTemp + 1)); i++) {
		if(userCellsTemp[row + 1][click1Temp[1] + i] === "x"){
                 checksum1++
		}
        
	} 
	if(checksum1 === (sizeTemp + 2)) {
		check1 = true;
	}

    var check2
    var checksum2 = 0
	for(let i = -1; (i < sizeTemp + 1); i++) {
		if(userCellsTemp[row - 1][click1Temp[1] + i] === "x"){
                 checksum2++
		}
	} 
	if(checksum2 === (sizeTemp + 2)) {
		check2 = true;
	}
    
    var check3
    var checksum3 = 0
	for(let i = -1; (i < sizeTemp + 1); i++) {
        
		if(userCellsTemp[row][click1Temp[1] + i] === "x"){
                 checksum3++
		}
	} 
	if(checksum3 === (sizeTemp + 2)) {
		check3 = true;
	}

    var check4
    var checksum4 = 0
	for(let i = -1; (i < sizeTemp + 1); i++) {
        
		if(userCellsTemp[click1Temp[0] + i][col] === "x"){
                 checksum4++
		}
	} 
	if(checksum4 === (sizeTemp + 2)) {
		check4 = true;
	}

    var check5
    var checksum5 = 0
	for(let i = -1; (i < (sizeTemp + 1)); i++) {
		if(userCellsTemp[click1Temp[0] + i][col + 1] === "x"){
                 checksum5++
		}
        
	} 
	if(checksum5 === (sizeTemp + 2)) {
		check5 = true;
	}

    var check6
    var checksum6 = 0
	for(let i = -1; (i < (sizeTemp + 1)); i++) {
		if(userCellsTemp[click1Temp[0] + i][col - 1] === "x"){
                 checksum6++
		}
        
	} 
	if(checksum6 === (sizeTemp + 2)) {
		check6 = true;
	}


    // row click 1 click1Temp[0]
     // col click 1 click1Temp[1]

    if( ((click1Temp[0]) === row)  &&  ( ((col - click1Temp[1]) ===  (sizeTemp - 1)) || ((click1Temp[1] - col) ===  (sizeTemp - 1))  )) {
            if(((click1Temp[1] + sizeTemp) < 13) && (check3) && (check2) && (check1)){
                console.log("checks ok")
                var i = 0
                do{
                    userCellsTemp[row][click1Temp[1] + i] = subSelectedTemp[1]
                    i++
                } while (i < sizeTemp);
                console.log("do while")
                shipsLocationsTemp[subSelectedTemp[1]] = [row, click1Temp[1], "h", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0
                console.log("shipsLocations" + shipsLocationsTemp)
                console.log("shipsLocations[0]" + shipsLocationsTemp[0])
            }
    }   
    else if ( ((click1Temp[1]) === col)  &&  ( ((row - click1Temp[0]) ===  (sizeTemp - 1)) || ((click1Temp[0] - row) ===  (sizeTemp - 1))  )) {
            if(((click1Temp[0] + sizeTemp) < 13) && (check4) && (check5) && (check6)){
                console.log("checks ok")
                var y = 0
                do{
                    userCellsTemp[(click1Temp[0] + y)][col] = subSelectedTemp[1]
                    y++
                } while (y < sizeTemp);
                console.log("do while")
                shipsLocationsTemp[subSelectedTemp[1]] = [click1Temp[0], col, "v", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0
                console.log("shipsLocations" + shipsLocationsTemp)
                console.log("shipsLocations[0]" + shipsLocationsTemp[0])
        }

    }
        click1Temp = 0
    }
        this.setState({click1: click1Temp, userCells:userCellsTemp, subSelected:subSelectedTemp, shipsToPlace:shipsToPlaceTemp, shipsLocations:shipsLocationsTemp})
        console.log(shipsToPlaceTemp)
    
    }
}

    handleRClick(row, col) {
    if(this.state.status === "pending"){
        console.log("right clic")
    var userCellsTemp = this.state.userCells.slice()
    var shipsLocationsTemp = this.state.shipsLocations.slice()
    var shipData = shipsLocationsTemp[userCellsTemp[row][col]]
    var shipsToPlaceTemp = this.state.shipsToPlace
    var id = userCellsTemp[row][col]
    
    var i = 0
        if((userCellsTemp[row][col] !== "x") && (shipData[2] === "h")){
            shipsToPlaceTemp[id] = shipData[3]

            do{
                userCellsTemp[shipData[0]][(shipData[1] + i)] = "x";
                i++
            } while (i < shipData[3])
            shipsLocationsTemp[id] = 0
        } else if ((userCellsTemp[row][col] !== "x") && (shipData[2] === "v")){
            shipsToPlaceTemp[id] = shipData[3]

            do{
                userCellsTemp[(shipData[0] + i)][shipData[1]] = "x";
                i++
            } while (i < shipData[3])
            shipsLocationsTemp[id] = 0
        }
    this.setState({userCells: userCellsTemp, shipsLocations:shipsLocationsTemp, shipsToPlace:shipsToPlaceTemp})
    }
    }
    confirmClick(){
        var shipsToPlaceTemp = this.state.shipsToPlace
        let pending = 0;

        for (let i = 0; i < shipsToPlaceTemp.length; i++) {
            pending += shipsToPlaceTemp[i];
        }
        if(pending === 0) {
            this.setState({status: "completed"})
        }
        console.log("status" + this.state.status)

    }
    render(){  

        return (
            <div className ="row" >
                <div className ="col-sm-12 col-md-8  d-md-block text-center">
                     <Board   style = {this.rightstyle} shoots = {this.state.userCells} text = {this.state.userCells} cells = {this.state.userCells} handleRClick = {this.handleRClick} handleClick = {this.handleBoardClick}/>
                </div>
                <div className ="col-sm-12 col-md-4 d-md-block text-center mt-4">
                            <UserSub id = "0" handleClick = {this.handleClick} size={this.state.shipsToPlace[0]}/>
                            <UserSub id = "1" handleClick = {this.handleClick} size={this.state.shipsToPlace[1]}/>
                            <UserSub id = "2" handleClick = {this.handleClick} size={this.state.shipsToPlace[2]}/>
                            <UserSub id = "3" handleClick = {this.handleClick} size={this.state.shipsToPlace[3]}/>
                            <UserSub id = "4" handleClick = {this.handleClick} size={this.state.shipsToPlace[4]}/>
                            <UserSub id = "5" handleClick = {this.handleClick} size={this.state.shipsToPlace[5]}/>       
                            <UserSub id = "6" handleClick = {this.handleClick} size={this.state.shipsToPlace[6]}/>
                            <UserSub id = "7" handleClick = {this.handleClick} size={this.state.shipsToPlace[7]}/>
                            <UserSub id = "8" handleClick = {this.handleClick} size={this.state.shipsToPlace[8]}/>
                            <UserSub id = "9" handleClick = {this.handleClick} size={this.state.shipsToPlace[9]}/>  
                </div>
                <div className ="row">
                    <PlayStopButton text= {this.state.status === "pending"?  "Confirm" : "Confirmed"} onButtonClick = {this.confirmClick}/>
                </div>
            </div>
        )
    }
} 

class GameFive extends React.Component{
    constructor(props){
        super(props)
        
        //tablero izquierda
        var cells = []
        for(let i = 0; i < 14; i++ ){
        cells.push(new Array(14).fill(0))
        }
        var userShoots = []
        for(let i = 0; i < 14; i++ ){
        userShoots.push(new Array(14).fill("empty"));
        }


        this.state = {turn: "placeShips", cells:cells, playingState:false, userShoots:userShoots, leftClics: 0}
        this.playClick = this.playClick.bind(this)
        this.handleClick = this.handleClick.bind(this)
        this.handleRClick = this.handleRClick.bind(this)
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
    console.log(this.state.userShoots)
}

playClick(){
var tempPlayingState = this.state.playingState
console.log("UBstatus" + UserBoard.props)
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
    
leftstyle(shoots){


    var color = "rgb(199, 196, 196)"

     if(shoots > 0){
        color = "brown"
    }
    else if(shoots=== 0){
        color = "blue"
    } else if(shoots === "safe") {
        color = "white";
    }

    var style = {
        width: "2rem",
        height: "2rem",
        border:"1px solid grey",
        backgroundColor: color
    }
    return style;
}


    render(){  


        return (
            <div className ="col-9">
                <div className = "row" > 
                
                    <Navbar bg="white" variant="light">
                        <Container >
                        <Nav className="me-auto mx-auto">
                     
                        </Nav>
                        </Container>
                    </Navbar>
                </div>

                <div className = "row" > 
                    <div className ="col-sm-12 col-md-5  d-md-block text-center">
                    <Board style= {this.leftstyle} shoots = {this.state.userShoots} text = {this.state.cells} cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
                     </div>
                     
                    <div className ="col-sm-12 col-md-7  d-md-block text-center">
                        <UserBoard  />
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