import Button from 'react-bootstrap/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {Howl} from 'howler';

var playSound = new Howl({
  src: ["playSound.mp3"],
  loop: false,
  volume: 0.6,
  })      

function PlayStopButton (props) {
  const { t, i18n } = useTranslation();

    return (
      
       <Button className = "shadow-none font-face-zkgam mt-1 " id="playbutton" size="sm"   onClick={(e) => {props.onButtonClick(e); playSound.play()}}>{t(props.text)}</Button>
     
    )
    }
  


  export default PlayStopButton;