import React, { useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { baseurl } from "../utils/url";

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const url = `${baseurl}/api/v1/reset-password-user`;

    // URL থেকে token ও email
    const token = searchParams.get("token");
    const emailFromUrl = searchParams.get("email");

    // লোডিং ও ভ্যালিড লিঙ্ক স্টেট
    const [isLoading, setIsLoading] = useState(false);
    const [isValidLink, setIsValidLink] = useState(true);

    // পাসওয়ার্ড শো/হাইড স্টেট
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
        setValue,
        reset,
        watch,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
            password_confirmation: "",
        },
    });

    const newPassword = watch("password");

    // URL থেকে ইমেইল সেট করো
    useEffect(() => {
        if (emailFromUrl) {
            setValue("email", emailFromUrl);
        }
    }, [emailFromUrl, setValue]);

    // লিঙ্ক ভ্যালিড কিনা চেক
    useEffect(() => {
        if (!token || !emailFromUrl) {
            setIsValidLink(false);
        }
    }, [token, emailFromUrl]);

    const onSubmit = async (data) => {
        if (!token || !emailFromUrl) {
            setError("general", {
                type: "manual",
                message: "Invalid or expired reset link.",
            });
            return;
        }

        setIsLoading(true);
        clearErrors();

        try {
            const response = await axios.post(url, {
                token,
                email: data.email,
                password: data.password,
                password_confirmation: data.password_confirmation,
            });

            toast.success(
                response.data?.message || "Password reset successful!"
            );
            reset();
            setTimeout(() => navigate("/signin"), 2000);
        } catch (err) {
            const message =
                err.response?.data?.message ||
                err.message ||
                "Failed to reset password. Please try again.";
            setError("general", { type: "manual", message });
        } finally {
            setIsLoading(false);
        }
    };

    // Invalid Link UI
    if (!isValidLink) {
        return (
            <div className="flex min-h-screen w-full bg-dark1">
                <div className="w-full flex flex-col items-center justify-center px-4 text-center">
                    <div className="md:w-96 w-full max-w-md">
                        <h2 className="text-3xl text-cream font-medium mb-4">
                            Invalid Reset Link
                        </h2>
                        <p className="text-sm text-gray mb-6">
                            The password reset link is missing required
                            information or has expired.
                        </p>
                        <Link
                            to="/forgot-password"
                            className="inline-block px-6 py-3 bg-red text-white rounded-full font-medium hover:bg-red/90 transition"
                        >
                            Request New Link
                        </Link>
                        <p className="text-sm text-gray mt-6">
                            <Link
                                to="/signin"
                                className="text-indigo-400 hover:underline"
                            >
                                Back to Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen w-full bg-dark1">
            <div className="w-full flex flex-col items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-96 w-full max-w-md flex flex-col items-center justify-center"
                >
                    {/* Title */}
                    <h2 className="text-4xl text-cream font-medium">
                        Set New Password
                    </h2>
                    <p className="text-sm text-gray mt-3 text-center max-w-xs">
                        Create a strong password for your account
                    </p>

                    {/* General Error */}
                    {errors.general && (
                        <p className="text-red-500 font-bold text-sm mt-4 w-full text-center bg-red-50 p-2 rounded-md">
                            {errors.general.message}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-cream"></div>
                        <p className="text-nowrap text-sm text-cream">
                            secure your account
                        </p>
                        <div className="w-full h-px bg-cream"></div>
                    </div>

                    {/* Email Field (Read-only) */}
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
                                })}
                                placeholder="Email"
                                className="bg-transparent text-cream placeholder-cream/70 outline-none text-sm w-full h-full"
                                readOnly
                                disabled
                                style={{ cursor: "not-allowed", opacity: 0.8 }}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 pl-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* New Password with Toggle */}
                    <div className="flex flex-col w-full mt-4">
                        <div className="relative flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 pr-12 gap-2">
                            <svg
                                width="13"
                                height="17"
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                    fill="#fffbed"
                                />
                            </svg>
                            <input
                                type={showPassword ? "text" : "password"}
                                {...register("password", {
                                    required: "New password is required",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                                        message:
                                            "Must contain uppercase, lowercase, and number",
                                    },
                                })}
                                placeholder="New Password"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full pr-10"
                                disabled={isLoading}
                            />
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 text-cream/70 hover:text-cream transition"
                                disabled={isLoading}
                            >
                                {showPassword ? (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.458 12c1.65-4.59 5.61-7.5 9.542-7.5 3.932 0 7.892 2.91 9.542 7.5-1.65 4.59-5.61 7.5-9.542 7.5-3.932 0-7.892-2.91-9.542-7.5zm9.542-5.5c-3.26 0-6.59 2.36-8.042 6.5 1.452 4.14 4.782 6.5 8.042 6.5 3.26 0 6.59-2.36 8.042-6.5-1.452-4.14-4.782-6.5-8.042-6.5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.707 2.293a1 1 0 00-1.414 1.414l18 18a1 1 0 001.414-1.414l-18-18z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 6c-3.932 0-7.892 2.91-9.542 7.5a1 1 0 001.884.684c1.452-4.14 4.782-6.5 8.042-6.5 3.26 0 6.59 2.36 8.042 6.5a1 1 0 001.884-.684C20.892 8.91 16.932 6 12 6z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M12 10a2 2 0 00-2 2 1 1 0 11-2 0 4 4 0 014-4 1 1 0 010 2z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 pl-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Confirm Password with Toggle */}
                    <div className="flex flex-col mt-4 w-full">
                        <div className="relative flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 pr-12 gap-2">
                            <svg
                                width="13"
                                height="17"
                                viewBox="0 0 13 17"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                    fill="#fffbed"
                                />
                            </svg>
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                {...register("password_confirmation", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === newPassword ||
                                        "Passwords do not match",
                                })}
                                placeholder="Confirm New Password"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full pr-10"
                                disabled={isLoading}
                            />
                            {/* Toggle Button */}
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute right-4 text-cream/70 hover:text-cream transition"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M12 9a3 3 0 100 6 3 3 0 000-6z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M2.458 12c1.65-4.59 5.61-7.5 9.542-7.5 3.932 0 7.892 2.91 9.542 7.5-1.65 4.59-5.61 7.5-9.542 7.5-3.932 0-7.892-2.91-9.542-7.5zm9.542-5.5c-3.26 0-6.59 2.36-8.042 6.5 1.452 4.14 4.782 6.5 8.042 6.5 3.26 0 6.59-2.36 8.042-6.5-1.452-4.14-4.782-6.5-8.042-6.5z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.707 2.293a1 1 0 00-1.414 1.414l18 18a1 1 0 001.414-1.414l-18-18z"
                                            fill="currentColor"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M12 6c-3.932 0-7.892 2.91-9.542 7.5a1 1 0 001.884.684c1.452-4.14 4.782-6.5 8.042-6.5 3.26 0 6.59 2.36 8.042 6.5a1 1 0 001.884-.684C20.892 8.91 16.932 6 12 6z"
                                            fill="currentColor"
                                        />
                                        <path
                                            d="M12 10a2 2 0 00-2 2 1 1 0 11-2 0 4 4 0 014-4 1 1 0 010 2z"
                                            fill="currentColor"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                        {errors.password_confirmation && (
                            <p className="text-red-500 text-xs mt-1 pl-2">
                                {errors.password_confirmation.message}
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
                        {isLoading ? "Resetting Password..." : "Reset Password"}
                    </button>

                    {/* Back to Sign In */}
                    <p className="text-gray text-sm mt-6 text-center">
                        <Link
                            className="text-indigo-400 hover:underline font-medium"
                            to="/signin"
                        >
                            Back to Sign In
                        </Link>
                    </p>
                </form>

                {/* Toast */}
                <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop
                    closeOnClick
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
                />
            </div>
        </div>
    );
};

export default ResetPassword;
