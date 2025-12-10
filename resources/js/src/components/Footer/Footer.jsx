// components/Footer.jsx
import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaInstagram, FaTwitter, FaHeart } from "react-icons/fa";
import { useGetFooterQuery } from "../../redux/services/eCommerceApi";

// Skeleton Component
const FooterSkeleton = () => (
    <footer className="bg-dark2 text-white py-10">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                {/* Logo & Info */}
                <div className="space-y-4">
                    <div className="bg-gray-700 rounded-lg w-52 h-14 animate-pulse"></div>
                    <div className="space-y-3">
                        <div className="bg-gray-700 rounded h-4 w-64 animate-pulse"></div>
                        <div className="bg-gray-700 rounded h-4 w-48 animate-pulse"></div>
                        <div className="bg-gray-700 rounded h-4 w-56 animate-pulse"></div>
                    </div>
                </div>

                {/* 3 Link Columns */}
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-4">
                        <div className="bg-gray-700 rounded h-6 w-32 animate-pulse"></div>
                        <div className="space-y-3">
                            {[...Array(3)].map((_, j) => (
                                <div
                                    key={j}
                                    className="bg-gray-700 rounded h-4 w-36 animate-pulse"
                                ></div>
                            ))}
                        </div>
                    </div>
                ))}

                {/* Social */}
                <div className="space-y-4">
                    <div className="bg-gray-700 rounded h-6 w-32 animate-pulse"></div>
                    <div className="flex space-x-4">
                        {[...Array(3)].map((_, i) => (
                            <div
                                key={i}
                                className="bg-gray-700 rounded-full w-12 h-12 animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-10 pt-6 border-t border-gray-700 text-center">
                <div className="bg-gray-700 rounded h-4 w-80 mx-auto animate-pulse"></div>
            </div>
        </div>
    </footer>
);

// Fallback Footer (if API fails)
const FooterFallback = () => (
    <footer className="bg-dark1 text-white py-10 text-center">
        <div className="container mx-auto px-6">
            <p className="text-3xl font-bold mb-2 font-mont">Hygge Cotton</p>
            <p className="text-gray-400 mb-4 font-mont">Copenhagen, Denmark</p>
            <p className="text-sm text-gray-500 font-mont">
                © 2025 Hygge Cotton. Made with{" "}
                <FaHeart className="inline text-red-500 font-mont" /> in Denmark
            </p>
        </div>
    </footer>
);

const Footer = () => {
    const { data, isLoading, isFetching, error } = useGetFooterQuery(
        undefined,
        {
            refetchOnMountOrArgChange: false, // একবার লোড হলে আর রিফেচ করবে না
        }
    );

    // প্রথম লোডে শুধু স্কেলিটন, পরে কখনো না
    if (isLoading) return <FooterSkeleton />;
    if (error || !data) return <FooterFallback />;

    const { footer_info, footer_social } = data;

    const getSocialIcon = (iconClass) => {
        switch (iconClass) {
            case "fab fa-facebook-f":
                return <FaFacebookF />;
            case "fab fa-instagram":
                return <FaInstagram />;
            case "fab fa-twitter":
                return <FaTwitter />;
            default:
                return null;
        }
    };

    return (
        <footer
            className={`bg-dark2 text-white py-10  transition-opacity duration-700 ${
                isFetching ? "opacity-90" : "opacity-100"
            }`}
        >
            <div className="px-6 xl:px-20 max-w-[1200px]  mx-auto ">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
                    {/* Company Info */}
                    <div className="col-span-2">
                        <h2 className="text-3xl mb-3 text-red font-mont">
                            Hygge Cotton
                        </h2>
                        {footer_info.logo && (
                            <img
                                src={footer_info.logo}
                                alt="Hygge Cotton"
                                className="mb-6 max-w-xs h-16 object-contain"
                            />
                        )}
                        <p className="text-cream leading-relaxed font-mont">
                            {footer_info.address}
                        </p>
                        <p className="mt-2 text-cream font-mont">
                            Phone:{" "}
                            <a href={`tel:${footer_info.phone}`} className=" ">
                                {footer_info.phone}
                            </a>
                        </p>
                        <p className="text-cream font-mont mb-4">
                            Email:{" "}
                            <a
                                href={`mailto:${footer_info.email}`}
                                className="hover:text-red"
                            >
                                {footer_info.email}
                            </a>
                        </p>
                        {/* Social */}
                        <div className="mt-2">
                            <div className="flex space-x-5 text-2xl">
                                {[...footer_social]
                                    .sort((a, b) => a.serial_no - b.serial_no)
                                    .map((social) => (
                                        <a
                                            key={social.serial_no}
                                            href={social.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className=" transition transform hover:scale-110"
                                            aria-label={social.name}
                                        >
                                            {getSocialIcon(social.icon)}
                                        </a>
                                    ))}
                            </div>
                        </div>
                    </div>

                    {/* About */}
                    <div>
                        <h3 className="text-xl font-bold mb-5 text-cream font-mont">
                            About
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/about"
                                    className=" font-mont transition"
                                >
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/career"
                                    className="transition font-mont"
                                >
                                    Career
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Help & Support */}
                    <div>
                        <h3 className="text-xl font-bold mb-5 font-mont">
                            Help & Support
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/support"
                                    className="  transition font-mont"
                                >
                                    Help & Support
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/how-to-order"
                                    className="  transition font-mont"
                                >
                                    How to Order
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/shipping"
                                    className=" font-mont transition"
                                >
                                    Shipping
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-xl font-bold mb-5 font-mont ">
                            Legal
                        </h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/return-policy"
                                    className="  transition font-mont"
                                >
                                    Return Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="  transition font-mont"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/legal-notice"
                                    className=" transition font-mont"
                                >
                                    Legal Notice
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-10 pt-6 border-t border-cream/70 text-center flex flex-col space-y-2 xl:space-y-0 xl:flex-row justify-between">
                    <p className="text-cream">Ideation & Design Shahadat</p>
                    <p className="text-cream">{footer_info.copyright}</p>
                    <p className="text-cream">
                        Developed By
                        <Link
                            to="https://inoodex.com"
                            target="_blank"
                            className="text-red ml-2"
                        >
                            Inoodex
                        </Link>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
