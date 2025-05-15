import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(getCartFromSession());
    const TAX_RATE = 0.07; // 7% tax rate
    const TAX_RATE_STRING = (TAX_RATE * 100).toFixed(0) + "%";

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
        const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);
        const tax = calculateTax(cartTotal, TAX_RATE);
        const taxedTotal = cartTotal + tax;
        return taxedTotal;
    }

    function getCartNetTotal() {
        const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);
        return cartTotal;
    }

    function getTaxedTotal() {
        const cartTotal = cart.reduce((acc, item) => acc + item.total, 0);
        const tax = calculateTax(cartTotal, TAX_RATE);
        return tax;
    }

    function clearCart() {
        setCart([]);
    }

    return (
        <CartContext.Provider value={{ increaseQuantity, decreaseQuantity, addToCart, removeFromCart, cart, getCartTotal, getCartNetTotal, clearCart, getTaxedTotal ,TAX_RATE_STRING, TAX_RATE }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);

function getCartFromSession() {
    const cart = window.sessionStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

function calculateTax(total, taxRate) {
    if (total === 0) {
        return 0;
    }
    return total * taxRate;
}