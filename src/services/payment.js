import api from "./api";

export const mockPay = (orderId) => {
  return api.post("/payment/mock", { orderId });
};
