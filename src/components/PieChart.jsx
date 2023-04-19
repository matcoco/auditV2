// src/components/PieChart.js
import React, { useEffect, useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { ResponsivePie } from '@nivo/pie';
import { selectHardwareData } from '../store/hardwareSlice';

const PieChart = () => {
    const hardwareData = useSelector(selectHardwareData);
    const [auditCount, setAuditCount] = useState([])

    const countStatusAudit = useCallback(() => {
        let arrayStatusCount = [
            {
                id : 1,
                label: "En cours",
                count :0
            },
            {
                id : 2,
                label: "Terminé conforme",
                count :0
            },
            {
                id : 3,
                label: "Terminé non conforme",
                count :0
            }
        ]
        
        for (let item of hardwareData.datas) {

            if (item.status === 1) {
                arrayStatusCount[0].count += 1
            }
            if (item.status === 2) {
                arrayStatusCount[1].count += 1
            }
            if (item.status === 3) {
                arrayStatusCount[2].count += 1
            }
        }

        setAuditCount(auditCount => arrayStatusCount)
    }, [hardwareData])

    useEffect(() => {
        countStatusAudit()
    }, [hardwareData, countStatusAudit])


    // Transformez les données pour les adapter au format attendu par le graphique Pie
    const pieChartData = auditCount.reduce((acc, data) => {
        const index = acc.findIndex(item => item.id === data.id);
        if (index === -1) {
            acc.push({ id: data.label, label: data.label, value: data.count });
        } else {
            acc[index].value += 1;
        }
        return acc;
    }, []);

    const customColors = ['#0000ff', '#008000', '#ff0000'];

    return (
        <div style={{ height: '400px' }}>
            <ResponsivePie
                data={pieChartData}
                margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                borderWidth={1}
                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor="#333333"
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: 'color' }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                colors={customColors}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
            />
        </div>
    );
};

export default PieChart;
