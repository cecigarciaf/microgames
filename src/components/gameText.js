import React from 'react';
import { useTranslation } from 'react-i18next';
import './gameText.css';



function GameText(props){
    const { t, i18n } = useTranslation();

    return(
        <div className = "font-face-zkgam " id= "gameTextBox"><tx  id= "gameText"><strong>{t(props.text)}</strong></tx></div>
    )
}


export default GameText;

                       