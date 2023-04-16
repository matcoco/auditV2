// src/pages/FormsPage.jsx
import React, { useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import FormModal from '../FormModal';
import { useSelector, useDispatch } from "react-redux";
import {
  selectHardwareData,
  addFieldForm,
  updateFieldForm,
  deleteFieldForm,
} from "../../store/hardwareSlice";

const FormsPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [isEdit, setIsEdit] = useState(false)
  const [isAdd, setIsAdd] = useState(false)


  const hardwareData = useSelector(selectHardwareData);
  const dispatch = useDispatch();

  const handleAdd = () => {
    setSelectedData(null);
    setShowModal(true);
    setIsEdit(false)
    setIsAdd(true)
  };

  const handleEdit = (data) => {
    setSelectedData(data);
    setShowModal(true)
    setIsEdit(true)
    setIsAdd(false)
  };

  const handleDelete = (index) => {
    dispatch(deleteFieldForm(index));
  };

  const handleSubmit = (data) => {
    if (selectedData) {
      // Edit existing element
      dispatch(updateFieldForm({ ...data, index: selectedData.index }));
    } else {
      // Add new element
      dispatch(addFieldForm(data));
    }
  };

  return (
    <Container>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Label</th>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {hardwareData.settings.fieldsForms.map((element, index) => (
            <tr key={index}>
              <td>{element.label}</td>
              <td>{element.name}</td>
              <td>{element.type === "text" ? "Champs de saisie" : "Menu déroulant"}</td>
              <td>
                <Button
                  className="mr-2"
                  variant="primary"
                  onClick={() => handleEdit({ ...element, index })}
                >
                  Modifier
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(index)}
                >
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedData}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        isAdd={isAdd}
      />
      <Button variant="success" className="mb-4" onClick={handleAdd}>
        Ajouter
      </Button>
    </Container>
  );
};

export default FormsPage;