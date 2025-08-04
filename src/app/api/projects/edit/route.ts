"use server";

import { auth, prisma } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const projectSchema = z.object({
  id: z.string(),
  title: z.string().min(3, "O título deve ter ao menos 3 caracteres").optional(),
  description: z
    .string()
    .min(15, "A descrição deve ter no mínimo 15 caracteres")
    .optional(),
  techs: z
    .array(z.string())
    .min(1, "Adicione pelo menos uma tecnologia.")
    .max(10, "Você pode adicionar no máximo 10 tecnologias.")
    .optional(),
  repo_url: z.url("URL inválida").optional(),
  images: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) =>
        !files || files.every((file) => file.size <= MAX_FILE_SIZE),
      `O tamanho máximo de cada imagem é de 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.",
    ),
  existingImages: z.array(z.string()).optional(),
});

async function uploadImageToCloudinary(file: File): Promise<string> {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image" },
      (error, result) => {
        if (error) {
          return reject(error);
        }
        if (!result) {
          return reject(new Error("Cloudinary upload failed"));
        }
        resolve(result.secure_url);
      },
    );
    uploadStream.end(buffer);
  });
}

function getPublicIdFromUrl(url: string): string {
  const regex = /\/v\d+\/([^\/\.]+)\..+/;
  const match = url.match(regex);
  return match ? match[1] : "";
}

export async function PUT(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const data = {
      id: formData.get("id"),
      title: formData.get("title"),
      description: formData.get("description"),
      techs: formData.getAll("techs"),
      repo_url: formData.get("repo_url"),
      images: formData.getAll("images"),
      existingImages: formData.get("existingImages")
        ? JSON.parse(formData.get("existingImages") as string)
        : undefined,
    };

    const validationResult = projectSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { errors: z.treeifyError(validationResult.error) },
        { status: 400 },
      );
    }

    const {
      id,
      images,
      existingImages,
      ...updateData
    } = validationResult.data;

    const projectToUpdate = await prisma.project.findUnique({
      where: { id },
    });

    if (!projectToUpdate || projectToUpdate.userId !== session.user.id) {
      return NextResponse.json({ error: "Projeto não encontrado ou não autorizado" }, { status: 404 });
    }

    const newImageUrls = images
      ? await Promise.all(images.map(uploadImageToCloudinary))
      : [];

    const allImageUrls = [...(existingImages || []), ...newImageUrls];

    const imagesToDelete = projectToUpdate.image_url.filter(
      (url) => !allImageUrls.includes(url),
    );

    if (imagesToDelete.length > 0) {
      const publicIdsToDelete = imagesToDelete.map(getPublicIdFromUrl).filter(Boolean);
      if (publicIdsToDelete.length > 0) {
        await cloudinary.api.delete_resources(publicIdsToDelete, { resource_type: "image" });
      }
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        ...updateData,
        image_url: allImageUrls,
      },
    });

    return NextResponse.json(project, { status: 200 });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
