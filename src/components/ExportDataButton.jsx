import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Modal, Dropdown } from 'react-bootstrap';
import { selectHardwareData } from '../store/hardwareSlice';
import * as XLSX from 'xlsx';
import { formatDateToDDMMYYYY } from '../utils/dateConvert';

const ExportDataButton = () => {
    const hardwareData = useSelector(selectHardwareData);
    const [showModal, setShowModal] = useState(false);
    const [selectedOption, setSelectedOption] = useState('TOUS');

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    const handleExportOptionChange = (option) => {
        setSelectedOption(option);
    };

    const handleExportClick = () => {
        // Filtrer les données en fonction de l'option sélectionnée
        const filteredData = hardwareData.datas.filter((item) => {
            if (selectedOption === 'EN COURS') {
                return item.progress > 0 && item.progress < 100;
            } else if (selectedOption === 'TERMINE') {
                return item.progress === 100;
            } else if (selectedOption === 'A TRAITER') {
                return item.progress === 0;
            } else {
                return true;
            }
        });

        // Appeler la fonction exportToExcel avec les données filtrées
        exportToExcel(filteredData);
        handleClose();
    };

    const emptyColumns = Array.from({ length: 10 }, (_, i) => `EmptyColumn${i + 1}`).reduce((acc, key) => {
        acc[key] = "";
        return acc;
    }, {});
    const exportToExcel = (filteredData) => {
        // Première feuille de données
        const dataToExport1 = filteredData.map((item) => ({
            // Les données pour la première feuille
            dateDemande: formatDateToDDMMYYYY(item.date),
            demandeur: item.requester,
            natureDemande: "Audit",
            gbook: item.gbook,
            auditeur: item.auditor,
            ...emptyColumns,
            debutDeTraitement: formatDateToDDMMYYYY(item.dateDebutAudit),
            finDeTraitement: item.dateFinAudit ? formatDateToDDMMYYYY(item.dateFinAudit) : "",
            dureeDePriseEnCharge: item.dateFinAudit ? calculateDuration(item.dateDebutAudit, item.dateFinAudit) : "",
            dureeDeTraitementDePriseEnCharge: calculateDuration(item.date, item.dateFinAudit) + 1,
            statutDemande: getStatusFromProgress(item.progress),
            commentaire: item?.audit?.commentServ
        }));




        // Deuxième feuille de données
        const dataToExport2 = filteredData.map((item) => ({
            // Les données pour la deuxième feuille
            gbook: item.gbook,
            debutDeTraitement: formatDateToDDMMYYYY(item.dateDebutAudit),
            auditeur: item.auditor,
            commentaire: item?.audit?.commentServ,
            audit: item.audit
                ? JSON.stringify(Object.entries(item.audit).reduce((accumulator, [key, value]) => {
                    accumulator[key] = value;
                    return accumulator;
                }, {})) : {}

        }));

        const ws1 = XLSX.utils.json_to_sheet(dataToExport1);
        const ws2 = XLSX.utils.json_to_sheet(dataToExport2);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws1, 'planification service');
        XLSX.utils.book_append_sheet(wb, ws2, 'rapport audit');
        XLSX.writeFile(wb, 'exported_data.xlsx');
    };

    function getStatusFromProgress(progress) {
        if (progress === 100) {
            return "03 - TERMINE";
        } else if (progress > 0 && progress < 100) {
            return "02 - EN COURS";
        } else {
            return "01 - A TRAITER";
        }
    }

    function calculateDuration(startDate, endDate) {
        if (!startDate || !endDate) {
            return null;
        }
        const start = new Date(startDate);
        const end = new Date(endDate);
        const duration = (end - start ) / (1000 * 60 * 60 * 24); // Convertir la durée en jours
        console.log(Math.abs(duration))
        return Math.round(Math.abs((duration)));
    }
  
    return (
        <>
            <Button disabled={!Object.keys(hardwareData.datas).length > 0} variant="primary" onClick={handleShow}>
                Exporter les données
            </Button>

            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Options d'exportation</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Dropdown onSelect={handleExportOptionChange}>
                        <Dropdown.Toggle variant="outline-secondary" id="dropdown-basic">
                            {selectedOption === 'TOUS'
                                ? 'TOUS'
                                : selectedOption === 'EN COURS'
                                    ? 'EN COURS'
                                    : selectedOption === 'TERMINE'
                                        ? 'TERMINE'
                                        : 'A TRAITER'}
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="TOUS">TOUS</Dropdown.Item>
                            <Dropdown.Item eventKey="A TRAITER">A TRAITER</Dropdown.Item>
                            <Dropdown.Item eventKey="EN COURS">EN COURS</Dropdown.Item>
                            <Dropdown.Item eventKey="TERMINE">TERMINE</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Annuler
                    </Button>
                    <Button variant="primary" onClick={handleExportClick}>
                        Exporter
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ExportDataButton;
