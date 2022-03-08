import React from 'react';
import Modal from 'react-bootstrap/Modal'
import emailjs from 'emailjs-com'
import './Mailer.css'

function sendEmail(e){
    e.preventDefault();
    emailjs.sendForm("service_vfdmf4y", "template_bpu8waa", e.target, "sVSo00CIm-Pv41BYQ").then(res=>{ console.log(res)}).catch(err=> console.log(err));
}


function Mailer (props) {

    return(
        
    <Modal
        show={props.show}
        
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{"width" : "100%", marginTop: "50px"}}
        >
            <Modal.Header  closeButton onClick= {props.close}>
            <Modal.Title className = "font-face-zkgam" id="example-custom-modal-styling-title">
                <tx style={{color: "cornflowerblue"}}> <b>CONTACT: </b></tx>
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div>
               
                <form onSubmit= {sendEmail} className = " row font-face-zkgam form-control" style= {{margin: "1px"}}>
                    <label style= {{margin: "1px", color: "grey"}} > Name: </label>    
                    <input style= {{margin: "1px", color: "grey"}} className = "font-face-zkgam form-control" type="text" name="name"></input>

                    <label style= {{margin: "1px", color: "grey"}} > email: </label>    
                    <input className = "font-face-zkgam form-control" type="email" name="user_email"></input>

                    <label style= {{margin: "1px", color: "grey"}} > Message: </label>   
                    <textarea className = "font-face-zkgam form-control" name= "message" rows="4"></textarea> 
                    <input onClick= {props.close} id= "sendEmail" style= {{margin: "1px", color: "white", backgroundColor: "cornflowerblue"}} className = " mt-4 row font-face-zkgam form-control"  type="submit" value="SEND"></input>
                </form>       
            </div>

            </Modal.Body>
    </Modal>
)
}

export default Mailer