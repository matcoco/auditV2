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
  updateFieldsForms
} from "../../store/hardwareSlice";
import CSVImporter from "../CSVImporter";
import { MdEdit, MdDelete } from 'react-icons/md';

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

  const handleImport = (importedData) => {
    const updatedData = importedData.map((item) => {
      if (item.type === "select") {
        return {
          ...item,
          options: hardwareData.settings.select.options,
        };
      }
      return item;
    });

    dispatch(updateFieldsForms(updatedData));
  };


  return (
    <Container>
      <div style={{ maxHeight: "500px", width: "1000px", overflowY: "auto" }}>
        <h2 className="mb-4">Gestionnaire des champs de formulaire</h2>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Label</th>
              <th>Name</th>
              <th>Type</th>
              <th>champs facultatif</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {hardwareData.settings.fieldsForms.map((element, index) => (
              <tr key={index}>
                <td>{element.label}</td>
                <td>{element.name}</td>
                <td>
                  {element.type === "text"
                    ? "Champs de saisie"
                    : element.type === "select"
                      ? "Menu déroulant"
                      : "Cases à cocher"}
                </td>
                <td>
                  {element.optionalField === "yes" ? "facultatif" : "obligatoire"}
                </td>
                <td className='d-flex w100'>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleEdit({ ...element, index })}
                  >
                    <MdEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(index)}
                  >
                    <MdDelete />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <FormModal
        show={showModal}
        onHide={() => setShowModal(false)}
        data={selectedData}
        onSubmit={handleSubmit}
        isEdit={isEdit}
        isAdd={isAdd}
      />
      <Button variant="success" className="mt-3 mb-4" onClick={handleAdd}>
        Ajouter
      </Button>
      <div>
        <CSVImporter onImport={handleImport} />
      </div>

    </Container>
  );
};

export default FormsPage;