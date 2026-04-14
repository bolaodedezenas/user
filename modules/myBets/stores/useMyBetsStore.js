import { create } from "zustand";

export const useMyBetsStore = create((set) => ({
  myTickets: [],
  isLoading: false,
  error: null,

  setMyTickets: (tickets) =>
    set({ myTickets: tickets, isLoading: false, error: null }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (err) => set({ error: err, isLoading: false }),
}));
