import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import {Howl, Howler} from 'howler';




function MusicPlayer(props){
    var repeatCount = 0
    var index = 1
    var songPlayed
    var playlist = props.playlist  

    
    



    function playSong(){
        var data = playlist[index];
      

            songPlayed = data.howl = new Howl({
                src: data.source,
                //onend: skip()

        

                }
            )
        
        
        songPlayed.play();
                
        

    }


      
    var skip = function() {
        if(repeatCount == 2){
            index++
            repeatCount = 0
        }
        skipTo();
        repeatCount++
    }

    var skipTo = function() {
        playSong()
        console.log("tetris repeatCount" + repeatCount)
        console.log("tetris index" + index)
    }





  return (
    <span  style = {{fontSize: "15px", color: "grey"}}>
        <span className = "font-face-zkgam" >Music: </span>
        <Button size="sm"  style={{backgroundColor: "rgb(211, 177, 250)", border: "1px solid rgb(212, 191, 236)", padding: "2px", fontSize: "10px"}} onClick={skip}>ON</Button>
    </span>
  )
}

export default MusicPlayer;