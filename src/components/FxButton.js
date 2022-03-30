import React from 'react';
import Button from 'react-bootstrap/Button';


function FxButton(props){


    return(

        <span  style = {{fontSize: "15px", color: "grey"}}>
            <span className = "font-face-zkgam" > FX: </span>
            <Button className = "font-face-zkgam" size="sm"  style={{backgroundColor: "rgb(211, 177, 250)", border: "1px solid rgb(212, 191, 236)", padding: "1px", fontSize: "10px", marginRight: "10px"}} onClick={props.manageFx}>{props.fxStatus? "ON" : "OFF"} </Button>
        </span>

)}

export default FxButton