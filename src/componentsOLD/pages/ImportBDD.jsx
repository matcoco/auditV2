// src/pages/ImportBDD.jsx
import React from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch } from 'react-redux';

import {
    updateImportBDD
} from "../../store/hardwareSlice";

import ExcelProcessor from '../ExcelProcessor';
import { toast } from 'react-toastify';

const ImportBDD = () => {
    const dispatch = useDispatch();

    const getDataBdd = (datas) => {
        dispatch(updateImportBDD(datas));
        toast.success('La base de données a été importé !')
    }

    return (
        <Container>
            <h2>Importation de la BDD</h2>
            <p>Pour assurer une importation réussie, veuillez exporter le fichier Excel avec les colonnes suivantes : <b >Book Number</b>,<b >Description</b> , <b >Serial Number</b>,<b > Stock Type</b>, <b >Config Summary</b>, <b >Condition</b>, <b >Location</b>, <b >Date The Stock Was Despatched</b> et <b >Combined Comment</b>. Ceci garantit que les données sont correctement formatées et prêtes à être intégrées dans notre système.</p>
            <ExcelProcessor getDataBdd={getDataBdd} />
        </Container>
    );
};

export default ImportBDD;