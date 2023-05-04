import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectHardwareData } from '../store/hardwareSlice';
import { Button } from 'react-bootstrap';
import { toast } from 'react-toastify';

const SaveButton = ({ isDisable}) => {
  const hardwareData = useSelector(selectHardwareData);

  useEffect(() => {
    const timer = saveTimer();
    return () => {
      clearInterval(timer);
    };
       // eslint-disable-next-line
  }, []);

  const saveToLocalStorage = () => {

    console.log(hardwareData.datas)
    localStorage.setItem('datas', JSON.stringify(hardwareData));
    try {
      localStorage.setItem('datas', JSON.stringify(hardwareData));
      toast.success("Sauvegarde automatique des données effectuée !")
    } catch (error) {
        toast.error('Failed to save data to local storage:', error);
    }
  };

  const saveTimer = () => {
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 5 * 60 * 1000);
    return interval;
  };

  const handleSaveClick = () => {
    saveToLocalStorage();
  };

  return (
    <div>
     { isDisable && <Button onClick={handleSaveClick}>Sauvegarder</Button>}
    </div>
  );
};

export default SaveButton;
