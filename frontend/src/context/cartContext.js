import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartFromSession());

    useEffect(() => {
        window.sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);


    const addToCart = (newProduct) => {
        if (cart.some(product => product._id === newProduct._id)) {
            return;
        }
        setCart((prev) => [...prev, { ...newProduct, quantity: 1 }]);
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

export const useCart = () => useContext(CartContext);

function getCartFromSession() {
    const cart = window.sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}