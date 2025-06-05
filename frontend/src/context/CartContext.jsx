// import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exist = prev.find((item) => item._id === product._id);
//       if (exist) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });
//     toast.success(`${product.name} added to cart!`);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== productId));
//     toast.info("Item removed from cart");
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// // **Make sure to export this hook as named export**
// export function useCart() {
//   return useContext(CartContext);
// }











// import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exist = prev.find((item) => item._id === product._id);
//       if (exist) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });

//     toast.success(`${product.name} added to cart!`);
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== productId));
//     toast.info("Item removed from cart");
//   };

//   const getTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, getTotal }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }





// import React, { createContext, useContext, useState } from "react";
// import { toast } from "react-toastify";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   const addToCart = (product) => {
//     setCartItems((prev) => {
//       const exist = prev.find((item) => item._id === product._id);
//       if (exist) {
//         return prev.map((item) =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prev, { ...product, quantity: 1 }];
//       }
//     });

//     toast.success(`${product.name} added to cart!`, {
//       toastId: `add-to-cart-${product._id}`,
//     });
//   };

//   const removeFromCart = (productId) => {
//     setCartItems((prev) => prev.filter((item) => item._id !== productId));

//     toast.info("Item removed from cart", {
//       toastId: `remove-from-cart-${productId}`,
//     });
//   };

//   const getTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, getTotal }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }



























// import React, { createContext, useContext, useState, useEffect } from "react";
// import { getCartItems, addToCart as addToCartAPI, removeFromCart as removeFromCartAPI } from "../services/cart";

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);

//   // Load cart on mount
//   useEffect(() => {
//     refreshCart();
//   }, []);

//   const refreshCart = async () => {
//     try {
//       const data = await getCartItems();
//       setCartItems(data);
//     } catch (error) {
//       console.error("Failed to fetch cart items", error);
//     }
//   };

//   // Add to cart calls backend then refreshes
//   const addToCart = async (product) => {
//     try {
//       await addToCartAPI(product._id);
//       await refreshCart();
//     } catch (error) {
//       throw error;
//     }
//   };

//   // Remove from cart calls backend then refreshes
//   const removeFromCart = async (cartItemId) => {
//     try {
//       await removeFromCartAPI(cartItemId);
//       await refreshCart();
//     } catch (error) {
//       throw error;
//     }
//   };

//   const getTotal = () => {
//     return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
//   };

//   return (
//     <CartContext.Provider
//       value={{ cartItems, addToCart, removeFromCart, getTotal }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }











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

  // NEW: Update quantity calls backend then refreshes
  const updateQuantity = async (cartItemId, action) => {
    try {
      await updateCartItemQuantityAPI(cartItemId, action);
      await refreshCart();
    } catch (error) {
      throw error;
    }
  };

  // Calculate total price
  const getTotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
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
