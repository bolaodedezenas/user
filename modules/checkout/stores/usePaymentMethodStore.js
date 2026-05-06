import { create } from "zustand";

export const usePaymentMethodStore = create((set) => ({
  selectedPaymentMethod: null,
  setPaymentMethod: (method) => set({ selectedPaymentMethod: method }),

  clearPaymentMethod: () => set({ selectedPaymentMethod: null }),
}));
