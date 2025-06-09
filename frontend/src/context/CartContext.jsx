import React, { createContext, useContext, useState, useEffect } from "react";
import {
  getCartItems,
  addToCart as addToCartAPI,
  removeFromCart as removeFromCartAPI,
  updateCartItemQuantity as updateCartItemQuantityAPI,
} from "../services/cart";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  // Load cart on mount
  useEffect(() => {
    refreshCart();
  }, []);

  const refreshCart = async () => {
    try {
      const data = await getCartItems();
      setCartItems(data);
    } catch (error) {
      console.error("Failed to fetch cart items", error);
    }
  };

  // Add to cart calls backend then refreshes
  const addToCart = async (product) => {
    try {
      await addToCartAPI(product._id);
      await refreshCart();
    } catch (error) {
      throw error;
    }
  };

  // Remove from cart calls backend then refreshes
  const removeFromCart = async (cartItemId) => {
    try {
      await removeFromCartAPI(cartItemId);
      await refreshCart();
    } catch (error) {
      throw error;
    }
  };

  // Update quantity calls backend then refreshes
  const updateQuantity = async (cartItemId, action) => {
    try {
      await updateCartItemQuantityAPI(cartItemId, action);
      await refreshCart();
    } catch (error) {
      throw error;
    }
  };

  // Calculate total price safely
  const getTotal = () => {
    return cartItems.reduce((sum, item) => {
      if (!item.product) return sum; // skip items with null product
      return sum + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        getTotal,
        refreshCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
