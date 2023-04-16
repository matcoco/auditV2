import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { selectHardwareData, updateSelectedData, calculatePercentage } from '../../store/hardwareSlice';
import { Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import ProgressBarComponent from '../ProgressBarComponent';

const GBookPage = () => {
  const hardwareData = useSelector(selectHardwareData);
  const [formValues, setFormValues] = useState([]);
  const [formCurrentValues, setFormCurrentValues] = useState({});
  const [data, setData] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    navigate('/');
  };

  useEffect(() => {
    setData(location?.state || {});
  }, [location]);

  useEffect(() => {
    let fields = hardwareData?.forms[data.category];
    setFormValues(fields);
    setFormCurrentValues(data.datas?.audit || {});
  }, [hardwareData, data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSaveChanges = () => {
    let obj = { ...data.datas };
    obj.audit = formCurrentValues;
    obj.progress = calculatePercentage(obj.audit, formValues)
    setData((prevData) => ({ ...prevData, datas: obj }));
    dispatch(updateSelectedData({ obj }));
    toast.success("Modifications enregistrées avec succès !", { autoClose: 1000 });
  };

  const renderFormElements = () => {
    return (
      <div key={data.category}>
        {formValues &&
          formValues.map((element) => {
            if (element.type === 'text') {
              return (
                <div key={element.name}>
                  <label htmlFor={element.name}>{element.label}</label>
                  <input
                    type="text"
                    id={element.name}
                    name={element.name}
                    value={formCurrentValues[element.name] || ''}
                    onChange={handleChange}
                  />
                </div>
              );
            } else if (element.type === 'select') {
              return (
                <div key={element.name}>
                  <label htmlFor={element.name}>{element.label}</label>
                  <select
                    id={element.name}
                    name={element.name}
                    value={formCurrentValues[element.name] || ''}
                    onChange={handleChange}
                  >
                    {element.options.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              );
            }
            return null;
          })}
      </div>
    );
  };

  return (
    <div>
      <h2>Éléments de formulaire</h2>
      <Button variant="primary" onClick={handleGoToHomePage}>
        Retour à la page d'accueil
      </Button>
      <Button variant="success" onClick={() => handleSaveChanges()}>
        Enregistrer les modifications
      </Button>
      <ProgressBarComponent data={data?.datas}/>
      {renderFormElements()}
    </div>
  );
};

export default GBookPage;
