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
  title: z.string().min(3, "O título deve ter ao menos 3 caracteres"),
  description: z
    .string()
    .min(15, "A descrição deve ter no mínimo 15 caracteres"),
  techs: z
    .array(z.string())
    .min(1, "Adicione pelo menos uma tecnologia.")
    .max(10, "Você pode adicionar no máximo 10 tecnologias."),
  repo_url: z.url("URL inválida"),
  images: z
    .array(z.instanceof(File))
    .min(1, "Envie pelo menos uma imagem.")
    .refine(
      (files) => files.every((file) => file.size <= MAX_FILE_SIZE),
      `O tamanho máximo de cada imagem é de 5MB.`,
    )
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.",
    ),
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

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user.id) {
      return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const formData = await req.formData();
    const data = {
      title: formData.get("title"),
      description: formData.get("description"),
      techs: formData.getAll("techs"),
      repo_url: formData.get("repo_url"),
      images: formData.getAll("images"),
    };

    const validationResult = projectSchema.safeParse(data);

    if (!validationResult.success) {
      return NextResponse.json(
        { errors: z.treeifyError(validationResult.error) },
        { status: 400 },
      );
    }

    const { images, title, description, techs, repo_url } =
      validationResult.data;

    const imageUrls = await Promise.all(images.map(uploadImageToCloudinary));

    const project = await prisma.project.create({
      data: {
        title,
        description,
        techs,
        image_url: imageUrls,
        repo_url,
        userId: session.user.id,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
