import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { baseurl } from "../utils/url";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [email, setEmail] = useState("");
    const [canResend, setCanResend] = useState(false);
    const [countdown, setCountdown] = useState(30);
    const url = `${baseurl}/api/v1/forgot-password`;
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        reset,
    } = useForm({
        defaultValues: {
            email: "",
        },
    });

    // Resend Timer Logic
    useEffect(() => {
        if (isSubmitted && countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        } else if (countdown === 0) {
            setCanResend(true);
        }
    }, [isSubmitted, countdown]);

    const onSubmit = async (data) => {
        setIsLoading(true);
        clearErrors();

        try {
            await axios.post(url, {
                email: data.email,
            });

            // সাকসেস: ইমেইল সংরক্ষণ করো
            setEmail(data.email);
            setIsSubmitted(true);
            setCanResend(false);
            setCountdown(30); // রিসেট টাইমার
            reset();

            toast.success("Password reset link sent to your email!");
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to send reset link. Please try again.";

            setError("general", {
                type: "manual",
                message: errorMessage,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Resend Function
    const handleResend = () => {
        if (canResend && email) {
            onSubmit({ email });
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-dark1">
            <div className="w-full flex flex-col items-center justify-center px-4">
                {/* Success State */}
                {isSubmitted ? (
                    <div className="md:w-96 w-full max-w-md flex flex-col items-center justify-center text-center space-y-6">
                        {/* Success Icon */}
                        <div className="mx-auto">
                            <svg
                                width="80"
                                height="80"
                                viewBox="0 0 64 64"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="text-green-500"
                            >
                                <circle
                                    cx="32"
                                    cy="32"
                                    r="28"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    fill="none"
                                />
                                <path
                                    d="M20 32L28 40L44 24"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </div>

                        <div>
                            <h2 className="text-3xl text-cream font-medium mb-2">
                                Check Your Email
                            </h2>
                            <p className="text-sm text-gray max-w-xs mx-auto">
                                We’ve sent a password reset link to
                                <span className="text-cream font-medium">
                                    {" "}
                                    {email}
                                </span>
                            </p>
                            <p className="text-xs text-gray mt-2">
                                Please check your{" "}
                                <span className="text-cream">inbox</span> and{" "}
                                <span className="text-cream">spam/junk</span>{" "}
                                folder.
                            </p>
                        </div>

                        {/* Resend Button with Timer */}
                        <button
                            onClick={handleResend}
                            disabled={!canResend || isLoading}
                            className={`text-sm font-medium transition-all ${
                                canResend
                                    ? "text-indigo-400 hover:underline cursor-pointer"
                                    : "text-gray opacity-60 cursor-not-allowed"
                            }`}
                        >
                            {canResend
                                ? "Resend Email"
                                : `Resend in ${countdown}s`}
                        </button>

                        {/* Support Link */}
                        <p className="text-xs text-gray">
                            Still no email?{" "}
                            <a
                                href="mailto:support@yourapp.com"
                                className="text-indigo-400 hover:underline"
                            >
                                Contact support
                            </a>
                        </p>

                        {/* Back to Sign In */}
                        <p className="text-sm text-gray mt-4">
                            <Link
                                to="/signin"
                                className="text-indigo-400 hover:underline font-medium"
                            >
                                Back to Sign In
                            </Link>
                        </p>
                    </div>
                ) : (
                    /* Form State */
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="md:w-96 w-full max-w-md flex flex-col items-center justify-center"
                    >
                        <h2 className="text-4xl text-cream font-medium">
                            Forgot Password
                        </h2>
                        <p className="text-sm text-gray mt-3 text-center max-w-xs">
                            Enter your email and we’ll send you a link to reset
                            your password.
                        </p>

                        {/* General Error */}
                        {errors.general && (
                            <p className="text-red-500 text-sm mt-4 w-full text-center bg-red-50 p-2 rounded-md">
                                {errors.general.message}
                            </p>
                        )}

                        <div className="flex items-center gap-4 w-full my-5">
                            <div className="w-full h-px bg-cream"></div>
                            <p className="text-nowrap text-sm text-cream">
                                reset via email
                            </p>
                            <div className="w-full h-px bg-cream"></div>
                        </div>

                        {/* Email Field */}
                        <div className="flex flex-col w-full">
                            <div className="flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 gap-2">
                                <svg
                                    width="16"
                                    height="11"
                                    viewBox="0 0 16 11"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                        fill="#fffbed"
                                    />
                                </svg>
                                <input
                                    type="email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email format",
                                        },
                                    })}
                                    placeholder="Email id"
                                    className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                                    disabled={isLoading}
                                />
                            </div>
                            {errors.email && (
                                <p className="text-red-500 text-xs mt-1 pl-2">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`mt-8 w-full h-11 rounded-full text-white font-medium bg-red hover:bg-red/90 transition-all duration-200 ${
                                isLoading
                                    ? "opacity-50 cursor-not-allowed"
                                    : "cursor-pointer"
                            }`}
                        >
                            {isLoading ? "Sending..." : "Send Reset Link"}
                        </button>

                        <p className="text-gray text-sm mt-6 text-center">
                            Remember your password?{" "}
                            <Link
                                className="text-indigo-400 hover:underline font-medium"
                                to="/signin"
                            >
                                Back to Sign in
                            </Link>
                        </p>
                    </form>
                )}

                {/* Toast Container */}
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
            </div>
        </div>
    );
};

export default ForgotPassword;
