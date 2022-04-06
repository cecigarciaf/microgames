import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

function SecondaryButton(props){
    const { t, i18n } = useTranslation();

    return(
        <Button  className = "shadow-none font-face-zkgam select mt-1" id="selectbutton" size="sm"   onClick={props.handleClick}>{t(props.text)}</Button>
    )
}

export default SecondaryButton;