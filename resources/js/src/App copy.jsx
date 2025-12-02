import React, { useEffect, useLayoutEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import About from "./pages/About";
import ProductDetails from "./pages/ProductDetails";
import Shop from "./pages/Shop";
import CustomizeProduct from "./pages/CustomizeProduct";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import UserProfile from "./pages/UserProfile";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import TermsAndCondition from "./pages/TermsAndCondition";
import FooterPage from "./pages/FooterPage";
import UpdatePassword from "./pages/UpdatePassword";
import {
    eCommerceApi,
    useGetCartDetailsQuery,
    useGetUserProfileQuery,
} from "./redux/services/eCommerceApi";

import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import Career from "./pages/Career";
import ResendEmail from "./pages/ResendEmail";
import { useSyncToken } from "./utils/useSyncToken";
import SupportPage from "./pages/SupportPage";
import ShippingInfo from "./pages/ShippingInfo";
import ReturnsPolicy from "./pages/ReturnsPolicy";
import HowToOrder from "./pages/HowToOrder";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import LegalNotice from "./pages/LegalNotice";
import CustomizePage from "./pages/CustomizePage";
import { getSessionId } from "./utils/helper";

const App = () => {
    const location = useLocation();
    const token = useSyncToken();
    useEffect(() => {
        getSessionId();
    }, []);

    useGetUserProfileQuery(undefined, { skip: !token });
    useGetCartDetailsQuery(undefined, { skip: !token });
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);
    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <Routes>
                <Route
                    path="/forgot-password-user"
                    element={<ForgetPassword />}
                />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/" element={<Layout />}>
                    {/* Static Routes */}
                    <Route index element={<Home />} />
                    <Route path="shop" element={<Shop />} />
                    <Route
                        path="shop/category/:categorySlug"
                        element={<Shop />}
                    />
                    <Route
                        path="shop/subcategory/:subSlug"
                        element={<Shop />}
                    />
                    <Route
                        path="shop/childcategory/:childSlug"
                        element={<Shop />}
                    />
                    <Route path="resend-email" element={<ResendEmail />} />
                    <Route path="about" element={<About />} />
                    <Route path="support" element={<SupportPage />} />
                    <Route path="shipping" element={<ShippingInfo />} />
                    <Route path="return-policy" element={<ReturnsPolicy />} />
                    <Route path="how-to-order" element={<HowToOrder />} />
                    <Route path="privacy-policy" element={<PrivacyPolicy />} />
                    <Route path="legal-notice" element={<LegalNotice />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="cart" element={<CartPage />} />
                    <Route path="signin" element={<Login />} />
                    <Route path="customer-register" element={<Register />} />
                    <Route path="verify-email-f" element={<VerifyEmail />} />
                    <Route path="career" element={<Career />} />
                    <Route path="customize" element={<CustomizePage />} />
                    <Route
                        path="update-password"
                        element={<UpdatePassword />}
                    />
                    <Route path="success" element={<OrderSuccessPage />} />
                    <Route
                        path="terms-and-conditions"
                        element={<TermsAndCondition />}
                    />

                    {/* Dynamic Routes */}
                    <Route
                        path="product-details/:slug"
                        element={<ProductDetails />}
                    />
                    <Route
                        path="product/:slug/customize"
                        element={<CustomizeProduct />}
                    />
                    <Route path="/:slug" element={<FooterPage />} />

                    {/* Footer Pages - Only if slug matches known footer pages */}
                    <Route path="privacy-policy" element={<FooterPage />} />
                    <Route path="shipping-policy" element={<FooterPage />} />
                    <Route path="refund-policy" element={<FooterPage />} />
                    {/* Add more known footer pages here */}

                    {/* Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                        <Route path="checkout" element={<CheckoutPage />} />
                        <Route path="profile" element={<UserProfile />} />
                    </Route>

                    {/* 404 - Must be LAST */}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
