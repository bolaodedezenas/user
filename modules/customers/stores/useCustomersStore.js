import { create } from "zustand";

export const useCustomersStore = create((set) => ({
  customers: [],
  totalCount: 0,
  setCustomers: (customers) => set({ customers }),
  setTotalCount: (totalCount) => set({ totalCount }),
}));
