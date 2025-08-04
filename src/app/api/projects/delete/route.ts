import { prisma } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  const { ids } = await req.json();

  if (!ids || !Array.isArray(ids) || ids.length === 0)
    return NextResponse.json(
      { error: "Cannot find project ids from request" },
      { status: 404 },
    );

  try {
    const projects = await prisma.project.deleteMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Unable to delete projects",
        cause: error,
      },
      { status: 500 },
    );
  }
}
