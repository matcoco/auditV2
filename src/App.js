import React from 'react';
import './App.css';

import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import GBookPage from "./components/pages/GBookPage";
import SettingsPage from "./components/pages/SettingsPage";
import FormsPage from "./components/pages/FormsPage";
import NavGlobal from "./components/NavGlobal";

function App() {

  return (
    <BrowserRouter>
      <NavGlobal />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/:gbook" element={<GBookPage />} />
        <Route path="/settings/*" element={<SettingsPage />} />
        <Route path="/settings/forms" element={<FormsPage />} />
        <Route path="/settings/auditeurs" component={SettingsPage} />
        <Route path="/settings/demandeurs" component={SettingsPage} />
        <Route path="/settings/champsFormulaire" component={<FormsPage />} />
        <Route path="/settings/categoriesFormulaire" component={<FormsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
