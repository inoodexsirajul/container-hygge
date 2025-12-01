import React from "react";
import { Link, useNavigate } from "react-router";
import { eCommerceApi, useLoginMutation } from "../redux/services/eCommerceApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
// import { clearSessionId } from "../utils/helper";

const Login = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            password: "",
        },
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data).unwrap();

            // টোকেন সঠিক পাথ থেকে নাও
            const token = response?.data?.access_token;

            if (!token) {
                throw new Error("No token received from server");
            }

            localStorage.setItem("authToken", token);

            // রিফ্রেশ কার্ট + প্রোফাইল
            dispatch(eCommerceApi.util.invalidateTags(["Cart", "UserProfile"]));

            clearErrors();
            reset();
            navigate("/");
        } catch (err) {
            setError("general", {
                type: "manual",
                message:
                    err?.data?.message ||
                    err?.message ||
                    "Invalid email or password. Please try again.",
            });
        }
    };

    return (
        <div className="flex min-h-screen w-full bg-dark1">
            <div className="w-full flex flex-col items-center justify-center px-4">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-96 w-full max-w-md flex flex-col items-center justify-center"
                >
                    {/* Title */}
                    <h2 className="text-4xl text-cream font-medium">Sign in</h2>
                    <p className="text-sm text-gray mt-3">
                        Welcome back! Please sign in to continue
                    </p>

                    {/* General Error Message */}
                    {errors.general && (
                        <p className="text-red-500 text-sm mt-4 w-full text-center bg-red-50 p-2 rounded-md">
                            {errors.general.message}
                        </p>
                    )}

                    {/* Divider */}
                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-cream"></div>
                        <p className="text-nowrap text-sm text-cream">
                            or sign in with email
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
                            />
                        </div>
                        {errors.email && (
                            <p className="text-red-500 text-xs mt-1 pl-2">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="flex flex-col mt-6 w-full">
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
                                type="password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message:
                                            "Password must be at least 6 characters",
                                    },
                                })}
                                placeholder="Password"
                                className="bg-transparent text-cream placeholder-cream outline-none text-sm w-full h-full"
                            />
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-xs mt-1 pl-2">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    {/* Remember Me + Forgot Password */}
                    <div className="w-full flex items-center justify-between mt-8 text-cream">
                        <div className="flex items-center gap-2">
                            <input
                                className="h-5 w-5 accent-red"
                                type="checkbox"
                                id="remember"
                            />
                            <label
                                className="text-sm cursor-pointer"
                                htmlFor="remember"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            className="text-sm underline hover:text-indigo-400 transition-colors"
                            to="/forgot-password-user"
                        >
                            Forgot password?
                        </Link>
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
                        {isLoading ? "Logging in..." : "Login"}
                    </button>

                    {/* Sign Up Link */}
                    <p className="text-gray text-sm mt-6 text-center">
                        Don’t have an account?{" "}
                        <Link
                            className="text-indigo-400 hover:underline font-medium"
                            to="/customer-register"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
