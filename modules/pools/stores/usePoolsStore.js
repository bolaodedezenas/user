import { create } from "zustand";

export const usePoolsStore = create((set) => ({
  pools: [],
  isLoading: true,
  error: null,

  setPools: (pools) => set({ pools, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
}));
