import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import ProductDetails from "./Pages/ProductDetails/ProductDetails";
import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import AuthContextProvider from "./Context/Auth.Context";
import CartContextProvider from "./Context/Cart.Context";
import { Toaster } from "sonner";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import Home from "./Pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Home />,
                },
                {
                    path: "/product/:id",
                    element: <ProductDetails />,
                },
                {
                    path: "/login",
                    element: (
                        <ProtectedRouter>
                            <Login />
                        </ProtectedRouter>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <ProtectedRouter>
                            <Register />
                        </ProtectedRouter>
                    ),
                },
            ],
        },
    ]);

    useEffect(() => {
        AOS.init();
    }, []);

    return (
        <>
            <AuthContextProvider>
                <CartContextProvider>
                    <RouterProvider router={router} />
                    <Toaster
                        position="top-center"
                        closeButton={true}
                        duration={1000}
                        richColors={true}
                    />
                </CartContextProvider>
            </AuthContextProvider>
        </>
    );
}

export default App;
