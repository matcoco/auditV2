// src/pages/ImportConfig.jsx
import React, { useRef} from 'react';
import { Container } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { updateImportConfig, selectHardwareData } from "../../store/hardwareSlice";
import ExportJsonButton from '../ExportConfiguration';


const ImportConfig = () => {
    const dispatch = useDispatch();
    const hardwareData = useSelector(selectHardwareData);
    const fileInputRef = useRef(null);
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = JSON.parse(e.target.result);
            dispatch(updateImportConfig(data));
          } catch (err) {
            console.error('Erreur lors de la lecture du fichier JSON', err);
          }
        };
        reader.readAsText(file);
      }
    };

    return (
        <Container>
            <div className='mb-5'>
                <h2>Importation de la configuration</h2>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleFileChange}
                />
            </div>
            <div>
                <h2>Exporter la configuration actuelle</h2>
                <ExportJsonButton hardwareData={hardwareData} />
            </div>

        </Container>
    );
};

export default ImportConfig;