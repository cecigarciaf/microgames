import React from 'react';
import { useTranslation } from 'react-i18next';

function BoardTitle(props){
    const { t, i18n } = useTranslation();

    return(

        <div>
            <span style={{marginRight:"5px", color:"grey"}} > </span ><span className= "boardTitle">↓{t(props.text)}↓</span> <span style={{marginLeft:"5px", color:"grey"}} > </span >
        </div>  

    )
}


export default BoardTitle;