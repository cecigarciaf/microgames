import React from 'react';
import { useTranslation } from 'react-i18next';

  function Result(props){
    const { t, i18n } = useTranslation();
    
    return(
    <div className = "col-12 text-center justify-content-center" > <h1 className = "font-face-zkga" style={{color: "rgb(243, 96, 96)", fontSize: 18, height: "20px"}} id = "result">{t(props.resultText)}</h1> </div>
    )
  }

  export default Result;