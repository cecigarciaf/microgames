import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import {Howler} from 'howler';


function FxButton(props){
    const [fxStatus, setFxStatus] = useState(true)

    function manageFx(){
        var fxStatusTemp = fxStatus
        if(fxStatus){
            fxStatusTemp = false
            Howler.mute(true)
        } else if(!(fxStatus)){
            fxStatusTemp = true
            Howler.mute(false)
    
        }
        setFxStatus(fxStatusTemp)
    }

    return(

        <span   style = {{fontSize: "15px", color: "grey", marginLeft: "20px"}}>
            <span className = "ml-5 font-face-zkgam" > FX: </span>
            <Button className = "shadow-none font-face-zkgam" size="sm"  style={{backgroundColor: "rgb(211, 177, 250)", border: "1px solid rgb(212, 191, 236)", padding: "1px", fontSize: "10px", marginRight: "10px"}} onClick={manageFx}>{fxStatus? "ON" : "OFF"} </Button>
        </span>

)}

export default FxButton