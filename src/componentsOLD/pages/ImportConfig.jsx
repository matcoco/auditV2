// src/pages/ImportConfig.jsx
import React from 'react';
import { Container } from 'react-bootstrap';

import { useDispatch } from "react-redux";
import {
    updateImportConfig
} from "../../store/hardwareSlice";
import CSVImporter from "../CSVImporter";

const ImportConfig = () => {
    const dispatch = useDispatch();

    const handleImport = (importedData) => {
        dispatch(updateImportConfig(importedData));
    };

    return (
        <Container>
            <h2>Importation de la configuration</h2>
            <CSVImporter onImport={handleImport} />
        </Container>
    );
};

export default ImportConfig;