import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import Card from "../../Components/Card/Card";
import { toast } from "sonner";
import Cart from "../../Components/Cart/Cart";

export default function Home() {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortOption, setSortOption] = useState("default");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const productsPerPage = 12;

    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
    useEffect(() => {
        const handler = debounce(() => {
            setDebouncedSearchTerm(searchTerm);
        }, 300);
        handler();
        return () => handler.cancel();
    }, [searchTerm]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await axios.get(
                    "https://fakestoreapi.com/products"
                );
                setProducts(response.data);
            } catch (err) {
                setError(err.message || "Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const getFilteredProducts = () => {
        return products.filter((product) => {
            const matchesSearch =
                product.title
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase()) ||
                product.category
                    .toLowerCase()
                    .includes(debouncedSearchTerm.toLowerCase());
            const matchesCategory =
                selectedCategory === "all" ||
                product.category.toLowerCase() ===
                    selectedCategory.toLowerCase();
            return matchesSearch && matchesCategory;
        });
    };

    const getSortedProducts = (filteredProducts) => {
        const productsToSort = [...filteredProducts];
        switch (sortOption) {
            case "price-low-high":
                return productsToSort.sort((a, b) => a.price - b.price);
            case "price-high-low":
                return productsToSort.sort((a, b) => b.price - a.price);
            case "name-asc":
                return productsToSort.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );
            case "name-desc":
                return productsToSort.sort((a, b) =>
                    b.title.localeCompare(b.title)
                );
            default:
                return productsToSort;
        }
    };

    const getPaginatedProducts = (sortedProducts) => {
        const startIndex = (currentPage - 1) * productsPerPage;
        return sortedProducts.slice(startIndex, startIndex + productsPerPage);
    };

    const filteredProducts = getFilteredProducts();
    const sortedProducts = getSortedProducts(filteredProducts);
    const paginatedProducts = getPaginatedProducts(sortedProducts);
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    if (isLoading) {
        return (
            <>
                <div className="flex justify-center items-center min-h-[60vh] px-4">
                    <div className="flex flex-col items-center gap-4">
                        <div className="animate-spin rounded-full h-12 w-12 sm:h-16 sm:w-16 border-t-4 border-b-4 border-blue-500"></div>
                        <p className="text-blue-700 dark:text-gray-200 text-sm sm:text-base">
                            Loading products...
                        </p>
                    </div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4 sm:px-6 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-xl py-8 sm:py-12">
                    <div className="relative mb-4 sm:mb-6">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-16 w-16 sm:h-20 sm:w-20 text-red-500 animate-pulse"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <div className="absolute inset-0 bg-red-200 dark:bg-red-900/20 rounded-full blur-md animate-pulse"></div>
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-800 dark:text-white mb-3 sm:mb-4 animate-bounce">
                        Whoops! Something Broke!
                    </h2>
                    <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 mb-6 sm:mb-8 max-w-md sm:max-w-lg">
                        {error}
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 sm:px-8 py-2 sm:py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 sm:gap-3 text-sm sm:text-base"
                        aria-label="Retry loading products"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 sm:h-6 sm:w-6 animate-spin-slow"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                                clipRule="evenodd"
                            />
                        </svg>
                        Try Again
                    </button>
                </div>
            </>
        );
    }

    return (
        <>
            <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-800 dark:to-indigo-800 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 text-white">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
                        Discover Amazing Products
                    </h1>
                    <p className="text-base sm:text-lg md:text-xl max-w-full sm:max-w-2xl">
                        Browse our curated collection of high-quality products
                        at unbeatable prices.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="w-full sm:w-1/2 relative">
                        <input
                            id="search"
                            type="text"
                            placeholder="Search products..."
                            className="w-full pl-10 pr-10 sm:pr-12 py-2 sm:py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm sm:text-base"
                            onChange={(e) => setSearchTerm(e.target.value)}
                            value={searchTerm}
                            aria-label="Search products"
                        />
                        <svg
                            className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                aria-label="Clear search"
                            >
                                <svg
                                    className="h-4 w-4 sm:h-5 sm:w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <label
                            htmlFor="sort"
                            className="text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap"
                        >
                            Sort by:
                        </label>
                        <select
                            id="sort"
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="w-full sm:w-auto p-2 sm:p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white text-sm sm:text-base"
                            aria-label="Sort products"
                        >
                            <option value="default">Default</option>
                            <option value="price-low-high">
                                Price: Low to High
                            </option>
                            <option value="price-high-low">
                                Price: High to Low
                            </option>
                            <option value="name-asc">Name: A-Z</option>
                            <option value="name-desc">Name: Z-A</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
                        Showing{" "}
                        <span className="font-semibold text-blue-700 dark:text-gray-200">
                            {filteredProducts.length}
                        </span>{" "}
                        products
                        {searchTerm && (
                            <span>
                                {" for "}
                                <span className="font-semibold text-gray-800 dark:text-white">
                                    "{searchTerm}"
                                </span>
                            </span>
                        )}
                    </div>

                    <div className="flex gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
                        <button
                            onClick={() => handleCategoryClick("all")}
                            className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-full whitespace-nowrap ${
                                selectedCategory === "all"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                            }`}
                            aria-pressed={selectedCategory === "all"}
                        >
                            All Categories
                        </button>
                        {[...new Set(products.map((p) => p.category))].map(
                            (category) => (
                                <button
                                    key={category}
                                    onClick={() =>
                                        handleCategoryClick(category)
                                    }
                                    className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-full whitespace-nowrap ${
                                        selectedCategory === category
                                            ? "bg-blue-600 text-white"
                                            : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200"
                                    }`}
                                    aria-pressed={selectedCategory === category}
                                >
                                    {category}
                                </button>
                            )
                        )}
                    </div>
                </div>

                {filteredProducts.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-center py-8 sm:py-12">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mb-3 sm:mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <h3 className="text-lg sm:text-xl font-medium text-gray-800 dark:text-white mb-2">
                            No products found
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-md">
                            {searchTerm
                                ? `We couldn't find any products matching "${searchTerm}". Try a different search term.`
                                : "There are currently no products available in this category."}
                        </p>
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 rounded-lg text-sm sm:text-base"
                                aria-label="Clear search"
                            >
                                Clear search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                        {paginatedProducts.map((product) => (
                            <Card
                                key={product.id}
                                product={product}
                                className="hover:scale-[1.02] hover:shadow-lg transition-transform duration-200"
                            />
                        ))}
                    </div>
                )}

                {filteredProducts.length > 0 && (
                    <div className="flex justify-center mt-8 sm:mt-12">
                        <nav
                            className="flex items-center gap-1 sm:gap-2"
                            aria-label="Pagination"
                        >
                            <button
                                onClick={() =>
                                    handlePageChange(currentPage - 1)
                                }
                                disabled={currentPage === 1}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                                    currentPage === 1
                                        ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                        : "text-blue-700 bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label="Previous page"
                            >
                                Previous
                            </button>

                            {[...Array(totalPages)].map((_, index) => {
                                const page = index + 1;
                                if (
                                    totalPages > 5 &&
                                    Math.abs(page - currentPage) > 1 &&
                                    page !== 1 &&
                                    page !== totalPages
                                ) {
                                    if (
                                        (page === 2 ||
                                            page === totalPages - 1) &&
                                        Math.abs(page - currentPage) > 2
                                    ) {
                                        return (
                                            <span
                                                key={`ellipsis-${page}`}
                                                className="px-2 py-2 text-gray-500 text-sm sm:text-base"
                                            >
                                                ...
                                            </span>
                                        );
                                    }
                                    return null;
                                }
                                return (
                                    <button
                                        key={page}
                                        onClick={() => handlePageChange(page)}
                                        className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg min-w-[32px] sm:min-w-[40px] text-sm sm:text-base ${
                                            currentPage === page
                                                ? "bg-blue-600 text-white"
                                                : "text-blue-700 bg-gray-300 hover:bg-gray-400"
                                        }`}
                                        aria-current={
                                            currentPage === page
                                                ? "page"
                                                : undefined
                                        }
                                        aria-label={`Page ${page}`}
                                    >
                                        {page}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() =>
                                    handlePageChange(currentPage + 1)
                                }
                                disabled={currentPage === totalPages}
                                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm sm:text-base ${
                                    currentPage === totalPages
                                        ? "text-gray-400 bg-gray-200 cursor-not-allowed"
                                        : "text-blue-700 bg-gray-300 hover:bg-gray-400"
                                }`}
                                aria-label="Next page"
                            >
                                Next
                            </button>
                        </nav>
                    </div>
                )}
            </section>
            <Cart />
        </>
    );
}
