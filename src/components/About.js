import React from 'react';
import Modal from 'react-bootstrap/Modal'
import './About.css'
import { useTranslation } from 'react-i18next';

function About (props) {
    const { t, i18n } = useTranslation();

    return(
        
    <Modal
        show={props.show}
        
        dialogClassName="modal-90w"
        aria-labelledby="example-custom-modal-styling-title"
        style={{"width" : "100%", marginTop: "50px"}}
        >
            <Modal.Header  closeButton onClick= {props.close}>
                
            <Modal.Title className = " aboutTitle font-face-zkgam" id="example-custom-modal-styling-title">
                {t('webInfo')}
            </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            
            <div>
               
                <ul>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://reactjs.org/">React JS</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://reactrouter.com/">React Router</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://react-bootstrap.github.io/">React Bootstrap</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://getbootstrap.com/">Bootstrap</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://www.npmjs.com/package/react-bootstrap-icons/">React Bootstrap icons</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://howlerjs.com/">Howler.JS</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://react.i18next.com/">React-i18next</a></li>
                    <li className="aboutLi"> <a target="_blank"  className= "aboutLink font-face-zkgam " href="https://www.npmjs.com/package/react-share/">React-share social media share buttons</a></li>
                </ul>
            </div>

            </Modal.Body>
    </Modal>
)
}

export default About;