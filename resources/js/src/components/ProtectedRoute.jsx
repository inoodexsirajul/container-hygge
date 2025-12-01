import React from "react";
import { Navigate, Outlet } from "react-router";
import { useGetUserProfileQuery } from "../redux/services/eCommerceApi";
import { toast } from "react-toastify";

const ProtectedRoute = () => {
    const token = localStorage.getItem("authToken");
    const {
        data: user,
        isLoading,
        error,
    } = useGetUserProfileQuery(undefined, {
        skip: !token,
    });

    // যদি টোকেন না থাকে, লগইন পেজে রিডিরেক্ট করো
    if (!token) {
        toast.error("Please log in to access this page");
        return <Navigate to="/signin" replace />;
    }

    // যদি টোকেন থাকে কিন্তু ত্রুটি হয় (যেমন 401 Unauthorized), লগআউট করো
    if (error) {
        if (error.status === 401) {
            localStorage.removeItem("authToken");
            toast.error("Session expired. Please log in again.");
        } else {
            toast.error(error?.data?.message || "Failed to fetch user profile");
        }
        return <Navigate to="/signin" replace />;
    }

    // যদি লোডিং হয়, তাহলে লোডিং স্টেট দেখাও
    if (isLoading) {
        return <div className="text-cream text-center py-10">Loading...</div>;
    }

    // যদি ইউজার ডাটা পাওয়া যায়, তাহলে পেজে অ্যাক্সেস দাও
    return user ? <Outlet /> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
