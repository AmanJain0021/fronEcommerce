import api from "./api";

export const getCart = () => {
  return api.get("/cart");
};

export const removeFromCart = (productId) => {
  return api.delete("/remove", {
    data: { productId },
  });
};

export const addToCart = (productId, quantity = 1) => {
  return api.post("/add", {
    productId,
    quantity,
  });
};
export const decreaseQuantity = (productId) => {
  return api.patch("/decrease", { productId });
};

export const increaseQuantity = (productId) => {
  return api.post("/add", {
    productId,
    quantity: 1,
  });
};
