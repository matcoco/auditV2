// src/components/ResetDataButton.jsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button } from 'react-bootstrap';
import { resetDatas } from '../store/hardwareSlice';
import { toast } from 'react-toastify';

const ResetDataButton = () => {
  const dispatch = useDispatch();

  const handleResetClick = () => {
    dispatch(resetDatas());
    toast.success("Tous les produits ont été supprimés!")
  };

  return (
    <div>
      <Button onClick={handleResetClick} variant="danger">Réinitialiser les données</Button>
    </div>
  );
};

export default ResetDataButton;
