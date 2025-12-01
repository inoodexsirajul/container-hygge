import React from "react";
import Navbar from "../Navbar/Navbar";
import { Outlet } from "react-router";
import Footer from "../Footer/Footer";
import ScrollToTopButton from "../UI/ScrollToTopButton";

const Layout = () => {
    return (
        <>
            <Navbar />
            <main className="relative">
                <Outlet />
            </main>
            <Footer />
            <ScrollToTopButton />
        </>
    );
};

export default Layout;
