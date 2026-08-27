import { create } from "zustand";

type ModalType = "edit" | "delete";

type DebriefModalState = {
  isOpen: boolean;
  type: ModalType;
  openModal: () => void;
  closeModal: () => void;
  setType: (type: ModalType) => void;
};

export const useDebriefModal = create<DebriefModalState>()((set) => ({
  isOpen: false,
  type: "edit",
  openModal: () => set({ isOpen: true }),
  closeModal: () => set({ isOpen: false }),
  setType: (type) => set({ type }),
}));
