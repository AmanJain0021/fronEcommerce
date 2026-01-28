import api from "./api";

export const getCart = () => {
  return api.get("/api/cart");
};

export const removeFromCart = (productId) => {
  return api.delete("/api/cart/remove", {
    data: { productId },
  });
};

export const addToCart = (productId, quantity = 1) => {
  return api.post("/api/cart/add", {
    productId,
    quantity,
  });
};
export const decreaseQuantity = (productId) => {
  return api.patch("/api/cart/decrease", { productId });
};

export const increaseQuantity = (productId) => {
  return api.post("/api/cart/add", {
    productId,
    quantity: 1,
  });
};
