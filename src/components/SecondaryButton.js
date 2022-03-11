import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

function SecondaryButton(props){
    const { t, i18n } = useTranslation();

    return(
        <Button className = "font-face-zkga select mt-1" id="selectbutton" size="sm" variant="outline-secondary"  onClick={props.handleClick}>{t(props.text)}</Button>
    )
}

export default SecondaryButton;