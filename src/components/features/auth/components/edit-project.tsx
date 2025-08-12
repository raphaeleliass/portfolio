'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { ReactNode, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { ProjectTypes } from '@/types';
import { ImageUploader } from './form/image-uploader';
import { ProjectFormInput } from './form/project-form-input';
import { TechInput } from './form/tech-input';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const projectSchema = z.object({
  title: z.string().min(3, 'O título deve ter ao menos 3 caracteres'),
  description: z
    .string()
    .min(15, 'A descrição deve ter no mínimo 15 caracteres'),
  techs: z
    .array(z.string())
    .min(1, 'Adicione pelo menos uma tecnologia.')
    .max(10, 'Você pode adicionar no máximo 10 tecnologias.'),
  repo_url: z.url('URL inválida'),
  images: z
    .array(z.instanceof(File))
    .optional()
    .refine(
      (files) => !files || files.every((file) => file.size <= MAX_FILE_SIZE),
      `O tamanho máximo de cada imagem é de 5MB.`,
    )
    .refine(
      (files) =>
        !files ||
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      'Apenas os formatos .jpg, .jpeg, .png e .webp são aceitos.',
    ),
  existingImages: z.array(z.string()).optional(),
});

export type ProjectFormValues = z.infer<typeof projectSchema>;

interface EditProjectProps {
  children: ReactNode;
  project: ProjectTypes;
}

export default function EditProject({ children, project }: EditProjectProps) {
  const [existingImages, setExistingImages] = useState<string[]>(
    project.image_url as unknown as string[],
  );
  const router = useRouter();

  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: project.title,
      description: project.description,
      repo_url: project.repo_url,
      techs: project.techs,
      existingImages: project.image_url as unknown as string[],
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: ProjectFormValues) => {
    try {
      const formData = new FormData();
      formData.append('id', project.id);
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('repo_url', data.repo_url);
      data.techs.forEach((tech) => formData.append('techs', tech));
      if (data.images) {
        data.images.forEach((image) => formData.append('images', image));
      }
      formData.append('existingImages', JSON.stringify(existingImages));

      const response = await fetch('/api/projects/edit', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        toast.success('Projeto atualizado com sucesso!');
        router.refresh();
      } else {
        toast.error('Falha ao atualizar o projeto.');
      }
    } catch {
      toast.error('Ocorreu um erro ao enviar o formulário.');
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <ProjectFormInput
          name="title"
          label="Título"
          placeholder="Digite o título do projeto"
          control={form.control}
        />
        <ProjectFormInput
          name="description"
          label="Descrição"
          placeholder="Digite a descrição do projeto"
          control={form.control}
          isTextArea
        />
        <TechInput disabled={isSubmitting} />
        <ProjectFormInput
          name="repo_url"
          label="URL do Repositório"
          placeholder="https://github.com/exemplo/projeto"
          control={form.control}
        />
        <ImageUploader
          name="images"
          control={form.control}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />
        <div className="flex justify-end gap-2">
          {children}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </form>
    </Form>
  );
}