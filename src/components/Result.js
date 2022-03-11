import React from 'react';
import { useTranslation } from 'react-i18next';

  function Result(props){
    const { t, i18n } = useTranslation();
    
    return(
    <div className = "col-sm-8 col-md-8 col-lg-4 col-xl-4 text-center justify-content-center" > <h1 className = "font-face-zkga" style={{fontSize: 18, height: "20px"}} id = "result">{t(props.resultText)}</h1> </div>
    )
  }

  export default Result;