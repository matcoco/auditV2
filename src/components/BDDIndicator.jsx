import React from 'react';
import { selectHardwareData } from '../store/hardwareSlice';
import { useSelector } from 'react-redux';
const BDDIndicator = ({ isBddImported }) => {
    const hardwareData = useSelector(selectHardwareData);

    const indicatorStyle = {
        width: '20px',
        height: '20px',
        borderRadius: '50%',
        backgroundColor: isBddImported ? 'green' : 'red',
        display: 'inline-block',
        marginLeft: '10px',
    };

    return (
        <div>
            <span>Base de données :</span>
            <span style={indicatorStyle}></span>
            <div>
                {
                    isBddImported ? `${hardwareData.bdd.length} produits importés` : ""
                }
            </div>
        </div>
    );
};

export default BDDIndicator;
