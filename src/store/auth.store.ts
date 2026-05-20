import { create } from "zustand";

type UIState = {
  authError: string | null;
  setAuthError: (msg: string | null) => void;
};

export const useUIStore = create<UIState>(set => ({
  authError: null,
  setAuthError: msg => set({ authError: msg }),
}));
