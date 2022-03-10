import React from 'react';
import Button from 'react-bootstrap/Button';

function InstructionsButton(props){

return(
    <Button className= "font-face-zkgam mt-1 mb-1 btn btn-light" size="sm"  onClick={props.instructions}>
         Instructions
    </Button>
    )

}


export default  InstructionsButton;