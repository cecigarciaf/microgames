import React, { useState, useEffect } from 'react';
import PlayStopButton from './playButton';



var playingState = false

function Shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // Mientras queden elementos a mezclar...
    while (0 !== currentIndex) {
  
      // Seleccionar un elemento sin mezclar...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // E intercambiarlo con el elemento actual
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }
 // generar numero para adivinar
 var guessThisNumber;
 var guesses;
 
 function number() {
   var allDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
   guesses = 10;
   Shuffle(allDigits);
   guessThisNumber = allDigits.splice(0, 4);
   console.log("number" + guessThisNumber);
    return guessThisNumber
   
 }

 // Se fija que el numero ingresado es de 4 digitos numéricos y agregar el mensaje de error al array de errores


function validate(num) {   
  var errors = [];
     if (!(/^[0-9][0-9][0-9][0-9]$/.test(num))) {
     errors.push("SE DEBEN INGRESAR 4 DIGITOS");
   }
    

 // valida ausencia de dígitos repetidos
 else{
   var duplicated = false;
   var num = (""+num).split("");
   
   for(var i = 0; i < 4; i++) { 
     if (!((num.filter(x => x == num[i]).length) == 1)) {
       duplicated = true;
     }
    }
     if (duplicated)  {
       errors.push("LOS DIGITOS DEBEN SER DIFERENTES");
     } 
  }

     return errors;
}
 
 
  // ejecuta validaciones (se agregaran mas), muestra errores o ejecuta el juego si el valor ingresado es validado
 

 
 function submit(guessValidated, guessesLeft) { 
   var message
   var good = 0;
   var regular = 0;


   for(var i = 0; i < 4; i++) {
     if (guessValidated[i] == guessThisNumber[i]) {     
       good++;
       } else if(guessThisNumber.includes(guessValidated[i])) {
           regular++;
       }
    }

      if (good === 4) {
        message = "CORRECT! YOU WON";
      }  else if (guessesLeft === 1){
    message = "YOU LOST";
  }
console.log("acaaa " + [good, regular, message])
return [good, regular, message];
 } 


function Result(props){
 return <p  className = "font-face-zkgam">{props.result}</p>
}

function Results(props)  {
  var amount = props.allresults.length
  var allResults = []

  for(let i = 0; i < amount; i++){
    
    allResults.push(<Result result= {props.allresults[i]}/>)
  }
  return (
  <div className = "row text-center">
    {allResults}
  </div>
  )

}

function GameSix(){
  const [correct, generateCorrect] = useState()
  const [guess, updateGuess] = useState()
  const [good, updateGood] = useState(0)
  const [regular, updateRegular] = useState(0)
  const [guessesLeft, updateGuessesLeft] = useState(10)
  const [errors, displayErrors] = useState("")
  const [result, updateResult] = useState([""])
  const [final, showFinal] = useState("")
  

  

 
  const checkNumber = (event) => {
    if (playingState === true){
      var goodTemp = submit(guess)[0]
      var regularTemp = submit(guess)[1]
      var errorsTemp = validate(guess)
      var resultTemp = JSON.parse(JSON.stringify(result))
    
    console.log("result   " + result)
    event.preventDefault();
    displayErrors(errorsTemp)

    if((errorsTemp.length == 0)){
      updateGood(goodTemp)
      updateRegular(regularTemp)
      
      updateGuessesLeft(guessesLeft - 1)
      const currentResult = `${guess}  tiene  ${goodTemp}   bien y  ${regularTemp}   regular`
      resultTemp.push(currentResult)
      updateResult(resultTemp)
      showFinal(submit(guess, guessesLeft)[2])
    }
  }
  }

  const play = () => {
    if(playingState === false){
    playingState = true
    generateCorrect(number())
    } else if (playingState === true){
      playingState = false
    }


  }


  return (
  <div className ="col-9">
    <div className = "row" >
          <div>{final}</div>
    </div>
    <div className = "row  mt-5" >
        <div className = "col-3"> 
            <PlayStopButton onButtonClick= {play}  text= {playingState? "QUIT" : "PLAY"}/>
        </div>
        <div className = "col-3"> 
            <div className = "font-face-zkgam" >Intentos:  {guessesLeft}</div>
        </div>
    </div>

    <div className = "row  mt-4" >
      <div className = "col-6"> 
        <form onSubmit={checkNumber}>
            <input onChange={(e) => updateGuess(e.target.value)} className = "font-face-zkgam form-control" type="number" name="guess"></input>
            <input  id= "sendGuess" style= {{margin: "1px", color: "white", backgroundColor: "rgb(235, 229, 241)"}} className = " mt-4 row font-face-zkgam form-control"  type="submit" value="CHECK"></input>
        </form>
      </div>
    </div>

    <div className = "row" >
      <div className = "col-6 text-center">
          {errors} 
      </div>

      <div className= "row"> 
        <div className = "col-6">
          <Results allresults = {result}/>
        </div>
      </div>


    </div>


  </div>



  )}









export default GameSix;


















