import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import GBookPage from "./components/pages/GBookPage";
import SettingsPage from "./components/pages/SettingsPage";
import NavGlobal from "./components/NavGlobal";
import BDDIndicator from './components/BDDIndicator';
import { selectHardwareData } from "./store/hardwareSlice";
import { useSelector } from 'react-redux';

function App() {
  const hardwareData = useSelector(selectHardwareData);

  return (

      <BrowserRouter>
        <NavGlobal />
        <BDDIndicator isBddImported={hardwareData?.bdd.length !== 0} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:gbook" element={<GBookPage />} />
          <Route path="/settings/*" element={<SettingsPage />} />
        </Routes>
      </BrowserRouter>

  );
}

export default App;
