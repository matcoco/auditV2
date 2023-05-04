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

    setFormCurrentValues(prevState => {
      // Si la case à cocher est déjà cochée, on la décoche en la supprimant du tableau.
      if (checked) {
        return { ...prevState, [name]: [...(prevState[name] || []), value] };
      } else {
        // Si la case à cocher n'est pas cochée, on l'ajoute au tableau.
        return { ...prevState, [name]: prevState[name].filter(item => item !== value) };
      }
    });
  };



  const renderFormElements = () => {
    return (
      <div key={data.category}>
        {formValues &&
          formValues?.map((element) => {
            if (element.type === 'text') {
              return (
                <Form.Group as={Row} key={element.name} controlId={element.name}>
                  <Form.Label className='label-gbookPage' column sm={10}>
                    {element.label}
                  </Form.Label>
                  <Col sm={5}>
                    <Form.Control
                      type="text"
                      name={element.name}
                      value={formCurrentValues[element.name] || ''}
                      onChange={handleChange}
                    />
                  </Col>
                </Form.Group>
              );
            } else if (element.type === 'select') {
              return (
                <Form.Group className="select-gbookPage" as={Row} key={element.name} controlId={element.name}>
                  <Form.Label className='label-gbookPage' column sm={5}>
                    {element.label}
                  </Form.Label>
                  <Col sm={3}>
                    <Form.Control
                      as="select"
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
                    </Form.Control>
                  </Col>
                </Form.Group>
              );
            } else if (element.type === 'checkbox') {
              return (
                <Row key={element.name} className="mt-5 mb-5 frame-gbookPage">
                  <Col sm={2}>
                    <Form.Label className='label-gbookPage' htmlFor={element.name}>{element.label}</Form.Label>
                  </Col>
                  <Col sm={10}>
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
    <div className='mb-5'>
      <h2 className='mb-5 title-gbookPage'>FORMULAIRE</h2>
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
          <Col className='fields-part'>{renderFormElements()}</Col>
          <Col className='h-100 comments commentsSticky'>
            <div className='title-comments'><h2>Commentaires</h2></div>
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