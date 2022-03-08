import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueLight.ttf';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueMedium.ttf';



ReactDOM.render(
  
  <App/>,
  
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