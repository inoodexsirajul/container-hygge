import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import user from "../assets/people.png";
import { useSignupMutation } from "../redux/services/eCommerceApi";
import { FaRegUser } from "react-icons/fa";

const Register = () => {
    const [signup, { isLoading }] = useSignupMutation();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirm_password: "",
        },
    });

    const password = watch("password");

    const onSubmit = async (data) => {
        const payload = {
            name: data.name.trim(),
            email: data.email.trim(),
            password: data.password.trim(),
            password_confirmation: data.confirm_password.trim(),
        };

        if (data.password.trim() !== data.confirm_password.trim()) {
            toast.error("Passwords do not match. Please check and try again.", {
                position: "top-right",
                autoClose: 3000,
            });
            return;
        }

        try {
            await signup(payload).unwrap();

            toast.success(
                "Registration successful! Please check your email to verify your account.",
                {
                    position: "top-center",
                    autoClose: 2000,
                    onClose: () => navigate("/resend-email"),
                }
            );
            localStorage.setItem("pendingVerificationEmail", data.email.trim());
        } catch (error) {
            toast.error(
                error?.data?.message ||
                    "Registration failed. Please try again.",
                {
                    position: "top-right",
                    autoClose: 3000,
                }
            );
        }
    };

    return (
        <div className="flex h-screen w-full bg-dark1">
            <ToastContainer />
            <div className="w-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                >
                    <h2 className="text-4xl text-cream font-medium">Sign Up</h2>

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-cream"></div>
                        <p className="w-full text-nowrap text-sm text-cream">
                            or sign up with email
                        </p>
                        <div className="w-full h-px bg-cream"></div>
                    </div>

                    <div className="flex flex-col w-full">
                        <div className="flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 gap-2">
                            <FaRegUser className="text-cream" />
                            <input
                                type="text"
                                placeholder="Full Name"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                                {...register("name", {
                                    required: "Full name is required",
                                })}
                            />
                        </div>
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.name.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full mt-6">
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
                                placeholder="Email id"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                                {...register("email", {
                                    required: "Email is required",
                                })}
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full mt-6">
                        <div className="flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                                placeholder="Password"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 text-cream"
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="flex flex-col w-full mt-6">
                        <div className="flex items-center w-full bg-transparent border border-cream h-12 rounded-full overflow-hidden pl-6 gap-2">
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
                                placeholder="Confirm Password"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                                {...register("confirm_password", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === password ||
                                        "Passwords do not match",
                                })}
                            />
                            <button
                                type="button"
                                onClick={() =>
                                    setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="px-3 text-cream"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <p className="text-red-500 text-xs mt-1">
                                {errors.confirm_password.message}
                            </p>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`mt-8 w-full h-11 rounded-full text-white cursor-pointer bg-red hover:opacity-90 transition-opacity ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Registering..." : "Register"}
                    </button>
                    <p className="text-gray text-sm mt-4">
                        Already have an account?{" "}
                        <Link
                            className="text-indigo-400 hover:underline"
                            to="/signin"
                        >
                            Sign In
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;
