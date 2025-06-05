// import api from "../utils/api";

// export const addToCart = async (productId) => {
//   const res = await api.post("/cart/add", { productId });
//   return res.data;
// };


// export const getCartItems = async () => {
//   const res = await api.get("/cart");
//   return res.data;
// };

// export const removeFromCart = async (cartItemId) => {
//   const res = await api.delete(`/cart/remove/${cartItemId}`);
//   return res.data;
// };







import api from "../utils/api";

export const addToCart = async (productId) => {
  const res = await api.post("/cart/add", { productId });
  return res.data;
};

export const getCartItems = async () => {
  const res = await api.get("/cart");
  return res.data;
};

export const removeFromCart = async (cartItemId) => {
  const res = await api.delete(`/cart/remove/${cartItemId}`);
  return res.data;
};

export const updateCartItemQuantity = async (cartItemId, action) => {
  const res = await api.patch(`/cart/update/${cartItemId}`, { action });
  return res.data;
};
