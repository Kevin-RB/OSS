import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const AuthProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setUser((prev) => [...prev, { ...product, quantity: 1 }]);
    };

    const removeFromCart = (product) => {
        cart.splice(cart.indexOf(product), 1);
    };

    const increaseQuantity = (product) => {
        const newCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(newCart);
    };

    const decreaseQuantity = (product) => {
        const newCart = cart.map((item) =>
            item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        );
        setCart(newCart);
    }

    return (
        <CartContext.Provider value={{ increaseQuantity, decreaseQuantity, addToCart, removeFromCart, cart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCaart = () => useContext(CartContext);
