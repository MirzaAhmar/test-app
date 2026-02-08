import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

// Create context
const CounterContext = createContext();

// Provide context to component
export const CounterProvider = ({ children }) => {
    const [heartCount, setHeartCount] = useState(() => {
        const savedHeart = localStorage.getItem('heartCount');
        return savedHeart ? parseInt(savedHeart, 10) : 0;
    });

    const [cartCount, setCartCount] = useState(() => {
        const savedCart = localStorage.getItem('cartCount');
        return savedCart ? parseInt(savedCart, 10) : 0;
    });

    // Update localStorage whenever heartCount & cartCount change
    useEffect(() => {
        localStorage.setItem('heartCount', heartCount);
    }, [heartCount]);

    useEffect(() => {
        localStorage.setItem('cartCount', cartCount);
    }, [cartCount]);

    // Increment functions
    const increamentHeart = () => setHeartCount((prev) => prev + 1);
    const decreamentHeart = () => setHeartCount((prev) => prev - 1);
    const increamentCart = () => setCartCount((prev) => prev + 1);
    const decreamentCart = () => setCartCount((prev) => prev - 1);

    const increamentCart2 = (value) => {
        setCartCount((prev) => prev + value);
    };

    // add to wishlist product
    const addToWishlist = (product) => {
        const existingWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

        // Check if the product already exists
        const isProductInWishlist = existingWishlist.some((item) => item.id === product.id);

        if (!isProductInWishlist) {
            increamentHeart();

            // Add the new product to the wishlist
            const updatedWishlist = [...existingWishlist, product];
            localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
            toast.success("Product added to wishlist!")
        } else {
            toast.error("Product is already in the wishlist!")
        }
    };

    const addToCart = (product) => {
        const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

        const isProductInCart = existingCart.some((item) => item.id === product.id);

        if (!isProductInCart) {
            increamentCart();

            // Add the new product to the cart
            const updatedCart = [...existingCart, { ...product, quantity: 1 }];

            setCart(updatedCart);

            // Store in localStorage
            localStorage.setItem('cart', JSON.stringify(updatedCart));

            toast.success("Product added to cart!");
        } else {
            toast.error("Product is already in the cart!");
        }
    };


    const [cart, setCart] = useState([]);

    return (
        <CounterContext.Provider
            value={{
                heartCount,
                cartCount,
                setCartCount,
                setHeartCount,
                increamentCart,
                decreamentCart,
                increamentHeart,
                decreamentHeart,
                increamentCart2,
                addToWishlist,
                addToCart,
                cart,
                setCart
            }}
        >
            {children}
        </CounterContext.Provider>
    );
};

export const useCounter = () => useContext(CounterContext);