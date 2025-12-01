import { useState, useEffect } from "react";

export const useSyncToken = () => {
    const [token, setToken] = useState(localStorage.getItem("authToken"));

    useEffect(() => {
        const syncToken = () => {
            const current = localStorage.getItem("authToken");
            if (current !== token) {
                setToken(current);
            }
        };

        window.addEventListener("storage", syncToken);
        const interval = setInterval(syncToken, 300);
        syncToken();

        return () => {
            window.removeEventListener("storage", syncToken);
            clearInterval(interval);
        };
    }, [token]);

    return token;
};
