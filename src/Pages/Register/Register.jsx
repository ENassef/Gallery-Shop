import { useFormik } from "formik";
import { CornerRightDown, Loader } from "lucide-react";
import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/Auth.Context";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

export default function Register() {
    const { register, authError, isLoading, setAuthError, isRegistered } =
        useContext(AuthContext);
    const navigate = useNavigate();

    const validationSchema = Yup.object({
        username: Yup.string()
            .required("Username is required")
            .min(6, "Username must be at least 6 characters"),
        email: Yup.string()
            .required("Email is required")
            .email("Invalid email address"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        repassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password")], "Passwords must match"),
    });

    const formik = useFormik({
        initialValues: {
            username: "",
            email: "",
            password: "",
            repassword: "",
        },
        onSubmit: async (values) => {
            try{
                await register(values);
            } catch (error) {
                // Error is handled by AuthContext
                console.log( 'register page : ' , error);
            }
        },
        validationSchema,
    });

    useEffect(() => {
        setAuthError(null);
    }, []);

    useEffect(()=>{
        if(isRegistered){
            navigate('/login')
        }
    },[isRegistered])

    return (
        <div className="lg:w-5/12 md:w-8/12 w-11/12 mx-auto md:py-30 py-24 md:px-4 px-2">
            <div className="w-full shadow-md dark:shadow-gray-700 shadow-blue-300 dark:bg-gray-800 bg-white px-4 py-8 md:space-y-8 space-y-4 rounded-lg">
                <div className="flex space-x-2 justify-center">
                    <p className="text-blue-700 dark:text-blue-400 md:text-2xl">
                        Register
                    </p>
                    <CornerRightDown
                        size={32}
                        className="text-blue-700 dark:text-blue-400 translate-y-4/10"
                    />
                </div>
                {authError && (
                    <div className="text-red-500 dark:text-red-400 text-sm text-center">
                        {authError}
                    </div>
                )}
                <div className="w-5/6 mx-auto mb-6">
                    <form onSubmit={formik.handleSubmit} className="space-y-8">
                        <div className="relative h-12">
                            <input
                                type="text"
                                id="username"
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
                                type="email"
                                id="email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="peer border-2 border-blue-700 dark:border-blue-400 rounded-xl w-full h-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all dark:bg-gray-700 dark:text-white"
                                placeholder=" "
                            />
                            <label
                                htmlFor="email"
                                className={`absolute left-4 transition-all duration-200 transform pointer-events-none
                                    ${
                                        formik.values.email
                                            ? "top-0 -translate-y-3 text-sm bg-white dark:bg-gray-800 px-1 text-blue-700 dark:text-blue-400"
                                            : "top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1 peer-focus:text-blue-700 dark:peer-focus:text-blue-400"
                                    }
                                `}
                            >
                                Email
                            </label>
                            {formik.values.email && !formik.errors.email && (
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
                            {formik.errors.email && formik.touched.email && (
                                <div className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                    {formik.errors.email}
                                </div>
                            )}
                        </div>
                        <div className="relative h-12">
                            <input
                                type="password"
                                id="password"
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
                        <div className="relative h-12">
                            <input
                                type="password"
                                id="repassword"
                                name="repassword"
                                value={formik.values.repassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="peer border-2 border-blue-700 dark:border-blue-400 rounded-xl w-full h-full px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all dark:bg-gray-700 dark:text-white"
                                placeholder=" "
                            />
                            <label
                                htmlFor="repassword"
                                className={`absolute left-4 transition-all duration-200 transform pointer-events-none
                                    ${
                                        formik.values.repassword
                                            ? "top-0 -translate-y-3 text-sm bg-white dark:bg-gray-800 px-1 text-blue-700 dark:text-blue-400"
                                            : "top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 peer-focus:top-0 peer-focus:-translate-y-3 peer-focus:text-sm peer-focus:bg-white dark:peer-focus:bg-gray-800 peer-focus:px-1 peer-focus:text-blue-700 dark:peer-focus:text-blue-400"
                                    }
                                `}
                            >
                                Confirm Password
                            </label>
                            {formik.values.repassword &&
                                !formik.errors.repassword &&
                                formik.values.password ===
                                    formik.values.repassword && (
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
                            {formik.errors.repassword &&
                                formik.touched.repassword && (
                                    <div className="text-red-500 dark:text-red-400 text-sm mt-1 ml-1">
                                        {formik.errors.repassword}
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
                                    Registering...
                                </span>
                            ) : (
                                "Register"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
