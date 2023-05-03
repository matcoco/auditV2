import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { selectHardwareData, updateSelectedData, calculatePercentage, updateAuditStatus, deleteElementToDatasAudit } from '../../store/hardwareSlice';
import { toast } from 'react-toastify';
import ProgressBarComponent from '../ProgressBarComponent';
import { Button, Container, Row, Col, Form } from 'react-bootstrap';
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
  
    obj.status = updateAuditStatus(obj, formCurrentValues, formValues)
    obj.dateFinAudit = obj.progress === 100 ? new Date().toDateString() : ""
    obj.audit = deleteElementToDatasAudit(obj.audit, formValues)
    setData((prevData) => ({ ...prevData, datas: obj }));
    dispatch(updateSelectedData({ obj }));
    toast.success("Modifications enregistrées avec succès !", { autoClose: 1000 });
  };

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;

    if (value === 'OK' && checked) {
      // Reset all other checkboxes if 'OK' is checked
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['OK'] }));
    } else if (value === 'Dalle brisée' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['Dalle brisée'] }));
    } else if (value === 'boitier rayé' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['boitier rayé'] }));
    } else if (value === 'boitier fortement rayé' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['boitier fortement rayé'] }));
    } else if (value === 'LCD HS (ok sur écran externe)' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['LCD HS (ok sur écran externe)'] }));
    } else if (value === 'boitier fortement abimé (collant)' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['boitier fortement abimé (collant)'] }));
    } else if (value === 'boitier neuf' && checked) {
      setFormCurrentValues((prevValues) => ({ ...prevValues, [name]: ['boitier neuf'] }))
    } else {
      // Uncheck 'OK' when any other checkbox is checked
      setFormCurrentValues((prevValues) => {
        const otherOptions = prevValues[name]?.filter((option) => option !== 'OK' && option !== 'Bouton power HS' && option !== 'boitier fortement abimé (collant)'&& option !== 'Dalle brisée' && option !== 'boitier fortement rayé' && option !== 'boitier rayé' && option !== 'boitier neuf' && option !== 'LCD HS (ok sur écran externe)') || [];
        const updatedOptions = checked
          ? [...otherOptions, value]
          : otherOptions.filter((option) => option !== value);
        return { ...prevValues, [name]: updatedOptions };
      });
    }
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
          } else if (element.type === 'checkbox') {
            return (
              <Row key={element.name} className="mb-2">
                <Col>
                  <label htmlFor={element.name}>{element.label}</label>
                </Col>
                <Col>
                  {element.options.map((option, index) => (
                    <Form.Check
                      key={index}
                      type="checkbox"
                      id={`${element.name}_${index}`}
                      name={element.name}
                      label={option}
                      value={option}
                      checked={formCurrentValues[element.name]?.includes(option) || false}
                      onChange={handleCheckboxChange}
                    />
                  ))}
                </Col>
              </Row>
            );
          }
          return null;
        })}
      </div>
    );
  };

  return (
    <div>
      <h2 className='title-gbookPage'>Éléments de formulaire</h2>
      <div className='d-flex container-btn-gbookPage'>
        <div className='btn-back-page'>

          <Button variant="primary" onClick={handleGoToHomePage}>
            Retour à la page d'accueil
          </Button>
        </div>
        <div>
          <Button variant="success" onClick={() => handleSaveChanges()}>
            Enregistrer les modifications
          </Button>
          <SaveButton isDisable={false} />
        </div>
      </div>
      <div className='container-progress'>
        <ProgressBarComponent data={data?.datas} />
      </div>

      <Container>
        <Row>
          <Col>{renderFormElements()}</Col>
          <Col>
            <div><h2>Commentaires</h2></div>
            {selectedItem && (
              <div>
                <div><b>Book Number:</b> {selectedItem['Book Number']}</div>
                <div><b>Description:</b> {selectedItem['Description']}</div>
                <div><b>Serial Number:</b> {selectedItem['Serial Number']}</div>
                <div><b>StockType:</b> {selectedItem['Stock Type']}</div>
                <div><b>Config Summary:</b> {selectedItem['Config Summary']}</div>
                <div><b>Condition:</b> {selectedItem['Condition']}</div>
                <div><b>Combined Comment:</b> {selectedItem['Combined Comment']}</div>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default GBookPage;