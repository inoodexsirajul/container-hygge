import React, { Suspense, lazy, useEffect } from "react";
import { Route, Routes, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "./components/Layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import LoadingSpinner from "./components/UI/LoadingSpinner"; // তৈরি করতে হবে (নিচে দিলাম)
import { useSyncToken } from "./utils/useSyncToken";
import { getSessionId } from "./utils/helper";
import {
    useGetUserProfileQuery,
    useGetCartDetailsQuery,
} from "./redux/services/eCommerceApi";

// ====== Lazy Loaded Pages ======
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

    // Session ID initialize (একবারই চলবে)
    useEffect(() => {
        getSessionId();
    }, []);

    // ====== RTK Query Calls (অপটিমাইজড) ======
    const { isLoading: profileLoading, isFetching: profileFetching } =
        useGetUserProfileQuery(undefined, {
            skip: !token,
            refetchOnMountOrArgChange: false, // এটা না থাকলে প্রতি পেজে কল হয়
        });

    const { isLoading: cartLoading } = useGetCartDetailsQuery(undefined, {
        skip: !token,
        refetchOnMountOrArgChange: 30, // 30 সেকেন্ড পর রিফেচ
    });

    // Scroll to top on route change
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    // প্রথম লোডে প্রোফাইল/কার্ট লোডিং হলে ফুল স্ক্রিন লোডার দেখান
    const isInitialLoading =
        (token && (profileLoading || cartLoading)) || profileFetching;

    return (
        <>
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

            {isInitialLoading ? (
                <LoadingSpinner fullScreen />
            ) : (
                <Suspense fallback={<LoadingSpinner fullScreen />}>
                    <Routes>
                        {/* Public Routes without Layout */}
                        <Route
                            path="/forgot-password-user"
                            element={<ForgetPassword />}
                        />
                        <Route
                            path="/reset-password"
                            element={<ResetPassword />}
                        />
                        <Route path="/resend-email" element={<ResendEmail />} />
                        <Route
                            path="/verify-email-f"
                            element={<VerifyEmail />}
                        />

                        {/* Main Layout Routes */}
                        <Route path="/" element={<Layout />}>
                            {/* Static Pages */}
                            <Route index element={<Home />} />
                            <Route path="about" element={<About />} />
                            <Route path="contact" element={<ContactPage />} />
                            <Route path="support" element={<SupportPage />} />
                            <Route path="shipping" element={<ShippingInfo />} />
                            <Route
                                path="return-policy"
                                element={<ReturnsPolicy />}
                            />
                            <Route
                                path="how-to-order"
                                element={<HowToOrder />}
                            />
                            <Route
                                path="privacy-policy"
                                element={<PrivacyPolicy />}
                            />
                            <Route
                                path="legal-notice"
                                element={<LegalNotice />}
                            />
                            <Route path="career" element={<Career />} />
                            <Route
                                path="customize"
                                element={<CustomizePage />}
                            />
                            <Route
                                path="terms-and-conditions"
                                element={<TermsAndCondition />}
                            />
                            <Route
                                path="update-password"
                                element={<UpdatePassword />}
                            />
                            <Route
                                path="success"
                                element={<OrderSuccessPage />}
                            />

                            {/* Shop Routes */}
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

                            {/* Dynamic Product Routes */}
                            <Route
                                path="product-details/:slug"
                                element={<ProductDetails />}
                            />
                            <Route
                                path="product/:slug/customize"
                                element={<CustomizeProduct />}
                            />

                            {/* Cart & Auth */}
                            <Route path="cart" element={<CartPage />} />
                            <Route path="signin" element={<Login />} />
                            <Route
                                path="customer-register"
                                element={<Register />}
                            />

                            {/* Footer Dynamic Pages */}
                            <Route path="/:slug" element={<FooterPage />} />

                            {/* Protected Routes */}
                            <Route element={<ProtectedRoute />}>
                                <Route
                                    path="checkout"
                                    element={<CheckoutPage />}
                                />
                                <Route
                                    path="profile"
                                    element={<UserProfile />}
                                />
                            </Route>

                            {/* 404 - Last */}
                            <Route path="*" element={<NotFound />} />
                        </Route>
                    </Routes>
                </Suspense>
            )}
        </>
    );
};

export default App;
