// src/components/FormModal.jsx
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import { selectHardwareData, addFieldForm, updateFieldForm, findIndexDatas, isUnique } from "../store/hardwareSlice";

const FormModal = ({ show, onHide, data, isEdit, isAdd }) => {
  const [label, setLabel] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const hardwareData = useSelector(selectHardwareData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) {
      setLabel(data.label);
      setName(data.name);
      setType(data.type);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis
    if (!label || !name || !type) {
      // Afficher une notification d'erreur
      toast.error('Merci de remplir tous les champs!');
      return;
    }

    const fieldData = { label, name, type };
    let isUniqueName = true

    if (type === 'select') {
      fieldData.options = hardwareData.settings.select.options;
    }
    if (hardwareData?.settings?.fieldsForms?.length !== 0) {
      isUniqueName = isUnique(name, hardwareData?.settings?.fieldsForms, data?.name, "name")
    }



    if (isEdit && isUniqueName) {
      dispatch(updateFieldForm({ fieldData, index: findIndexDatas(hardwareData.settings.fieldsForms, "name", data.name) }));
      toast.success('Champs de formulaire modifié !');
      onHide();
    } else if (isAdd && isUniqueName) {
      // Ajouter le champ de formulaire
      console.log(fieldData)
      dispatch(addFieldForm(fieldData));
      toast.success('Champs de formulaire ajouté !');
      // Fermer la modal
      onHide()
    } else {
      toast.error('Champs déjà présent dans la liste');
    }

  }

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? 'Modifier' : 'Ajouter'} un élément</Modal.Title>
      </Modal.Header>
      <Modal.Body>
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
                Menu déroualnt
              </option>
            </Form.Control>
          </Form.Group>
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
