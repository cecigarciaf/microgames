import React, { useState, useEffect } from 'react';
import PlayStopButton from './playButton';




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
 function Number() {
   var allDigits = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
   guesses = 10;
   Shuffle(allDigits);
   guessThisNumber = allDigits.splice(0, 4);

   console.log(guessThisNumber);
 }

 // Se fija que el numero ingresado es de 4 digitos numericos y agregar el mensaje de error al array de errores
 var errors = [];

 function checkNum(guess) {   
     if (!(/^[0-9][0-9][0-9][0-9]$/.test(guess))) {
     errors.push("You must enter a 4 digit number");
   }
 }   
 // valida ausencia de digitor repetidos
 function checkNotRepeat(guess) {
   var duplicated = false;
   var guess = (""+guess).split("");
   
   for(var i = 0; i < 4; i++) { 
     if (!((guess.filter(x => x == guess[i]).length) == 1)) {
       duplicated = true;
     }
    }
     if (duplicated) {
       errors.push("Please enter 4 different digits");
     }
  } 
 
 
  // ejecuta validaciones (se agregaran mas), muestra errores o ejecuta el juego si el valor ingresado es validado
 

 //  se ejecuta si el numero ingresado paso todas las validaciones
 var res = document.querySelector("#result");
 var win = document.querySelector("#win");
 var tries = document.querySelector(".tries");
 
 function Submit(guessValidated) { 
   var good = 0;
   var regular = 0;
   guesses--;
   tries.innerHTML = guesses;
   for(var i = 0; i < 4; i++) {
     if (guessValidated[i] == guessThisNumber[i]) {     
       good++;
       } else if(guessThisNumber.includes(guessValidated[i])) {
           regular++;
       }
    }
    console.log(good);
    console.log(regular);
    console.log(guesses); 
      if (good === 4) {
     win.innerHTML = "CORRECT! YOU WON";
  } else {
    if (guesses === 0) {
   res.innerHTML += guessValidated + " has " + good + " good and " + regular + " regular. " + "<br>"; 
   win.innerHTML = "No more tries...Game Over";
   guessThisNumber = false; 
 } else {
   res.innerHTML += guessValidated + " has " + good + " good and " + regular + " regular. " + "<br>";
 }
 } 
 } 

 function Check(guess) {

    errors.length = 0;
 
    console.log("GUESS: " + guess);
    checkNum(guess);
    checkNotRepeat(guess);
    if (errors.length > 0) {
    console.log(errors)
    } else {
      Submit(guess);
    }
  }  

function GameSix(){
  return "hola"
}
export default GameSix;


















