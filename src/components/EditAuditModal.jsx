// src/components/EditAuditModal.jsx
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import DatePicker, { registerLocale } from "react-datepicker";
import fr from "date-fns/locale/fr";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import { formatDateStringToDate } from "../utils/dateConvert";
import { selectHardwareData, isUnique, updateAudit, findIndexDatas } from '../store/hardwareSlice'
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

registerLocale("fr", fr);

const EditAuditModal = ({ show, onHide, data }) => {
    const [date, setDate] = useState("");
    const [auditor, setAuditor] = useState("");
    const [requester, setRequester] = useState("");
    const [gbook, setGbook] = useState("");

    const hardwareData = useSelector(selectHardwareData);
    const auditors = hardwareData.auditeur;
    const requesters = hardwareData.demandeur;
    const dispatch = useDispatch();

    useEffect(() => {
        if (data) {
            setDate(formatDateStringToDate(data.date));
            setAuditor(data.auditor);
            setRequester(data.requester);
            setGbook(data.gbook);
        }
    }, [data]);

    const handleSubmit = async () => {
        const updatedData = {
            date: date.toISOString(),
            auditor,
            requester,
            gbook,
            lastedGbook: data.gbook,
            index: findIndexDatas(hardwareData.datas, data.gbook, data.gbook)
        };


        if (isUnique(gbook, hardwareData.datas, updatedData.lastedGbook, "gbook")) {
            dispatch(updateAudit(updatedData));
            onHide();
            toast.success("Modification effecutée!", { closeOnClick: true, autoClose: 2000, })
        } else {
            toast.error("Saisir un Gbook unique!", { closeOnClick: true, autoClose: 2000, })
        }
    };


    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Modifier audit</Modal.Title>
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
                        <Form.Group className="mb-3">
                            <Form.Label>Auditeur</Form.Label>
                            <Form.Control
                                as="select"
                                value={auditor}
                                onChange={(e) => setAuditor(e.target.value)}
                            >
                                <option value="" disabled>
                                    Sélectionnez un auditeur
                                </option>
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
                                <option value="" disabled>
                                    Sélectionnez un demandeur
                                </option>
                                {requesters.map((requester, index) => (
                                    <option key={index} value={requester}>
                                        {requester}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
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
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Fermer
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer les modifications
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditAuditModal;