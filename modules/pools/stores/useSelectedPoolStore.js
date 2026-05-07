import { create } from "zustand";

export const useSelectedPoolStore = create((set) => ({
  selectedPool: null,
  setSelectedPool: (pool) =>
    set({
      selectedPool: pool,
    }),
  clearSelectedPool: () =>
    set({
      selectedPool: null,
    }),
}));
