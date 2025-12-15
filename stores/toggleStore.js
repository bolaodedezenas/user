import { create } from "zustand";

export const useToggleStore = create((set) => ({
  toggle: true,
  setToggle: (value) => set({ toggle: value }),
}));
