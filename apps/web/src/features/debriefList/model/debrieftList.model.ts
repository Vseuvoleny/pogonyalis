import { create } from "zustand";

export const useDebriefModal = create((set) => ({
  isOpen: false,
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setType: (type: "edit" | "delete") => set({ type }),
  type: "edit",
}));
