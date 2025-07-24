import { prisma } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const providedApiKey = req.headers.get("x-internal-api-key");
  const expectedApiKey = process.env.INTERNAL_API_KEY;

  if (!providedApiKey || providedApiKey !== expectedApiKey) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  const posts = await prisma.project.findMany({
    where: {
      userId: "sMu5JBtWumyy4kT8rk2neFElpjMmyIFz",
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  console.log(posts);

  return NextResponse.json(posts);
}
