// pages/LegalNotice.jsx
import React from "react";
import {
    FaCopyright,
    FaHome,
    FaEnvelope,
    FaPhoneAlt,
    FaShieldAlt,
} from "react-icons/fa";

const LegalNotice = () => {
    return (
        <div className="min-h-screen bg-dark1 py-20 ">
            <div className="max-w-[1200px] mx-auto px-4 2xl:px-20">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-3xl md:text-4xl font-bold text-cream mb-4">
                            Legal Notice
                        </h1>
                        <p className="text-md md:text-xl text-gray">
                            Protecting creativity, one stitch at a time
                        </p>
                    </div>

                    {/* Main Card */}
                    <div className="bg-dark2 rounded-3xl shadow-2xl overflow-hidden">
                        {/* Copyright Section */}
                        <div className="p-8 md:p-16 border-b ">
                            <div className="flex flex-col xl:flex-row items-start gap-6">
                                <div className="w-16 h-16 bg-dark1 rounded-full shrink-0 flex items-center justify-center">
                                    <FaCopyright className="text-3xl text-cream" />
                                </div>
                                <div>
                                    <h2 className="text-xl lg:text-2xl font-bold text-cream mb-6">
                                        Copyright & Intellectual Property
                                    </h2>
                                    <p className="text-sm text-gray leading-relaxed">
                                        All images, designs, logos, text, and
                                        content on this website are the
                                        exclusive property of{" "}
                                        <strong>Hygge Cotton</strong> or its
                                        licensors.
                                    </p>
                                    <p className="text-sm text-gray mt-6 leading-relaxed">
                                        Unauthorized reproduction, distribution,
                                        modification, or use of any material
                                        from this website is{" "}
                                        <strong>strictly prohibited</strong>{" "}
                                        without prior written consent from Hygge
                                        Cotton.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Company Details */}
                        <div className="p-12 md:p-16 bg-dark1">
                            <h2 className="text-lg lg:text-2xl  font-bold text-cream mb-10 flex items-center gap-4">
                                <FaShieldAlt
                                    className="text-3xl text-cream "
                                    size={40}
                                />
                                Official Company Information
                            </h2>

                            <div className="grid md:grid-cols-2 gap-8 text-lg">
                                <div className="flex items-start gap-4">
                                    <FaHome className="text-2xl text-cream  mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray">
                                            Company Name
                                        </p>
                                        <p className="text-gray">
                                            Hygge Cotton
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <FaHome className="text-2xl text-cream  mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray">
                                            Registered Address
                                        </p>
                                        <p className="text-gray">
                                            Frederiksberggade 25A
                                            <br />
                                            1459 København K<br />
                                            Denmark
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <FaEnvelope className="text-2xl text-cream mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray">
                                            Email
                                        </p>
                                        <p className="text-gray">
                                            <a
                                                href="mailto:hyggecotton2025@gmail.com"
                                                className=" underline"
                                            >
                                                hyggecotton2025@gmail.com
                                            </a>
                                            <br />
                                            <a
                                                href="mailto:support@hyggecotton.dk"
                                                className="underline"
                                            >
                                                support@hyggecotton.dk
                                            </a>
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <FaPhoneAlt className="text-2xl text-cream mt-1" />
                                    <div>
                                        <p className="font-semibold text-gray">
                                            Phone
                                        </p>
                                        <a
                                            href="tel:+4553713518"
                                            className="text-gray underline"
                                        >
                                            +45 53 71 35 18
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Final Message */}
                        <div className="bg-dark2 py-12 text-center">
                            <p className="text-cream text-2xl font-medium">
                                Thank you for respecting our work and creativity
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LegalNotice;
