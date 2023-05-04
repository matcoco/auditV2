// src/pages/SettingsPage.js
import React, { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ManageAuditors from "../ManageAuditors";
import ManageRequesters from "../ManageRequesters";
import ManageCategoriesForms from '../ManageCategoriesForms';

import { Route, Routes } from "react-router-dom";
import FormsPage from "./FormsPage";
import ImportConfig from "./ImportConfig";
import ImportBDD from "./ImportBDD";




const SettingsPage = () => {
  const [activeComponent, setActiveComponent] = useState("auditeurs");

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };


  return (
    <Container>
      <h1 className="my-4">Paramètres</h1>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("auditeurs")}>
              Gestionnaire des auditeurs
            </ListGroup.Item>

            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("demandeurs")}>
              Gestionnaire des demandeurs
            </ListGroup.Item>

            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("champsFormulaire")}>
              Gestionnaire des champs de formulaire
            </ListGroup.Item>
            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("categoriesFormulaire")}>
              Gestionnaire des formulaires et catégorie
            </ListGroup.Item>
            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("ImportBDD")}>Importation BDD</ListGroup.Item>
            <ListGroup.Item className="title-settings" onClick={() => handleMenuItemClick("ImportConfiguration")}>Importation / Exportation de la configuration</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Col md={9}>
            {activeComponent === "auditeurs" && <ManageAuditors />}
            {activeComponent === "demandeurs" && <ManageRequesters />}
            {activeComponent === "champsFormulaire" && <FormsPage />}
            {activeComponent === "categoriesFormulaire" && <ManageCategoriesForms />}
            {activeComponent === "ImportConfiguration" && <ImportConfig />}
            {activeComponent === "ImportBDD" && <ImportBDD />}
            {/* Ajoutez ici d'autres conditions pour les autres liens du menu */}
          </Col>

            <Routes>
              <Route path="auditeurs" element={<ManageAuditors />} />
              <Route path="demandeurs" element={<ManageRequesters />} />
              <Route path="champsFormulaire" element={<FormsPage />} />
              <Route path="categoriesFormulaire" element={<ManageCategoriesForms />} />
              <Route path="ImportConfiguration" element={<ImportConfig />} />
              <Route path="ImportBDD" element={<ImportBDD />} />
              {/* ... */}
            </Routes>
  

        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;