import React, { useEffect } from "react";
import "./LoadingSpinner.css";

const LoadingSpinner = () => {
    useEffect(() => {
        // শো করার সময়
        const bar = document.getElementById("top-progress-bar");
        if (bar) {
            bar.style.width = "0%";
            bar.style.opacity = "1";

            // অ্যানিমেশন শুরু
            let width = 0;
            const interval = setInterval(() => {
                if (width >= 90) {
                    clearInterval(interval);
                } else {
                    width += 2;
                    bar.style.width = width + "%";
                }
            }, 20);

            return () => {
                clearInterval(interval);
                // লোড শেষে ১০০% করে হাইড
                if (bar) {
                    bar.style.width = "100%";
                    setTimeout(() => {
                        bar.style.opacity = "0";
                        setTimeout(() => {
                            bar.style.width = "0%";
                        }, 300);
                    }, 200);
                }
            };
        }
    }, []);

    return (
        <div className="top-progress-container">
            <div id="top-progress-bar" className="top-progress-bar"></div>
        </div>
    );
};

export default LoadingSpinner;
