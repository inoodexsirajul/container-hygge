import React, { Suspense, lazy, useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import { useSyncToken } from "./utils/useSyncToken";
import { getSessionId } from "./utils/helper";
import {
    useGetUserProfileQuery,
    useGetCartDetailsQuery,
} from "./redux/services/eCommerceApi";
import LoadingSpinner from "./components/UI/LoadingSpinner";

// ====== Lazy Load All Pages ======
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CustomizeProduct = lazy(() => import("./pages/CustomizeProduct"));
const CartPage = lazy(() => import("./pages/CartPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const TermsAndCondition = lazy(() => import("./pages/TermsAndCondition"));
const FooterPage = lazy(() => import("./pages/FooterPage"));
const UpdatePassword = lazy(() => import("./pages/UpdatePassword"));
const ForgetPassword = lazy(() => import("./pages/ForgetPassword"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const VerifyEmail = lazy(() => import("./pages/VerifyEmail"));
const Career = lazy(() => import("./pages/Career"));
const ResendEmail = lazy(() => import("./pages/ResendEmail"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const ShippingInfo = lazy(() => import("./pages/ShippingInfo"));
const ReturnsPolicy = lazy(() => import("./pages/ReturnsPolicy"));
const HowToOrder = lazy(() => import("./pages/HowToOrder"));
const PrivacyPolicy = lazy(() => import("./pages/PrivacyPolicy"));
const LegalNotice = lazy(() => import("./pages/LegalNotice"));
const CustomizePage = lazy(() => import("./pages/CustomizePage"));

const App = () => {
    const location = useLocation();
    const token = useSyncToken();

    // লোডিং স্টেট — এটাই সব কন্ট্রোল করবে
    const [showProgress, setShowProgress] = useState(true);

    useEffect(() => {
        getSessionId();
    }, []);

    // API লোডিং চেক
    useGetUserProfileQuery(undefined, {
        skip: !token,
        refetchOnMountOrArgChange: false,
    });

    useGetCartDetailsQuery(undefined, {
        skip: !token,
        refetchOnMountOrArgChange: 30,
    });

    // প্রতিবার রাউট চেঞ্জ হলে লোডার দেখাবে
    useEffect(() => {
        setShowProgress(true);
    }, [location.pathname]);

    // Scroll to top
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    useEffect(() => {
        const hideLoader = () => setShowProgress(false);
        window.addEventListener("pageloaded", hideLoader);
        return () => window.removeEventListener("pageloaded", hideLoader);
    }, []);
    return (
        <>
            {/* শুধু এই একটা লোডার — সব কিছুর জন্য */}
            {showProgress && <LoadingSpinner key={location.pathname} />}

            <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                pauseOnHover
                draggable
                theme="dark"
            />

            <Suspense
                fallback={
                    <>
                        <LoadingSpinner key="suspense" />
                        <div style={{ height: "100vh" }} />
                    </>
                }
            >
                <Routes location={location}>
                    {/* Public */}
                    <Route
                        path="/forgot-password-user"
                        element={<ForgetPassword />}
                    />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/resend-email" element={<ResendEmail />} />
                    <Route path="/verify-email-f" element={<VerifyEmail />} />

                    {/* Main Layout */}
                    <Route path="/" element={<Layout />}>
                        <Route
                            index
                            element={
                                <Home onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="about"
                            element={
                                <About onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="shop"
                            element={
                                <Shop onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="shop/category/:categorySlug"
                            element={
                                <Shop onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="shop/subcategory/:subSlug"
                            element={
                                <Shop onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="shop/childcategory/:childSlug"
                            element={
                                <Shop onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="product-details/:slug"
                            element={
                                <ProductDetails
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="product/:slug/customize"
                            element={
                                <CustomizeProduct
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="cart"
                            element={
                                <CartPage
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="contact"
                            element={
                                <ContactPage
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="signin"
                            element={
                                <Login onLoad={() => setShowProgress(false)} />
                            }
                        />
                        <Route
                            path="customer-register"
                            element={
                                <Register
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="terms-and-conditions"
                            element={
                                <TermsAndCondition
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="success"
                            element={
                                <OrderSuccessPage
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="customize"
                            element={
                                <CustomizePage
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                        <Route
                            path="/:slug"
                            element={
                                <FooterPage
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />

                        {/* Protected */}
                        <Route element={<ProtectedRoute />}>
                            <Route
                                path="checkout"
                                element={
                                    <CheckoutPage
                                        onLoad={() => setShowProgress(false)}
                                    />
                                }
                            />
                            <Route
                                path="profile"
                                element={
                                    <UserProfile
                                        onLoad={() => setShowProgress(false)}
                                    />
                                }
                            />
                        </Route>

                        <Route
                            path="*"
                            element={
                                <NotFound
                                    onLoad={() => setShowProgress(false)}
                                />
                            }
                        />
                    </Route>
                </Routes>
            </Suspense>
        </>
    );
};

export default App;
