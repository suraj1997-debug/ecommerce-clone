import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function ModalContainer(props) {
    return (
        <Modal size={props.size} show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton className="modal-header">
                <Modal.Title className="modal-title">{props.ModalTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ backgroundColor: "rgb(254, 254, 254)" }}>

                {props.children}

            </Modal.Body>
            <Modal.Footer className="modal-footer">
                {
                    props.buttons ? props.buttons.map((btn, index) =>
                        <Button key={index} variant={btn.color} onClick={btn.onClick}>
                            {btn.label}
                        </Button>
                    ) :
                        <>
                            <Button variant="secondary" style={{ fontSize: "14px" }} onClick={props.handleClose}>
                                Close
                       </Button>
                            <Button variant="primary" {...props} style={{ backgroundColor: "#333" }} className="btn-sm" onClick={props.SavehandleClose}>
                                Save Changes
                       </Button>
                        </>
                }

            </Modal.Footer>
        </Modal>

    );
}


export default ModalContainer;