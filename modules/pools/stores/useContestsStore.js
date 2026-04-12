import { create } from "zustand";

export const useContestsStore = create((set) => ({
  contests: [],
  isLoading: false,
  error: null,

  setContests: (contests) => set({ contests, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearContests: () => set({ contests: [], isLoading: false, error: null }),
}));