import { useFormik } from "formik";
import { CornerRightDown, Loader } from "lucide-react";
import React, { useContext, useEffect } from "react";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.Context";
import { toast } from "sonner";

export default function Login() {
    const { login, authError, isLoading, isAuthenticated, setAuthError } =
        useContext(AuthContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required")
            .min(6, "Username must be at least 6 characters"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        onSubmit: async (values, { setSubmitting }) => {
            try {
                await login(values);
            } catch (error) {
                console.error("Login error:", error);
            } finally {
                setSubmitting(false);
            }
        },
        validationSchema,
    });

    useEffect(() => {
        setAuthError(null);
    }, []);

    useEffect(() => {
        if (isAuthenticated) {
            toast.success('done login')
            navigate("/");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="lg:w-5/12 md:w-8/12 w-11/12 mx-auto md:py-30 py-24 md:px-4 px-2">
            <div className="w-full shadow-md dark:shadow-gray-700 shadow-blue-300 dark:bg-gray-800 bg-white px-4 py-8 md:space-y-8 space-y-4 rounded-lg">
                <div className="flex space-x-2 justify-center">
                    <p className="text-blue-700 dark:text-blue-400 md:text-2xl">
                        Login
                    </p>
                    <CornerRightDown
                        size={32}
                        className="text-blue-700 dark:text-blue-400 translate-y-4/10"
                    />
                </div>

                {/* Enhanced Error Display */}
                {authError && (
                    <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 dark:border-red-400 p-4 rounded">
                        <div className="flex items-center">
                            <div
                                className="flex-shrink-0 cursor-pointer"
                                onClick={() => {
                                    setAuthError(null);
                                }}
                            >
                                <svg
                                    className="h-5 w-5 text-red-500 dark:text-red-400"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 dark:text-red-400">
                                    {authError}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                <div className="w-5/6 mx-auto mb-6">
                    <form onSubmit={formik.handleSubmit} className="space-y-12">
                        <div className="relative h-12">
                            <input
                                type="text"
                                id="username"
                                aria-label="username input"
                                name="username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="peer border-2 border-blue-700 dark:border-blue-400 rounded-xl w-full h-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all dark:bg-gray-700 dark:text-white"
                                placeholder=" "
                            />
                            <label
                                htmlFor="username"
                                className={`absolute left-4 transition-all duration-200 transform pointer-events-none
                                    ${
                                        formik.values.username
                                            ? "top-0 -translate-y-3 text-sm bg-white dark:bg-gray-800 px-1 text-blue-700 dark:text-blue-400"
                                            : "top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1 peer-focus:text-blue-700 dark:peer-focus:text-blue-400"
                                    }
                                `}
                            >
                                Username
                            </label>
                            {formik.values.username &&
                                !formik.errors.username && (
                                    <svg
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-blue-700 dark:text-blue-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            {formik.errors.username &&
                                formik.touched.username && (
                                    <div className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                        {formik.errors.username}
                                    </div>
                                )}
                        </div>

                        <div className="relative h-12">
                            <input
                                type="password"
                                id="password"
                                aria-label="password input"
                                name="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="peer border-2 border-blue-700 dark:border-blue-400 rounded-xl w-full h-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all dark:bg-gray-700 dark:text-white"
                                placeholder=" "
                            />
                            <label
                                htmlFor="password"
                                className={`absolute left-4 transition-all duration-200 transform pointer-events-none
                                    ${
                                        formik.values.password
                                            ? "top-0 -translate-y-3 text-sm bg-white dark:bg-gray-800 px-1 text-blue-700 dark:text-blue-400"
                                            : "top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1 peer-focus:text-blue-700 dark:peer-focus:text-blue-400"
                                    }
                                `}
                            >
                                Password
                            </label>
                            {formik.values.password &&
                                !formik.errors.password && (
                                    <svg
                                        className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500 dark:text-green-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                )}
                            {formik.errors.password &&
                                formik.touched.password && (
                                    <div className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                        {formik.errors.password}
                                    </div>
                                )}
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full text-center md:text-lg text-[16px] bg-blue-700 dark:bg-blue-800 text-white dark:text-gray-100 rounded-2xl py-3 px-4 cursor-pointer hover:bg-blue-800 dark:hover:bg-blue-900 font-bold transition-colors duration-300 shadow-md hover:shadow-lg dark:shadow-blue-900/50 dark:hover:shadow-blue-900/70 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-blue-400 dark:focus:ring-offset-gray-800 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <Loader className="h-5 w-5 animate-spin" />
                                    Logging in...
                                </span>
                            ) : (
                                "Login"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
