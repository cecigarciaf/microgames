import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueLight.ttf';
import './fonts/ZenKakuGothicAntique/ZenKakuGothicAntiqueMedium.ttf';
import './i18n';
import { Spinner } from 'react-bootstrap';


ReactDOM.render(
  <Suspense fallback={(<div className= "loaderContainer"><Spinner id= "spinner" animation="border" role="status"></Spinner></div>)}>
  <App/>
  </Suspense>,
  document.getElementById('root')
  
);






// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

