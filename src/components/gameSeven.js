import React, { useState, useEffect } from 'react';
import PlayStopButton from './playButton';
import './gameSeven.css';
import { ArrowRepeat } from 'react-bootstrap-icons';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { ArrowLeftSquare } from 'react-bootstrap-icons';
import Instructions from './Instructions'
import InstructionsButton from './InstructionsButton';
import HowToPlay from './HowToPlay'
import { useTranslation } from 'react-i18next';
import FxButton from './FxButton'
import {Howl} from 'howler';


const howtoplay = () => {
    return (
        <HowToPlay gameInstructions= "InstruccionesTetris"/>
    )
}

var result2
var score2 = 0
var playingState = false
var fx = true

function Cell(props){

  var cN = "text-center justify-content-center test"
  
  
  var containerStyle = {
      backgroundColor: "grey",
      
  }
    var color = "rgb(199, 196, 196)"

    
    if(props.cell === 0){
      color = "rgb(226, 224, 224)"
    }

    else if ((props.cell === 1) || (props.cell === 10)){
      color = "pink"
    }
    else if ((props.cell === 3) || (props.cell === 30)) {
      color = "rgb(248, 211, 141)"
    }
    else if ((props.cell === 4) || (props.cell === 40)) {
      color = "rgb(193, 233, 168)"
    }
    else if ((props.cell === 5) || (props.cell === 50)) {
      color = "rgb(174, 252, 252)"
    }
    else if ((props.cell === 6) || (props.cell === 60)) {
      color = "rgb(226, 198, 250)"
    }
    else if ((props.cell === 7) || (props.cell === 70)) {
      color = "rgb(218, 151, 151)"
    }
    else if ((props.cell === 8) || (props.cell === 80)) {
      color = "rgb(130, 162, 231)"
    }
    

   var style = {
       width: "1.2rem",
       height: "1.2rem",
       
       backgroundColor: color
   }

  return (
      <div style= {containerStyle }>
      <div  className= {cN}  style = {style} cell = {props.cell} >
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
          for (let i=2; i < 16; i++) {
              row.push(<Cell   key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
          }
  
      return (
          <div  className= "center text-center justify-content-center" style = {style}>
      
          {row }
       
          </div>
  
      )
  }


  
  function Board(props) {
      var board = []
          for (let i=2; i<22; i++) {
              board.push(<Row   key = {i} row = {i} cells = {props.cells[i]}  handleClick = {props.handleClick}/>)
          }
          return (
              <div className = "align-items-center justify-content-center col-12" > 
                <div display= "inline-block" >
                  {board}
                </div>
              </div>

          )
  }






 
  
function GameSeven() {
    var cells2 = []
    for(let i = 0; i < 22; i++ ){
    cells2.push(new Array(19).fill(0))
    }
    for(let i = 22; i < 24; i++ ){
    cells2.push(new Array(19).fill("x"))
    }

    const [cells, addBlock] = useState(cells2);
    const [score, updateScore] = useState(0);
    const [result, updateResult] = useState("");
    const [show, updateShow] = useState(false)
    const { t, i18n } = useTranslation();

    var square = JSON.parse(JSON.stringify(cells2))
    square[2][8] = 1
    square[2][9] = 1
    square[3][8] = 1
    square[3][9] = 1


  function manageFx(){
  if(fx){
    fx = false
  } else if (!(fx)){
    fx = true
    }
  }
  function instructions(){

      var showTemp = show
      if(showTemp === false){
          showTemp = true
      } else if (showTemp === true){
          showTemp = false
      }
      updateShow(showTemp)
  } 
  

  function playClick()  {
   
      if(playingState === false){
      
      playingState = true
      addBlock(square)
    
    } else if(playingState === true){
      playingState = false
      addBlock(cells2)
    }
  }

    
    useEffect(() => { 
        
        const game =  setInterval(() => {
          addBlock((cells) => updateBoard(cells));
          updateResult(result2)
          updateScore(score2)
        }, 600);
        return () => {
          clearInterval(game);
        };
      }, []);

      

    return (

    <div onKeyDown={(e) => handleKeyDown(e)} className ="col-xs-12 col-lg-9 justify-content-center">

        <div className = "row mt-4 " >
          <div className = "col-5" >
            <div className= "row">
                <div className = "col-12" >
                  <span>
                    <FxButton manageFx={manageFx} fxStatus={fx} />
                  </span>
                </div>
            </div>
        </div>

          <div className = "col-5 text-end " >
              
              <InstructionsButton instructions = {instructions}/>
              <Instructions instructions = {instructions} show= {show} instructDetails= {howtoplay()} /> 
          </div>
        </div>
          <div className = "row mt-4 justify-content-center">
            <div className = "col-sm-4 col-md-3 col-lg-2 text-center justify-content-center " >  
              <tx className = "font-face-zkgam" style={{fontSize: 13}} id = "scoreTitle"> {t('SCORE')}: </tx>  
              
             <tx style={{fontSize: 15}} id = "score" className = "font-face-zkga"> {score} </tx> 
            </div>

            <div className = "col-4 text-center justify-content-center " >  
              <h1 className = "font-face-zkga" style={{fontSize: 15}} id = "result">{t(result)}</h1> 
            </div>
          </div>
        <div className = "row  align-items-center justify-content-center"> 
            <Board cells= {cells}  />
        </div> 
        <div className = "row mt-4 align-items-center"> 
        
        <div className = "col-4 text-center" > <ArrowLeftSquare  width="28" height="28" onClick={() => handleLeftButton()}/> </div>
        <div className = "col-4 text-center" > <ArrowRepeat  width="28" height="28" onClick={() => handleUpButton()}/> </div>
        <div className = "col-4 text-center" > <ArrowRightSquare  width="28" height="28" onClick={() => handleRightButton()}/> </div>
        </div>
        <div className = "row mt-4 align-items-center"> 
            <div className = "col-12 text-center" > 
              <PlayStopButton  size="sm" text= {playingState? "QUIT" : "PLAY"}  onButtonClick= {playClick}/> 
            </div>

        </div>
    </div>
    );
}



var activeBlock = 0

function blocks(cells){
  const block = []
  const allblocks = ["square", "stick", "ele", "otherele", "ese", "zeta", "te"]

  var square = JSON.parse(JSON.stringify(cells))
  square[2][8] = 1
  square[2][9] = 1
  square[3][8] = 1
  square[3][9] = 1
  block.push(square)
  
  var stick = JSON.parse(JSON.stringify(cells))
  stick[2][7] = 3
  stick[2][8] = 3
  stick[2][9] = 3
  stick[2][10] = 3
  block.push(stick)
  
  var ele = JSON.parse(JSON.stringify(cells))
  ele[2][7] = 4
  ele[2][8] = 4
  ele[2][9] = 4
  ele[3][9] = 4
  block.push(ele)

  var otherele = JSON.parse(JSON.stringify(cells))
  otherele[3][7] = 5
  otherele[2][7] = 5
  otherele[2][8] = 5
  otherele[2][9] = 5
  block.push(otherele)

  var ese = JSON.parse(JSON.stringify(cells))
  ese[3][7] = 6
  ese[3][8] = 6
  ese[2][8] = 6
  ese[2][9] = 6
  block.push(ese)

  var zeta = JSON.parse(JSON.stringify(cells))
  zeta[2][7] = 7
  zeta[2][8] = 7
  zeta[3][8] = 7
  zeta[3][9] = 7
  block.push(zeta)

  var te = JSON.parse(JSON.stringify(cells))
  te[3][7] = 8
  te[3][8] = 8
  te[3][9] = 8
  te[2][8] = 8
  block.push(te)

  var index = Math.floor(Math.random() * (7 - 0)) + 0;
  
  activeBlock = allblocks[index]
  return block[index];
}

var keyUp = 0
var keyDown = 0
var key = 0
function handleKeyDown(e){  
  e.preventDefault()
  if((e.key === "ArrowRight") || (e.key === "ArrowLeft") ) {
    key = e.key
    return key
  } else  if( e.key === "ArrowUp" ) {
    keyUp = e.key
    return keyUp
  } 
}

function handleLeftButton(){
  key = "ArrowLeft"
  return key
}

function handleRightButton(){
  key = "ArrowRight"
  return key
}

function handleUpButton(){
  keyUp = "ArrowUp"
  return keyUp
}

function shootFX(trigger){
var fxNum = Math.floor(Math.random() * (7 - 1)) + 1;
var fxDrop = new Howl({
    src: [`/audios_tetris/tetris_fx-00${fxNum}.wav`],
    loop: false,
    volume: 0.3
    })

var fxLine = new Howl({
    src: [`/audios_tetris/tetris_fx_linea.mp3`],
    loop: false,
    volume: 0.3
    })

    if((fx ) & (trigger === "drop")){
    fxDrop.play()

    } else 
    if((fx ) & (trigger === "line")){
      fxLine.play()

      }
}


function updateBoard(cells){


  //busca ubicacion de una pieza que se mueva y no toque nada abajo:
  var update = JSON.parse(JSON.stringify(cells))
  if (playingState === true) {

  var movingBlock = []
  var y = 0
  for(let c = 2; c<16; c++){    
    for(let r = 22; r>1; r--){
      if((cells[r][c] > 0 ) && (cells[r][c] < 9 )){
        movingBlock[y]=[r, c]
        y++
      }
    }
  }


  if(key === "ArrowRight"){
    var updateTemp = JSON.parse(JSON.stringify(update))
    var okMoveR = 0
    for(let i=0; i<4; i++){
      if(!((updateTemp[movingBlock[i][0]][(movingBlock[i][1]) + 1]) > 9) && ((movingBlock[i][1]+ 1) < 16)) {
        okMoveR++
      }
    
    }
    if(okMoveR === 4){
    for(let i=0; i<4; i++){
   
      updateTemp[(movingBlock[i][0])][(movingBlock[i][1]) + 1] = update[(movingBlock[i][0])][(movingBlock[i][1])]
      updateTemp[(movingBlock[i][0])][(movingBlock[i][1])] = update[(movingBlock[i][0])][(movingBlock[i][1]) - 1]
    }
  }
    update = updateTemp
  }
  if(key === "ArrowLeft"){
    var updateTemp = JSON.parse(JSON.stringify(update))
    var okMoveL = 0
    for(let i=0; i<4; i++){
      if( !((updateTemp[movingBlock[i][0]][(movingBlock[i][1]) - 1]) > 9) && (( (movingBlock[i][1]) - 1) > 1 )  ){
        okMoveL++
      }
    }
    if(okMoveL === 4){
    for(let i=0; i<4; i++){
   
      updateTemp[(movingBlock[i][0])][(movingBlock[i][1]) - 1] = update[(movingBlock[i][0])][(movingBlock[i][1])]
      updateTemp[(movingBlock[i][0])][(movingBlock[i][1])] = update[(movingBlock[i][0])][(movingBlock[i][1]) + 1]
  
    }
  }
    update = updateTemp
  }

  if(keyUp === "ArrowUp"){ //GIRO DE PIEZAS:
    var updateTemp = JSON.parse(JSON.stringify(update))
    
    // si es zeta en posición original:
    if((activeBlock === "zeta") && (!(cells[(movingBlock[1][0]) + 1][movingBlock[1][1]] === "x" ) && !(cells[(movingBlock[1][0]) + 1][movingBlock[1][1]] > 9 ) && (movingBlock[2][1] === movingBlock[1][1]))){      
      
      updateTemp[((movingBlock[2][0]) + 2)][(movingBlock[2][1]) ] = update[(movingBlock[2][0])][(movingBlock[2][1]) ]
      updateTemp[(movingBlock[0][0])][(movingBlock[0][1]) + 2] = update[(movingBlock[0][0])][(movingBlock[0][1])]

      updateTemp[(movingBlock[2][0])][(movingBlock[2][1]) ] = update[((movingBlock[2][0])+ 2)][(movingBlock[2][1]) ]
      updateTemp[(movingBlock[0][0])][(movingBlock[0][1])] = update[(movingBlock[0][0])][(movingBlock[0][1]) + 2]
    }

        // si es zeta en posición 2:
        if((activeBlock === "zeta") && ((movingBlock[1][1] - 1) > 1 ) && !(cells[(movingBlock[1][0])][(movingBlock[1][1] - 1)] > 9 ) && (movingBlock[0][1] === movingBlock[1][1])){      
      
          updateTemp[((movingBlock[3][0]))][(movingBlock[3][1]) - 1] = update[(movingBlock[3][0])][(movingBlock[3][1]) ] 
          updateTemp[(movingBlock[0][0]) - 2][(movingBlock[0][1]) - 1] = update[(movingBlock[0][0])][(movingBlock[0][1])]
    
          updateTemp[(movingBlock[3][0])][(movingBlock[3][1]) ] = update[((movingBlock[3][0]))][(movingBlock[3][1]) - 1]
          updateTemp[(movingBlock[0][0])][(movingBlock[0][1])] = update[(movingBlock[0][0]) - 2][(movingBlock[0][1]) - 1]
        }

        // si es stick en posicion original:
        if((activeBlock === "stick") && !(movingBlock[1][1] === movingBlock[2][1]) && !((cells[(movingBlock[2][0]) + 1][((movingBlock[2][1]))]) > 9) && !((cells[(movingBlock[2][0]) + 2][((movingBlock[2][1]))]) > 9) && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1])]) > 9) && !((cells[(movingBlock[3][0]) + 2][(movingBlock[3][1])]) > 9) && !((cells[(movingBlock[1][0]) + 1][(movingBlock[1][1])]) > 9) && !(cells[(movingBlock[1][0])  + 2][((movingBlock[1][1]))] > 9) && !(cells[(movingBlock[1][0])  - 1][((movingBlock[1][1]))] > 9) && !(cells[(movingBlock[1][0])  + 2][((movingBlock[1][1]))] === "x")) {
          updateTemp[((movingBlock[0][0]))][movingBlock[0][1]] = 0
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0

          updateTemp[(movingBlock[0][0]) - 1][(movingBlock[0][1]) + 1] = 3
          updateTemp[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1] = 3
          updateTemp[(movingBlock[3][0]) + 2][(movingBlock[3][1]) - 2] = 3
        }
        // si es stick en posicion 2:
        if((activeBlock === "stick") && !(movingBlock[1][0] === movingBlock[2][0])  && !(((movingBlock[1][1]) + 2 ) > 15) && !(((movingBlock[1][1]) - 2 ) < 2) && !((cells[movingBlock[0][0]][(movingBlock[0][1]) + 1] ) > 9) && !((cells[movingBlock[0][0]][(movingBlock[0][1]) + 2] ) > 9) && !((cells[movingBlock[1][0]][(movingBlock[1][1]) + 1] ) > 9) && !((cells[movingBlock[1][0]][(movingBlock[1][1]) + 2] ) > 9) && !((cells[movingBlock[2][0]][(movingBlock[2][1]) + 1] ) > 9) && !((cells[movingBlock[2][0]][(movingBlock[2][1]) + 2] ) > 9) && !((cells[(movingBlock[3][0]) - 1][(movingBlock[3][1]) - 1] ) > 9)){
          updateTemp[((movingBlock[0][0]))][movingBlock[0][1]] = 0
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0

          updateTemp[(movingBlock[0][0]) - 1][(movingBlock[0][1]) + 1] = 3
          updateTemp[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1] = 3
          updateTemp[(movingBlock[3][0]) + 2][(movingBlock[3][1]) - 2] = 3

        }
      // si es ele:(ele al reves)
        if((activeBlock === "ele") && (movingBlock[2][1] === movingBlock[3][1]) && !(movingBlock[1][1] === movingBlock[2][1]) && !( cells[(movingBlock[2][0]) + 1][movingBlock[2][1]]  > 9) && !( cells[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1]  > 9) && !( cells[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1]  === "x") ) {
          updateTemp[(movingBlock[0][0]) + 2][(movingBlock[0][1])] = 4
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[(movingBlock[1][0]) + 2][(movingBlock[1][1])] = 4
          updateTemp[(movingBlock[1][0]) + 1][(movingBlock[1][1])] = 4
          updateTemp[(movingBlock[3][0])][(movingBlock[3][1])] = 0
          updateTemp[(movingBlock[2][0])][(movingBlock[2][1])] = 0
        }

        if((activeBlock === "ele") && (movingBlock[3][1] === movingBlock[1][1]) && (((movingBlock[1][1]) + 1) < 15) && !(cells[movingBlock[2][0]][((movingBlock[2][1]) - 1)] > 9) && !(cells[((movingBlock[2][0]))][((movingBlock[2][1]) + 1)] > 9) && !(cells[((movingBlock[3][0]))][((movingBlock[3][1]) + 1)] > 9) && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] > 9)){
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]) - 1)] = 4
          updateTemp[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] = 4
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]))] = 0
          updateTemp[movingBlock[3][0]][((movingBlock[3][1]))] = 0
        }

        if((activeBlock === "ele") && (movingBlock[3][0] === movingBlock[2][0]) && (movingBlock[2][0] === movingBlock[0][0]) && !(cells[((movingBlock[2][0]) - 2)][movingBlock[2][1]] > 9) && !(cells[((movingBlock[0][0]) - 2)][movingBlock[0][1]] > 9)) {
          updateTemp[((movingBlock[0][0]) - 2)][movingBlock[0][1]] = 4
          updateTemp[((movingBlock[2][0]) - 2)][movingBlock[2][1]] = 4
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0
        }

        if((activeBlock === "ele") && (movingBlock[0][1] === movingBlock[1][1]) && ( movingBlock[1][1] === movingBlock[2][1]) && ((movingBlock[3][1] + 1) < 15) && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1]) + 1]) > 9) && !((cells[(movingBlock[1][0]) + 1][(movingBlock[1][1]) + 2]) > 9) && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1])]) > 9)) {
          updateTemp[(movingBlock[3][0]) + 1][(movingBlock[3][1]) + 1] = 4
          updateTemp[(movingBlock[1][0]) + 1][(movingBlock[1][1]) + 2] = 4
          updateTemp[(movingBlock[3][0]) + 1][(movingBlock[3][1])] = 4
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
        }
        //si es la otra ele: (ele)
        if((activeBlock === "otherele") && (movingBlock[3][0] === movingBlock[2][0]) && (movingBlock[2][0] === movingBlock[1][0]) && !((cells[((movingBlock[3][0]) + 1)][movingBlock[3][1]]) > 9)  && !((cells[((movingBlock[3][0]) + 2)][movingBlock[3][1]]) > 9) && !((cells[((movingBlock[3][0]) + 2)][movingBlock[3][1]]) === "x")   ){
          updateTemp[((movingBlock[3][0]) + 2)][movingBlock[3][1]] = 5
          updateTemp[((movingBlock[3][0]) + 1)][movingBlock[3][1]] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0

        }

        if((activeBlock === "otherele") && (movingBlock[3][1] === movingBlock[2][1]) && (movingBlock[2][1] === movingBlock[1][1]) && (((movingBlock[0][1]) - 1) > 1) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] > 9) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 2)] > 9) ){
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 2)] = 5
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 1)] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
        }

        if((activeBlock === "otherele") && (movingBlock[0][0] === movingBlock[1][0]) && (movingBlock[1][0] === movingBlock[2][0]) && !(cells[movingBlock[0][0]][((movingBlock[0][1]) - 1)] > 9) && !(cells[movingBlock[0][0]][((movingBlock[0][1]) - 2)] > 9) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] > 9) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 2)] > 9)) {
          updateTemp[((movingBlock[1][0]) - 2)][((movingBlock[1][1]))] = 5
          updateTemp[((movingBlock[1][0]) - 1)][movingBlock[1][1]] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0

        }
 
        if((activeBlock === "otherele") && (movingBlock[0][1] === movingBlock[1][1]) && (movingBlock[1][1] === movingBlock[2][1]) && (((movingBlock[2][1]) + 2) < 15) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 2)] > 9) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 1)] > 9)   ) {
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) + 2)] = 5
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) + 1)] = 5
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0

        }

        //si es ese:
        if((activeBlock === "ese") && ((movingBlock[1][1]) === (movingBlock[2][1])) && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] === "x") && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] > 9) && !(cells[((movingBlock[0][0]) + 1)][(movingBlock[0][1])] > 9) && !(cells[((movingBlock[0][0]) - 1)][(movingBlock[0][0])] > 9)) {
            updateTemp[((movingBlock[0][0]) - 1)][(movingBlock[0][1])] = 6
            updateTemp[((movingBlock[1][0]) + 1)][movingBlock[1][1]] = 6
            updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
            updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
        }

        if((activeBlock === "ese") && ((movingBlock[1][1]) === (movingBlock[0][1])) && !(cells[((movingBlock[0][0]) + 1)][movingBlock[0][1]] > 9) && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] > 9) && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 2)] > 9) && (((movingBlock[1][1]) + 1)) < 15) {
          updateTemp[((movingBlock[3][0]))][((movingBlock[3][1]) + 1)] = 6
          
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0
          updateTemp[((movingBlock[0][0]) + 1)][((movingBlock[0][1]))] = 6
        }
        //si es te:

        if((activeBlock === "te") && ((movingBlock[0][0]) === (movingBlock[1][0])) && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] > 9) && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] > 9) && !(cells[((movingBlock[3][0]) + 1)][movingBlock[3][1]] > 9) && !(cells[((movingBlock[3][0]) - 1)][movingBlock[3][1]] > 9)) {
          updateTemp[((movingBlock[1][0]) + 1)][movingBlock[1][1]] = 8
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
        }

        if((activeBlock === "te") && ((movingBlock[0][1]) === (movingBlock[1][1])) && !(((movingBlock[0][1]) - 1) < 2 )  && !((cells[movingBlock[0][0]][((movingBlock[0][1]) - 1)]) > 9 )  && !((cells[movingBlock[0][0]][((movingBlock[0][1]) + 1)]) > 9 ) && !((cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)]) > 9 )){
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 1)] = 8
        }

        if ( (activeBlock === "te") && ((movingBlock[0][0]) === (movingBlock[2][0])) && ((movingBlock[2][0]) === (movingBlock[3][0])) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 1)] > 9) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] > 9)&& !(cells[((movingBlock[1][0]) - 2)][movingBlock[1][1]] > 9) ){
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
          updateTemp[((movingBlock[1][0])  - 2)][movingBlock[1][1]] = 8
        }

        if ( (activeBlock === "te") && ((movingBlock[1][1]) === (movingBlock[3][1])) && (((movingBlock[1][1]) + 1) < 16) && !((cells[movingBlock[2][0]][((movingBlock[2][1]) + 1)]) > 9) && !((cells[((movingBlock[2][0]) - 1)][((movingBlock[2][1]) + 1)]) > 9) && !((cells[((movingBlock[0][0]) - 1)][(movingBlock[0][1])]) > 9) && !((cells[((movingBlock[0][0]) + 1)][(movingBlock[0][1])] > 9) )) {
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]) + 1)] = 8
        }
    update = updateTemp
    
}

  
  
if((key === 0) && (keyUp === 0)){
  //si no toca nada la sigue bajando, sino la fija:
     var count = 0
     if(movingBlock.length === 4){
      for(let i = 0; i < 4; i++){

        if(!(cells[(movingBlock[i][0]) + 1][movingBlock[i][1]] === "x" ) && !(cells[(movingBlock[i][0]) + 1][movingBlock[i][1]] > 9 )){
          count++
        }
      }





        if(count === 4) {
          for(let i = 0; i < 4; i++){
           
            update[(movingBlock[i][0]) + 1][movingBlock[i][1]] = cells[(movingBlock[i][0])][movingBlock[i][1]]
            update[(movingBlock[i][0])][movingBlock[i][1]] = cells[(movingBlock[i][0]) - 1][movingBlock[i][1]]
            }
        }
        //fija el bloque en el piso y tira una nueva pieza:
        else if(count<4){
          update[movingBlock[0][0]][movingBlock[0][1]] = update[movingBlock[0][0]][movingBlock[0][1]] * 10
          update[movingBlock[1][0]][movingBlock[1][1]] = update[movingBlock[1][0]][movingBlock[1][1]] * 10
          update[movingBlock[2][0]][movingBlock[2][1]] = update[movingBlock[2][0]][movingBlock[2][1]] * 10
          update[movingBlock[3][0]][movingBlock[3][1]] = update[movingBlock[3][0]][movingBlock[3][1]] * 10
          update = blocks(update)
          shootFX("drop")
        }  

    }
  }

    key = 0
    keyUp = 0
    var updateTemp2 = JSON.parse(JSON.stringify(update))
    for(let r = 0; r<22; r++){     
      var count2 = 0
      for(let c = 2; c<16; c++){
          
          if(updateTemp2[r][c] > 9){
            count2++
          }
        } 
        
          if(count2 === 14){
            for(let r2 = r; r2>1; r2--){
              for(let c = 2; c<16; c++){  
                updateTemp2[r2][c] = update[r2-1][c]
              }
            }
            score2++
            shootFX("line")

          }
     
    }

    for(let c = 2; c < 16 ; c++){
      if(updateTemp2[2][c] > 9){
        result2 = "Game Over"
        playingState = false
      }
    }

    update = updateTemp2
    return update;
  } else {
    return update;}
}


export default GameSeven;