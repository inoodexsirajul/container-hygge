import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useJobApplyMutation } from "../redux/services/eCommerceApi";

const Career = () => {
    const [jobApply, { isLoading }] = useJobApplyMutation();
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedVideo, setUploadedVideo] = useState(null); // নতুন state video এর জন্য

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setValue,
        setError,
        clearErrors,
    } = useForm();

    useEffect(() => {
        if (successMessage || errorMessage) {
            const timer = setTimeout(() => {
                setSuccessMessage("");
                setErrorMessage("");
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [successMessage, errorMessage]);

    const onSubmit = async (data) => {
        setSuccessMessage("");
        setErrorMessage("");

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("position", data.position);
        formData.append("video_cv", data.videcv);
        formData.append("cover_letter", data.coverLetter);
        if (uploadedFile) formData.append("resume", uploadedFile);
        if (uploadedVideo) formData.append("video_cv", uploadedVideo); // Video file add করা হলো

        try {
            await jobApply(formData).unwrap();
            setSuccessMessage(
                "Application submitted successfully! We'll contact you soon."
            );
            reset();
            setUploadedFile(null);
            setUploadedVideo(null); // Video reset
        } catch (err) {
            const msg =
                err?.data?.message ||
                err?.data?.errors?.[0] ||
                "Failed to submit. Please try again.";
            setErrorMessage(msg);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 10 * 1024 * 1024) {
            setError("resume", { message: "File size must be under 10MB" });
            setUploadedFile(null);
            e.target.value = "";
            return;
        }
        if (
            ![
                "application/pdf",
                "application/msword",
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            ].includes(file.type)
        ) {
            setError("resume", { message: "Only PDF, DOC, DOCX allowed" });
            setUploadedFile(null);
            e.target.value = "";
            return;
        }
        clearErrors("resume");
        setUploadedFile(file);
        setValue("resume", file);
    };

    // নতুন video file handler
    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Video file size limit - 100MB
        if (file.size > 100 * 1024 * 1024) {
            setError("video_cv", { message: "Video size must be under 100MB" });
            setUploadedVideo(null);
            e.target.value = "";
            return;
        }

        // Video format validation
        if (
            ![
                "video/mp4",
                "video/avi",
                "video/mov",
                "video/wmv",
                "video/flv",
                "video/webm",
                "video/mpeg",
            ].includes(file.type)
        ) {
            setError("video_cv", {
                message: "Only MP4, AVI, MOV, WMV, FLV, WebM, MPEG allowed",
            });
            setUploadedVideo(null);
            e.target.value = "";
            return;
        }

        clearErrors("video_cv");
        setUploadedVideo(file);
        setValue("video_cv", file);
    };

    const removeFile = () => {
        setUploadedFile(null);
        setValue("resume", null);
        document.getElementById("resume").value = "";
    };

    // নতুন video remove function
    const removeVideo = () => {
        setUploadedVideo(null);
        setValue("video_cv", null);
        document.getElementById("video_cv").value = "";
    };

    return (
        <div className="flex min-h-screen w-full bg-dark1 xl:px-20">
            <div className="w-full grid xl:grid-cols-2 gap-4 px-4 py-12">
                {/* Left content - unchanged */}
                <div className="w-full max-w-md text-center xl:text-left mb-16 pt-20">
                    <h1 className="text-5xl md:text-5xl font-bold text-white mb-8">
                        Careers at{" "}
                        <span className="text-red">Hygge Cotton</span>
                    </h1>
                    <p className="text-sm lg:text-lg text-cream leading-relaxed max-w-4xl mx-auto">
                        We're always looking for creative minds who share our
                        love for design, sustainability, and craftsmanship.
                    </p>
                    <p className="text-sm lg:text-lg text-gray-300 mt-4 max-w-3xl mx-auto">
                        If you'd like to join our growing team in Copenhagen,
                        send your CV and a short introduction to:
                    </p>
                    <div className="mt-8">
                        <a
                            href="mailto:info@hyggecotton.dk"
                            className="inline-flex items-center gap-3 text-2xl font-bold text-cream hover:text-red transition"
                        >
                            info@hyggecotton.dk
                        </a>
                    </div>
                    <p className="text-gray-400 text-sm mt-10">
                        Or apply directly using the form below
                    </p>
                </div>

                {/* Form Card */}
                <div className="w-full bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/20 p-4 md:p-4">
                    <div className="text-center mb-4">
                        <h2 className="text-4xl md:text-3xl font-bold text-white mb-4">
                            Join Our Team
                        </h2>
                        <p className="text-sm text-gray-300">
                            We're excited to have you apply! Please fill out the
                            form below.
                        </p>
                    </div>

                    {successMessage && (
                        <div className="mb-6 p-4 bg-green-600/20 border border-green-500/50 rounded-xl text-green-300 text-center font-medium animate-pulse">
                            {successMessage}
                        </div>
                    )}
                    {errorMessage && (
                        <div className="mb-6 p-4 bg-red-600/20 border border-red-500/50 rounded-xl text-red-300 text-center font-medium animate-pulse">
                            {errorMessage}
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            {/* Name, Email, Phone, Position fields - unchanged */}
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Full Name{" "}
                                    <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    {...register("name", {
                                        required: "Name is required",
                                    })}
                                    placeholder="John Doe"
                                    className="w-full px-5 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2   transition-all"
                                />
                                {errors.name && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Email Address{" "}
                                    <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: "Invalid email",
                                        },
                                    })}
                                    placeholder="john@example.com"
                                    className="w-full px-5 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2   transition-all"
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Phone Number{" "}
                                    <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="tel"
                                    {...register("phone", {
                                        required: "Phone is required",
                                        pattern: {
                                            value: /^[\+]?[0-9\s\-\(\)\.]{10,18}$/,
                                            message: "Invalid phone number",
                                        },
                                    })}
                                    placeholder="+880 17XX-XXXXXX"
                                    className="w-full px-5 py-2 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 transition-all"
                                />
                                {errors.phone && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.phone.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium text-gray-200 mb-2">
                                    Position{" "}
                                    <span className="text-red-400">*</span>
                                </label>
                                <select
                                    {...register("position", {
                                        required: "Please select a position",
                                    })}
                                    className="w-full px-5 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none    transition-all appearance-none cursor-pointer hover:bg-white/25"
                                    defaultValue=""
                                >
                                    <option
                                        value=""
                                        disabled
                                        className="bg-dark1"
                                    >
                                        -- Choose your position --
                                    </option>
                                    <option
                                        value="Graphic Designer"
                                        className="bg-dark1 text-cream"
                                    >
                                        Graphic Designer
                                    </option>
                                    <option
                                        value="Sales Executive"
                                        className="bg-dark1 text-cream"
                                    >
                                        Sales Executive
                                    </option>
                                    <option
                                        value="Accountant"
                                        className="bg-dark1 text-cream"
                                    >
                                        Accountant
                                    </option>
                                </select>

                                {/* Custom Dropdown Arrow */}
                                <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none mt-8">
                                    <svg
                                        className="w-6 h-6 text-cream"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M19 9l-7 7-7-7"
                                        />
                                    </svg>
                                </div>

                                {errors.position && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.position.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ">
                            {/* Video CV Upload - নতুন section */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-200 mb-3">
                                    Video Introduction
                                    <span className="text-red-400">*</span>
                                </label>
                                {!uploadedVideo ? (
                                    <label
                                        htmlFor="video_cv"
                                        className="flex items-center justify-center w-full   py-2 border-2 border-dashed border-white/40 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col items-center  ">
                                            <p className="text-sm font-semibold text-white">
                                                Drop your video CV here
                                            </p>
                                            <p className="text-[10px] text-gray mt-2">
                                                MP4, AVI, MOV • Max 100MB
                                            </p>
                                        </div>
                                        <input
                                            id="video_cv"
                                            type="file"
                                            accept="video/*"
                                            onChange={handleVideoChange}
                                            className="hidden"
                                            required
                                        />
                                    </label>
                                ) : (
                                    <div className="relative p-2 bg-white/10 border-2 border-red rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-red rounded-lg">
                                                    <svg
                                                        className="w-8 h-8 text-purple-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm0 5h6v3H7v-3z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">
                                                        {uploadedVideo.name}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {(
                                                            uploadedVideo.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{" "}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeVideo}
                                                className="p-2 hover:bg-red-600/30 rounded-full transition-colors"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-red-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {errors.video_cv && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.video_cv.message}
                                    </p>
                                )}
                            </div>

                            {/* Resume Upload - Resume এর উপরে video রাখা হয়েছে */}
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-200 mb-3">
                                    Resume / CV
                                    <span className="text-red-400">*</span>
                                </label>
                                {!uploadedFile ? (
                                    <label
                                        htmlFor="resume"
                                        className="flex items-center justify-center w-full   py-2 border-2 border-dashed border-white/40 rounded-xl cursor-pointer bg-white/10 hover:bg-white/20 transition-all duration-300 group"
                                    >
                                        <div className="flex flex-col items-center ">
                                            <p className="text-sm font-semibold text-white">
                                                Drop your resume here
                                            </p>
                                            <p className="text-[10px] text-gray mt-2">
                                                PDF, DOC, DOCX • Max 10MB
                                            </p>
                                        </div>
                                        <input
                                            id="resume"
                                            type="file"
                                            accept=".pdf,.doc,.docx"
                                            onChange={handleFileChange}
                                            className="hidden"
                                        />
                                    </label>
                                ) : (
                                    <div className="relative p-2 bg-white/10 border-2 border-red rounded-xl">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-4">
                                                <div className="p-3 bg-red rounded-lg">
                                                    <svg
                                                        className="w-8 h-8 text-purple-300"
                                                        fill="currentColor"
                                                        viewBox="0 0 20 20"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm0 2h12v8H4V6z"
                                                        />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium">
                                                        {uploadedFile.name}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {(
                                                            uploadedFile.size /
                                                            1024 /
                                                            1024
                                                        ).toFixed(2)}{" "}
                                                        MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={removeFile}
                                                className="p-2 hover:bg-red-600/30 rounded-full transition-colors"
                                            >
                                                <svg
                                                    className="w-5 h-5 text-red-400"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                )}
                                {errors.resume && (
                                    <p className="mt-2 text-sm text-red-400">
                                        {errors.resume.message}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Cover Letter */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-200 mb-3">
                                Cover Letter{" "}
                                <span className="text-red-400">*</span>
                            </label>
                            <textarea
                                {...register("coverLetter", {
                                    required: "Cover letter is required",
                                })}
                                rows="6"
                                placeholder="Tell us why you're passionate about this role..."
                                className="w-full px-5 py-4 bg-white/20 border border-white/30 rounded-xl text-white placeholder-gray-400 focus:outline-none   resize-none transition-all"
                            />
                            {errors.coverLetter && (
                                <p className="mt-2 text-sm text-red-400">
                                    {errors.coverLetter.message}
                                </p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={
                                isLoading || !uploadedFile || !uploadedVideo
                            } // Video ও required
                            className={`w-full py-5 rounded-xl font-bold text-lg text-white transition-all duration-300 ${
                                isLoading || !uploadedFile || !uploadedVideo
                                    ? "bg-red cursor-not-allowed"
                                    : "bg-red to-pink-600 hover:bg-red shadow-2xl transform hover:-translate-y-1"
                            }`}
                        >
                            {isLoading ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>

                    <div className="text-center mt-12 pt-2 ">
                        <p className="text-gray-400 text-sm">
                            We typically respond within{" "}
                            <strong>3–5 business days</strong>.<br />
                            Thank you for wanting to be part of Hygge Cotton
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;
