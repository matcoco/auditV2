import React from "react";

const StatusCircle = ({ status }) => {
    const determineColor = () => {
        switch (status) {
            case 3:
                return "#EB3C27";
            case 2:
                return "#00C756";
            case 1:
                return "#0063b2";
            default:
                return "gray";
        }
    };

    const color = determineColor();

    return (
        <div
        className={`card-status-color-${color}`}
            style={{
                width: "100%",
                height: "10px",
               /*  borderRadius: "50%", */
               backgroundColor: color,
                display: "inline-block",
            }}
        />
    );
};

export default StatusCircle;