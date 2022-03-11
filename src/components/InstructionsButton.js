import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

function InstructionsButton(props){
    const { t, i18n } = useTranslation();

return(
    <Button className= "font-face-zkgam mt-1 mb-1 btn btn-light" size="sm"  onClick={props.instructions}>
         {t('Instrucciones')}
    </Button>
    )

}


export default  InstructionsButton;