import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Howl} from 'howler';
import gif1 from './/gifs/gif1.gif'
import birds from './/gifs/gif2.gif'

const birdsound = new Howl({
  src: ["/audioaves.mp3"],
  loop: false
});



class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {giftype: gif1}
    this.handleGifChange = this.handleGifChange.bind(this)
  }

  handleGifChange(event) {
    var dur = event.target.getAttribute('data-dur');  
    
    this.setState({giftype: event.target.value})
    event.preventDefault();
    birdsound.play();
    setTimeout(() => this.setState({giftype: gif1}), parseInt(dur));
  }

  render() { 
    return (
    <div>
      <Gif src = {this.state.giftype}/> 
      <BirdsButton onBirdGifChange = {this.handleGifChange} value = {birds} text = "Play birds" datadur = "7000" />
      </div>
    )
  }
}

class Gif extends React.Component {
  constructor(props) {
    super(props);  
  }
  render() {
    const giftype = this.props.src
    return (
        <div>
         <img src={giftype} /> 
        </div>
    )
    }
  }

class BirdsButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onBirdGifChange(event);
  }

  render() {
    const dur = this.props.dur;
    return (
      <div>    
          <div>
              <button onClick={this.handleChange} data-dur = {this.props.datadur} value = {this.props.value}> {this.props.text} </button>
          </div>
      </div>
    )
  }
}







ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();


backup del que anda OK:


import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Howl} from 'howler';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueLight.ttf';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueMedium.ttf';

class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {correctOrder : [], guess : [], resultText : "", i: 0, gameStatus: "false", turn: "player", playingNote: "", score: 0}
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

  addNote(){
    const options = ["c", "d", "e", "f", "g", "a", "b"]
    var newCorrectOrder = this.state.correctOrder
    newCorrectOrder.push(options[Math.floor(Math.random() * options.length)])
    this.setState ({correctOrder: newCorrectOrder})
    
   console.log("correct order new " + this.state.correctOrder)
  }


  handlePlay(){
    this.setState({score: 0, i: 0, guess : [], gameStatus: "true", turn: "computer"})
    console.log("correctOrder al PLAY" + this.state.correctOrder)
    const options = ["c", "d", "e", "f", "g", "a", "b"]
    var newCorrectOrder = this.state.correctOrder
    newCorrectOrder.push(options[Math.floor(Math.random() * options.length)])
    this.setState ({correctOrder: newCorrectOrder})
    

    var noteToPlay = this.state.correctOrder[0]
    this.setState({playingNote: noteToPlay})
      new Howl({
        src: ["/"+noteToPlay+".mp3"],
        loop: false
      }).play()
      
      setTimeout(() => this.setState({resultText: "Your Turn", playingNote: ""}), 1000);
      console.log("correct order: " + this.state.correctOrder)
  }    

  handleQuit(){
    this.setState({correctOrder : [], guess : [], resultText : "", i: 0, gameStatus: "false"})
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
    if (this.state.gameStatus === "true") {

    this.setState({turn: "player"})

    var i = this.state.i
    var newGuessArray = this.state.guess
    var newGuess = event.target.id

    console.log("clic en " + event.target.id)
    this.setState({playingNote: newGuess })
    this.playGuessNote(newGuess)
    this.showParcialResult(newGuess)
    setTimeout(() => this.setState({playingNote: ""}), 1000);

   
    if (newGuess === this.state.correctOrder[i]) {
      newGuessArray.push(newGuess)
      i++
      this.setState({i: i, guess: newGuessArray})} 
      console.log("newGuessArray" + newGuessArray)
      

    if (this.state.guess.length === this.state.correctOrder.length) {
      var scoreCopy = this.state.score
      scoreCopy++
      this.setState({i: 0, guess : [], turn: "computer", score: scoreCopy})
      setTimeout(() => this.setState({resultText: "Now listen"}), 700)
      this.addNote()
      
      var toBePlayed = this.state.correctOrder
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
      <Container fluid>
     <div >
    

        <div className = "row" >  
          <div className = "col-md-1 " > </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "c" text = "c" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "d" text = "d" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "e" text = "e" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "f" text = "f" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "g" text = "g" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "a" text = "a" /> </div>
            <div className = "col-md-1" > <ButtonNote pL = {pL} className = {this.state.playingNote === this.props.id? "playNote":"button"} onClick={this.handleColorClick} id = "b" text = "b" /> </div>
            <div className = "col-md-1" ></div>
        </div>
      
        <div className = "row mt-4 align-items-center" >
          <div className = "col-md-1" > </div>
          <div className = "col-md-2 text-center" > <PlayStopButton  text = {this.state.gameStatus === "false"?  "PLAY" : "QUIT"} onButtonClick={this.state.gameStatus === "false"? this.handlePlay : this.handleQuit}/> </div>
          <div className = "col-md-3" > <h1 className = "font-face-zkga" id = "result">{this.state.resultText}</h1> </div>
          <div className = "col-md-2" > <tx className = "font-face-zkgam" id = "scoreTitle"> Score:  </tx>  <tx id = "score" className = "font-face-zkga"> {this.state.score} </tx> </div>
          <div className = "col-md-1" > </div>
        </div>
        </div>
      </Container>
    )
  }  
}

function ButtonNote (props) {
  let className = "button"

  if (props.pL === props.id) {
    className = "playNote"
  }
    return <button className = {className} onClick={props.onClick} id = {props.id} text = {props.text}> {props.text}</button>
 
}

class PlayStopButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (event){
    this.props.onButtonClick(event)
  }
  render () { 
  return (
    
     <Button  id="playbutton" size="lg" variant="outline-dark"  onClick={this.handleClick}>{this.props.text}</Button>
   

  )
  }
}  



ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();



// arma array random de los 4 colores//
/*
class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {correctOrder : ["redbutton", "greenbutton", "bluebutton", "yellowbutton" ]}
    this.handlePlay = this.handlePlay.bind(this);
  }


  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
  handlePlay(){
    var arrayMix = this.shuffleArray(this.state.correctOrder)
    this.setState({correctOrder: arrayMix})
    console.log(arrayMix)
    console.log(this.state.correctOrder)
  }    

  render () { 
    return (
      <div>
      <div>
        <ColoredButtons/>
      </div>
      <div>
        <button onClick={this.handlePlay}>PLAY</button>
      </div>
      </div>
    )
  }  
}


class ColoredButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redButtonId: "redbutton",
      greenButtonId: "greenbutton",
      yellowButtonId: "yellowbutton",
      blueButtonId: "bluebutton"
    }
  }
  


  render () { 
  return (
    <div >
      <div >
        <span> <Button onButtonClick = {this.handleButtonClick} id = "redbutton" text = "" /> <Button id = "greenbutton" text = "" /> </span>
      </div>
      <div >
        <span> <Button  id = "yellowbutton" text = ""/> <Button id = "bluebutton" text = "" /> </span>
      </div>
    </div>
  )
  }
  }

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onButtonClick(event);
  }



  render () { 
    return (
     <button class = "button" onClick={this.handleChange} id = {this.props.id} > {this.props.text} </button> 
    )
  }
}

ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);

*/



// gif y boton //
/*
const birdsound = new Howl({
  src: ["/audioaves.mp3"],
  loop: false
});

class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {giftype: gif1}
    this.handleGifChange = this.handleGifChange.bind(this)
  }

  handleGifChange(event) {
    var dur = event.target.getAttribute('data-dur');  
    
    this.setState({giftype: event.target.value})
    event.preventDefault();
    birdsound.play();
    setTimeout(() => this.setState({giftype: gif1}), parseInt(dur));
  }

  render() { 
    return (
    <div>
      <Gif src = {this.state.giftype}/> 
      <BirdsButton onBirdGifChange = {this.handleGifChange} value = {birds} text = "Play birds" datadur = "7000" />
      </div>
    )
  }
}

class Gif extends React.Component {
  constructor(props) {
    super(props);  
  }
  render() {
    const giftype = this.props.src
    return (
        <div>
         <img src={giftype} /> 
        </div>
    )
    }
  }

class BirdsButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onBirdGifChange(event);
  }

  render() {
    const dur = this.props.dur;
    return (
      <div>    
          <div>
              <button onClick={this.handleChange} data-dur = {this.props.datadur} value = {this.props.value}> {this.props.text} </button>
          </div>
      </div>
    )
  }
}







ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
*/

















// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();



// arma array random de los 4 colores//
/*
class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {correctOrder : ["redbutton", "greenbutton", "bluebutton", "yellowbutton" ]}
    this.handlePlay = this.handlePlay.bind(this);
  }


  shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  
  handlePlay(){
    var arrayMix = this.shuffleArray(this.state.correctOrder)
    this.setState({correctOrder: arrayMix})
    console.log(arrayMix)
    console.log(this.state.correctOrder)
  }    

  render () { 
    return (
      <div>
      <div>
        <ColoredButtons/>
      </div>
      <div>
        <button onClick={this.handlePlay}>PLAY</button>
      </div>
      </div>
    )
  }  
}


class ColoredButtons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redButtonId: "redbutton",
      greenButtonId: "greenbutton",
      yellowButtonId: "yellowbutton",
      blueButtonId: "bluebutton"
    }
  }
  


  render () { 
  return (
    <div >
      <div >
        <span> <Button onButtonClick = {this.handleButtonClick} id = "redbutton" text = "" /> <Button id = "greenbutton" text = "" /> </span>
      </div>
      <div >
        <span> <Button  id = "yellowbutton" text = ""/> <Button id = "bluebutton" text = "" /> </span>
      </div>
    </div>
  )
  }
  }

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onButtonClick(event);
  }



  render () { 
    return (
     <button class = "button" onClick={this.handleChange} id = {this.props.id} > {this.props.text} </button> 
    )
  }
}

ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);

*/



// gif y boton //
/*
const birdsound = new Howl({
  src: ["/audioaves.mp3"],
  loop: false
});

class Web extends React.Component {
  constructor(props) {
    super(props);
    this.state = {giftype: gif1}
    this.handleGifChange = this.handleGifChange.bind(this)
  }

  handleGifChange(event) {
    var dur = event.target.getAttribute('data-dur');  
    
    this.setState({giftype: event.target.value})
    event.preventDefault();
    birdsound.play();
    setTimeout(() => this.setState({giftype: gif1}), parseInt(dur));
  }

  render() { 
    return (
    <div>
      <Gif src = {this.state.giftype}/> 
      <BirdsButton onBirdGifChange = {this.handleGifChange} value = {birds} text = "Play birds" datadur = "7000" />
      </div>
    )
  }
}

class Gif extends React.Component {
  constructor(props) {
    super(props);  
  }
  render() {
    const giftype = this.props.src
    return (
        <div>
         <img src={giftype} /> 
        </div>
    )
    }
  }

class BirdsButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onBirdGifChange(event);
  }

  render() {
    const dur = this.props.dur;
    return (
      <div>    
          <div>
              <button onClick={this.handleChange} data-dur = {this.props.datadur} value = {this.props.value}> {this.props.text} </button>
          </div>
      </div>
    )
  }
}







ReactDOM.render(
  <Web/>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals()
*/