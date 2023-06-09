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
    try {
      localStorage.setItem('datas', JSON.stringify(hardwareData));
      toast.success("Sauvegarde automatique des données effectuée !", { closeOnClick: true, autoClose: 2000, })
    } catch (error) {
        toast.error('Failed to save data to local storage:', error, { closeOnClick: true, autoClose: 2000, });
    }
  };

  const saveTimer = () => {
    const interval = setInterval(() => {
      saveToLocalStorage();
    }, 5 * 60 * 1000);
    return interval;
  };



  return (
    <div>
     { isDisable && <Button onClick={saveToLocalStorage}>Sauvegarder</Button>}
    </div>
  );
};

export default SaveButton;
