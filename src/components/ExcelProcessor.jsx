/* import React, { useState } from "react";
import * as XLSX from "xlsx";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const ExcelFilterComponent = ({ getDataBdd }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    if(!file){
      return
    }
    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const headers = XLSX.utils.sheet_to_json(ws, { header: 3, range: "A1:Z1" })[0];

      console.log(ws.A1.v.split(" "))
      const range = XLSX.utils.decode_range(ws["!ref"]);
      range.s.r = 3; // Commencer à lire à partir de la 4ème ligne (index 3)

      const data = XLSX.utils.sheet_to_json(ws, { header: headers, range: XLSX.utils.encode_range(range) });
      const filteredData = removeColumns(data);
      console.log(filteredData.length);
      getDataBdd(filteredData);
      setIsLoading(false);
    };
    reader.readAsBinaryString(file);
  };

  function removeColumns(jsonData) {
    const filteredData = jsonData.filter(row => {
      const conditionFilter = row["Condition"] !== "S6";
      const stockTypeFilter = ["LT", "FS", "SV", "PC"].includes(row["Stock Type"]);
      return conditionFilter && stockTypeFilter;
    });
  
    filteredData.forEach((row) => {
      delete row["Date The Stock Was Despatched"];
      delete row["Location"];
    });
  
    return filteredData;
  }

  return (
    <div className="main-import-bdd">
      <Form.Group controlId="formFileImportBDD" className="mb-3">
        <Form.Control type="file" onChange={handleFileUpload} />
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
          </div>
        )}
      </Form.Group>
    </div>
  );
};

export default ExcelFilterComponent; */

import React, { useState, useRef  } from "react";
import * as XLSX from "xlsx";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ExcelFilterComponent = ({ getDataBdd }) => {
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef();
  
  function validateFirstLine(ws) {
    const firstCell = ws["A1"];
    if (firstCell && firstCell.v) {
      const firstLine = firstCell.v.split(" ");
      const keywords = ["Stock", "Report", "Produced"];
      return keywords.every((word) => firstLine.includes(word));
    }
    return false;
  }

  function validateHeaders(headers) {
    let arrayHeaders = []
    let count = 0
    for(let data in headers){
      if(count >= 2 && count <= 10){
        arrayHeaders.push(headers[data].v)
      }
      count++
    }

    const requiredHeaders = [
      "Book Number",
      "Description",
      "Serial Number",
      "Stock Type",
      "Config Summary",
      "Condition",
      "Location",
      "Date The Stock Was Despatched",
      "Combined Comment"
    ];

    return arrayHeaders && arrayHeaders.every((key) =>
      requiredHeaders.includes(key)
    );
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (!file) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      if (!validateFirstLine(ws)) {
        toast.error("Il semble que ça soit pas le bon fichier excel !!", { closeOnClick: true, autoClose: 2000, });
        setIsLoading(false);
        fileInputRef.current.value = "";
        return;
      }


      const headers = XLSX.utils.sheet_to_json(ws, {
        header: 3,
        range: "A1:Z1",
      })[0];


      if (!validateHeaders(ws)) {
        toast.error("Les en-têtes du fichier ne sont pas valides.", { closeOnClick: true, autoClose: 2000, });
        setIsLoading(false);
        fileInputRef.current.value = "";
        return;
      }

      const range = XLSX.utils.decode_range(ws["!ref"]);
      range.s.r = 3; // Commencer à lire à partir de la 4ème ligne (index 3)

      const data = XLSX.utils.sheet_to_json(ws, { header: headers, range: XLSX.utils.encode_range(range) });
      const filteredData = removeColumns(data);

      getDataBdd(filteredData);
      setIsLoading(false);
      fileInputRef.current.value = "";
    };
    reader.readAsBinaryString(file);
  };

  function removeColumns(jsonData) {
    const filteredData = jsonData.filter(row => {
      const conditionFilter = row["Condition"] !== "S6";
      const stockTypeFilter = ["LT", "FS", "SV", "PC"].includes(row["Stock Type"]);
      return conditionFilter && stockTypeFilter;
    });

    filteredData.forEach((row) => {
      delete row["Date The Stock Was Despatched"];
      delete row["Location"];
    });

    return filteredData;
  }

  return (
    <div className="main-import-bdd">
      <Form.Group controlId="formFileImportBDD" className="mb-3">
        <Form.Control ref={fileInputRef} type="file" accept=".xlsx" onChange={handleFileUpload} />
        {isLoading && (
          <div className="spinner-container">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Chargement...</span>
            </Spinner>
          </div>
        )}
      </Form.Group>
      <ToastContainer />
    </div>
  );
};
export default ExcelFilterComponent;
