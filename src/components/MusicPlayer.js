import React, { Component } from 'react'
import Button from 'react-bootstrap/Button';
import {Howl, Howler} from 'howler';
import ReactHowler from 'react-howler'

class MusicPlayer extends Component {
    constructor(props){
        super(props)
    
    this.state = {musicEverPlayed: false, repeatState: 0, index: 2  , audio: false}
    this.manageAudio = this.manageAudio.bind(this)
}
    manageAudio(){
        var audioTemp = this.state.audio
        var musicEverPlayedTemp = this.state.musicEverPlayed
        
        if(audioTemp){
            audioTemp = false
            window.Howler.mute(true)
        } else if(!(audioTemp)){
            audioTemp = true
            window.Howler.mute(false)
            if (!(musicEverPlayedTemp)){
                musicEverPlayedTemp = true
            }
        }
        this.setState({audio:audioTemp, musicEverPlayed:musicEverPlayedTemp})
    }

    /* muy lindo pero no aplica:

    manageRepeat = () => {
        onPlay={this.manageRepeat}
        var repeatStateTemp = this.state.repeatState
        var indexTemp = this.state.index
        if(repeatStateTemp === 2){
            indexTemp++
        }
        repeatStateTemp++

        this.setState({repeatState:repeatStateTemp, index: indexTemp})
        console.log("this.player.howler.seek()" + this.player.howler.seek())
    }

    
    componentDidMount(){
    setInterval(() => {
        this.checkPos(); 
      },10);
    }
    checkPos() {
        if (this.player.howler.seek() > 10) {
            
            this.player.howler.fade(1, 0, 3000)
        }
      }
      */

    render () {
        var source = this.props.playlist[this.state.index].source
      return(

        <span  playlist={this.props.playlist} style = {{fontSize: "15px", color: "grey"}}>
             <span className = "font-face-zkgam" >Music: </span>
             <ReactHowler
                src={source}
                html5= {true}
                autoplay={false}
                loop={true}
                
                ref={(ref) => (this.player = ref)}     
            />
            <Button onClick= {this.manageAudio} size="sm"  style={{backgroundColor: "rgb(211, 177, 250)", border: "1px solid rgb(212, 191, 236)", padding: "2px", fontSize: "10px"}} >{this.state.audio? "ON" : "OFF"}</Button>
        </span>
      );
    }
  }




export default MusicPlayer;