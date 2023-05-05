import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { MdEdit, MdDelete } from 'react-icons/md';

const ButtonValidation = ({ onDelete }) => {
    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
    const handleConfirm = () => {
      onDelete();
      handleClose();
    };
  
    return (
      <>
        <Button variant="outline-danger" onClick={handleShow}>
          <MdDelete />
        </Button>
  
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmer la suppression</Modal.Title>
          </Modal.Header>
          <Modal.Body>Voulez-vous vraiment supprimer cet élément ?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Non
            </Button>
            <Button variant="danger" onClick={handleConfirm}>
              Oui
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  
  export default ButtonValidation;
  