import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal'
import emailjs from 'emailjs-com'
import './Mailer.css'
import { useTranslation } from 'react-i18next';

function validateEmail(mail) {
    
 if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  {
    return (true)
  }
   
    return (false)
}

function Mailer (props) {
    const { t, i18n } = useTranslation();
    const [sent, showSent] = useState("")


    function SendEmail(e){
        e.preventDefault();
        var email = document.querySelector("#userEmail").value
    
    if(validateEmail(email)){
        
    
        emailjs.sendForm("service_2riujad", "template_bpu8waa", e.target, "sVSo00CIm-Pv41BYQ").then(res=>{ console.log(res)}).catch(err=> console.log(err));
        showSent("email sent!")
       
    } }


    function Close(props){  
        showSent("")
        props.close()
    }

    return(
        
    <Modal
        show={props.show}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{"width" : "100%", marginTop: "50px"}}
        >
            <Modal.Header  closeButton onClick= {() => Close(props)}>
            <Modal.Title className = "font-face-zkgam" id="example-custom-modal-styling-title">
                <div className= "row">
                <div className= "col-6">
                <tx style={{color: "rgb(211, 177, 250)"}}> <b>{t('CONTACT')} </b></tx>
                </div>
                <div className= "col-6 text-end">
                    <p className= "mt-2" style={{fontSize:"17px", color: "rgb(167, 156, 173)"}} id= "sent">{t(sent)}</p>
                </div>
                </div>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div>
               
                <form onSubmit= {SendEmail} className = " row font-face-zkgam form-control" style= {{margin: "1px"}}>
                    <label style= {{margin: "1px", color: "grey"}} > {t('Name')}: </label>    
                    <input style= {{margin: "1px", color: "grey"}} className = "font-face-zkgam form-control" type="text" name="name"></input>

                    <label style= {{margin: "1px", color: "grey"}} > email: </label>   
                    <input id = "userEmail" className = "font-face-zkgam form-control" type="email" name="user_email"></input>

                    <label style= {{margin: "1px", color: "grey"}} > {t('Message')}: </label>   
                    <textarea className = "font-face-zkgam form-control" name= "message" rows="4"></textarea> 
                    <input id= "sendEmail" style= {{margin: "1px", color: "white", backgroundColor: "rgb(235, 229, 241)"}} className = " mt-4 row font-face-zkgam form-control"  type="submit" value={t('SEND')}></input>
                </form>       
            </div>

            </Modal.Body>
    </Modal>
)
}

export default Mailer