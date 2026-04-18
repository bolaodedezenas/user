import { create } from "zustand";

export const useTicketsStore = create((set) => ({
  tickets: [],
  totalCount: 0,
  isLoading: false,
  error: null,

  setTickets: (tickets) => set({ tickets }),
  setTotalCount: (totalCount) => set({ totalCount }),
  setLoading: (status) => set({ isLoading: status }),
  setError: (error) => set({ error }),
}));
