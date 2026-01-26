import api from "./api";
export const placeOrder = () => {
  return api.post("/orders/create"); // ✅ CORRECT
};

export const getMyOrders = () => {
  return api.get("/orders/my"); // ✅ CORRECT
};

