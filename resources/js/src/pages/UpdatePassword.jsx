import { Link, useNavigate } from "react-router";
import { eCommerceApi, useLoginMutation } from "../redux/services/eCommerceApi";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

const UpdatePassword = () => {
    const [login, { isLoading }] = useLoginMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors,
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // ফর্ম সাবমিট হ্যান্ডলার
    const onSubmit = async (data) => {
        try {
            const response = await login(data).unwrap();

            localStorage.setItem("authToken", response?.data?.access_token);

            // Force refetch all queries
            // eCommerceApi.util.resetApiState();
            dispatch(eCommerceApi.util.invalidateTags(["Cart", "UserProfile"]));
            clearErrors(); // সফল লগইনের পর ত্রুটি ক্লিয়ার
            navigate("/");
        } catch (err) {
            setError("general", {
                type: "manual",
                message: err.data?.message || "Login failed. Please try again.",
            });
        }
    };

    // Google লগইন হ্যান্ডলার (ডামি)
    const handleGoogleLogin = () => {
        console.log("Google login clicked");
    };

    return (
        <div className="flex min-h-screen w-full bg-dark1">
            <div className="w-full flex flex-col items-center justify-center">
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="md:w-96 w-80 flex flex-col items-center justify-center"
                >
                    <h2 className="text-4xl text-cream font-medium">
                        Recover Password
                    </h2>

                    {errors.general && (
                        <p className="text-red-500 text-sm mt-3">
                            {errors.general.message}
                        </p>
                    )}

                    <div className="flex items-center gap-4 w-full my-5">
                        <div className="w-full h-px bg-cream"></div>

                        <div className="w-full h-px bg-cream"></div>
                    </div>

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
                                type="password"
                                {...register("password", {
                                    required: "password is required",
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
                            <p className="text-red-500 text-xs mt-1">
                                {errors.email.message}
                            </p>
                        )}
                    </div>

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
                            <p className="text-red-500 text-xs mt-1">
                                {errors.password.message}
                            </p>
                        )}
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-cream">
                        <div className="flex items-center gap-2">
                            <input
                                className="h-5"
                                type="checkbox"
                                id="checkbox"
                            />
                            <label className="text-sm" htmlFor="checkbox">
                                Remember me
                            </label>
                        </div>
                        <Link
                            className="text-sm underline"
                            to="/forgot-password"
                        >
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className={`mt-8 w-full h-11 rounded-full text-white cursor-pointer bg-red hover:opacity-90 transition-opacity ${
                            isLoading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                        {isLoading ? "Logging in..." : "Login"}
                    </button>
                    <p className="text-gray text-sm mt-4">
                        Don’t have an account?
                        <Link
                            className="text-indigo-400 hover:underline"
                            to="/register"
                        >
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default UpdatePassword;
