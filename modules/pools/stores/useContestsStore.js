import { create } from "zustand";

export const useContestsStore = create((set) => ({
  contests: [],
  isLoading: false,
  error: null,

  setContests: (contests) => set({ contests, isLoading: false, error: null }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error, isLoading: false }),
  clearContests: () => set({ contests: [], isLoading: false, error: null }),

  // Adiciona um concurso à lista se ele não existir (usado na busca por número)
  addContestToList: (contest) => set((state) => {
    const exists = state.contests.find(c => c.id === contest.id);
    if (exists) return state;
    return {
      contests: [contest, ...state.contests]
    };
  })
}));