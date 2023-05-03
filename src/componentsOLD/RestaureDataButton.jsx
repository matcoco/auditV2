// src/components/RestoreDataButton.js
import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchDataSuccess } from '../store/hardwareSlice';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const RestoreDataButton = () => {
    const dispatch = useDispatch();

    const restoreData = () => {
        const localStorageData = JSON.parse(localStorage.getItem('datas'));
        if (localStorageData) {
            dispatch(fetchDataSuccess(localStorageData));
            toast.success("Données restaurées.")
        } else {
            toast.error("Aucunes données présente dans le navigateur.")
        }
    };

    return (
        <Button onClick={restoreData}>Restaurer les données</Button>
    );
};

export default RestoreDataButton;
