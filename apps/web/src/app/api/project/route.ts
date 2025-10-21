import { type NextRequest, NextResponse } from "next/server";
import { fetchAllProjects } from "@/services/fetchAllProjects";
import type { ProjectTypes } from "@/types";

export async function POST(req: NextRequest) {
	const { projectId } = await req.json();

	if (!projectId)
		return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

	const response: ProjectTypes[] = await fetchAllProjects();

	const project = response.find((project) => project.id === Number(projectId));

	if (!project)
		return NextResponse.json({ error: "Project not found" }, { status: 404 });

	return NextResponse.json(project);
}
