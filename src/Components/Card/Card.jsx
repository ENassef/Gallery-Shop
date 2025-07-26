import React, { useContext } from "react";
import { Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../Context/Cart.Context";
import { AuthContext } from "../../Context/Auth.Context";
import { toast } from "sonner";

export default function Card({ product }) {
    const { id, title, price, category, image, rating } = product;
    const navigate = useNavigate();
    const { addToCart } = useContext(CartContext);
    const { isAuthenticated } = useContext(AuthContext);

    const handleAddToCart = async (e) => {
        e.stopPropagation(); 

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

    return (
        <div
            className="group relative border border-gray-200 dark:border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800"
            onClick={() => navigate(`/product/${id}`) 
        }
        data-aos="fade-up"
        data-aos-duration="1000"
        >
            <div className="relative h-64 overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105 p-4"
                />
                <span className="absolute top-2 left-2 bg-blue-600 dark:bg-blue-500 text-white text-xs px-2 py-1 rounded-full capitalize">
                    {category}
                </span>
            </div>

            <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white line-clamp-2 min-h-[3rem]">
                    {title.split(" ").slice(0, 3).join(" ")}
                </h3>

                <div className="flex items-center space-x-1">
                    <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={16}
                                fill={
                                    i < Math.round(rating.rate)
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                        ({rating.count})
                    </span>
                </div>

                <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${price.toFixed(2)}
                </p>

                <button
                    onClick={handleAddToCart}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white py-2 px-4 rounded-lg transition-colors duration-300"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
