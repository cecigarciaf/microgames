import React, { useState } from 'react';
import PlayStopButton from './playButton';
import Instructions from './Instructions'
import InstructionsButton from './InstructionsButton';
import HowToPlay from './HowToPlay'
import { useTranslation } from 'react-i18next';
import './gameSix.css'

const howtoplay = () => {
    return (
        <HowToPlay gameInstructions= "InstruccionesGuess"/>
    )
}

function Intentos(props){
  return (
      <div  id="intentosCountSquare" className = " rounded mt-2 mx-auto" > <div  id="intentosCountText">{props.text}</div></div>

  )
}

function Shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    while (0 !== currentIndex) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }


 // generar número para adivinar:
 var guessThisNumber;
 var guesses;
 
 function number() {
   var allDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
   guesses = 10;
   Shuffle(allDigits);
   guessThisNumber = allDigits.splice(0, 4);
    return guessThisNumber 
 }


 // Se fija que el numero ingresado es de 4 digitos numéricos y agregar el mensaje de error al array de errores
function validate(num) {   
  var errors = [""];
     if (!(/^[0-9][0-9][0-9][0-9]$/.test(num))) {
     errors.push("SE DEBEN INGRESAR 4 DIGITOS");
   }
    

 // valida ausencia de dígitos repetidos:
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
 
 
  // ejecuta validaciones, muestra errores o ejecuta el juego si el valor ingresado es validado
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

return [good, regular, message];
 } 

function Result(props){
 return <p  className = "font-face-zkgam">{props.result}</p>
}

function Results(props)  {
  var amount = props.allresults.length
  var allResults = []
  for(let i = 0; i < amount; i++){
    allResults.push(<Result key= {i} result= {props.allresults[i]}/>)
  }
  return (
  <div id="results" className = "row text-center">
    {allResults}
  </div>
  )
}

function GameSix(){
  const [playingState, switchPlay] = useState(false)

  const [correct, generateCorrect] = useState()
  const [guess, updateGuess] = useState()
  const [good, updateGood] = useState(0)
  const [regular, updateRegular] = useState(0)
  const [guessesLeft, updateGuessesLeft] = useState(0)
  const [errors, displayErrors] = useState("")
  const [result, updateResult] = useState([""])
  const [final, showFinal] = useState("")
  const [show, updateShow] = useState(false)
  const { t, i18n } = useTranslation();
  
  var playingStateTemp = playingState

  function instructions(){
    var showTemp = show
    if(showTemp === false){
        showTemp = true
    } else if (showTemp === true){
        showTemp = false
    }
    updateShow(showTemp)
} 

  
 
  const checkNumber = (event) => {
    
    event.preventDefault();
    if (playingStateTemp){
      console.log("check2")
      var goodTemp = submit(guess)[0]
      var regularTemp = submit(guess)[1]
      var errorsTemp = validate(guess)
      var resultTemp = JSON.parse(JSON.stringify(result))
      var guessField = document. getElementById('guessField')

    event.preventDefault();
    displayErrors(errorsTemp)
    guessField.value = null

    if((errorsTemp.length < 2)){
      updateGood(goodTemp)
      updateRegular(regularTemp)
      
      updateGuessesLeft(guessesLeft - 1)
      const currentResult = `${guess}  ${t('tiene')}  ${goodTemp}   ${t('bien y')}  ${regularTemp}    REGULAR`
      resultTemp.push(currentResult)
      updateResult(resultTemp)
      showFinal(submit(guess, guessesLeft)[2])
    
      
    }
  }
  
  }

  const play = () => {
    console.log("playtingStateTemp" + playingStateTemp)
    if(!(playingStateTemp)){
    playingStateTemp = true
    generateCorrect(number())
    updateGuessesLeft(10)
    } else if (playingStateTemp){

      playingStateTemp = false
      updateGuessesLeft(0)
      displayErrors("")
      updateResult("")
    }
    switchPlay(playingStateTemp)
  }


  return (
  <div className ="col-xs-12 col-lg-9">
      <div className = "row mt-4 " >
        <div className = "col-10 text-end " >
            <InstructionsButton instructions = {instructions}/>
            <Instructions instructions = {instructions} show= {show} instructDetails= {howtoplay()} />     
        </div>
      </div>
    <div className = "row" >
    <div className = "mt-1 font-face-zkgam col-sm-12 col-md-12 col-lg-6 text-center"><b>{t(final)}</b></div>
    </div>

    <div className = "row  mt-5" >
      <div className = "col-sm-12 col-lg-6 text-center"> 
        <div   style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
       
              <div className = "col-6 font-face-zkgam intentosBox" > 
                 <div  className= "mt-1" id= "intentosText">
                   {t('intentos')} 
                 </div>
                 <div id ="intentosCount"> 
                  <Intentos text={guessesLeft}/>
                </div>
              </div> 
              
              <div className= "col-6  mr-5"  id="playButtonBox">
                <PlayStopButton onButtonClick= {play}  text= {playingState? "QUIT" : "PLAY"}/>
              </div>
        
        </div>

      </div>
    </div>

    <div className = "row" >

      <div id="errors" className = "font-face-zkgam col-sm-12 col-md-12 col-lg-6 text-center">
         <b> {t(errors)} </b> 
      </div>

      <div className = "row  mt-4" >
        <div className = "col-sm-12 col-md-12 col-lg-6"> 
          <form onSubmit={checkNumber}>
              <input id = "guessField" onChange={(e) => updateGuess(e.target.value)} className = "shadow-none font-face-zkgam form-control" type="number" name="guess"></input>
              <input  id= "sendGuess" className = "shadow-none mt-4 row font-face-zkgam form-control"  type="submit" value={t("check")}></input>
          </form>
        </div>
      </div>

      <div className= "row"> 
        <div className = "col-sm-12 col-md-12 col-lg-6">
          <Results allresults = {result}/>
        </div>
      </div>


    </div>


  </div>



  )}









export default GameSix;