// src/components/ManageAuditors.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { selectHardwareData, addAuditor, updateAuditor, deleteAuditor } from "../store/hardwareSlice";

const ManageAuditors = () => {
  const hardwareData = useSelector(selectHardwareData);
  const auditors = hardwareData.auditeur;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentAuditor, setCurrentAuditor] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddAuditor = () => {
    setCurrentAuditor("");
    setEditingIndex(-1);
    setShowModal(true);
  };

  const handleEditAuditor = (index) => {
    setCurrentAuditor(auditors[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteAuditor = (index) => {
    dispatch(deleteAuditor(index));
  };

  const handleSaveAuditor = () => {
    if (editingIndex >= 0) {
      dispatch(updateAuditor({ index: editingIndex, auditor: currentAuditor }));
    } else {
      dispatch(addAuditor(currentAuditor));
    }
    setShowModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Auditeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {auditors.map((auditor, index) => (
            <tr key={index}>
              <td>{auditor}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditAuditor(index)}>
                  Modifier
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDeleteAuditor(index)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleAddAuditor}>
        Ajouter un auditeur
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex >= 0 ? "Modifier" : "Ajouter"} un auditeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom de l'auditeur</Form.Label>
              <Form.Control
                type="text"
                value={currentAuditor}
                onChange={(e) => setCurrentAuditor(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSaveAuditor}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageAuditors;
