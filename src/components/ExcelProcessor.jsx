import React, { useState } from "react";
import * as XLSX from "xlsx";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";

const ExcelFilterComponent = ({ getDataBdd }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      const headers = XLSX.utils.sheet_to_json(ws, { header: 3, range: "A1:Z1" })[0];

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

export default ExcelFilterComponent;
