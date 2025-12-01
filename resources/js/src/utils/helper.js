const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
};

export { debounce };

// utils/auth.js
export const isTokenValid = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const exp = payload.exp * 1000; // ms
        return Date.now() < exp;
    } catch {
        return false;
    }
};

// utils/session.js
// export const getSessionId = () => {
//     const KEY = "session_id";
//     let sessionId = localStorage.getItem(KEY);

//     if (!sessionId) {
//         // প্রথমবার → তৈরি করো
//         sessionId =
//             "guest_" +
//             Date.now() +
//             "_" +
//             Math.random().toString(36).substr(2, 9);
//         localStorage.setItem(KEY, sessionId);
//     }

//     return sessionId;
// };

export const setSessionId = (id) => {
    localStorage.setItem("session_id", id);
};

export const getSessionId = () => {
    return localStorage.getItem("session_id");
};

export const clearSessionId = () => {
    localStorage.removeItem("session_id");
};

// export const clearSessionId = () => {
//     localStorage.removeItem("session_id");
// };

let memorySessionId = null;

// export const getSessionId = () => {
//     const KEY = "session_id";

//     // 1. localStorage থেকে
//     try {
//         const saved = localStorage.getItem(KEY);
//         if (saved) return saved;
//     } catch (e) {}

//     // 2. মেমরিতে থাকলে
//     if (memorySessionId) return memorySessionId;

//     // 3. নতুন তৈরি করো
//     memorySessionId =
//         "guest_" +
//         (crypto.randomUUID?.() ||
//             Date.now() + "_" + Math.random().toString(36));

//     // 4. আবার সেভ করার চেষ্টা
//     try {
//         localStorage.setItem(KEY, memorySessionId);
//     } catch (e) {}

//     return memorySessionId;
// };
