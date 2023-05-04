// src/pages/HomePage.js
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, FormControl, Form, Offcanvas } from "react-bootstrap";
import NewAuditModal from "../NewAuditModal";
import { selectHardwareData, deleteAudit } from "../../store/hardwareSlice";
import EditAuditModal from "../EditAuditModal";
import { formatDateToDDMMYYYY } from "../../utils/dateConvert";
import { toast } from 'react-toastify';
import Barcode from '../Barcode';
import { useNavigate } from 'react-router-dom';
import ProgressBarComponent from "../ProgressBarComponent";
import StatusCards from "../StatusCard";
import ExportDataButton from "../ExportDataButton";
import SaveButton from "../SaveButton";
import RestoreDataButton from "../RestaureDataButton";
import DataCounter from "../DataCounter";
import ResetDataButton from "../ResetDataButton";
import PieChart from "../PieChart";
import { MdEdit, MdDelete } from 'react-icons/md';



const HomePage = () => {
  const hardwareData = useSelector(selectHardwareData);
  const dispatch = useDispatch();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();
  const handleEdit = (data) => {
    setSelectedData(data);
    setShowEditModal(true);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const handleDelete = (gbook) => {
    dispatch(deleteAudit({ gbook }));
    toast.error("Audit supprimé !", { closeOnClick: true, autoClose: 2000 });
  };

  const handleMenuToggle = () => setShowMenu((prevShowMenu) => !prevShowMenu);

  const handleAuditButtonClick = (data) => {
    navigate(`/${data.gbook}`, { state: { category: data.category, datas: data } });
  };

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };


  const renderCards = () => {
    return hardwareData.datas
      .filter((data) => data.gbook.toLowerCase().includes(searchValue.toLowerCase()))
      .filter((data) => filterStatus === "all" || data.status === parseInt(filterStatus, 10))
      .map((data, index) => (
        <Card key={index} className="card" style={{ width: "18rem", marginBottom: "1rem" }} >
          <StatusCards status={data.status} />
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
            </Card.Text>
            <div className="progress-container">
              <ProgressBarComponent data={data} />
            </div>
            <div className="btn-card">
              <div className="btn-auditer">
                <Button
                  variant="outline-primary"
                  className="ml-2"
                  onClick={() => handleAuditButtonClick(data)}
                >
                  Auditer
                </Button>
              </div>
              <div className="btn-modification">
                <Button variant="outline-primary" onClick={() => handleEdit(data)}>
                  <MdEdit />
                </Button>
                <Button
                  variant="outline-danger"
                  className="ml-2 ml-2"
                  onClick={() => handleDelete(data.gbook)}
                >
                  <MdDelete />
                </Button>
              </div>

            </div>

          </Card.Body>
        </Card>
      ));
  };



  return (
    <div>
      <div className="d-flex">
        <div className="btn-audit">
          <NewAuditModal />
        </div>
        <div className="btn-option">
          <Button variant="primary" onClick={handleMenuToggle}>
            Plus d'options
          </Button>
        </div>
      </div>

      <Offcanvas show={showMenu} onHide={handleMenuToggle} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Options</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="main-btn-lateral-options">
            <div className="btn-lateral-options"><ExportDataButton /></div>
            <div className="btn-lateral-options"><SaveButton isDisable={true} /></div>
            <div className="btn-lateral-options"><RestoreDataButton /></div>
            <div className="btn-lateral-options"><ResetDataButton /></div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <div>
        <DataCounter />
      </div>

      <div>
        {hardwareData.datas.length > 0 ? <PieChart /> : ""}
      </div>
      <div className="d-flex">
        <Form.Select
          value={filterStatus}
          onChange={handleFilterChange}
          style={{ marginBottom: "1rem", width: "200px" }}
        >
          <option value="all">TOUS</option>
          <option value="1">EN COURS</option>
          <option value="2">TERMINE CONFORME</option>
          <option value="3">TERMINE NON CONFORME</option>
        </Form.Select>
        <FormControl
          type="text"
          placeholder="Recherche par Gbook"
          value={searchValue}
          onChange={handleSearchChange}
          className="search-gbook"
        />
      </div>


      {showEditModal && (
        <EditAuditModal
          show={showEditModal}
          onHide={() => setShowEditModal(false)}
          data={selectedData}
        />
      )}
      <div>
        {hardwareData.datas.length === 0
          ?
          <div className="container-noDataPic">
            <div>
              <img className="picNoData" src={'https://t4.ftcdn.net/jpg/04/75/01/23/360_F_475012363_aNqXx8CrsoTfJP5KCf1rERd6G50K0hXw.jpg'} alt='no data' />
            </div>
          </div>
          :
          <div className="d-flex cards-container">
            {renderCards()}
          </div>}
      </div>
    </div>
  );
};

export default React.memo(HomePage);