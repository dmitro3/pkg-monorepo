import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const useSidebarStore = create<SidebarState>()((set) => ({
  isOpen:
    typeof window !== "undefined" && window.innerWidth > 1024 ? true : false,
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export { useSidebarStore };
