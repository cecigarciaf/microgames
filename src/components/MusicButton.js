import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function MusicButton(props){
    const { t, i18n } = useTranslation();

    return(

        <span   style = {{fontSize: "15px", color: "grey"}}>
            <span className = "font-face-zkgam" >{t("Music")} </span>
            <Button onClick= {props.manageMusic} size="sm"  style={{backgroundColor: "rgb(211, 177, 250)", border: "1px solid rgb(212, 191, 236)", padding: "2px", fontSize: "10px", marginRight: "10px"}} >{props.music? "ON" : "OFF"}</Button>
        </span>

)}

export default MusicButton