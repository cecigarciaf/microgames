import React from 'react';
import { useTranslation } from 'react-i18next';




function GameText(props){
    const { t, i18n } = useTranslation();

    return(
        <div className = "font-face-zkgam" style={{fontSize: 20, height: "20px"}}><strong>{t(props.text)}</strong></div>
    )
}


export default GameText;

                       