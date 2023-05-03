import React from 'react';

const ExportJsonButton = ({hardwareData}) => {

    const exportToJson = () => {
        const json = JSON.stringify(hardwareData , null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'data.json';
        link.click();
        URL.revokeObjectURL(url);
    };

    return (
        <button onClick={() => exportToJson()}>
            Exporter les données en JSON
        </button>
    );
};


export default ExportJsonButton;
