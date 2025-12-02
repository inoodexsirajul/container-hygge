import React from "react";
import "./LoadingSpinner.css"; // নিচে CSS দিলাম

const LoadingSpinner = ({ fullScreen = false }) => {
    return (
        <div className={`loader-container ${fullScreen ? "full-screen" : ""}`}>
            <div className="spinner"></div>
            <p>Loading...</p>
        </div>
    );
};

export default LoadingSpinner;
