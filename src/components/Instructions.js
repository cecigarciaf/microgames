import React from 'react';
import Modal from 'react-bootstrap/Modal'



function Instructions (props) {

    return(
        
    <Modal
        show={props.show}
        onHide={props.instructions}
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{"width" : "100%"}}
        >
            <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
                Instrucciones:
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div>
                {props.instructDetails}        
            </div>

            </Modal.Body>
    </Modal>
)
}

export default Instructions