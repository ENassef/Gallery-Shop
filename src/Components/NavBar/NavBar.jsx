import { Moon, Sun } from "lucide-react";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/Auth.Context";
import { CartContext } from "../../Context/Cart.Context";

export default function NavBar({ darkMode, isAuthenticated, toggleDarkMode }) {

    const {logout} = useContext(AuthContext);
    const {setIsCartOpen , isCartOpen} = useContext(CartContext)

    return (
        <>
            <nav className="sticky py-4 w-full bg-blue-700 dark:bg-black text-white shadow-lg dark:shadow-gray-400 shadow-blue-300">
                <div className=" flex justify-between items-center w-full md:w-10/12 mx-auto py-4 px-2 ">
                    {/* Brand div  */}
                    <div className="text-[16px] md:text-lg lg:text-3xl font-bold ">
                        <Link to={"/"} className="">
                            Gallery Shop
                        </Link>
                    </div>

                    {/* Links Div */}
                    <div className=" space-x-4 text-[16px] md:text-lg flex items-center">
                        {isAuthenticated ? (
                            <>
                            <p onClick={()=>{setIsCartOpen(!isCartOpen)}} className="font-bold cursor-pointer">Cart</p>
                            <p onClick={()=>{logout()}} className="font-bold cursor-pointer">Logout</p>
                            </>
                        ) : (
                            <>
                                <Link to={"/login"}>Login</Link>
                                <Link to={"/register"}>Register</Link>
                            </>
                        )}
                        {darkMode ? (
                            <Sun
                                className="cursor-pointer"
                                onClick={() => {
                                    toggleDarkMode();
                                }}
                            />
                        ) : (
                            <Moon
                                className="cursor-pointer"
                                onClick={() => {
                                    toggleDarkMode();
                                }}
                            />
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
}
