import { appApiKey, appUserId } from "@/constants";
import { prisma } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const providedApiKey = req.headers.get("x-internal-api-key");

  if (!providedApiKey || providedApiKey !== appApiKey) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const posts = await prisma.project.findMany({
    where: {
      userId: appUserId,
    },
    omit: { userId: true },
    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json(posts);
}
