"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ProjectTypes } from "@/types";
import clsx from "clsx";
import Image from "next/image";
import { HTMLAttributes, Ref, useState } from "react";

interface ProjectsProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  ref?: Ref<HTMLDivElement>;
  projects: ProjectTypes[];
}

type StateProjectTypes = {
  id: string;
  title: string;
  description: string;
  techs: string[];
  url: null | string;
  repo_url: string;
  image_url: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

export default function Projects({
  className,
  ref,
  projects,
  ...props
}: ProjectsProps) {
  const [currentProject, setCurrentProject] = useState<StateProjectTypes>({
    id: projects[0].id,
    title: projects[0].title,
    description: projects[0].description,
    repo_url: projects[0].repo_url,
    image_url: projects[0].image_url,
    url: projects[0].url,
    techs: projects[0].techs,
    published: projects[0].published,
    createdAt: projects[0].createdAt,
    updatedAt: projects[0].updatedAt,
  });

  return (
    <article
      className={clsx(
        "h-full md:w-4/6 md:overflow-y-scroll md:pl-4",
        className,
      )}
      ref={ref}
      {...props}
    >
      <div className="mt-4 w-full">
        <h3 className="text-lg">Selecione um projeto:</h3>
        <div className="grid grid-cols-3 grid-rows-1 justify-items-start">
          {projects.map((project) => {
            return (
              <Button
                className="col-span-auto row-span-auto px-0"
                variant={"link"}
                key={project.id}
                onClick={() => {
                  setCurrentProject(project);
                }}
              >
                {project.title}
              </Button>
            );
          })}
        </div>
      </div>

      <Separator className="mt-4" />

      <div className="mt-6 flex flex-col md:flex-row">
        <div className="relative aspect-square overflow-hidden rounded md:w-1/2">
          <Image
            src={currentProject.image_url[0]}
            alt={`imagem do projeto ${currentProject.title}`}
            fill
            priority
            className="object-cover object-center"
          />
        </div>

        <div className="max-sm:mt-6 md:w-1/2 md:pl-3">
          <h2 className="text-3xl font-bold">{currentProject.title}</h2>

          <div className="mt-2 max-sm:mb-12">
            <p className="text-pretty text-sm">{currentProject.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
