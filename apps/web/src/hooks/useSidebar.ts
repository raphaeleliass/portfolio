import { create } from "zustand";

interface HookInterface {
	isSidebarOpen: boolean;
	setIsSidebarOpen: (state: boolean) => void;
	toggleSidebar: () => void;
}

export const useSidebar = create<HookInterface>((set) => ({
	isSidebarOpen: false,
	setIsSidebarOpen: (newState: boolean) => set({ isSidebarOpen: newState }),
	toggleSidebar: () =>
		set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
}));
