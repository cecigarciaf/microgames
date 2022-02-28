import React from 'react';
import PlayStopButton from './playButton';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'


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
        <div id= "userSubsDiv" className= "text-center justify-content-center" >
        <div   id = {props.id} size = {props.size} style = {style} onClick = {() => props.handleClick(props.size, props.id)}>   
        </div>
        </div>
    )
}

function Cell(props){

var cN = "text-center justify-content-center test"


var containerStyle = {
    backgroundColor: "grey"
}
return (
    <div style= {containerStyle }>
    <div  systemshoots = {props.systemshoots} shoots = {props.shoots} className= {cN}  style = {props.style(props.shoots, props.systemshoots)} cell = {props.cell} onContextMenu = {() => props.handleRightClick(props.row,props.col)} onClick = {() => props.handleClick(props.row,props.col)}>
        <tx >{props.text} </tx>
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
            row.push(<Cell style= {props.style} color = {props.color} systemshoots = {props.systemshoots[props.row][i]}  shoots  = {props.shoots[props.row][i]} text = {props.text[props.row][i]} key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleRightClick={props.handleRClick} handleClick = {props.handleClick}/>)
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
            board.push(<Row style= {props.style} color = {props.color} systemshoots = {props.systemshoots} shoots = {props.shoots} text = {props.text} key = {i} row = {i} cells = {props.cells[i]} handleRClick = {props.handleRClick} handleClick = {props.handleClick}/>)
        }
        return (
            <div  className = "align-items-center justify-content-center row m-5" > 
            {board}
            </div>
        )
}


//barcos para poner:
class UserSubs extends React.Component{
    constructor(props){
        super(props)
    }
    render(){  
        return (
            <div className ="col-sm-12 col-md-4 d-md-block text-center mt-4">
                <UserSub id = "0" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[0]}/>
                <UserSub id = "1" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[1]}/>
                <UserSub id = "2" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[2]}/>
                <UserSub id = "3" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[3]}/>
                <UserSub id = "4" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[4]}/>
                <UserSub id = "5" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[5]}/>       
                <UserSub id = "6" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[6]}/>
                <UserSub id = "7" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[7]}/>
                <UserSub id = "8" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[8]}/>
                <UserSub id = "9" handleClick = {this.props.handleClick} size={this.props.shipsToPlace[9]}/>  
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
        var leftShipLocations = []
        for(let i = 0; i < 10; i++ ){
        shipsLocations.push(new Array(1).fill(0));
        } 

        this.state = {hundidosSystem: 0, hundidos: 0, show: true, text: "", textSystem: "", leftShipLocations: leftShipLocations, lastSystemShoot: [], status: "pending" ,click1: 0, turn: "user", cells:cells, playingState:false, userShoots:userShoots, leftClics: 0, subSelected: 0, shipsToPlace:["4", "3", "3", "2", "2", "2", "1", "1", "1", "1"], userCells:userCells, systemShoots:systemShoots, shipsLocations:shipsLocations}
        this.playClick = this.playClick.bind(this)
        //en tablero izquierda:
        this.handleClick = this.handleClick.bind(this)
        this.handleRClick = this.handleRClick.bind(this)
        //en barcos para poner:
        this.handleSubSelectClick = this.handleSubSelectClick.bind(this)
        //en tableto derecha:
        this.handleROnRightBoardClick = this.handleROnRightBoardClick.bind(this)
        this.handleRBoardClick = this.handleRBoardClick.bind(this)
        this.confirmClick = this.confirmClick.bind(this)
        this.instructions = this.instructions.bind(this)
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
//click en barco para poner:
handleSubSelectClick(size, id){
    var subSelectedTemp = [size, id]
    
    console.log("subSelectedTemp" + subSelectedTemp)
    this.setState({subSelected:subSelectedTemp})
}    

confirmClick(){
    var shipsToPlaceTemp = this.state.shipsToPlace
    let pending = 0;

    for (let i = 0; i < shipsToPlaceTemp.length; i++) {
        pending += shipsToPlaceTemp[i];
    }
    if(pending === 0) {
        this.setState({status: "completed", turn: "user"})
    }
    console.log("status" + this.state.status)
    console.log("this.state.userCells al confirmClick" + this.state.userCells)

}

//right clic en tablero izzquierda
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
    console.log("lastSystemShoot" + this.state.lastSystemShoot)
    console.log("systemShoots al clic" + this.state.systemShoots)
    var turnTemp = this.state.turn
    var leftShipLocationsTemp = this.state.leftShipLocations
    var textTemp
    var hundidosTemp = this.state.hundidos
    var tempcells = this.state.cells.slice()
    var tempUserShoots = this.state.userShoots.slice()
    if((this.state.playingState === true) && (turnTemp  === "user") && (tempUserShoots[row][col] === "empty")) {

        var tempClics = this.state.leftClics

    
        if (tempUserShoots[row][col] === "empty") {

            tempUserShoots[row][col] = tempcells[row][col]
        }

        if (tempcells[row][col] > 0)  {
            var indexTemp = (tempcells[row][col]) - 1
            var sizeTemp = leftShipLocationsTemp[indexTemp][3]
            var localrow = leftShipLocationsTemp[indexTemp][0]
            var localcol = leftShipLocationsTemp[indexTemp][1]
            var count = 0
            if(leftShipLocationsTemp[indexTemp][2] === "h"){
                var i = 0
           
                   do{ 
                       if(tempUserShoots[localrow][localcol + count] === tempcells[row][col]){
                        count++
                    }
                    i++
                    } while (i<sizeTemp)
            }
            else if(leftShipLocationsTemp[indexTemp][2] === "v"){
                i = 0
           
                   do{ 
                       if(tempUserShoots[localrow + count][localcol] === tempcells[row][col]){
                        count++
                    }
                    i++
                    } while (i<sizeTemp)
            }


            if((count === sizeTemp) && (hundidosTemp === 9)){
                textTemp = "GANASTE"
           
            }
            else if((count === sizeTemp) && (hundidosTemp < 9)){
                textTemp = "HUNDIDO"
                hundidosTemp++
            }

             else {
        
                textTemp = "TOCADO"
            }

            console.log("6")
            this.setState({hundidos: hundidosTemp, text: textTemp, userShoots:tempUserShoots, leftClics:tempClics, turn: "user" }) 
        } else if (!(tempcells[row][col] > 0)) {
            textTemp = "AGUA"
        this.setState({text: textTemp, userShoots:tempUserShoots, leftClics:tempClics, turn: "system" }) 
        setTimeout(() => this.systemTurn(), 1000)
        }
    }

}


systemTurn(){
    var turnTemp = "system"
    console.log("system turn")
    console.log("shipsLocations inicio" + this.state.shipsLocations)
    console.log("hundidos system inicio" + this.state.hundidosSystem)

    var systemRow = Math.floor(Math.random() * (12 - 2)) + 2;
    var systemCol = Math.floor(Math.random() * (12 - 2)) + 2;
    var systemShootsTemp = JSON.parse(JSON.stringify(this.state.systemShoots))
    var userCellsTemp = JSON.parse(JSON.stringify(this.state.userCells))
    var lastSystemShootTemp = this.state.lastSystemShoot.slice()
    var hundidosSystemTemp = this.state.hundidosSystem
    console.log("hundidos system inicio" + hundidosSystemTemp)

    if (!(systemShootsTemp[systemRow][systemCol] === "empty")){
        this.systemTurn()
    }
    //si no lo había disparado a la cell...
    else if (systemShootsTemp[systemRow][systemCol] === "empty"){
        var thisShootNumber
        var thisShootStatus = userCellsTemp[systemRow][systemCol] > -1? "shoot":"no shoot"
           
        // dispara:
        systemShootsTemp[systemRow][systemCol] = userCellsTemp[systemRow][systemCol]
                // si es tocado  sube el thisshootnumber:
        if (thisShootStatus ===  "shoot") {
            thisShootNumber = (lastSystemShootTemp[3] + 1)
            lastSystemShootTemp = [systemRow, systemCol, thisShootStatus, thisShootNumber]
            
                    //this down:
            console.log("THIS DOWN INICIO")


            let i = 1
            let row = systemRow
            let col = systemCol

            while(((row + i)  < 12) && (turnTemp === "system") && (systemShootsTemp[(row + i)][col] === "empty")) {
                thisShootStatus = userCellsTemp[(row + i)][col] > - 1? "shoot":"no shoot"  
                systemShootsTemp[(row + i)][col] = userCellsTemp[(row + i)][col]
                    // si es tocado:
                    if (thisShootStatus === "shoot") {   
                    thisShootNumber = (lastSystemShootTemp[3] + 1)
                    lastSystemShootTemp = [(row + i) , col, thisShootStatus, thisShootNumber]

                    } 
                    else if (thisShootStatus === "no shoot") {
                        thisShootNumber = 0
                        turnTemp = "user" 
                        lastSystemShootTemp = [(row + i) , col, thisShootStatus, thisShootNumber]

                    }
                i++
                
            }  //fin this down.
            //this up:

           i = - 1
           
            while(((row + i)  > 1) && (turnTemp === "system") && (systemShootsTemp[(row + i)][col] === "empty")) {
                    thisShootStatus = userCellsTemp[(row + i)][col] > - 1? "shoot":"no shoot"  
                    systemShootsTemp[(row + i)][col] = userCellsTemp[(row + i)][col]
                    // si es tocado:
                    if (thisShootStatus === "shoot") {
                        thisShootNumber = (lastSystemShootTemp[3] + 1)
                        lastSystemShootTemp = [(row + i) , col, thisShootStatus, thisShootNumber]
                    } 
                    
                    else if (thisShootStatus === "no shoot") {
                        thisShootNumber = 0
                        lastSystemShootTemp = [(row + i) , col, thisShootStatus, thisShootNumber]
                        turnTemp = "user"
                    }
                    lastSystemShootTemp = [(row + i) , col, thisShootStatus, thisShootNumber]
        
                
                i--

            }  // fin this up
                //this.left       
               i = - 1
                while(((col + i)  > 1) && (turnTemp === "system") && (systemShootsTemp[row][(col + i)] === "empty")) {
                        thisShootStatus = userCellsTemp[row][(col + i)] > 0? "shoot":"no shoot"  
                        systemShootsTemp[row][(col + i)] = userCellsTemp[row][(col + i)]
                        // si es tocado:
                        if (thisShootStatus === "shoot") {
                        thisShootNumber = (lastSystemShootTemp[3] + 1)
                        lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
            
                        } 
                        
                        else if (thisShootStatus === "no shoot") {
                            thisShootNumber = 0
                            lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
                            turnTemp = "user"
                        }
                        lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
            
                    
                    i--
                }  // fin left

                    // right:

                    i =  1
                //if ((systemShootsTemp[(row + i)][col] === "empty") && (turnTemp === "system")){
                
                while (((col + i)  > 1)&& (turnTemp === "system")) {
                    if (systemShootsTemp[(row + i)][col] === "empty"){
                        thisShootStatus = userCellsTemp[row][(col + i)] > 0? "shoot":"no shoot"  
                        systemShootsTemp[row][(col + i)] = userCellsTemp[row][(col + i)]
                        // si es tocado:
                        if (thisShootStatus === "shoot") {
                        thisShootNumber = (lastSystemShootTemp[3] + 1)
                        lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
                        } 
                        
                        else if (thisShootStatus === "no shoot") {
                            thisShootNumber = 0
                            turnTemp = "user"
                            lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
                        }
                        lastSystemShootTemp = [row , (col + i), thisShootStatus, thisShootNumber]
                        
                    } 
                    else if (!(systemShootsTemp[(row + i)][col] === "empty") && (turnTemp === "system")){
                        this.systemTurn()
                    }
                    i++
                }

                    //right fin

                 //verificar si es hundido o tocado:
                 console.log("verificacion inicio" )
             
                 var indexTemp = userCellsTemp[systemRow][systemCol]
                 var shipsLocationsTemp = this.state.shipsLocations
                 var sizeTemp = shipsLocationsTemp[indexTemp][3]
                 var localrow = shipsLocationsTemp[indexTemp][0]
                 var localcol = shipsLocationsTemp[indexTemp][1]
                 var orient = shipsLocationsTemp[indexTemp][2]
                 var count = 0
                
                 var textTemp = this.state.text

                 if(orient === "h"){
                    i = 0
                    console.log("verific h" + hundidosSystemTemp)
                
                        do{ 
                            if(systemShootsTemp[localrow][localcol + count] === userCellsTemp[row][col]){
                             count++
                         }
                         i++
                         } while (i<sizeTemp)
                 }
                 else if(orient === "v"){
                    console.log("verific V" + hundidosSystemTemp)
                     i = 0
                
                        do{ 
                            if(systemShootsTemp[localrow + count][localcol] === userCellsTemp[row][col]){
                             count++
                         }
                         i++
                         } while (i<sizeTemp)
                         console.log("1 count" + count)
                 }
     
     
                 if((count == sizeTemp) && (hundidosSystemTemp === 9)){
                     textTemp = "PERDISTE"
                
                 }
                 else if((count == sizeTemp) && (hundidosSystemTemp < 9)){
                    console.log("hundidosSystemTemp 3" + hundidosSystemTemp)
                     textTemp = "Te hundieron un barco"
                     hundidosSystemTemp++
                 }
     
                  else {
             
                     textTemp = "Te dispararon un barco"
                     console.log("hundidosSystemTemp 2" + hundidosSystemTemp)
                 }









        } 
                  // si es agua
        else if (thisShootStatus ===  "no shoot") {
                    
            thisShootNumber = 0
            turnTemp = "user" 
            textTemp = "AGUA"
            lastSystemShootTemp = [systemRow, systemCol, thisShootStatus, thisShootNumber]

        } 

        this.setState({hundidosSystem: hundidosSystemTemp, text: textTemp, turn:turnTemp, lastSystemShoot:lastSystemShootTemp, systemShoots: systemShootsTemp})
}

}

//right clic en tablero derecha:
handleRBoardClick(row, col){
    var userCellsTemp = this.state.userCells.slice()
    var subSelectedTemp = this.state.subSelected
    var shipsToPlaceTemp = this.state.shipsToPlace
    var shipsLocationsTemp = this.state.shipsLocations.slice()
    var sizeTemp =  parseInt(subSelectedTemp[0])
    var click1Temp = this.state.click1
    var idTemp = subSelectedTemp[1]

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

    var check7
    var checksum7 = 0
	for(let i = -1; (i < (sizeTemp + 1)); i++) {
		if(userCellsTemp[row + 1][col + i] === "x"){
                 checksum7++
		}
        
	} 
	if(checksum7 === (sizeTemp + 2)) {
		check7 = true;
	}

    var check8
    var checksum8 = 0
	for(let i = - 1; (i < sizeTemp + 1); i++) {
		if(userCellsTemp[row - 1][col + i] === "x"){
                 checksum8++
		}
	} 
	if(checksum8=== (sizeTemp + 2)) {
		check8 = true;
	}
    
    var check9
    var checksum9 = 0
	for(let i = -1; (i < sizeTemp + 1); i++) {
        
		if(userCellsTemp[row][col + i] === "x"){
                 checksum9++
		}
	} 
	if(checksum9 === (sizeTemp + 2)) {
		check9 = true;
	}

    var check10
    var checksum10 = 0
	for(let i = -1; i < (sizeTemp + 1); i++) {
        
		if(userCellsTemp[row + i][col] === "x"){
                 checksum10++
		}
	} 
	if(checksum10 === (sizeTemp + 2)) {
		check10 = true;
	}

    var check11
    var checksum11 = 0
	for(let i = -1; i < (sizeTemp + 1); i++) {
		if(userCellsTemp[row + i][col + 1] === "x"){
                 checksum11++
		}
        
	} 
	if(checksum11 === (sizeTemp + 2)) {
		check11 = true;
	}

    var check12
    var checksum12 = 0
	for(let i = -1; i < (sizeTemp + 1); i++) {
		if(userCellsTemp[row + i][col - 1] === "x"){
                 checksum12++
		}
        
	} 
	if(checksum12 === (sizeTemp + 2)) {
		check12 = true;
	}


//de izquierda a derecha:

    if( ((click1Temp[0]) === row)  &&  ( ((col - click1Temp[1]) ===  (sizeTemp - 1)))) {
            if(((click1Temp[1] + sizeTemp) < 13) && (check1) && (check2) && (check3)){
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
                document.getElementById(idTemp).style.display = "none"
            }
    }   
    //de derecha a izquierda:

    else if( ((click1Temp[0]) === row)  &&  ( ((click1Temp[1] - col) ===  (sizeTemp - 1))  )) {
        if(((col + sizeTemp) < 13) && (check7) && (check8) && (check9)){
            console.log("checks ok")
            i = 0
            do{
                userCellsTemp[row][(click1Temp[1] - i)] = subSelectedTemp[1]
                i++
            } while (i < sizeTemp);
            console.log("do while")
            shipsLocationsTemp[subSelectedTemp[1]] = [row, col, "h", subSelectedTemp[0]]
            shipsToPlaceTemp[subSelectedTemp[1]] = 0
            subSelectedTemp = 0
            console.log("shipsLocations" + shipsLocationsTemp)
            console.log("shipsLocations[0]" + shipsLocationsTemp[0])
            document.getElementById(idTemp).style.display = "none"
        }
    }
    // de arriba a abajo:
    else if ( ((click1Temp[1]) === col)  &&  ( ((row - click1Temp[0]) ===  (sizeTemp - 1)) )) {
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
                document.getElementById(idTemp).style.display = "none"
        }
    }
        // de abajo a arriba:
    else if ( ((click1Temp[1]) === col)  &&  (((click1Temp[0] - row) ===  (sizeTemp - 1)) )) {
            if(((row + sizeTemp) < 13) && (check10) && (check11) && (check12)){
                console.log("checks ok")
                y = 0
                do{
                    userCellsTemp[(click1Temp[0] - y)][col] = subSelectedTemp[1]
                    y++
                } while (y < sizeTemp);
                console.log("do while")
                shipsLocationsTemp[subSelectedTemp[1]] = [row, col, "v", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0
                console.log("shipsLocations" + shipsLocationsTemp)
                console.log("shipsLocations[0]" + shipsLocationsTemp[0])
                document.getElementById(idTemp).style.display = "none"
        }
    }
    
        click1Temp = 0
    
}
        this.setState({click1: click1Temp, userCells:userCellsTemp, subSelected:subSelectedTemp, shipsToPlace:shipsToPlaceTemp, shipsLocations:shipsLocationsTemp})
        console.log(shipsToPlaceTemp)
    
    }
}

// sacar barcos si no esta confirmado el juego:
handleROnRightBoardClick(row, col) {

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
        document.getElementById(id).style.display = "block"
        
        

    this.setState({userCells: userCellsTemp, shipsLocations:shipsLocationsTemp, shipsToPlace:shipsToPlaceTemp})
    }

    }


playClick(){

var statusTemp = this.state.status
var leftShipLocationsTemp = this.state.leftShipLocations
// leftShipLocations : init row, init col, v/h, size (index = id). Valor en tempcells= id + 1
if(statusTemp === "completed") {
  
    var tempCells = this.state.cells.slice()

    //orient 0=horizontal   1=vertical
 
    //1 de 4:
    var orient4 = Math.floor(Math.random() * (2 - 0)) + 0;
    var localrow
    var localcol

    if(orient4 ===0) {
        localcol = Math.floor(Math.random() * (9 - 2)) + 2;
        localrow = Math.floor(Math.random() * (12 - 2)) + 2;

        tempCells[localrow][localcol] = 1
        tempCells[localrow][localcol + 1] = 1
        tempCells[localrow][localcol + 2] = 1
        tempCells[localrow][localcol + 3] = 1
        leftShipLocationsTemp[0] = [localrow, localcol, "h", 4] 
    

    } else if(orient4 === 1){
        localrow = Math.floor(Math.random() * (9 - 2)) + 2;
        localcol = Math.floor(Math.random() * (12 - 2)) + 2;   
        tempCells[localrow][localcol] = 1
        tempCells[localrow + 1][localcol] = 1
        tempCells[localrow + 2][localcol] = 1
        tempCells[localrow + 3][localcol] = 1
        leftShipLocationsTemp[0] = [localrow, localcol, "v", 4]   
    }
    
   
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
                tempCells[localrow][localcol] = (amount + 2)
                tempCells[localrow][localcol + 1] = (amount + 2)
                tempCells[localrow][localcol + 2] = (amount + 2)
                
                amount++
                leftShipLocationsTemp[amount] = [localrow, localcol, "h", 3] 
            }
        
    

    } else if (orient3 === 1) {
       localcol = Math.floor(Math.random() * (12 - 2)) + 2;
       localrow = Math.floor(Math.random() * (10 - 2)) + 2;
            if ((tempCells[localrow - 1][localcol] + tempCells[localrow][localcol] + tempCells[localrow + 1][localcol] + tempCells[localrow + 2][localcol] + tempCells[localrow + 3][localcol] +
            tempCells[localrow - 1][localcol - 1] + tempCells[localrow][localcol - 1] + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 2][localcol - 1] + tempCells[localrow + 3][localcol - 1]  +
            tempCells[localrow - 1][localcol + 1] + tempCells[localrow][localcol + 1] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 2][localcol + 1] + tempCells[localrow + 3][localcol + 1]) === 0) {
                tempCells[localrow][localcol] = (amount + 2)
                tempCells[localrow + 1][localcol] = (amount + 2)
                tempCells[localrow + 2][localcol] = (amount + 2)
                amount++
                leftShipLocationsTemp[amount] = [localrow, localcol, "v", 3] 
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
                     tempCells[localrow][localcol] = (amount2 + 4)
                     tempCells[localrow][localcol + 1] = (amount2 + 4)
                     amount2++
                     leftShipLocationsTemp[amount2 + 2] = [localrow, localcol, "h", 2]
            }
    } else if (orient2 === 1) {
       localcol = Math.floor(Math.random() * (12 - 2)) + 2;
       localrow = Math.floor(Math.random() * (11 - 2)) + 2;
            if ((tempCells[localrow - 1][localcol] + tempCells[localrow][localcol] + tempCells[localrow + 1][localcol] + tempCells[localrow + 2][localcol] 
               + tempCells[localrow - 1][localcol - 1] + tempCells[localrow][localcol - 1] + tempCells[localrow + 1][localcol - 1] + tempCells[localrow + 2][localcol - 1] 
               + tempCells[localrow - 1][localcol + 1] + tempCells[localrow][localcol + 1] + tempCells[localrow + 1][localcol + 1] + tempCells[localrow + 2][localcol + 1]) === 0) {
                 tempCells[localrow][localcol] = (amount2 + 4)
                 tempCells[localrow + 1][localcol] = (amount2 + 4)
                 amount2++
                 leftShipLocationsTemp[amount2 + 2] = [localrow, localcol, "v", 2]
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
                        tempCells[localrow][localcol] = (amount1 + 7)
                        amount1++
                        leftShipLocationsTemp[amount1 + 5] = [localrow, localcol, "v", 1]
            }
    }
     while (amount1 < 4);
     statusTemp = "playing"
     this.setState({cells:tempCells, status: statusTemp, playingState:true})

} else if((statusTemp = "playing")) {
 
        var tempcells = []
        for(let i = 0; i < 14; i++ ){
        tempcells.push(new Array(14).fill(0))
    }
        var tempuserShoots = []
        for(let i = 0; i < 14; i++ ){
        tempuserShoots.push(new Array(14).fill("empty"));  
    }
            //tablero izquierda
            var cells = []
            for(let i = 0; i < 14; i++ ){
            cells.push(new Array(14).fill(0))
            }
            var userShoots = []
            for(let i = 0; i < 14; i++ ){
            userShoots.push(new Array(14).fill("empty"));
            }
    
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
    this.setState({text: "", lastSystemShoot: [], status: "pending" ,click1: 0, turn: "user", cells:cells, playingState:false, userShoots:userShoots, leftClics: 0, subSelected: 0, shipsToPlace:["4", "3", "3", "2", "2", "2", "1", "1", "1", "1"], userCells:userCells, systemShoots:systemShoots, shipsLocations:shipsLocations})
    for(let i=0; i<10; i++){
    document.getElementById(i).style.display = "block"
        }
    }
}
    
leftstyle(shoots){
    var color = "rgb(199, 196, 196)"

     if(shoots > 0){
        color = "rgb(136, 111, 100)"
    }
    else if(shoots=== 0){
        color = "rgb(159, 159, 219)"
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

rightstyle(shoots, systemshoots){
    var color = "rgb(199, 196, 196)"
    if(systemshoots === "x") {
        color =  "rgb(159, 159, 219)"
    }else if(parseInt(systemshoots) > -1) {
        color = "black"
    }
    else if(shoots=== "0")    {
        color = "brown"
    } else if((shoots=== "1") || (shoots=== "2")){
        color = "chocolate"
    } else if((shoots=== "3") || (shoots=== "4") || (shoots=== "5") ) {
        color = "coral"
    } else if((shoots=== "6") || (shoots=== "7") || (shoots=== "8") || (shoots=== "9")){
        color = "burlywood"
    } 

    var style = {
        width: "2rem",
        height: "2rem",
        border:"1px solid grey",
        backgroundColor: color
    }
    return style;
}

text(systemshoots){
    return systemshoots;
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
                        <Board style= {this.leftstyle} systemshoots = "{this.state.systemShoots}"  shoots = {this.state.userShoots} text = "{this.state.cells}" cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
                     
                        <div className = "row mt-4 align-items-center justify-content-center text-center"> 
                            <tx>{this.state.text}</tx>
                        </div> 
                     
                     
                     </div>
                     

                    <div className ="col-sm-12 col-md-5  d-md-block text-center">
                         <Board style = {this.rightstyle} systemshoots = {this.state.systemShoots} shoots = {this.state.userCells} text = "{this.state.systemShoots}" cells = {this.state.userCells} handleRClick = {this.handleROnRightBoardClick} handleClick = {this.handleRBoardClick }/>
                    
                         <div className = "row mt-4 align-items-center justify-content-center text-center"> 
                            <tx>{this.state.textSystem}</tx>
                        </div> 
                    
                    </div>

                    <div className ="col-sm-12 col-md-2  d-md-block text-center">   
                        <UserSubs handleClick = {this.handleSubSelectClick} shipsToPlace = {this.state.shipsToPlace} />
                    </div>
                </div>


                <div className = "row mt-4 align-items-center "> 
      
                    <div className = "col-8  d-md-block text-center" >
                        <div className= "row"> 
                            <div className = "col-sm-12 col-md-4  d-md-block text-center" >
                                <PlayStopButton text= {this.state.playingState === false?  "PLAY" : "QUIT"} onButtonClick = {this.playClick}/>
                            </div> 

                            <div className ="col-sm-12 col-md-4  d-md-block text-center">
                                <PlayStopButton text= {this.state.status === "pending"?  "Confirm" : "Confirmed"} onButtonClick = {this.confirmClick}/>
                            </div>

                            <div className ="col-sm-12 col-md-4  d-md-block text-center">

                                <Button className= "font-face-zkgam" size="sm" variant="outline-dark" onClick={this.instructions}>
                                   Instructions
                                </Button>
                           
                                    <Modal
                                        show={this.state.show}
                                        onHide={this.instructions}
                                        dialogClassName="modal-90w"
                                        aria-labelledby="example-custom-modal-styling-title"
                                        style={{"width" : "100%"}}
                                    >
                                        <Modal.Header closeButton>
                                        <Modal.Title id="example-custom-modal-styling-title">
                                            Instrucciones:
                                        </Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body>
                                        <p>
                                        <ol className= "font-face-zkgam"> 
                                            <li> Seleccionar un barco</li>     
                                            <li>Hacer clic en la primer y última celda del tablero derecho donde quieras ubicarlo</li>
                                            <li>Para cambiar la ubicación de un barco, pulsa botón derecho sobre el mismo</li>
                                            <li>Una vez ubicados todos los barcos pulsa "Confirm" y luego "Play" para comenzar a jugar</li>
                                            <li>Comenzá haciendo un disparo pulsando sobre la celda que quieras del tablero izquierdo</li>
                                            <li>Podés hacer botón derecho sobre una celda del tablero izquierdo si pensás que ahí no hay un barco</li>
                                            <li>No puede haber dos barcos que se toquén entre sí</li>
                                            <li>Todavía el juego no avisa quién ganó :) </li>
                                        </ol>
                                        </p>
                                        </Modal.Body>
                                    </Modal>


                            </div>
                        </div>
                    </div>
                </div> 
            </div> 
                )
            }
    } 
export default GameFive;