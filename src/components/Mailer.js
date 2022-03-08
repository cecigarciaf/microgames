import React from 'react';
import Modal from 'react-bootstrap/Modal'



function Mailer (props) {

    return(
        
    <Modal
        show={props.show}
       
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{"width" : "100%"}}
        >
            <Modal.Header closeButton onClick= {props.close}>
            <Modal.Title id="example-custom-modal-styling-title">
                Enviar email:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div>
                <h1>CONTACTO</h1>
                <form>
                    <label> nombre </label>    
                    <input type="text" name="name"></input>

                    <label> email </label>    
                    <input type="email" name="user_email"></input>

                    <label> Mensaje </label>   
                    <textarea name= "message" rows="4"></textarea> 
                    <input type="submit" value="Send"></input>
                </form>       
            </div>

            </Modal.Body>
    </Modal>
)
}

export default Mailer