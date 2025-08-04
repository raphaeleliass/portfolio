"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { appBaseUrl } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { ReactNode } from "react";
import { useForm, useFormState } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { ImageUploader } from "./form/image-uploader";
import { ProjectFormInput } from "./form/project-form-input";
import { TechInput } from "./form/tech-input";

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
  published: z.boolean(),
});

export type FormTypes = z.infer<typeof formSchema>;

export default function NewProject({ children }: { children: ReactNode }) {
  const form = useForm<FormTypes>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      images: [],
      title: "",
      description: "",
      repo_url: "",
      techs: [],
      published: false,
    },
  });

  const { isSubmitting } = useFormState({ control: form.control });

  async function submitForm(data: FormTypes) {
    const formData = new FormData();
    data.images.forEach((image) => {
      formData.append("images", image);
    });
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("repo_url", data.repo_url);
    data.techs.forEach((tech) => {
      formData.append("techs", tech);
    });
    formData.append("published", String(data.published));

    try {
      await fetch(`${appBaseUrl}/api/projects/create`, {
        method: "POST",
        body: formData,
      });
      form.reset();
      toast.success("Projeto adicionado com sucesso");
    } catch (err) {
      console.log("Erro:", err);
      toast.error("Erro ao adicionar projeto");
    }
  }

  return (
    <Form {...form}>
      <form
        className="relative mt-4 flex flex-col gap-5"
        onSubmit={form.handleSubmit(submitForm)}
      >
        <fieldset
          disabled={isSubmitting}
          className="flex flex-col gap-5"
        >
          <FormField
            name="images"
            control={form.control}
            render={() => <ImageUploader form={form} />}
          />

          <FormField
            name="title"
            control={form.control}
            render={({ field }) => (
              <ProjectFormInput
                disabled={isSubmitting}
                field={field}
                label="Título:"
                placeholder="Insira o título do projeto"
              />
            )}
          />

          <FormField
            name="description"
            control={form.control}
            render={({ field }) => (
              <ProjectFormInput
                disabled={isSubmitting}
                field={field}
                label="Descrição:"
                placeholder="Insira a descrição do projeto"
                type="textarea"
              />
            )}
          />

          <FormField
            name="repo_url"
            control={form.control}
            render={({ field }) => (
              <ProjectFormInput
                disabled={isSubmitting}
                field={field}
                label="Link do repositório:"
                placeholder="Insira o repositório do projeto"
              />
            )}
          />

          <FormField
            name="techs"
            control={form.control}
            render={({ field }) => (
              <TechInput
                disabled={isSubmitting}
                {...field}
              />
            )}
          />

          <FormField
            control={form.control}
            name="published"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-y-0 space-x-3 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel>Projeto privado?</FormLabel>
                </div>
              </FormItem>
            )}
          />
        </fieldset>

        <div className="flex flex-row items-center justify-end">
          {children}
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Adicionar"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
