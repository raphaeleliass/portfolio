import { auth, prisma } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 },
    );
  }

  const formData = await req.formData();
  const images = formData.getAll("images") as File[];
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const repo_url = formData.get("repo_url") as string;
  const techs = formData.getAll("techs") as string[];

  const imageUrls: string[] = [];

  for (const image of images) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({}, (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result);
        })
        .end(buffer);
    });
    imageUrls.push((result as { secure_url: string }).secure_url);
  }

  const project = await prisma.project.create({
    data: {
      image_url: imageUrls,
      title,
      description,
      techs,
      repo_url,
      userId: session.user.id,
    },
    omit: {
      userId: true,
    },
  });

  return NextResponse.json(project);
}
