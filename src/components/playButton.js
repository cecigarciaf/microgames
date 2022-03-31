import Button from 'react-bootstrap/Button';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PlayStopButton (props) {
  const { t, i18n } = useTranslation();

    return (
      
       <Button className = "shadow-none font-face-zkgam mt-1 " id="playbutton" size="sm"   onClick={(e) => props.onButtonClick(e)}>{t(props.text)}</Button>
     
    )
    }
  


  export default PlayStopButton;