import { DebriefDto } from "@/entities";
import { create } from "zustand";

type DebriefDataState = {
  debrief: DebriefDto | null;
  debriefId: string | null;
  setDebrief: (payload: DebriefDto) => void;
  clearDebrief: () => void;
};

export const useDebriefData = create<DebriefDataState>()((set) => ({
  debrief: null,
  debriefId: null,
  setDebrief: (payload) => set({ debrief: payload, debriefId: payload.id }),
  clearDebrief: () => set({ debrief: null, debriefId: null }),
}));
