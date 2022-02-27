import Button from 'react-bootstrap/Button';
import React from 'react';

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
      
       <Button className = "font-face-zkgam" id="playbutton" size="sm" variant="outline-dark"  onClick={this.handleClick}>{this.props.text}</Button>
     
    )
    }
  } 


  export default PlayStopButton;