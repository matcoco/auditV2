import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectHardwareData, updateSelectedData, calculatePercentage } from '../../store/hardwareSlice';
import { toast } from 'react-toastify';
import ProgressBarComponent from '../ProgressBarComponent';
import { Button, Container, Row, Col } from 'react-bootstrap';
import SaveButton from '../SaveButton';

const GBookPage = () => {
  const hardwareData = useSelector(selectHardwareData);
  const [formValues, setFormValues] = useState([]);
  const [formCurrentValues, setFormCurrentValues] = useState({});
  const [data, setData] = useState({});
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoToHomePage = () => {
    handleSaveChanges()
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

  const getSelectBackgroundColor = (value) => {
    if (value === "OK") {
      return "green";
    } else if (value === "NOK") {
      return "red";
    }
    return "transparent";
  };


  const updateAuditStatus = (obj) => {
    let status = 1;
    if (formCurrentValues && Object.values(formCurrentValues).length > 0) {
      const progressPercentage = calculatePercentage(obj.audit, formValues)
      if (progressPercentage === 100) {
        if (Object.values(formCurrentValues).some((value) => value === "NOK")) {
          status = 3;
        } else {
          status = 2;
        }
      } else {
        status = 1;
      }
    }
    return status ?? 1;
  };

  const findItemByBookNumber = (bookNumber) => {
    const bdd = hardwareData?.bdd;
    if (!bdd) return null;
    return bdd.find((item) => item['Book Number'].toString() === bookNumber);
  };

  const selectedItem = findItemByBookNumber(data?.datas?.gbook);

  const handleSaveChanges = () => {
    let obj = { ...data.datas };
    obj.audit = formCurrentValues;
    obj.progress = calculatePercentage(obj.audit, formValues)
    obj.status = updateAuditStatus(obj)
    obj.dateFinAudit = obj.progress === 100 ? new Date().toDateString() : ""
    setData((prevData) => ({ ...prevData, datas: obj }));
    dispatch(updateSelectedData({ obj }));
    toast.success("Modifications enregistrées avec succès !", { autoClose: 1000 });
  };


  const renderFormElements = () => {
    return (
      <div key={data.category}>
        {formValues && formValues?.map((element) => {
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
                    style={{
                      backgroundColor: getSelectBackgroundColor(
                        formCurrentValues[element?.name]
                      ),
                    }}
                  >
                    {element?.options.map((option, index) => (
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
      <SaveButton isDisable={false} />
      <ProgressBarComponent data={data?.datas} />
      <Container>
        <Row>
          <Col>{renderFormElements()}</Col>
          <Col>
            <div>Commentaires</div>
            {selectedItem && (
              <div>
                <div>Book Number: {selectedItem['Book Number']}</div>
                <div>Description: {selectedItem['Description']}</div>
                <div>Serial Number: {selectedItem['Serial Number']}</div>
                <div>StockType: {selectedItem['Stock Type']}</div>
                <div>Config Summary: {selectedItem['Config Summary']}</div>
                <div>Condition: {selectedItem['Condition']}</div>
                <div>Combined Comment: {selectedItem['Combined Comment']}</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GBookPage;




