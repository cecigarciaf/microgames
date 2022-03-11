import Button from 'react-bootstrap/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PlayStopButton (props) {
  const { t, i18n } = useTranslation();

    return (
      
       <Button className = "font-face-zkgam mt-1 " style={{border:"2px solid rgb(233, 167, 167)" , color: "grey"}}id="playbutton" size="sm" variant="outline-dark"  onClick={(e) => props.onButtonClick(e)}>{t(props.text)}</Button>
     
    )
    }
  


  export default PlayStopButton;