import React, { useState } from 'react';
import './footer.css'
import {
    EmailShareButton,
    WhatsappShareButton,
    WhatsappIcon,
    EmailIcon,
  } from "react-share";



function Footer() {
    const [show, setShow] = useState(false)


return(
    <div className = "main-footer mt-4">
        <div className = "container">
            <div className="row footer">
                <div className= "col-6">
                    <p style={{color: "white"}}>   &copy;{new Date().getFullYear()} </p> 
                </div>
                    
                
                <div className= "col-6 text-end ">
                    <div className= "text-end justify-content-end text-dark font-face-zkgam " />
                        <WhatsappShareButton url= "https://mypageapp.herokuapp.com/"><WhatsappIcon bgStyle= {{fill: "rgb(53, 52, 52)"}} round= "true" size= "2rem" ></WhatsappIcon></WhatsappShareButton>
                        <EmailShareButton url= "https://mypageapp.herokuapp.com/"><EmailIcon bgStyle= {{fill: "rgb(53, 52, 52)"}} round= "true" size= "3rem" ></EmailIcon></EmailShareButton>
                    </div>
                </div>
        </div>
        
    </div>

)};

export default Footer;