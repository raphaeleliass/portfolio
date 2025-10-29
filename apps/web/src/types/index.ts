export interface TypeProject {
	id: number;
	title: string;
	description: string;
	status: "published" | "draft" | "archived";
	createdAt: string;
	updatedAt: string;
	imageUrl: string;
	technologies: { id: number; tech: string }[];
}
