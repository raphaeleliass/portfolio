import { appApiKey, appUserId } from "@/constants";
import { prisma } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const providedApiKey = req.headers.get("x-internal-api-key");
  const expectedApiKey = appApiKey;

  if (!providedApiKey || providedApiKey !== expectedApiKey) {
    return NextResponse.json({expectedApiKey, providedApiKey})
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
