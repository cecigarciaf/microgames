import React, { useState } from 'react';
import './footer.css'
import Mailer from './Mailer'


function Footer() {
    const [show, setShow] = useState(false)


return(
    <div className = "main-footer mt-4">
        <div className = "container">
            <div className="row footer">
                <div className= "col-6">
                    <p style={{color: "white"}}>   &copy;{new Date().getFullYear()} </p> 
                </div>
                    
                    
                <div className= "col-6 ">
                    <div className= "text-end justify-content-end text-dark font-face-zkgam " onClick={() => setShow(true)} ><tx className="topBarText">Contact</tx></div>
                </div>
            </div>
        <Mailer close = {() => setShow(false)} show = {show} />
    </div>
  </div>
)};

export default Footer;

