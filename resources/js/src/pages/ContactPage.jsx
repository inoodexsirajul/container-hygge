import React, { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocalPhone, MdEmail } from "react-icons/md";
import {
    useGetContactQuery,
    useGetFooterQuery,
} from "../redux/services/eCommerceApi";
import axios from "axios";

const API_URL = `/api/v1/contact-us`;

// Skeleton Component - তোমার ডিজাইনের সাথে ১০০% মিল
const ContactSkeleton = () => {
    return (
        <div className="min-h-screen bg-dark1 py-12 px-5 2xl:px-20 animate-pulse">
            <div className="">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="h-12 bg-gray-800 rounded-2xl w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-96 mx-auto"></div>
                    <div className="h-4 bg-gray-800 rounded-full w-80 mx-auto mt-3"></div>
                </div>

                {/* Branches - ৪টা কার্ড */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-8">
                    {[...Array(4)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-dark2 rounded-xl overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="h-8 bg-gray-700 rounded-lg w-48 mb-4"></div>
                                <div className="h-4 bg-gray-700 rounded-full w-full"></div>
                                <div className="h-4 bg-gray-700 rounded-full w-11/12 mt-2"></div>
                                <div className="h-4 bg-gray-700 rounded-full w-10/12 mt-2"></div>
                            </div>
                            <div className="bg-gray-800 h-64 w-full"></div>
                        </div>
                    ))}
                </div>

                {/* Main Contact Area */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Left - Contact Info */}
                    <div className="lg:w-2/5">
                        <div className="bg-dark2 rounded-2xl p-8 shadow-lg">
                            <div className="h-10 bg-gray-700 rounded-xl w-64 mb-8"></div>
                            <div className="space-y-8">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="flex items-start gap-4"
                                    >
                                        <div className="w-12 h-12 bg-gray-700 rounded-full"></div>
                                        <div className="flex-1">
                                            <div className="h-6 bg-gray-700 rounded-lg w-24 mb-3"></div>
                                            <div className="h-4 bg-gray-700 rounded-full w-56"></div>
                                            <div className="h-4 bg-gray-700 rounded-full w-48 mt-2"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right - Form */}
                    <div className="lg:w-3/5">
                        <div className="bg-dark2 rounded-2xl p-8 shadow-lg">
                            <div className="h-10 bg-gray-700 rounded-xl w-56 mb-8"></div>
                            <div className="space-y-6">
                                {/* Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <div className="h-5 bg-gray-700 rounded-full w-24 mb-3"></div>
                                        <div className="h-12 bg-gray-800 rounded-lg"></div>
                                    </div>
                                    <div>
                                        <div className="h-5 bg-gray-700 rounded-full w-24 mb-3"></div>
                                        <div className="h-12 bg-gray-800 rounded-lg"></div>
                                    </div>
                                </div>

                                {/* Email, Phone, Subject */}
                                {[...Array(3)].map((_, i) => (
                                    <div key={i}>
                                        <div className="h-5 bg-gray-700 rounded-full w-32 mb-3"></div>
                                        <div className="h-12 bg-gray-800 rounded-lg"></div>
                                    </div>
                                ))}

                                {/* Message */}
                                <div>
                                    <div className="h-5 bg-gray-700 rounded-full w-20 mb-3"></div>
                                    <div className="h-32 bg-gray-800 rounded-lg"></div>
                                </div>

                                {/* Submit Button */}
                                <div className="h-14 bg-gray-700 rounded-lg w-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ContactPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
        subject: "",
    });

    const [submitStatus, setSubmitStatus] = useState("idle"); // idle | loading | success | error
    const [errorMsg, setErrorMsg] = useState("");

    const {
        data: branchData,
        isLoading: branchLoading,
        isError,
    } = useGetContactQuery();

    const { data: contactInfo, isLoading: contactLoading } =
        useGetFooterQuery();
    useEffect(() => {
        // পেজ লোড হলে লোডার বন্ধ
        window.dispatchEvent(new Event("pageloaded"));
    }, []);

    // Skeleton Loading - দুটো API লোডিং হলে দেখাবে
    if (branchLoading || contactLoading) {
        return <ContactSkeleton />;
    }

    if (isError) {
        return (
            <h2 className="text-center text-red-500">
                Failed to load branches
            </h2>
        );
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitStatus("loading");
        setErrorMsg("");

        const payload = {
            first_name: formData.firstName.trim(),
            last_name: formData.lastName.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            message: formData.message.trim(),
            subject: formData.subject.trim() || "Inquiry from website",
        };

        try {
            await axios.post(API_URL, payload, {
                headers: { "Content-Type": "application/json" },
            });

            setSubmitStatus("success");
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                message: "",
                subject: "",
            });
        } catch (err) {
            setSubmitStatus("error");
            const msg =
                err.response?.data?.detail ||
                err.message ||
                "Something went wrong. Please try again.";
            setErrorMsg(msg);
        }
    };

    return (
        <div className="min-h-screen bg-dark1 py-12 ">
            <div className="px-5 2xl:px-20 container mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cream mb-4 font-mont">
                        Get in touch
                    </h1>
                    <p className="text-sm text-gray max-w-sm mx-auto font-mont">
                        Proin volutpat consequat porttitor cras nullam gravida
                        at. Orci molestie a eu arcu. Sed ut tincidunt integerum
                        id sem. Arcu sed malesuada et magna.
                    </p>
                </div>

                {/* Branches */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-[30px] mb-8">
                    {branchData?.map((branch) => (
                        <div
                            className="w-full bg-dark2 rounded-xl"
                            key={branch?.id}
                        >
                            <div className="p-4">
                                <h4 className="text-cream font-bold text-[24px] font-mont">
                                    {branch?.name}
                                </h4>
                                <p className="text-gray text-sm my-4 font-mont">
                                    {branch?.description}
                                </p>
                            </div>
                            <div>
                                <iframe
                                    src={branch?.location_url}
                                    width="400"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    className="w-full"
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Contact Area */}
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Contact Info */}
                    <div className="lg:w-2/5">
                        <div className="bg-dark2 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-semibold text-cream mb-6 font-mont">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {contactInfo?.footer_info?.address && (
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <IoLocationSharp />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-cream font-mont">
                                                Address
                                            </h3>
                                            <p className="text-gray">
                                                {
                                                    contactInfo?.footer_info
                                                        ?.address
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {contactInfo?.footer_info?.phone && (
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <MdOutlineLocalPhone />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-cream font-mont">
                                                Phone
                                            </h3>
                                            <p className="text-gray">
                                                {
                                                    contactInfo?.footer_info
                                                        ?.phone
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                                {contactInfo?.footer_info?.email && (
                                    <div className="flex items-start">
                                        <div className="bg-blue-100 p-3 rounded-full mr-4">
                                            <MdEmail />
                                        </div>
                                        <div>
                                            <h3 className="font-medium text-cream font-mont">
                                                Email
                                            </h3>
                                            <p className="text-gray">
                                                {
                                                    contactInfo?.footer_info
                                                        ?.email
                                                }
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:w-3/5">
                        <div className="bg-dark2 rounded-2xl p-8 shadow-lg">
                            <h2 className="text-2xl font-semibold text-cream mb-6 font-mont">
                                Send us a message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        placeholder="e.g. General Inquiry"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-cream mb-2 font-mont">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition resize-none"
                                        required
                                    />
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={submitStatus === "loading"}
                                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                                            submitStatus === "loading"
                                                ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                                                : "bg-red text-white hover:bg-red-700"
                                        }`}
                                    >
                                        {submitStatus === "loading"
                                            ? "Sending…"
                                            : submitStatus === "success"
                                            ? "Sent!"
                                            : "Send message"}
                                    </button>

                                    {submitStatus === "success" && (
                                        <p className="mt-3 text-green-400 text-center font-mont">
                                            Thank you! Your message has been
                                            sent.
                                        </p>
                                    )}
                                    {submitStatus === "error" && (
                                        <p className="mt-3 text-red-400 text-center">
                                            {errorMsg}
                                        </p>
                                    )}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
