import React from 'react';
import Button from 'react-bootstrap/Button';

function InstructionsButton(props){

return(
    <Button className= "font-face-zkgam mt-1 " size="sm" variant="outline-dark" onClick={props.instructions}>
         Instructions
    </Button>
    )

}


export default  InstructionsButton;