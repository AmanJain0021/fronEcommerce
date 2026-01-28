import api from "./api";
export const placeOrder = () => {
  return api.post("/api/orders/create"); // ✅ CORRECT
};

export const getMyOrders = () => {
  return api.get("/api/orders/my"); // ✅ CORRECT
};

