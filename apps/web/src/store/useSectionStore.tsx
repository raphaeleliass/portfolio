import { create } from "zustand";

interface SectionStoreInterface {
	section: string;
	setSection: (section: "Home" | "Sobre") => void;
}

export const useSectionStore = create<SectionStoreInterface>((set) => ({
	section: "portfolio",
	setSection: (section) => set(() => ({ section })),
}));
