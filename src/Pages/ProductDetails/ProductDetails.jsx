import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../../Context/Cart.Context";
import { AuthContext } from "../../Context/Auth.Context";
import Cart from "../../Components/Cart/Cart";
import { toast } from "sonner";

export default function ProductDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `https://fakestoreapi.com/products/${id}`
                );
                setProduct(response.data);
            } catch (err) {
                setError("Failed to load product details");
                console.error("Error fetching product:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async (e) => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        try {
            await addToCart(product);
            toast.success(`${product.title} added to cart!`);
        } catch (error) {
            console.log("Error adding to cart:", error);
            toast.error("Failed to add item to cart. Please try again.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="animate-pulse flex flex-col md:flex-row gap-8 w-full max-w-6xl">
                    <div className="w-full md:w-1/2 h-96 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
                        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mt-8"></div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
                <div className="max-w-md text-center">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                        {error || "Product not found"}
                    </h2>
                    <button
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-6 transition-colors"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Back to products
                    </button>

                    <div className="flex flex-col md:flex-row gap-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                        <div className="w-full md:w-1/2 p-6">
                            <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="w-full h-full object-contain p-8 transition-transform duration-300 hover:scale-105"
                                    onError={(e) => {
                                        e.target.src =
                                            "https://via.placeholder.com/500x500?text=Image+Not+Available";
                                    }}
                                />
                            </div>
                        </div>

                        <div className="w-full md:w-1/2 p-6 flex flex-col">
                            <div className="flex-1">
                                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                                    {product.category}
                                </span>

                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {product.title}
                                </h1>

                                <div className="flex items-center mb-6">
                                    <div className="flex text-yellow-400 mr-2">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className={`w-5 h-5 ${
                                                    i <
                                                    Math.round(
                                                        product.rating?.rate ||
                                                            0
                                                    )
                                                        ? "fill-current"
                                                        : "fill-none stroke-current"
                                                }`}
                                                viewBox="0 0 24 24"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                                                />
                                            </svg>
                                        ))}
                                    </div>
                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                        {product.rating?.count || 0} reviews
                                    </span>
                                </div>

                                <p className="text-gray-700 dark:text-gray-300 mb-6">
                                    {product.description}
                                </p>
                            </div>

                            <div className="mt-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                                        ${product.price.toFixed(2)}
                                    </span>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors duration-300"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Cart />
        </>
    );
}
