// src/components/CSVImporter.jsx
import React from 'react';
import { FormControl, FormLabel } from 'react-bootstrap';
import Papa from 'papaparse';

const CSVImporter = ({ onImport }) => {
    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            Papa.parse(file, {
                header: true,
                complete: (results) => {
                    if (results.errors.length === 0) {
                        onImport(results.data);
                    } else {
                        console.error("Erreur lors de l'analyse du fichier CSV:", results.errors);
                    }
                },
            });
        }
    };

    return (
        <>
            <FormLabel htmlFor="csv-file" className="mt-3 mb-1">
                Importer un fichier CSV
            </FormLabel>
            <FormControl
                id="csv-file"
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                style={{ marginBottom: "1rem" }}
            />
        </>
    );
};

export default CSVImporter;
