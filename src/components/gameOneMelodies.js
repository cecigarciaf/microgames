import React from 'react';
import {Howl} from 'howler';

import PlayStopButton from './playButton';

import Nav  from 'react-bootstrap/Nav';
import './gameOneRandom';


class GameOneMelodies extends React.Component {
    constructor(props) {
      super(props);
      this.state = {correctOrder : [], guess : [], resultText : "", i: 0, round: 0, parcialCorrectOrder: [], gameStatus: "false", turn: "computer", playingNote: "", score: 0}
      this.handlePlay = this.handlePlay.bind(this);
      this.handleQuit = this.handleQuit.bind(this);
      this.handleColorClick = this.handleColorClick.bind(this);
    }
  
  
    playGuessNote(newGuess){
      
      new Howl({
        src: ["/"+newGuess+".mp3"],
        loop: false
      }).play()
      console.log("played note " + newGuess)
    }
  
    //falta agregar lo que hace para game over: 
    showParcialResult(newGuess) {
     
      if (newGuess === this.state.correctOrder[this.state.i]) {
        this.setState({resultText: "Correct"}) }
      else  {
          this.setState({resultText: "Game Over", gameStatus: "false", correctOrder : [], guess : [], i: 0})
      }
    }

    

    //elige cancion random
    selectSong(){
      const songs = {
        imagine: ["a", "c2", "a"],
        letitbe:["g", "g", "g", "g", "a", "e", "g", "g", "c2", "d2", "d2", "e", "e", "d2",  "d2", "c2", "c2", "e",  "e", "f2", "e",  "e",  "d2", "e", "d2",  "d2", "c2"]
  
      }
      var options = Object.keys(songs)
     
      var newCorrectOrder = (songs[options[Math.floor(Math.random() * options.length)]])
      this.setState({correctOrder: newCorrectOrder, gameStatus: "true"})

     console.log("newCorrectOrder" + newCorrectOrder)
    }
  
  
    handlePlay(){
   //select song:
      const songs = {
        imagine: ["a", "c2", "a", "c2", "e2", "e2", "d2", "c2", "a", "b", "b", "b2", "b", "c2", "d2", "e2", "g2", "e2", "d2"],
        letitbe:["g", "g", "g", "g", "a", "e", "g", "g", "c2", "d2", "d2", "e", "e", "d2",  "d2", "c2", "c2", "e",  "e", "f2", "e",  "e",  "d2", "e", "d2",  "d2", "c2"]
      }
      var options = Object.keys(songs)
     
      var newCorrectOrder = (songs[options[Math.floor(Math.random() * options.length)]])
      this.setState({correctOrder: newCorrectOrder, gameStatus: "true", score: 0})

      var noteToPlay = newCorrectOrder[0]

      this.setState({playingNote: noteToPlay})
        new Howl({
          src: ["/"+noteToPlay+".mp3"],
          loop: false
        }).play()

      var parcialCorrectOrderNew = []
      parcialCorrectOrderNew.push(noteToPlay)
        setTimeout(() => this.setState({resultText: "Your Turn", playingNote: "", parcialCorrectOrder: parcialCorrectOrderNew }), 1000)
    }    
  
    handleQuit(){
      this.setState({score: 0, correctOrder : [], parcialCorrectOrder: [], guess : [], resultText : "", i: 0, round: 0, gameStatus: "false"})
    }
  
  
    playN(note) {
      this.setState({playingNote: note })
      new Howl({
        src: ["/"+note+".mp3"],
        loop: false
      }).play()
    }
    
    delay(x, toBePlayed ) {
      setTimeout(() => this.playN(toBePlayed[x]), 1200 * (x + 1));};
  
    handleColorClick(event) {
      //reproduce guess
      if (this.state.gameStatus === "true") {
  
      this.setState({turn: "player"})
  
      var i = this.state.i
      var round = this.state.round
      var newGuessArray = this.state.guess
      var newGuess = event.target.id
      var parcialCorrectOrderNew = this.state.parcialCorrectOrder  
      var scoreCopy = this.state.score
    
      this.setState({playingNote: newGuess})
      this.playGuessNote(newGuess)
      this.showParcialResult(newGuess)
      setTimeout(() => this.setState({playingNote: ""}), 1000);
  
     //si el guess es correcto
      if (newGuess === this.state.parcialCorrectOrder[i]) {
        newGuessArray.push(newGuess)
        i++     
        this.setState({i: i, guess: newGuessArray})} 

      //si se toca la ultima nota total:
      if ( newGuessArray.length === this.state.correctOrder.length) { 
        scoreCopy++
        this.setState({resultText: "You won!", correctOrder : [], parcialCorrectOrder: [], guess : [], i: 0, round: 0, gameStatus: "false", score: scoreCopy,})

      }
     // si se toca la ultima nota parcial ok:
      if ((this.state.guess.length === this.state.parcialCorrectOrder.length) && !( newGuessArray.length === this.state.correctOrder.length)) {

        // renueva count i y agrega nota, y suma round
        round++
        scoreCopy++
        this.setState({i: 0, guess : [], turn: "computer", score: scoreCopy, round:round})
        setTimeout(() => this.setState({resultText: "Now listen"}), 700)
        parcialCorrectOrderNew.push(this.state.correctOrder[round])
        this.setState({parcialCorrectOrder: parcialCorrectOrderNew})

        var toBePlayed = this.state.parcialCorrectOrder
        for (let x = 0; x < toBePlayed.length; x++) {
        this.delay(x, toBePlayed)
  
        }
        setTimeout(() => this.setState({resultText: "your turn", playingNote: ""}), 1500 * (i + 1))
      } 
    }
  }
    render () { 
      var pL = this.state.playingNote
      return (
      

      
       <div className ="col-9">
          <div className = "row mt-4 align-items-center" >  
            <div className= "container"> 
        
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "c" text = "c" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "d" text = "d" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "e" text = "e" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "f" text = "f" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "g" text = "g" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "a" text = "a" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "b" text = "b" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "c2" text = "c" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "d2" text = "d" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "e2" text = "e" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "f2" text = "f" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "g2" text = "g" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "a2" text = "a" /> 
                    <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "b2" text = "b" /> 
            </div>
          </div>
              

          <div className = "row mt-4 align-items-center" >
            <div className = "col-sm-9 col-md-9 col-lg-2 col-xl-2 d-md-block text-center" > <PlayStopButton  size="sm" text = {this.state.gameStatus === "false"?  "PLAY" : "QUIT"} onButtonClick={this.state.gameStatus === "false"? this.handlePlay : this.handleQuit}/> </div>
            <div className = "col-sm-9 col-md-9 col-lg-4 col-xl-4 d-md-block text-center" > <h1 className = "font-face-zkga" style={{fontSize: 20}} id = "result">{this.state.resultText}</h1> </div>
            <div className = "col-sm-9 col-md-9 col-lg-3 col-xl-3 d-md-block text-center" > <tx className = "font-face-zkgam" style={{fontSize: 20}} id = "scoreTitle"> Score:  </tx>  <tx style={{fontSize: 20}} id = "score" className = "font-face-zkga"> {this.state.score} </tx> </div>
            <div className = "col-3"></div>
          </div>

        </div>
        
      )
    }  
  }
  
  function ButtonNote (props) {
    let className = "button d-inline-block"
  
    if (props.pL === props.id) {
      className = "playNote d-inline-block"
    }
      return <div className = {className}   onClick={props.onClick} id = {props.id} text = {props.text}> {props.text} </div>
   
  }


  export default GameOneMelodies;