// src/components/FormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Table, FormCheck } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { selectHardwareData, addFieldForm, updateFieldForm, findIndexDatas, isUnique } from "../store/hardwareSlice";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

const FormModal = ({ show, onHide, data, isEdit, isAdd }) => {
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [optionInput, setOptionInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedOption, setEditedOption] = useState('');
  const [options, setOptions] = useState([]);
  const [optionalField, setOptionalField] = useState('');
  const hardwareData = useSelector(selectHardwareData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setLabel(data.label);
      setName(data.name);
      setType(data.type);
      setOptionalField(data.optionalField)
      if (data.type === 'select') {
        setOptions(data.options);
      }
      if (data.type === 'checkbox') {
        setOptions(data.options);
      }
    }
  }, [data]);


  const handleAddOption = () => {
    setOptions([...options, optionInput]);
    setOptionInput('');
  };


  const handleEditOption = (index) => {
    setEditingIndex(index);
    setEditedOption(options[index]);
  };

  const handleDeleteOption = (index) => {
    setOptions(options.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!label || !name || !type) {
      // Afficher une notification d'erreur
      toast.error('Merci de remplir tous les champs!', { closeOnClick: true, autoClose: 2000, });
      return;
    }

    const fieldData = { label, name, type, optionalField };
    let isUniqueName = true

    if (type === 'select') {
      fieldData.options = options;
    }

    if (type === 'checkbox') {
      fieldData.options = options;
    }
    if (hardwareData?.settings?.fieldsForms?.length !== 0) {
      isUniqueName = isUnique(name, hardwareData?.settings?.fieldsForms, data?.name, "name")
    }

    if (isEdit && isUniqueName) {
      dispatch(updateFieldForm({ fieldData, index: findIndexDatas(hardwareData.settings.fieldsForms, "name", data.name), data }));
      toast.success('Champs de formulaire modifié !');
      onHide();
    } else if (isAdd && isUniqueName) {
      // Ajouter le champ de formulaire

      dispatch(addFieldForm(fieldData));
      toast.success('Champs de formulaire ajouté !');
      // Fermer la modal
      onHide()
    } else {
      toast.error('Champs déjà présent dans la liste', { closeOnClick: true, autoClose: 2000, });
    }
  }

  const handleSaveEdit = () => {
    setOptions(options.map((option, index) => (index === editingIndex ? editedOption : option)));
    setEditingIndex(null);
    setEditedOption('');
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setEditedOption('');
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Modifier' : 'Ajouter'} un élément</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group className="mb-3">
          <Form.Label>Champs facultative ?</Form.Label>
          <Form.Control
            as="select"
            value={optionalField}
            onChange={(e) => setOptionalField(e.target.value)}
          >
            <option value="" disabled>
              Sélectionnez une option
            </option>
            <option value="yes">Oui</option>
            <option value="no">Non</option>
          </Form.Control>
        </Form.Group>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Label</Form.Label>
            <Form.Control
              type="text"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Type</Form.Label>
            <Form.Control
              as="select"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="" disabled>
                Sélectionnez un type
              </option>

              <option value="text">
                champs de saisie
              </option>
              <option value="select">
                Menu déroulant
              </option>
              <option value="checkbox">
                Choix multiple
              </option>
            </Form.Control>
          </Form.Group>

          {type === 'select' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Ajouter une option</Form.Label>
                <Form.Control
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" onClick={handleAddOption}>
                Ajouter une option
              </Button>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((option, index) => (
                    <tr key={index}>
                      <td>
                        {editingIndex === index ? (
                          <Form.Control
                            type="text"
                            value={editedOption}
                            onChange={(e) => setEditedOption(e.target.value)}
                          />
                        ) : (
                          option
                        )}
                      </td>
                      <td>
                        {editingIndex === index ? (
                          <>
                            <Button variant="success" onClick={handleSaveEdit}>
                              OK
                            </Button>
                            <Button variant="secondary" className="ml-2" onClick={handleCancelEdit}>
                              Annuler
                            </Button>
                          </>
                        ) : (
                          <>
                            <AiFillEdit onClick={() => handleEditOption(index)} />
                            <AiFillDelete className="ml-2" onClick={() => handleDeleteOption(index)} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {type === 'checkbox' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Ajouter une option</Form.Label>
                <Form.Control
                  type="text"
                  value={optionInput}
                  onChange={(e) => setOptionInput(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Choisir un groupe d'options</Form.Label>
              </Form.Group>
              <Button variant="primary" onClick={handleAddOption}>
                Ajouter une option
              </Button>
              <Table striped bordered hover className="mt-3">
                <thead>
                  <tr>
                    <th>Option</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {options.map((option, index) => (
                    <tr key={index}>
                      <td>
                        {editingIndex === index ? (
                          <Form.Control
                            type="text"
                            value={editedOption}
                            onChange={(e) => setEditedOption(e.target.value)}
                          />
                        ) : (
                          option
                        )}
                      </td>
                      <td>
                        {editingIndex === index ? (
                          <>
                            <Button variant="success" onClick={handleSaveEdit}>
                              OK
                            </Button>
                            <Button variant="secondary" className="ml-2" onClick={handleCancelEdit}>
                              Annuler
                            </Button>
                          </>
                        ) : (
                          <>
                            <AiFillEdit onClick={() => handleEditOption(index)} />
                            <AiFillDelete className="ml-2" onClick={() => handleDeleteOption(index)} />
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Fermer
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          {data ? 'Modifier' : 'Ajouter'}
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default FormModal;
