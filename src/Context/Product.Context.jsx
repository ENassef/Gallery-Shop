import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

const ProductContext = createContext();

export default function ProductContextProvider({ children }) {

    let { data, isLoading, isError, error } = useQuery({
        queryKey: ["Products"],
        queryFn: fetchProducts,
        select: (data) => data.data,
        retry:1,
        staleTime:60000
    });

    async function fetchProducts() {
        try {
            return await axios.get("https://fakestoreapi.com/products");
        } catch (err) {
            throw err.message || "Failed to fetch products";
        }
    }

    // console.log(data);
    // console.log(isLoading);



    return (
        <ProductContext.Provider
            value={{
                isLoading,
                data,
                isError,
                error,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export { ProductContext };
