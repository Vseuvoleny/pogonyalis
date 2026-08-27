import { DebriefDto } from "@/entities";
import { create } from "zustand";

export const useDebriefData = create<{
  debrief: null | DebriefDto;
  debriefId: string | null;
  setDebrief: (payload: DebriefDto) => unknown;
  clearDebrief: () => unknown;
}>((set) => ({
  debrief: null,
  debriefId: null,
  setDebrief: (payload) => set({ debrief: payload, debriefId: payload.id }),
  clearDebrief: () => set({ debrief: null, debriefId: null }),
}));
