"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadCloud, X } from "lucide-react";
import Image from "next/image";
import {
  KeyboardEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const fileSchema = z
  .any()
  .refine((file) => file?.name, "A imagem é obrigatória.")
  .refine(
    (file) => file?.size <= MAX_FILE_SIZE,
    `O tamanho máximo da imagem é de 5MB.`,
  )
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
    "Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.",
  );

const formSchema = z.object({
  images: z.array(fileSchema).min(1, "Envie pelo menos uma imagem."),
  title: z.string().min(3, "O título deve ter ao menos 3 caracteres").trim(),
  description: z
    .string()
    .min(15, "A descrição deve ter no mínimo 15 caracteres")
    .trim(),
  repo_url: z.url("URL inválida"),
  techs: z
    .array(z.string())
    .min(1, "Adicione pelo menos uma tecnologia.")
    .max(10, "Você pode adicionar no máximo 10 tecnologias."),
});

type FormTypes = z.infer<typeof formSchema>;

export default function NewProject({ children }: { children: ReactNode }) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const techInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      techs: [],
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const currentFiles = form.getValues("images");
      const newFiles = [...currentFiles, ...acceptedFiles];
      form.setValue("images", newFiles, { shouldValidate: true });

      const newPreviews = acceptedFiles.map((file) =>
        URL.createObjectURL(file),
      );
      setImagePreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
    },
    [form],
  );

  const removeImage = (indexToRemove: number) => {
    URL.revokeObjectURL(imagePreviews[indexToRemove]);

    setImagePreviews((prevPreviews) =>
      prevPreviews.filter((_, index) => index !== indexToRemove),
    );

    const currentFiles = form.getValues("images");
    const newFiles = currentFiles.filter((_, index) => index !== indexToRemove);
    form.setValue("images", newFiles, { shouldValidate: true });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/webp": [".webp"],
    },
    multiple: true,
  });

  const handleTechKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const techValue = e.currentTarget.value.trim();
      if (techValue) {
        const currentTechs = form.getValues("techs");
        if (!currentTechs.includes(techValue)) {
          form.setValue("techs", [...currentTechs, techValue], {
            shouldValidate: true,
          });
          e.currentTarget.value = "";
        }
      }
    }
  };

  const removeTech = (techToRemove: string) => {
    const currentTechs = form.getValues("techs");
    form.setValue(
      "techs",
      currentTechs.filter((tech) => tech !== techToRemove),
      { shouldValidate: true },
    );
  };

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  async function submitForm({
    images,
    title,
    description,
    techs,
    repo_url,
  }: FormTypes) {
    const formData = new FormData();
    images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("title", title);
    formData.append("description", description);
    formData.append("repo_url", repo_url);
    techs.forEach((tech) => {
      formData.append("techs", tech);
    });

    try {
      await fetch("http://localhost:3000/api/projects/create", {
        method: "POST",
        body: formData,
      });

      console.log(images, title, description, techs);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form {...form}>
      <form
        className="mt-4 flex flex-col gap-5"
        onSubmit={form.handleSubmit(submitForm)}
      >
        <FormField
          name="images"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Capa do projeto :
              </FormLabel>
              <FormControl>
                <div
                  {...getRootProps()}
                  className={`flex h-40 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition-colors hover:border-none ${isDragActive ? "border-primary bg-primary-foreground" : "border-input bg-background hover:bg-accent"}`}
                >
                  <input {...getInputProps()} />
                  <div className="text-muted-foreground flex flex-col items-center justify-center text-center">
                    <UploadCloud className="size-8" />
                    {isDragActive ? (
                      <p>Solte as imagens aqui...</p>
                    ) : (
                      <p>
                        Arraste e solte as imagens aqui, ou clique para
                        selecionar
                      </p>
                    )}
                    <span className="mt-2 text-xs">
                      PNG, JPG, WEBP de até 5MB
                    </span>
                  </div>
                </div>
              </FormControl>
              <FormMessage />
              {imagePreviews.length > 0 && (
                <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
                  {imagePreviews.map((src, index) => (
                    <div
                      key={index}
                      className="relative aspect-square"
                    >
                      <Image
                        src={src}
                        alt={`Preview da imagem ${index + 1}`}
                        fill
                        className="rounded-md object-cover"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-6 w-6 rounded-full"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">Título:</FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o título do projeto"
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Descrição:
              </FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-32"
                  placeholder="Insira a descrição do projeto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="repo_url"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Link do repositório:
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="Insira o repositório do projeto"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="techs"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground">
                Techs usadas:
              </FormLabel>
              <FormControl>
                <div
                  className={`flex flex-col ${field.value.length > 0 && "gap-4"}`}
                >
                  <div
                    className="flex flex-row flex-wrap gap-1"
                    onClick={() => techInputRef.current?.focus()}
                  >
                    {field.value.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                      >
                        {tech}
                        <button
                          type="button"
                          className="ring-offset-background focus:ring-ring ml-2 rounded-full outline-none focus:ring-2 focus:ring-offset-2"
                          onClick={() => removeTech(tech)}
                        >
                          <X className="text-muted-foreground hover:text-foreground h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                  <Input
                    ref={techInputRef}
                    onKeyDown={handleTechKeyDown}
                    placeholder="Adicione uma tech e tecle espaço"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="ml-auto flex items-center gap-4">
          {children}
          <Button type="submit">Salvar Projeto</Button>
        </div>
      </form>
    </Form>
  );
}
