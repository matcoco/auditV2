// src/components/ManageRequesters.jsx
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { selectHardwareData, addRequester, updateRequester, deleteRequester } from "../store/hardwareSlice";

const ManageRequesters = () => {
  const hardwareData = useSelector(selectHardwareData);
  const Requesters = hardwareData.demandeur;
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [currentRequester, setCurrentRequester] = useState("");
  const [editingIndex, setEditingIndex] = useState(-1);

  const handleAddRequester = () => {
    setCurrentRequester("");
    setEditingIndex(-1);
    setShowModal(true);
  };

  const handleEditRequester = (index) => {
    setCurrentRequester(Requesters[index]);
    setEditingIndex(index);
    setShowModal(true);
  };

  const handleDeleteRequester = (index) => {
    dispatch(deleteRequester(index));
  };

  const handleSaveRequester = () => {
    if (editingIndex >= 0) {
      dispatch(updateRequester({ index: editingIndex, requester: currentRequester }));
    } else {
      dispatch(addRequester(currentRequester));
    }
    setShowModal(false);
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>demandeur</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Requesters.map((Requester, index) => (
            <tr key={index}>
              <td>{Requester}</td>
              <td>
                <Button variant="primary" onClick={() => handleEditRequester(index)}>
                  Modifier
                </Button>{" "}
                <Button variant="danger" onClick={() => handleDeleteRequester(index)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="success" onClick={handleAddRequester}>
        Ajouter un demandeur
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingIndex >= 0 ? "Modifier" : "Ajouter"} un demandeur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Nom de l'demandeur</Form.Label>
              <Form.Control
                type="text"
                value={currentRequester}
                onChange={(e) => setCurrentRequester(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={handleSaveRequester}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ManageRequesters;
