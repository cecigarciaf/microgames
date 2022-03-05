import React, { useState, useEffect } from 'react';
import PlayStopButton from './playButton';
import './gameSeven.css';

function Cell(props){

  var cN = "text-center justify-content-center test"
  
  
  var containerStyle = {
      backgroundColor: "grey",
      
  }
    var color = "rgb(199, 196, 196)"

    
    if(props.cell === 0){
      color = "rgb(226, 224, 224)"
    }
    else if (props.cell === "fix"){
      color = "rgb(182, 182, 182)"
    }
    else if ((props.cell === 1) || (props.cell === "fix")){
      color = "pink"
    }
    else if (props.cell === 3) {
      color = "rgb(248, 211, 141)"
    }
    else if (props.cell === 4) {
      color = "rgb(193, 233, 168)"
    }
    else if (props.cell === 5) {
      color = "rgb(174, 252, 252)"
    }
    else if (props.cell === 6) {
      color = "rgb(226, 198, 250)"
    }
    else if (props.cell === 7) {
      color = "rgb(218, 151, 151)"
    }
    else if (props.cell === 8) {
      color = "rgb(130, 162, 231)"
    }
    

   var style = {
       width: "1rem",
       height: "1rem",
       
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
          for (let i=2; i<38; i++) {
              board.push(<Row   key = {i} row = {i} cells = {props.cells[i]}  handleClick = {props.handleClick}/>)
          }
          return (
              <div   className = "align-items-center justify-content-center row m-5" > 
          
                <div  display= "inline-block" >
              {board}
              </div>
              </div>

          )
  }

function GameSeven() {

      var cells2 = []
      for(let i = 0; i < 38; i++ ){
      cells2.push(new Array(19).fill(0))
      }
      for(let i = 38; i < 40; i++ ){
        cells2.push(new Array(19).fill("x"))
        }

    const [cells, addBlock] = useState(cells2);
    const [playingState, changePlayingState] = useState(false);
    const [speed, updateSpeed] = useState(100)
    var square = JSON.parse(JSON.stringify(cells))
    square[2][8] = 1
    square[2][9] = 1
    square[3][8] = 1
    square[3][9] = 1

        if(keyDown === "ArrowDown"){
          updateSpeed(speed + 10)
          
        }
      


    useEffect(() => {
       
        const test =  setInterval(() => {
          
          addBlock((cells, playingState) => updateBoard(cells, playingState));
        }, speed);
        return () => {
          clearInterval(test);
        };
      }, []);

    return (

    <div  onKeyDown={(e) => handleKeyDown(e)} className ="col-9">
        <div className = "row"> 
            <Board cells= {cells}  />
        </div>
        <div className = "row"> 
            <PlayStopButton text= "PLAY"  onButtonClick={() => addBlock(square)} />
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
  console.log("index" + index)
  
  activeBlock = allblocks[index]
  return block[index];
}

var keyUp = 0
var keyDown = 0
var key = 0
function handleKeyDown(e){  
  console.log(keyDown)
  if((e.key === "ArrowRight") || (e.key === "ArrowLeft") ) {
    key = e.key
    return key
  } else  if( e.key === "ArrowUp" ) {
    keyUp = e.key
    return keyUp
  } 
}


function handleKeyPress(e){
  console.log("aca" + e.key)
}

function updateBoard(cells, playingState){
  //busca ubicacion de una pieza que se mueva y no toque nada abajo:
  var update = JSON.parse(JSON.stringify(cells))
  var movingBlock = []
  var y = 0
  for(let c = 2; c<16; c++){    
    for(let r = 38; r>1; r--){
      if(cells[r][c] > 0 ){
        movingBlock[y]=[r, c]
        y++
      }
    }
  }

  if(key === "ArrowRight"){
    var updateTemp = JSON.parse(JSON.stringify(update))
    var okMoveR = 0
    for(let i=0; i<4; i++){
      if(!((updateTemp[movingBlock[i][0]][(movingBlock[i][1]) + 1]) === "fix") && ((movingBlock[i][1]+ 1) < 16)) {
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
      if( !((updateTemp[movingBlock[i][0]][(movingBlock[i][1]) - 1]) === "fix") && (( (movingBlock[i][1]) - 1) > 1 )  ){
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

  if(keyUp === "ArrowUp"){
    console.log("movingBlock 1   "+ movingBlock)
    console.log("activeBlock "+ activeBlock)
    var updateTemp = JSON.parse(JSON.stringify(update))
    
    // si es zeta en posición original:
    if((activeBlock === "zeta") && (!(cells[(movingBlock[1][0]) + 1][movingBlock[1][1]] === "x" ) && !(cells[(movingBlock[1][0]) + 1][movingBlock[1][1]] === "fix" ) && (movingBlock[2][1] === movingBlock[1][1]))){      
      
      updateTemp[((movingBlock[2][0]) + 2)][(movingBlock[2][1]) ] = update[(movingBlock[2][0])][(movingBlock[2][1]) ]
      updateTemp[(movingBlock[0][0])][(movingBlock[0][1]) + 2] = update[(movingBlock[0][0])][(movingBlock[0][1])]

      updateTemp[(movingBlock[2][0])][(movingBlock[2][1]) ] = update[((movingBlock[2][0])+ 2)][(movingBlock[2][1]) ]
      updateTemp[(movingBlock[0][0])][(movingBlock[0][1])] = update[(movingBlock[0][0])][(movingBlock[0][1]) + 2]
    }

        // si es zeta en posición 2:
        if((activeBlock === "zeta") && ((movingBlock[1][1] - 1) > 1 ) && !(cells[(movingBlock[1][0])][(movingBlock[1][1] - 1)] === "fix" ) && (movingBlock[0][1] === movingBlock[1][1])){      
      
          updateTemp[((movingBlock[3][0]))][(movingBlock[3][1]) - 1] = update[(movingBlock[3][0])][(movingBlock[3][1]) ] 
          updateTemp[(movingBlock[0][0]) - 2][(movingBlock[0][1]) - 1] = update[(movingBlock[0][0])][(movingBlock[0][1])]
    
          updateTemp[(movingBlock[3][0])][(movingBlock[3][1]) ] = update[((movingBlock[3][0]))][(movingBlock[3][1]) - 1]
          updateTemp[(movingBlock[0][0])][(movingBlock[0][1])] = update[(movingBlock[0][0]) - 2][(movingBlock[0][1]) - 1]
        }

        // si es stick en posicion original:
        if((activeBlock === "stick") && !(movingBlock[1][1] === movingBlock[2][1]) && !((cells[(movingBlock[2][0]) + 1][((movingBlock[2][1]))]) === "fix") && !((cells[(movingBlock[2][0]) + 2][((movingBlock[2][1]))]) === "fix") && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1])]) === "fix") && !((cells[(movingBlock[3][0]) + 2][(movingBlock[3][1])]) === "fix") && !((cells[(movingBlock[1][0]) + 1][(movingBlock[1][1])]) === "fix") && !(cells[(movingBlock[1][0])  + 2][((movingBlock[1][1]))] === "fix") && !(cells[(movingBlock[1][0])  - 1][((movingBlock[1][1]))] === "fix") && !(cells[(movingBlock[1][0])  + 2][((movingBlock[1][1]))] === "x")) {
          updateTemp[((movingBlock[0][0]))][movingBlock[0][1]] = 0
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0

          updateTemp[(movingBlock[0][0]) - 1][(movingBlock[0][1]) + 1] = 3
          updateTemp[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1] = 3
          updateTemp[(movingBlock[3][0]) + 2][(movingBlock[3][1]) - 2] = 3
        }
        // si es stick en posicion 2:
        if((activeBlock === "stick") && !(movingBlock[1][0] === movingBlock[2][0])  && !(((movingBlock[1][1]) + 2 ) > 15) && !(((movingBlock[1][1]) - 2 ) < 2) && !((cells[movingBlock[0][0]][(movingBlock[0][1]) + 1] ) === "fix") && !((cells[movingBlock[0][0]][(movingBlock[0][1]) + 2] ) === "fix") && !((cells[movingBlock[1][0]][(movingBlock[1][1]) + 1] ) === "fix") && !((cells[movingBlock[1][0]][(movingBlock[1][1]) + 2] ) === "fix") && !((cells[movingBlock[2][0]][(movingBlock[2][1]) + 1] ) === "fix") && !((cells[movingBlock[2][0]][(movingBlock[2][1]) + 2] ) === "fix") && !((cells[(movingBlock[3][0]) - 1][(movingBlock[3][1]) - 1] ) === "fix")){
          updateTemp[((movingBlock[0][0]))][movingBlock[0][1]] = 0
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0

          updateTemp[(movingBlock[0][0]) - 1][(movingBlock[0][1]) + 1] = 3
          updateTemp[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1] = 3
          updateTemp[(movingBlock[3][0]) + 2][(movingBlock[3][1]) - 2] = 3

        }
      // si es ele:(ele al reves)
        if((activeBlock === "ele") && (movingBlock[2][1] === movingBlock[3][1]) && !(movingBlock[1][1] === movingBlock[2][1]) && !( cells[(movingBlock[2][0]) + 1][movingBlock[2][1]]  === "fix") && !( cells[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1]  === "fix") && !( cells[(movingBlock[2][0]) + 1][(movingBlock[2][1]) - 1]  === "x") ) {
          updateTemp[(movingBlock[0][0]) + 2][(movingBlock[0][1])] = 4
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[(movingBlock[1][0]) + 2][(movingBlock[1][1])] = 4
          updateTemp[(movingBlock[1][0]) + 1][(movingBlock[1][1])] = 4
          updateTemp[(movingBlock[3][0])][(movingBlock[3][1])] = 0
          updateTemp[(movingBlock[2][0])][(movingBlock[2][1])] = 0
        }

        if((activeBlock === "ele") && (movingBlock[3][1] === movingBlock[1][1]) && (((movingBlock[1][1]) + 1) < 15) && !(cells[movingBlock[2][0]][((movingBlock[2][1]) - 1)] === "fix") && !(cells[((movingBlock[2][0]))][((movingBlock[2][1]) + 1)] === "fix") && !(cells[((movingBlock[3][0]))][((movingBlock[3][1]) + 1)] === "fix") && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] === "fix")){
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]) - 1)] = 4
          updateTemp[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] = 4
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]))] = 0
          updateTemp[movingBlock[3][0]][((movingBlock[3][1]))] = 0
        }

        if((activeBlock === "ele") && (movingBlock[3][0] === movingBlock[2][0]) && (movingBlock[2][0] === movingBlock[0][0]) && !(cells[((movingBlock[2][0]) - 2)][movingBlock[2][1]] === "fix") && !(cells[((movingBlock[0][0]) - 2)][movingBlock[0][1]] === "fix")) {
          updateTemp[((movingBlock[0][0]) - 2)][movingBlock[0][1]] = 4
          updateTemp[((movingBlock[2][0]) - 2)][movingBlock[2][1]] = 4
          updateTemp[((movingBlock[2][0]))][movingBlock[2][1]] = 0
          updateTemp[((movingBlock[3][0]))][movingBlock[3][1]] = 0
        }

        if((activeBlock === "ele") && (movingBlock[0][1] === movingBlock[1][1]) && ( movingBlock[1][1] === movingBlock[2][1]) && ((movingBlock[3][1] + 1) < 15) && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1]) + 1]) === "fix") && !((cells[(movingBlock[1][0]) + 1][(movingBlock[1][1]) + 2]) === "fix") && !((cells[(movingBlock[3][0]) + 1][(movingBlock[3][1])]) === "fix")) {
          updateTemp[(movingBlock[3][0]) + 1][(movingBlock[3][1]) + 1] = 4
          updateTemp[(movingBlock[1][0]) + 1][(movingBlock[1][1]) + 2] = 4
          updateTemp[(movingBlock[3][0]) + 1][(movingBlock[3][1])] = 4
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
        }
        //si es la otra ele: (ele)
        if((activeBlock === "otherele") && (movingBlock[3][0] === movingBlock[2][0]) && (movingBlock[2][0] === movingBlock[1][0]) && !((cells[((movingBlock[3][0]) + 1)][movingBlock[3][1]]) === "fix")  && !((cells[((movingBlock[3][0]) + 2)][movingBlock[3][1]]) === "fix") && !((cells[((movingBlock[3][0]) + 2)][movingBlock[3][1]]) === "x")   ){
          updateTemp[((movingBlock[3][0]) + 2)][movingBlock[3][1]] = 5
          updateTemp[((movingBlock[3][0]) + 1)][movingBlock[3][1]] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0

        }

        if((activeBlock === "otherele") && (movingBlock[3][1] === movingBlock[2][1]) && (movingBlock[2][1] === movingBlock[1][1]) && (((movingBlock[0][1]) - 1) > 1) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] === "fix") && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 2)] === "fix") ){
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 2)] = 5
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 1)] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
        }

        if((activeBlock === "otherele") && (movingBlock[0][0] === movingBlock[1][0]) && (movingBlock[1][0] === movingBlock[2][0]) && !(cells[movingBlock[0][0]][((movingBlock[0][1]) - 1)] === "fix") && !(cells[movingBlock[0][0]][((movingBlock[0][1]) - 2)] === "fix") && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] === "fix") && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 2)] === "fix")) {
          updateTemp[((movingBlock[1][0]) - 2)][((movingBlock[1][1]))] = 5
          updateTemp[((movingBlock[1][0]) - 1)][movingBlock[1][1]] = 5
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0

        }
 
        if((activeBlock === "otherele") && (movingBlock[0][1] === movingBlock[1][1]) && (movingBlock[1][1] === movingBlock[2][1]) && (((movingBlock[2][1]) + 2) < 15) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 2)] === "fix") && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 1)] === "fix")   ) {
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) + 2)] = 5
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) + 1)] = 5
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0

        }

        //si es ese:
        if((activeBlock === "ese") && ((movingBlock[1][1]) === (movingBlock[2][1])) && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] === "x") && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] === "fix") && !(cells[((movingBlock[0][0]) + 1)][(movingBlock[0][1])] === "fix") && !(cells[((movingBlock[0][0]) - 1)][(movingBlock[0][0])] === "fix")) {
            updateTemp[((movingBlock[0][0]) - 1)][(movingBlock[0][1])] = 6
            updateTemp[((movingBlock[1][0]) + 1)][movingBlock[1][1]] = 6
            updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
            updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
        }

        if((activeBlock === "ese") && ((movingBlock[1][1]) === (movingBlock[0][1])) && !(cells[((movingBlock[0][0]) + 1)][movingBlock[0][1]] === "fix") && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 1)] === "fix") && !(cells[((movingBlock[1][0]))][((movingBlock[1][1]) + 2)] === "fix") && (((movingBlock[1][1]) + 1)) < 15) {
          updateTemp[((movingBlock[3][0]))][((movingBlock[3][1]) + 1)] = 6
          
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0
          updateTemp[((movingBlock[0][0]) + 1)][((movingBlock[0][1]))] = 6
        }
        //si es te:

        if((activeBlock === "te") && ((movingBlock[0][0]) === (movingBlock[1][0])) && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] === "x") && !(cells[((movingBlock[1][0]) + 1)][movingBlock[1][1]] === "fix") && !(cells[((movingBlock[3][0]) + 1)][movingBlock[3][1]] === "fix") && !(cells[((movingBlock[3][0]) - 1)][movingBlock[3][1]] === "fix")) {
          updateTemp[((movingBlock[1][0]) + 1)][movingBlock[1][1]] = 8
          updateTemp[movingBlock[0][0]][(movingBlock[0][1])] = 0
        }

        if((activeBlock === "te") && ((movingBlock[0][1]) === (movingBlock[1][1])) && !(((movingBlock[0][1]) - 1) < 2 )  && !((cells[movingBlock[0][0]][((movingBlock[0][1]) - 1)]) === "fix" )  && !((cells[movingBlock[0][0]][((movingBlock[0][1]) + 1)]) === "fix" ) && !((cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)]) === "fix" )){
          updateTemp[movingBlock[2][0]][(movingBlock[2][1])] = 0
          updateTemp[movingBlock[1][0]][((movingBlock[1][1]) - 1)] = 8
        }

        if ( (activeBlock === "te") && ((movingBlock[0][0]) === (movingBlock[2][0])) && ((movingBlock[2][0]) === (movingBlock[3][0])) && !(cells[movingBlock[1][0]][((movingBlock[1][1]) + 1)] === "fix") && !(cells[movingBlock[1][0]][((movingBlock[1][1]) - 1)] === "fix")&& !(cells[((movingBlock[1][0]) - 2)][movingBlock[1][1]] === "fix") ){
          updateTemp[movingBlock[3][0]][(movingBlock[3][1])] = 0
          updateTemp[((movingBlock[1][0])  - 2)][movingBlock[1][1]] = 8
        }

        if ( (activeBlock === "te") && ((movingBlock[1][1]) === (movingBlock[3][1])) && (((movingBlock[1][1]) + 1) < 16) && !((cells[movingBlock[2][0]][((movingBlock[2][1]) + 1)]) === "fix") && !((cells[((movingBlock[2][0]) - 1)][((movingBlock[2][1]) + 1)]) === "fix") && !((cells[((movingBlock[0][0]) - 1)][(movingBlock[0][1])]) === "fix") && !((cells[((movingBlock[0][0]) + 1)][(movingBlock[0][1])] === "fix") )) {
          updateTemp[movingBlock[1][0]][(movingBlock[1][1])] = 0
          updateTemp[movingBlock[2][0]][((movingBlock[2][1]) + 1)] = 8
        }
    update = updateTemp
    
}

  
  
if((key === 0) && (keyUp === 0)){
  //si no toca nada la sigue bajando, sino la fija:
  console.log("movingBlock 2   "+ movingBlock)
     var count = 0
     if(movingBlock.length === 4){
      for(let i = 0; i < 4; i++){

        if(!(cells[(movingBlock[i][0]) + 1][movingBlock[i][1]] === "x" ) && !(cells[(movingBlock[i][0]) + 1][movingBlock[i][1]] === "fix" )){
          count++
        }
      }

        if(count === 4) {
          for(let i = 0; i < 4; i++){
           
            update[(movingBlock[i][0]) + 1][movingBlock[i][1]] = cells[(movingBlock[i][0])][movingBlock[i][1]]
            update[(movingBlock[i][0])][movingBlock[i][1]] = cells[(movingBlock[i][0]) - 1][movingBlock[i][1]]
            }
        }
        else if(count<4){
          update[movingBlock[0][0]][movingBlock[0][1]] = "fix"
          update[movingBlock[1][0]][movingBlock[1][1]] = "fix"
          update[movingBlock[2][0]][movingBlock[2][1]] = "fix"
          update[movingBlock[3][0]][movingBlock[3][1]] = "fix"
          update = blocks(update)
          console.log("activeBlock" + activeBlock)
        }  
    }
  }

    key = 0
    keyUp = 0
    var updateTemp2 = JSON.parse(JSON.stringify(update))
    for(let r = 0; r<38; r++){     
      var count2 = 0
      for(let c = 2; c<16; c++){
          
          if(updateTemp2[r][c] == "fix"){
            count2++
          }
        } 
        
          if(count2 === 14){
            console.log("14!!")
            for(let r2 = r; r2>1; r2--){
              for(let c = 2; c<16; c++){  
                updateTemp2[r2][c] = update[r2-1][c]
              }
            }
          }
     
    }



    update = updateTemp2

    return update;
}


export default GameSeven;