import { create } from "zustand";
import type { ProjectTypes } from "@/types";

interface StoreInterface {
	project: ProjectTypes | null;
	projects: ProjectTypes[];
	setProject: (project: ProjectTypes) => void;
	setProjects: (projects: ProjectTypes[]) => void;
	addProject: (project: ProjectTypes) => void;
	updateProject: (project: ProjectTypes) => void;
	deleteProject: (
		project: Pick<ProjectTypes, "id"> & Partial<Omit<ProjectTypes, "id">>,
	) => void;
}

export const useProjectStore = create<StoreInterface>((set) => ({
	project: null,
	projects: [],
	setProject: (project) => set({ project }),
	setProjects: (projects) => set({ projects }),
	addProject: (project) =>
		set((state) => ({ projects: [...state.projects, project] })),
	updateProject: (project) =>
		set((state) => ({
			projects: state.projects.map((updatedProject) =>
				project.id === updatedProject.id
					? { updatedProject, ...project }
					: project,
			),
		})),
	deleteProject: (project) =>
		set((state) => ({
			projects: state.projects.filter(
				(deletedProject) => deletedProject.id === project.id,
			),
		})),
}));
