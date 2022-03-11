import React from 'react';
import { useTranslation } from 'react-i18next';


function HowToPlay(props){
    const { t, i18n } = useTranslation();

    return(
    <ol className= "font-face-zkgam">   
    <li> {t(`${props.gameInstructions}.1`)}</li>     
    <li> {t(`${props.gameInstructions}.2`)}</li>  
    <li> {t(`${props.gameInstructions}.3`)}</li>  
    <li> {t(`${props.gameInstructions}.4`)}</li>  
    <li> {t(`${props.gameInstructions}.5`)}</li>  
    </ol>
    )}

    export default HowToPlay;