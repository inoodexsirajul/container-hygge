// src/components/UI/TopProgressBar.jsx
import React, { useEffect, useRef } from "react";
import "./LoadingSpinner.css";

const TopProgressBar = () => {
    const barRef = useRef(null);

    useEffect(() => {
        const bar = barRef.current;
        if (!bar) return;

        bar.style.width = "0%";
        bar.style.opacity = "1";

        let width = 0;
        const interval = setInterval(() => {
            if (width >= 90) {
                clearInterval(interval);
            } else {
                width += 3;
                bar.style.width = width + "%";
            }
        }, 20);

        // কম্পোনেন্ট আনমাউন্ট হলে ১০০% করে হাইড
        return () => {
            clearInterval(interval);
            bar.style.width = "100%";
            setTimeout(() => {
                bar.style.opacity = "0";
            }, 200);
        };
    }, []);

    return (
        <div className="top-progress-container">
            <div ref={barRef} className="top-progress-bar"></div>
        </div>
    );
};

export default TopProgressBar;
