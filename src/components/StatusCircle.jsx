import React from "react";

const StatusCircle = ({ status }) => {
    const determineColor = () => {
        switch (status) {
            case 3:
                return "red";
            case 2:
                return "green";
            case 1:
                return "blue";
            default:
                return "gray";
        }
    };

    const color = determineColor();

    return (
        <div
            style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                backgroundColor: color,
                display: "inline-block",
            }}
        />
    );
};

export default StatusCircle;