import React from 'react';
import PlayStopButton from './playButton';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav  from 'react-bootstrap/Nav';
import Instructions from './Instructions'
import InstructionsButton from './InstructionsButton';
import './gameFive.css';
import HowToPlay from './HowToPlay'
import GameText from './gameText'
import Board from './Board'
import {Howl, Howler} from 'howler';
import BoardTitle from './BoardTitle';
import FxButton from './FxButton'

// BATALLA NAVAL //

const howtoplay = () => {
    return (
        <HowToPlay gameInstructions= "InstruccionesBattle"/>
    )
}

function UserSub(props){


    return (
        <div  className= {` text-center justify-content-center`} >
            <div className= {`sub${props.size} `}  tabindex="0" id = {props.id} size = {props.size} onClick = {() => props.handleClick(props.size, props.id)}>   
            </div>
        </div>
    )
}

//barcos para poner:
class UserSubs extends React.Component{
    constructor(props){
        super(props)
    }
    render(){  

        var userSubs = []
        for(let i=9; i>-1; i--){
            userSubs.push(

                <UserSub className = {`sub${this.props.shipsToPlace[i]}`} id = {i.toString()} key = {i} handleClick = {this.props.handleClick} size={this.props.shipsToPlace[i]}/>
            )
        }

        return (
            <div className ="col-sm-12 col-md-4 d-md-block text-center mt-4">
                {userSubs}
            </div>
        )
    }
}

class GameFive extends React.Component{
    constructor(props){
        super(props)
        
        //tablero izquierda:

        var cells = []
        for(let i = 0; i < 14; i++ ){
        cells.push(new Array(14).fill(0))
        }

        var userShoots = []
        for(let i = 0; i < 14; i++ ){
        userShoots.push(new Array(14).fill("empty"));
        }

        //tablero derecha:

        var userCells = []
        for(let i = 0; i < 16; i++ ){
        userCells.push(new Array(16).fill("x"))
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

        this.state = {audio: false, lastSystemTocado: [0, 0, 0, 0], hundidosSystem: 0, hundidos: 0, show: false, text: "", textSystem: "", leftShipLocations: leftShipLocations, lastSystemShoot: [], status: "pending" ,click1: 0, turn: "user", cells:cells, playingState:false, userShoots:userShoots, leftClics: 0, subSelected: 0, shipsToPlace:["4", "3", "3", "2", "2", "2", "1", "1", "1", "1"], userCells:userCells, systemShoots:systemShoots, shipsLocations:shipsLocations}
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
        this.manageAudio = this.manageAudio.bind(this)
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

}

//right clic en tablero izzquierda:
handleRClick(row, col, e) {
    e.preventDefault()
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
    var sound
    var turnTemp = this.state.turn
    var leftShipLocationsTemp = this.state.leftShipLocations
    var textTemp
    var hundidosTemp = this.state.hundidos
    var tempcells = this.state.cells.slice()
    var tempUserShoots = this.state.userShoots.slice()
    if((this.state.playingState === true) && (turnTemp  === "user") && (tempUserShoots[row][col] === "empty")) {

        var tempClics = this.state.leftClics

    
        if (tempUserShoots[row][col] === "empty") {
            var tironum = Math.floor(Math.random() * (7 - 1)) + 1;
            this.playSound(`usertiro-00${tironum}.mp3`)
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
                sound = "userhundido.mp3"
            }
            else if((count === sizeTemp) && (hundidosTemp < 9)){
                textTemp = "HUNDIDO"
                hundidosTemp++
                sound = "userhundido.mp3"
            }

             else {
        
                textTemp = "TOCADO"
                var tocadonum = Math.floor(Math.random() * (4 - 1)) + 1;
                sound = `usertocado-00${tocadonum}.mp3`
            }
            setTimeout(() => this.playSound(sound), 1000)
            setTimeout(() => this.setState({hundidos: hundidosTemp, text: textTemp, userShoots:tempUserShoots, leftClics:tempClics, turn: "user" }) , 1000)
        } else if (!(tempcells[row][col] > 0)) {
            textTemp = "AGUA"
            var aguanum = Math.floor(Math.random() * (4 - 1)) + 1;
           
            setTimeout(() => this.playSound(`useragua-00${aguanum}.mp3`), 1000)
            setTimeout(() =>this.setState({text: textTemp, userShoots:tempUserShoots, leftClics:tempClics, turn: "system" }) , 1000)
        setTimeout(() => this.systemTurn(), 1200)
        }
    }

}


playSound(status){
Howler.volume(0.9)

if(this.state.audio){

    var fx = new Howl({
      src: ["/audios_battle/"+status],
      loop: false,
      volume: 0.6
    })
    fx.play()
  }
}

systemTurn(){
    var turnTemp = "system"
    var systemRow
    var systemCol
    var systemShootsTemp = JSON.parse(JSON.stringify(this.state.systemShoots))
    var userCellsTemp = JSON.parse(JSON.stringify(this.state.userCells))
    var shipsLocationsTemp = this.state.shipsLocations
    var hundidosSystemTemp = this.state.hundidosSystem
    var lastSystemTocadoTemp = this.state.lastSystemTocado.slice()
    var playingStateTemp = this.state.playingState
    var lastSystemTocadoTempTemp = 0
    var thisTurn = 0
    do{
        //var tironum = Math.floor(Math.random() * (3 - 1)) + 1;
        //setTimeout(() => this.playSound(`systemtiro-00${tironum}.mp3`), 1200)

    //Busca nueva row/col para disparar, que no haya disparado:

    //si hay un barco ya tocado:
    if(lastSystemTocadoTemp[2] === "tocado"){
        var x = 0
        var v 
      //y si ya se sabe la orientacion:
        if(lastSystemTocadoTemp[3] === "v"){

      
            v = 1
            do{
            //arriba=
            if((systemShootsTemp[(lastSystemTocadoTemp[0] - v)][lastSystemTocadoTemp[1]] === "empty") && ((lastSystemTocadoTemp[0] - v) > 1)){
            systemRow = (lastSystemTocadoTemp[0] - v)
            systemCol = lastSystemTocadoTemp[1]
            x = 1
            lastSystemTocadoTempTemp = "v"

            } 
            //abajo:
            else if ((systemShootsTemp[(lastSystemTocadoTemp[0] + v)][lastSystemTocadoTemp[1]] === "empty")&& ((lastSystemTocadoTemp[0] + v) < 12)){
            systemRow = (lastSystemTocadoTemp[0] + v)
            systemCol = lastSystemTocadoTemp[1]
            x = 1
            lastSystemTocadoTempTemp = "v"
            } 
           

            else {
            v++

            }
            }while (x=== 0)
        }

        if(lastSystemTocadoTemp[3] === "h"){

            var h = 1
            do{
                //izquierda:
            if((systemShootsTemp[lastSystemTocadoTemp[0]][(lastSystemTocadoTemp[1] - h)] === "empty") && ((lastSystemTocadoTemp[1] - h) > 1) ){
            systemRow = lastSystemTocadoTemp[0]
            systemCol = (lastSystemTocadoTemp[1] - h)
            x = 1
            lastSystemTocadoTempTemp = "h"
            } 
            else if (systemShootsTemp[lastSystemTocadoTemp[0]][(lastSystemTocadoTemp[1] - h)] === "x"){
                h++
            }
            // derecha:
            else if ((systemShootsTemp[lastSystemTocadoTemp[0]][(lastSystemTocadoTemp[1] + h)] === "empty") && ((lastSystemTocadoTemp[1] + h ) < 12)){
            systemRow = lastSystemTocadoTemp[0]
            systemCol = (lastSystemTocadoTemp[1]  + h)
            x = 1
            lastSystemTocadoTempTemp = "h"
            } 
           else if (systemShootsTemp[lastSystemTocadoTemp[0]][(lastSystemTocadoTemp[1] + h)] === "x"){
            h++
           }
            else {
            h++
            }
            }while (x=== 0)
        }
   
        //si no se sabe la orientacion:


        if(lastSystemTocadoTemp[3] === 0){
            var i = 1
            do{
                    //derecha
             if(systemShootsTemp[lastSystemTocadoTemp[0]][(lastSystemTocadoTemp[1] + i)] === "empty" && ((lastSystemTocadoTemp[1] + i) < 12) ){

                    systemRow = lastSystemTocadoTemp[0]
                    systemCol = (lastSystemTocadoTemp[1] + i)
                    x=1
                    if(userCellsTemp[systemRow][systemCol] > -1) {
                        lastSystemTocadoTempTemp = "h"

                        
                    }
                                // izquierda
            } else if(systemShootsTemp[(lastSystemTocadoTemp[0])][(lastSystemTocadoTemp[1] - i)] === "empty" && ((lastSystemTocadoTemp[1] - i) > 1)){

                systemRow = lastSystemTocadoTemp[0]
                systemCol = (lastSystemTocadoTemp[1] - i)
                x=1
                if(userCellsTemp[systemRow][systemCol] > -1) {
                    lastSystemTocadoTempTemp = "h"
                }
                    //abajo:
            } else if(systemShootsTemp[lastSystemTocadoTemp[0] + i][lastSystemTocadoTemp[1]] === "empty" && ((lastSystemTocadoTemp[0] + i) < 12)){
    
                    systemRow = (lastSystemTocadoTemp[0] + i)
                    systemCol = lastSystemTocadoTemp[1]
                    x=1
                    if(userCellsTemp[systemRow][systemCol] > -1) {
                        lastSystemTocadoTempTemp = "v"
                    }

                    //arriba
            } else if((systemShootsTemp[(lastSystemTocadoTemp[0] - i)][lastSystemTocadoTemp[1]] === "empty") && ((lastSystemTocadoTemp[0] - i) > 1)){

                systemRow = (lastSystemTocadoTemp[0] - i)
                systemCol = lastSystemTocadoTemp[1]
                x=1
                if(userCellsTemp[systemRow][systemCol] > -1) {
                    lastSystemTocadoTempTemp = "v"
                }

            } else if(x===0){
                i++
            }
            

            } while(x === 0)
        }


    }  // fin if tocado
    
    //coordenadas random si no hay un tocado sin hundir:
    else{
        var p = 0
        do{
        systemRow = Math.floor(Math.random() * (12 - 2)) + 2;
        systemCol = Math.floor(Math.random() * (12 - 2)) + 2;

        if(systemShootsTemp[systemRow][systemCol] === "empty"){
            p++
        }
    } while(p === 0)

    }

    //si no lo había disparado a la cell...
  
        
        var thisShootStatus = userCellsTemp[systemRow][systemCol] > -1? "shoot":"no shoot"
           
        // dispara:
        systemShootsTemp[systemRow][systemCol] = userCellsTemp[systemRow][systemCol]
           
        if (thisShootStatus ===  "shoot") {
            lastSystemTocadoTemp[0] = systemRow
            lastSystemTocadoTemp[1] = systemCol
            lastSystemTocadoTemp[2] = "tocado"
            lastSystemTocadoTemp[3] = lastSystemTocadoTempTemp

          
                 //verificar si es hundido o tocado:

             
                 var indexTemp = userCellsTemp[systemRow][systemCol]
                 
                 var sizeTemp = parseInt(shipsLocationsTemp[indexTemp][3])
                 var localrow = shipsLocationsTemp[indexTemp][0]
                 var localcol = shipsLocationsTemp[indexTemp][1]
                 var orient = shipsLocationsTemp[indexTemp][2]
                 var count = 0
                
                 var textTemp = this.state.text

                 if(orient === "h"){
                    i = 0

                
                        do{ 
                            if(systemShootsTemp[localrow][localcol + count] === userCellsTemp[localrow][localcol + count]){
                             count++
                         }
                         i++
                         } while (i<sizeTemp)
                 }
                 else if(orient === "v"){

                     i = 0
                
                        do{ 
                            if(systemShootsTemp[localrow + count][localcol] === userCellsTemp[localrow + count][localcol]){
                             count++
                         }
                         i++
                         } while (i<sizeTemp)

                 }
     
     
                if((count == sizeTemp) && (hundidosSystemTemp === 9)){
                    textTemp = "PERDISTE"
                    turnTemp = "user"
               
                }
                 else if((count == sizeTemp) && (hundidosSystemTemp < 9)){
                     textTemp = "Te hundieron un barco"
                     hundidosSystemTemp++
                
                     lastSystemTocadoTemp[2] = "hundido"
                     lastSystemTocadoTemp[3] = 0

                    //marca como agua todo alrededor de los hundidos: (creo)(decidiendo si eso el usuario lo ve como agua o queda gris)

                     if(orient === "v"){
                        if (systemShootsTemp[localrow - 1][localcol] === "empty"){systemShootsTemp[localrow - 1][localcol] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol] === "empty"){systemShootsTemp[localrow - 1][localcol] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol - 1] === "empty"){systemShootsTemp[localrow - 1][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol + 1] === "empty"){systemShootsTemp[localrow - 1][localcol + 1] = "water"}
                        if (systemShootsTemp[localrow + sizeTemp][localcol] === "empty"){systemShootsTemp[localrow + sizeTemp][localcol] = "water"}
                        if (systemShootsTemp[localrow + sizeTemp][localcol - 1] === "empty"){systemShootsTemp[localrow + sizeTemp][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow + sizeTemp][localcol + 1] === "empty"){systemShootsTemp[localrow + sizeTemp][localcol + 1] = "water"}

                        for(let i = -1; i < (sizeTemp + 1); i++){
                            if (systemShootsTemp[localrow + i][localcol - 1]  === "empty"){systemShootsTemp[localrow + i][localcol - 1] = "water"}
                            if (systemShootsTemp[localrow + i][localcol + 1] === "empty"){systemShootsTemp[localrow + i][localcol + 1] = "water"}
                        }
                     }

                     else if(orient === "h"){
                        if (systemShootsTemp[localrow][localcol - 1] === "empty"){systemShootsTemp[localrow][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow ][localcol + sizeTemp] === "empty"){systemShootsTemp[localrow ][localcol + sizeTemp] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol - 1] === "empty"){systemShootsTemp[localrow - 1][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol + sizeTemp] === "empty"){systemShootsTemp[localrow - 1][localcol + sizeTemp] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol - 1] === "empty"){systemShootsTemp[localrow - 1][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow + 1][localcol + sizeTemp] === "empty"){systemShootsTemp[localrow + 1][localcol + sizeTemp] = "water"}

                        for(let i = -1; i < (sizeTemp + 1); i++){
                            if (systemShootsTemp[localrow - 1][localcol + i] === "empty"){systemShootsTemp[localrow - 1][localcol + i] = "water"}
                            if (systemShootsTemp[localrow + 1][localcol + i] === "empty"){systemShootsTemp[localrow + 1][localcol + i] = "water"}
                        }
                     } 
                     
                     if(sizeTemp === 1){
                        if (systemShootsTemp[localrow - 1][localcol] === "empty"){systemShootsTemp[localrow - 1][localcol] = "water"}
                        if (systemShootsTemp[localrow + 1][localcol] === "empty"){systemShootsTemp[localrow + 1][localcol] = "water"}
                        if (systemShootsTemp[localrow][localcol + 1] === "empty"){systemShootsTemp[localrow][localcol + 1] = "water"}
                        if (systemShootsTemp[localrow][localcol - 1] === "empty"){systemShootsTemp[localrow][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol + 1] === "empty"){systemShootsTemp[localrow - 1][localcol + 1] = "water"}
                        if (systemShootsTemp[localrow + 1][localcol - 1] === "empty"){systemShootsTemp[localrow + 1][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow - 1][localcol - 1] === "empty"){systemShootsTemp[localrow - 1][localcol - 1] = "water"}
                        if (systemShootsTemp[localrow + 1][localcol + 1] === "empty"){systemShootsTemp[localrow + 1][localcol + 1] = "water"}
                     }
            
                     //setTimeout(() => this.playSound(`systemhundido.mp3`)   , 2500) 
                     thisTurn = 2

                 }

                  else if (count < sizeTemp) {
                    thisTurn = 1
                     textTemp = "Te dispararon un barco"
                     //var tironum = Math.floor(Math.random() * (3 - 1)) + 1;
                     //setTimeout(() => this.playSound(`systemtocado-00${tironum}.mp3`)   , 2500) 

                     if(orient === "v"){
                        if (systemShootsTemp[systemRow][systemCol+ 1] === "empty"){systemShootsTemp[systemRow][systemCol+ 1]= "water"}
                        if (systemShootsTemp[systemRow][localcol - 1] === "empty"){systemShootsTemp[systemRow][localcol - 1]= "water"}

                        if (systemShootsTemp[systemRow - 1][systemCol+ 1] === "empty"){systemShootsTemp[systemRow - 1][systemCol+ 1]= "water"}
                        if (systemShootsTemp[systemRow + 1][systemCol - 1] === "empty"){systemShootsTemp[systemRow + 1][systemCol - 1]= "water"}

                        if (systemShootsTemp[systemRow - 1][systemCol - 1] === "empty"){systemShootsTemp[systemRow - 1][systemCol - 1]= "water"}
                        if (systemShootsTemp[systemRow + 1][systemCol + 1] === "empty"){systemShootsTemp[systemRow + 1][systemCol + 1]= "water"}

                     }
                     if(orient === "h"){

                        if (systemShootsTemp[systemRow - 1][systemCol + 1] === "empty"){systemShootsTemp[systemRow - 1][systemCol + 1] = "water"}
                        if (systemShootsTemp[systemRow + 1][systemCol - 1] === "empty"){systemShootsTemp[systemRow + 1][systemCol - 1] = "water"}

                        if (systemShootsTemp[systemRow - 1][systemCol - 1] === "empty"){systemShootsTemp[systemRow - 1][systemCol - 1] = "water"}
                        if (systemShootsTemp[systemRow + 1][systemCol + 1] === "empty"){systemShootsTemp[systemRow + 1][systemCol + 1] = "water"}

                        if (systemShootsTemp[systemRow - 1][systemCol] === "empty"){systemShootsTemp[systemRow - 1][systemCol] = "water"}
                        if (systemShootsTemp[systemRow + 1][systemCol] === "empty"){systemShootsTemp[systemRow + 1][systemCol] = "water"}

                     }

                 }

        } 
                  // si es agua

                  else if (thisShootStatus === "no shoot") {
                    turnTemp = "user"  
                  //audio agua
                }
                
             


                setTimeout(() => this.setState({playingState: playingStateTemp, lastSystemTocado: lastSystemTocadoTemp, hundidosSystem: hundidosSystemTemp, text: textTemp, turn:turnTemp,  systemShoots: systemShootsTemp})         
                , 2500) 
                
            } while(turnTemp === "system")

            
                        var tironum = Math.floor(Math.random() * (3 - 1)) + 1;
                        setTimeout(() => this.playSound(`systemtiro-00${tironum}.mp3`), 1200)
                        if (thisTurn === 2){
                        setTimeout(() => this.playSound(`systemhundido.mp3`)   , 2500) }
                        else if (thisTurn === 1) {
                        tironum = Math.floor(Math.random() * (3 - 1)) + 1;
                        setTimeout(() => this.playSound(`systemtocado-00${tironum}.mp3`)   , 2500) 
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

                var i = 0
                do{
                    userCellsTemp[row][click1Temp[1] + i] = subSelectedTemp[1]
                    i++
                } while (i < sizeTemp);

                shipsLocationsTemp[subSelectedTemp[1]] = [row, click1Temp[1], "h", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0

                document.getElementById(idTemp).style.display = "none"
            }
    }   
    //de derecha a izquierda:

    else if( ((click1Temp[0]) === row)  &&  ( ((click1Temp[1] - col) ===  (sizeTemp - 1))  )) {
        if(((col + sizeTemp) < 13) && (check7) && (check8) && (check9)){

            i = 0
            do{
                userCellsTemp[row][(click1Temp[1] - i)] = subSelectedTemp[1]
                i++
            } while (i < sizeTemp);

            shipsLocationsTemp[subSelectedTemp[1]] = [row, col, "h", subSelectedTemp[0]]
            shipsToPlaceTemp[subSelectedTemp[1]] = 0
            subSelectedTemp = 0

            document.getElementById(idTemp).style.display = "none"
        }
    }
    // de arriba a abajo:
    else if ( ((click1Temp[1]) === col)  &&  ( ((row - click1Temp[0]) ===  (sizeTemp - 1)) )) {
            if(((click1Temp[0] + sizeTemp) < 13) && (check4) && (check5) && (check6)){

                var y = 0
                do{
                    userCellsTemp[(click1Temp[0] + y)][col] = subSelectedTemp[1]
                    y++
                } while (y < sizeTemp);

                shipsLocationsTemp[subSelectedTemp[1]] = [click1Temp[0], col, "v", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0

                document.getElementById(idTemp).style.display = "none"
        }
    }
        // de abajo a arriba:
    else if ( ((click1Temp[1]) === col)  &&  (((click1Temp[0] - row) ===  (sizeTemp - 1)) )) {
            if(((row + sizeTemp) < 13) && (check10) && (check11) && (check12)){

                y = 0
                do{
                    userCellsTemp[(click1Temp[0] - y)][col] = subSelectedTemp[1]
                    y++
                } while (y < sizeTemp);

                shipsLocationsTemp[subSelectedTemp[1]] = [row, col, "v", subSelectedTemp[0]]
                shipsToPlaceTemp[subSelectedTemp[1]] = 0
                subSelectedTemp = 0

                document.getElementById(idTemp).style.display = "none"
        }
    }
    
        click1Temp = 0
    
}
        this.setState({click1: click1Temp, userCells:userCellsTemp, subSelected:subSelectedTemp, shipsToPlace:shipsToPlaceTemp, shipsLocations:shipsLocationsTemp})

    
    }
}

// sacar barcos si no esta confirmado el juego:
handleROnRightBoardClick(row, col, e) {
    e.preventDefault()
    if(this.state.status === "pending"){

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
    for(let i = 0; i < 16; i++ ){
    userCells.push(new Array(16).fill("x"))
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
            this.setState({audio: false, astSystemTocado: [0, 0, 0, 0], hundidosSystem: 0, hundidos: 0, show: false, text: "", textSystem: "", leftShipLocations: leftShipLocations, lastSystemShoot: [], status: "pending" ,click1: 0, turn: "user", cells:cells, playingState:false, userShoots:userShoots, leftClics: 0, subSelected: 0, shipsToPlace:["4", "3", "3", "2", "2", "2", "1", "1", "1", "1"], userCells:userCells, systemShoots:systemShoots, shipsLocations:shipsLocations})
    for(let i=0; i<10; i++){
    document.getElementById(i).style.display = "block"
        }
    }
}
    
leftstyle(statusarray1, shoots){
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
        width: "1.8rem",
        height: "1.8rem",
        border:"0.5px solid rgb(247, 220, 207)",
        backgroundColor: color
    }
    return style;
}



cN(statusarray1, statusarray2){
    var cN = "text-center justify-content-center test"
    return cN
}
rightstyle(statusarray1, statusarray2){
    var color = "rgb(207, 203, 203)"
    if(statusarray2 === "x") {
        color =  "rgb(159, 159, 219)"
    }else if(parseInt(statusarray2) > -1) {
        color = "rgb(192, 81, 81)"
    }
    else if(statusarray1=== "0")    {
        color = "rgb(248, 183, 183)"
    } else if((statusarray1=== "1") || (statusarray1=== "2")){
        color = "rgb(223, 158, 111)"
    } else if((statusarray1=== "3") || (statusarray1=== "4") || (statusarray1=== "5") ) {
        color = "rgb(255, 184, 158)"
    } else if((statusarray1=== "6") || (statusarray1=== "7") || (statusarray1=== "8") || (statusarray1=== "9")){
        color =  "rgb(206, 186, 160)"
    } 

    var style = {
        width: "1.8rem",
        height: "1.8rem",
        border:"0.5px solid rgb(247, 220, 207)",
        backgroundColor: color
    }
    return style;
}

text(systemshoots){
    return systemshoots;
}

containerStyle(){
    var containerStyle = {
        backgroundColor: "rgb(207, 203, 203)"
    }     
        return containerStyle
}

buttonText(){
    var text
    if ((this.state.playingState === false) && (this.state.status === "pending")){ 
    text = "Confirm ships"} 

    else if ((this.state.playingState === false) && (this.state.status === "completed")){
    text =  "PLAY"}

    else if (this.state.playingState === true){
    text = "QUIT"}

    return text
    }

manageAudio() {
    var audioTemp = this.state.audio
    if(audioTemp){
        audioTemp = false
        Howler.mute(true)
    } else if(!(audioTemp)){
        audioTemp = true
        Howler.mute(false)

    }
    this.setState({audio:audioTemp})

}

    render(){  


        return (
            <div className ="col-xs-12 col-lg-9">

                    <div className = "row mt-4 " >
                    <div className = "col-5 " >
                         <span>
                            <FxButton manageFx={this.manageAudio} fxStatus={this.state.audio} />
                         </span>
                    </div>
                    <div className = "col-5 text-end" >
                        <InstructionsButton instructions = {this.instructions}/>
                        <Instructions instructions = {this.instructions} show= {this.state.show} instructDetails= {howtoplay()} /> 
                    </div>
                </div>
                <div className = "row" > 
                
                    <Navbar bg="white" variant="light">
                        <Container >
                        <Nav className="me-auto mx-auto">
                     
                        </Nav>
                        </Container>
                    </Navbar>
                </div>

                <div className = "row" > 
                    <div className ="col-sm-12 col-md-5  d-md-block text-center mr-4">
                        <div className="row" style={{marginTop: "20px"}}>
                            <BoardTitle text={"Enemys ships"}/>
                        </div>
                        <div className="row">
                            <Board initCell = {2}  lastCell = {12} boardclass = "testMargin align-items-center justify-content-center row m-1"  cN = {this.cN} containerStyle = {this.containerStyle} statusarray2 = {this.state.userShoots} cellStyle= {this.leftstyle}  statusarray1 = {this.state.cells} result = "{this.state.cells}" cells = {this.state.cells} handleRClick = {this.handleRClick} handleClick = {this.handleClick}/>
                        </div>
                     </div>
                     
                    <div className ="col-sm-12 col-md-5  d-md-block text-center mr-4">
                        <div className="row" style={{marginTop: "20px"}}>
                            <BoardTitle text={"Your ships"} />
                        </div>
                        <div className="row">
                            <Board initCell = {2}  lastCell = {12} boardclass = "testMargin align-items-center justify-content-center row m-1"  cN = {this.cN} containerStyle = {this.containerStyle} statusarray1 = {this.state.userCells} cellStyle= {this.rightstyle}  statusarray2 = {this.state.systemShoots}  result = "{this.state.cells}" cells = {this.state.userCells} handleRClick = {this.handleROnRightBoardClick} handleClick = {this.handleRBoardClick}/>
                        </div>
                    </div>

                    <div className ="col-sm-12 col-md-2  d-md-block text-center">   
                        <UserSubs handleClick = {this.handleSubSelectClick} shipsToPlace = {this.state.shipsToPlace} />
                    </div>
                </div>
                <div className = "row " >
                    <div className ="col-10  d-md-block text-center"> 
                        <GameText text= {this.state.text}/>
                    </div> 
                </div> 

                <div className = "row mt-4  "> 
      
       
                        <div className= "row "> 
                            <div className = "col-10 text-center d-md-block " >
                                <PlayStopButton text= {this.buttonText()} onButtonClick = {this.state.status === "pending"? this.confirmClick : this.playClick}/>
                            </div> 
                        </div>

                </div> 
            </div> 
                )
            }
    } 
export default GameFive;