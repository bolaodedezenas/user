import { create } from "zustand";

export const useCheckoutStore = create((set) => ({
  open: false,

  openCheckout: () => set({ open: true }),
  closeCheckout: () => set({ open: false }),
}));
