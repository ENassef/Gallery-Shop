import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";
import { AuthContext } from "./Auth.Context";
import { toast } from "sonner";

const CartContext = createContext();

export default function CartContextProvider({ children }) {
    const { userToken } = useContext(AuthContext);
    const [cartItems, setCartItems] = useState([]);
    const [cartID] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const localStorageKey = userToken ? `cartItems_${userToken}` : "cartItems";

    function addToCart(product) {
        const existingProduct = cartItems.find(item => item.id === product.id);
        
        let updatedCart;
        if (existingProduct) {
            updatedCart = cartItems.map(item =>
                item.id === product.id 
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...cartItems, { ...product, quantity: 1 }];
        }
        
        setCartItems(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
        toast.success(`${product.title} added to cart`);
    }

    function incrementQuantity(productId) {
        const updatedCart = cartItems.map(item =>
            item.id === productId 
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        
        setCartItems(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }

    function decrementQuantity(productId) {
        const existingProduct = cartItems.find(item => item.id === productId);
        
        let updatedCart;
        if (existingProduct.quantity <= 1) {
            updatedCart = cartItems.filter(item => item.id !== productId);
        } else {
            updatedCart = cartItems.map(item =>
                item.id === productId 
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            );
        }
        
        setCartItems(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
    }

    function removeFromCart(productId) {
        const product = cartItems.find(item => item.id === productId);
        const updatedCart = cartItems.filter(item => item.id !== productId);
        
        setCartItems(updatedCart);
        localStorage.setItem(localStorageKey, JSON.stringify(updatedCart));
        toast.success(`${product ? product.title : 'Item'} removed from cart`);
    }

    function clearCartItem() {
        localStorage.removeItem(localStorageKey);
        setCartItems([]);
        toast.success('Checkout Done');
    }

    useEffect(() => {
        const savedCart = localStorage.getItem(localStorageKey);
        if (savedCart) {
            try {
                const parsedCart = JSON.parse(savedCart);
                if (Array.isArray(parsedCart)) {
                    setCartItems(parsedCart);
                }
            } catch (error) {
                console.error("Failed to parse cart items:", error);
            }
        } else {
            setCartItems([]);
        }
    }, [userToken, localStorageKey]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                cartID,
                isLoading,
                addToCart,
                incrementQuantity,
                decrementQuantity,
                removeFromCart,
                isCartOpen,
                setIsCartOpen,
                clearCartItem
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export { CartContext };