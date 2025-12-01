import React, { useState } from "react";
import { IoLocationSharp } from "react-icons/io5";
import { MdOutlineLocalPhone, MdEmail } from "react-icons/md";

import {
    useGetContactQuery,
    useGetFooterQuery,
} from "../redux/services/eCommerceApi";
import axios from "axios";
// import baseurl from "../utils/url";

const API_URL = `/api/v1/contact-us`;

const ContactPage = () => {
    // Form state
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

    // Branch data
    const {
        data: branchData,
        isLoading: branchLoading,
        isError,
    } = useGetContactQuery();

    const { data: contactInfo, isLoading: contactLoading } =
        useGetFooterQuery();

    // Input change handler
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Form submit
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

    if (branchLoading)
        return <h2 className="text-center text-cream">Loading…</h2>;
    if (isError)
        return (
            <h2 className="text-center text-red-500">
                Failed to load branches
            </h2>
        );

    return (
        <div className="min-h-screen bg-dark1 py-12 px-5 2xl:px-20">
            <div className="">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-cream mb-4">
                        Get in touch
                    </h1>
                    <p className="text-sm text-gray max-w-sm mx-auto">
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
                                <h4 className="text-cream font-bold text-[24px]">
                                    {branch?.name}
                                </h4>
                                <p className="text-gray text-sm my-4">
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
                            <h2 className="text-2xl font-semibold text-cream mb-6">
                                Contact Information
                            </h2>

                            <div className="space-y-6">
                                {contactInfo?.footer_info?.address &&
                                    !contactLoading && (
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                <IoLocationSharp />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-cream">
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
                                {contactInfo?.footer_info?.phone &&
                                    !contactLoading && (
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                <MdOutlineLocalPhone />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-cream">
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
                                {contactInfo?.footer_info?.email &&
                                    !contactLoading && (
                                        <div className="flex items-start">
                                            <div className="bg-blue-100 p-3 rounded-full mr-4">
                                                <MdEmail />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-cream">
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
                            <h2 className="text-2xl font-semibold text-cream mb-6">
                                Send us a message
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Name Row */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-cream mb-2"
                                        >
                                            First name
                                        </label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-cream mb-2"
                                        >
                                            Last name
                                        </label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-cream mb-2"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                        required
                                    />
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-cream mb-2"
                                    >
                                        Phone number
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                    />
                                </div>

                                {/* Subject */}
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block text-sm font-medium text-cream mb-2"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition"
                                        placeholder="e.g. General Inquiry"
                                    />
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-cream mb-2"
                                    >
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg text-cream outline-none transition resize-none"
                                        required
                                    />
                                </div>

                                {/* Submit Button + Feedback */}
                                <div>
                                    <button
                                        type="submit"
                                        disabled={submitStatus === "loading"}
                                        className={`
                      w-full py-3 px-6 rounded-lg font-medium transition-colors
                      ${
                          submitStatus === "loading"
                              ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                              : "bg-red text-white hover:bg-red-700"
                      }
                    `}
                                    >
                                        {submitStatus === "loading"
                                            ? "Sending…"
                                            : submitStatus === "success"
                                            ? "Sent!"
                                            : "Send message"}
                                    </button>

                                    {submitStatus === "success" && (
                                        <p className="mt-3 text-green-400 text-center">
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
