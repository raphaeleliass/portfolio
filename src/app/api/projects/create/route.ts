import { auth, prisma } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

interface Payload {
  images: string[];
  title: string;
  description: string;
  techs: string[];
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const { images, title, description, techs }: Payload = await req.json();

  if (!session?.user.id) {
    throw new Error("User is not authenticated");
  }

  const project = await prisma.project.create({
    data: {
      image_url: images,
      title,
      description,
      techs,
      repo_url: "",
      userId: session.user.id,
    },
  });

  return NextResponse.json(project);
}
