// src/pages/HomePage.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, FormControl } from "react-bootstrap";
import NewAuditModal from "../NewAuditModal";
import { selectHardwareData, deleteAudit } from "../../store/hardwareSlice";
import EditAuditModal from "../EditAuditModal";
import { formatDateToDDMMYYYY } from "../../utils/dateConvert";
import { toast } from 'react-toastify';
import Barcode from '../Barcode';
import { useNavigate } from 'react-router-dom';
import ProgressBarComponent from "../ProgressBarComponent";


const HomePage = () => {
  const hardwareData = useSelector(selectHardwareData);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();
  const handleEdit = (data) => {
    setSelectedData(data);
    setShowEditModal(true);
  };

  const handleDelete = (gbook) => {
    dispatch(deleteAudit({ gbook }));
    toast.error("Audit supprimé !", { closeOnClick: true, autoClose: 2000 });
  };

  const handleAuditButtonClick = (data) => {
    navigate(`/${data.gbook}`, { state: { category: data.category, datas: data } });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };


  const renderCards = () => {
    return hardwareData.datas
      .filter((data) => data.gbook.toLowerCase().includes(searchValue.toLowerCase()))
      .map((data, index) => (
        <Card key={index} style={{ width: "18rem", marginBottom: "1rem" }}>
          <Card.Body>
            <Card.Title>
              <Barcode
                value={data.gbook.toString()}
                options={{
                  format: "CODE128",
                  displayValue: true,
                  width: 2,
                  height: 50,
                  margin: 0,
                }}
              /></Card.Title>
            <Card.Text>

              Date: {formatDateToDDMMYYYY(data.date)}
              <br />
              Auditeur: {data.auditor}
              <br />
              Demandeur: {data.requester}
              <br />
              Catégorie : {data.category}
              <br />
              <ProgressBarComponent data={data} />
            </Card.Text>
            <Button
              variant="success"
              className="ml-2"
              onClick={() => handleAuditButtonClick(data)}
            >
              Auditer
            </Button>
            <Button variant="primary" onClick={() => handleEdit(data)}>
              Modifier
            </Button>
            <Button
              variant="danger"
              className="ml-2"
              onClick={() => handleDelete(data.gbook)}
            >
              Supprimer
            </Button>
          </Card.Body>
        </Card>
      ));
  };

  return (
    <div>
      <NewAuditModal />
      <FormControl
        type="text"
        placeholder="Recherche par Gbook"
        value={searchValue}
        onChange={handleSearchChange}
        style={{ marginBottom: "1rem" }}
      />
      {showEditModal && (
        <EditAuditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          data={selectedData}
        />
      )}
      <div>{renderCards()}</div>
    </div>
  );
};

export default HomePage;