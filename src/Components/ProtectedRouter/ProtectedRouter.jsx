import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.Context";

export default function ProtectedRouter({ children }) {
    let { userToken ,isAuthenticated } = useContext(AuthContext);

    const { pathname } = useLocation();

    console.log(location.pathname);

    const isAuthRoute = ["/login", "/register"].includes(pathname);

    if (isAuthenticated) {
        return isAuthRoute ? <Navigate to="/" /> : children;
    } else {
        return isAuthRoute ? children : <Navigate to="/login" />;
    }
}
