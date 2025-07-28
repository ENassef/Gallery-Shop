import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import AuthContextProvider from "./Context/Auth.Context";
import CartContextProvider from "./Context/Cart.Context";
import { Toaster } from "sonner";
import ProtectedRouter from "./Components/ProtectedRouter/ProtectedRouter";
import Home from "./Pages/Home/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ProductContextProvider from "./Context/Product.Context";
import { lazy, Suspense } from "react";

const ProductDetails = lazy(() =>
    import("./Pages/ProductDetails/ProductDetails")
);
const Login = lazy(() => import("./Pages/Login/Login"));
const Register = lazy(() => import("./Pages/Register/Register"));

const queryClient = new QueryClient();

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
                    element: (
                        <Suspense>
                            <ProductDetails />
                        </Suspense>
                    ),
                },
                {
                    path: "/login",
                    element: (
                        <ProtectedRouter>
                            <Suspense>
                                <Login />
                            </Suspense>
                        </ProtectedRouter>
                    ),
                },
                {
                    path: "/register",
                    element: (
                        <ProtectedRouter>
                            <Suspense>
                                <Register />
                            </Suspense>
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
            <QueryClientProvider client={queryClient}>
                <AuthContextProvider>
                    <CartContextProvider>
                        <ProductContextProvider>
                            <RouterProvider router={router} />
                            <Toaster
                                position="top-center"
                                closeButton={true}
                                duration={1000}
                                richColors={true}
                            />
                            <ReactQueryDevtools initialIsOpen={false} />
                        </ProductContextProvider>
                    </CartContextProvider>
                </AuthContextProvider>
            </QueryClientProvider>
        </>
    );
}

export default App;
