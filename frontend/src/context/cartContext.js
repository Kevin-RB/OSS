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
        setCart((prev) => [...prev, { ...newProduct, quantity: 1, total: newProduct.price }]);
    };

    const removeFromCart = (product) => {
        const filteredCart = cart.filter((item) => item._id !== product._id);
        setCart(filteredCart);
    };

    const increaseQuantity = (product) => {
        const newCart = cart.map((item) => {
            if (item._id === product._id) {
                const quantity = item.quantity + 1;
                const total = calculateTotalForProduct(item.price, quantity);
                return { ...item, quantity: quantity, total: total };
            }
            return item;
        }
        );
        setCart(newCart);
    };

    const decreaseQuantity = (product) => {
        const newCart = cart.map((item) => {
            if (item.quantity === 1) {
                return item
            }
            if (item._id === product._id) {
                const quantity = item.quantity - 1;
                const total = calculateTotalForProduct(item.price, quantity);
                return { ...item, quantity: quantity, total: total };
            }
            return item;
        });
        setCart(newCart);
    }

    function calculateTotalForProduct(price, quantity) {
        const total = price * quantity;
        return total;
    }

    function getCartTotal() {
        return cart.reduce((acc, item) => acc + item.total, 0);
    }

    function clearCart() {
        setCart([]);
    }   

    return (
        <CartContext.Provider value={{ increaseQuantity, decreaseQuantity, addToCart, removeFromCart, cart, getCartTotal, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

function getCartFromSession() {
    const cart = window.sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}