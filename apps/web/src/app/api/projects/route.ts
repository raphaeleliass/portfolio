import { NextResponse } from "next/server";
import { projectsData } from "@/data";

export function GET() {
	//TODO : add fetch to api and implement revalidate
	return NextResponse.json(projectsData);
}
