import React from 'react';
import { useSelector } from 'react-redux';
import { selectHardwareData } from '../store/hardwareSlice';

const DataCounter = () => {
  const hardwareData = useSelector(selectHardwareData);

  const countData = () => {
    return hardwareData.datas.length;
  };

  return (
    <div>
      <h3>Nombre de produits audités: {countData()}</h3>
    </div>
  );
};

export default DataCounter;
