// src/pages/SettingsPage.js
import React, { useState } from "react";
import { Container, Row, Col, ListGroup } from "react-bootstrap";
import ManageAuditors from "../ManageAuditors";
import ManageRequesters from "../ManageRequesters";
import ManageCategoriesForms from '../ManageCategoriesForms';

import { Route, Routes } from "react-router-dom";
import FormsPage from "./FormsPage";

const SettingsPage = () => {
  const [activeComponent, setActiveComponent] = useState(null);

  const handleMenuItemClick = (component) => {
    setActiveComponent(component);
  };


  return (
    <Container>
      <h1 className="my-4">Paramètres</h1>
      <Row>
        <Col md={3}>
          <ListGroup>
            <ListGroup.Item onClick={() => handleMenuItemClick("auditeurs")}>
              Gestionnaire des auditeurs
            </ListGroup.Item>

            <ListGroup.Item onClick={() => handleMenuItemClick("demandeurs")}>
              Gestionnaire des demandeurs
            </ListGroup.Item>

            <ListGroup.Item onClick={() => handleMenuItemClick("champsFormulaire")}>
              Gestionnaire des champs de formulaire
            </ListGroup.Item>
            <ListGroup.Item onClick={() => handleMenuItemClick("categoriesFormulaire")}>
              Gestionnaire des formulaires et catégorie
            </ListGroup.Item>
            <ListGroup.Item action>Importation BDD</ListGroup.Item>
            <ListGroup.Item action>Autre lien ou bouton</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={9}>
          <Col md={9}>
            {activeComponent === "auditeurs" && <ManageAuditors />}
            {activeComponent === "demandeurs" && <ManageRequesters />}
            {activeComponent === "champsFormulaire" && <FormsPage />}
            {activeComponent === "categoriesFormulaire" && <ManageCategoriesForms />}
            {/* Ajoutez ici d'autres conditions pour les autres liens du menu */}
          </Col>
          <Routes>
            <Route path="auditeurs" element={<ManageAuditors />} />
            <Route path="demandeurs" element={<ManageRequesters />} />
            <Route path="champsFormulaire" element={<FormsPage />} />
            <Route path="categoriesFormulaire" element={<ManageCategoriesForms/>} />
            {/* ... */}
          </Routes>
        </Col>
      </Row>
    </Container>
  );
};

export default SettingsPage;