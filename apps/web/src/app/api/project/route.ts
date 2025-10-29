import { type NextRequest, NextResponse } from "next/server";
import { fetchAllProjects } from "@/services/fetchAllProjects";
import type { TypeProject } from "@/types";

export async function POST(req: NextRequest) {
	const { projectId } = await req.json();

	if (!projectId)
		return NextResponse.json({ error: "Missing projectId" }, { status: 400 });

	const response = await fetchAllProjects();

	const data: TypeProject[] = await response.json();

	const project = data.find((project) => project.id === Number(projectId));

	if (!project)
		return NextResponse.json({ error: "Project not found" }, { status: 404 });

	return NextResponse.json(project);
}
