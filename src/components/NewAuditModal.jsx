// src/components/NewAuditModal.jsx
import React, { useState } from "react";
import { Modal, Button, Form, InputGroup, FormGroup } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch } from "react-redux";
import { addNewAudit } from "../store/hardwareSlice";
import { toast } from 'react-toastify';
import { useSelector } from "react-redux";
import { selectHardwareData } from "../store/hardwareSlice";
import * as moment from 'moment'
import uniqid from 'uniqid';

registerLocale("fr", fr);

const NewAuditModal = () => {
    const [show, setShow] = useState(false);
    const [date, setDate] = useState(new Date());
    const [gbook, setGbook] = useState("");
    const [auditor, setAuditor] = useState("");
    const [requester, setRequester] = useState("");
    const [categoryAudit, setCategoryAudit] = useState("")
    const dispatch = useDispatch();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const hardwareData = useSelector(selectHardwareData);

    const auditors = hardwareData.auditeur;
    const requesters = hardwareData.demandeur;
    const checkboxAudit = hardwareData.checkboxAudit;

    const isGbookUnique = (gbookValue) => {
        return !hardwareData.datas.some((data) => data.gbook === gbookValue);
    };


    const handleSubmit = () => {
        if (!date || !auditor || !requester || !gbook || !categoryAudit) {
            toast.error("merci de saisir tous les champs!", { closeOnClick: true, autoClose: 2000, })
            return;
        }

        if (!isGbookUnique(gbook)) {
            toast.error("La valeur GBOOK doit être unique.");
            return;
        }

        const newAuditData = {
            id: uniqid(),
            date: date.toISOString(),
            auditor,
            requester,
            gbook,
            category: categoryAudit,
            progress: 0,
            status: 1,
            dateDebutAudit: moment().format('DD/MM/YYYY'),
            dateFinAudit: "",
        };

        dispatch(addNewAudit(newAuditData));
        handleClose();
        toast.success("produit ajouté!", { closeOnClick: true, autoClose: 2000, })
    };

    return (
        <>
            <Button variant="primary" onClick={handleShow}>
                Ouvrir la modale
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Nouvel audit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Date de la demande</Form.Label>
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                locale="fr"
                            />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Auditeur</Form.Label>
                            <Form.Control
                                as="select"
                                value={auditor}
                                onChange={(e) => setAuditor(e.target.value)}
                            >
                                <option value="">Sélectionner un auditeur</option>
                                {auditors.map((auditor, index) => (
                                    <option key={index} value={auditor}>
                                        {auditor}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Demandeur</Form.Label>
                            <Form.Control
                                as="select"
                                value={requester}
                                onChange={(e) => setRequester(e.target.value)}
                            >
                                <option value="">Sélectionner un demandeur</option>
                                {requesters.map((requester, index) => (
                                    <option key={index} value={requester}>
                                        {requester}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>GBOOK</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="number"
                                    value={gbook}
                                    onChange={(e) => setGbook(e.target.value)}
                                />
                            </InputGroup>
                        </Form.Group>
                        <FormGroup>
                            {checkboxAudit.map((checkbox, index) => (
                                <Form.Check
                                    key={index}
                                    type={checkbox.type}
                                    id={checkbox.id}
                                    label={checkbox.label}
                                    name={checkbox.name}
                                    onChange={(e) => setCategoryAudit(e.target.id)}
                                />
                            ))}
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Fermer
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                        Valider
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );
};

export default NewAuditModal;