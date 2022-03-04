import React, { useState, useEffect } from 'react';
import PlayStopButton from './playButton';

function Cell(props){

  var cN = "text-center justify-content-center test"
  
  
  var containerStyle = {
      backgroundColor: "grey"
  }
    var color = "rgb(199, 196, 196)"

    
    if(props.cell === 0){
      color = "white"
    }
    else if ((props.cell === 1) || (props.cell === "fix")){
      color = "pink"
    }

   var style = {
       width: "1rem",
       height: "1rem",
       border:"0.5px solid grey",
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
          <div className= "text-center justify-content-center" style = {style}>
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
              {board}
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
    const [speed, updateSpeed] = useState(200)
    var square = JSON.parse(JSON.stringify(cells))
    square[2][8] = 1
    square[2][9] = 1
    square[3][8] = 1
    square[3][9] = 1

        if(keyDown === "ArrowDown"){
          updateSpeed(speed + 100)
          keyDown = 0
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

    <div onKeyDown={(e) => handleKeyDown(e)} className ="col-9">
        <div className = "row"> 
            <Board cells= {cells}  />
        </div>
        <div className = "row"> 
            <PlayStopButton text= "PLAY"  onButtonClick={() => addBlock(square)} />
        </div>
    </div>
    );
}


function blocks(cells){
  const block = []
  
  var square = JSON.parse(JSON.stringify(cells))
  square[2][8] = 1
  square[2][9] = 1
  square[3][8] = 1
  square[3][9] = 1
  block.push(square)
  
  var stick = JSON.parse(JSON.stringify(cells))
  stick[2][7] = 1
  stick[2][8] = 1
  stick[2][9] = 1
  stick[2][10] = 1
  block.push(stick)
  
  var ele = JSON.parse(JSON.stringify(cells))
  ele[2][7] = 1
  ele[2][8] = 1
  ele[2][9] = 1
  ele[3][9] = 1
  block.push(ele)

  var index = Math.floor(Math.random() * (3 - 0)) + 0;
  return block[index];
}


var keyDown = 0
var key = 0
function handleKeyDown(e){  
  if((e.key === "ArrowRight") || (e.key === "ArrowLeft") ){
    key = e.key
    return key
  } else  if((e.key === "ArrowDown")){
    keyDown = e.key
    return keyDown
  }
  
}




function updateBoard(cells, playingState){
  //busca ubicacion de una pieza que se mueva y no toque nada abajo:
  var update = JSON.parse(JSON.stringify(cells))
  var movingBlock = []
  var y = 0
  for(let c = 2; c<16; c++){    
    for(let r = 38; r>1; r--){
      if(cells[r][c] === 1 ){
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

  
  
if(key === 0){
  //si no toca nada la sigue bajando, sino la fija:

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
        }  
    }
  }

    key = 0
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