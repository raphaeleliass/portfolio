"use client";
import { Folder, Markdown } from "@react-symbols/icons";
import { useQuery } from "@tanstack/react-query";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import AboutMe from "@/components/layouts/AboutMe";
import Project from "@/components/layouts/Project";
import Readme from "@/components/layouts/Readme";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	Editor,
	EditorContent,
	EditorHeader,
	EditorSidebar,
	EditorWrapper,
} from "@/components/ui/editor";
import { Skeleton } from "@/components/ui/skeleton";
import ThemeToggle from "@/components/ui/theme-toggle";
import { fetchAllProjects } from "@/services/fetchAllProjects";
import type { TypeProject } from "@/types";

type FilenameType = "about" | "project" | "readme";

export default function EditorLayoutProvider() {
	const [filename, setFilename] = useState<FilenameType>("project");
	const [project, setProject] = useState<TypeProject | null>(null);

	const {
		data: projects,
		isLoading,
		isSuccess,
	} = useQuery<TypeProject[]>({
		queryKey: ["projects"],
		queryFn: () => fetchAllProjects(),
		staleTime: 60 * 1000,
	});

	//biome-ignore lint: unnecessary lint
	useEffect(() => {
		function handleProject() {
			if (isSuccess && projects && projects.length > 0) {
				setProject(projects[0]);
			}
		}

		handleProject();
	}, [isLoading, projects]);

	return (
		<main className="h-dvh place-content-center justify-items-center bg-linear-150 from-sky-500 to-green-500 p-2 md:p-6">
			<Editor>
				<EditorHeader>
					<div className="flex w-full flex-row items-center justify-center gap-2">
						<span className="w-full max-w-2/3 place-content-center justify-items-center overflow-hidden text-nowrap rounded-full bg-muted-foreground/20 py-1 text-muted-foreground text-xs max-sm:justify-items-center md:max-w-1/3 md:text-sm">
							<p className="text-ellipsis">{""}</p>
						</span>
						<ThemeToggle />
					</div>
				</EditorHeader>

				<EditorWrapper>
					<EditorSidebar>
						{isLoading && (
							<Skeleton className="mt-4 h-8 w-full bg-muted-foreground/30" />
						)}
						{isSuccess && projects.length >= 1 && (
							<Accordion type="multiple">
								<AccordionItem value="projects">
									<AccordionTrigger className="mt-2 cursor-pointer py-3">
										<span className="flex flex-row items-center justify-start gap-2 px-3 text-xs [&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0">
											<Folder />
											Projetos
										</span>
									</AccordionTrigger>

									<AccordionContent className="flex flex-col justify-between rounded bg-background p-1 dark:bg-background/40">
										{projects.map((projectItem) => (
											<Button
												key={projectItem.id}
												variant={"ghost"}
												type="button"
												className="z-50 w-full cursor-pointer justify-start rounded text-muted-foreground text-xs data-[active=true]:bg-muted"
												data-active={
													filename === "project" && projectItem === project
												}
												onClick={() => {
													setProject(projectItem);
													setFilename("project");
												}}
											>
												<Markdown className="size-4" />
												{projectItem.title.replace(/[ -]/g, "")}.md
											</Button>
										))}
									</AccordionContent>
								</AccordionItem>
							</Accordion>
						)}
						<Button
							variant={"link"}
							className="mt-2 w-full cursor-pointer justify-start text-xs data-[active=true]:bg-muted-foreground/30"
							data-active={filename === "readme"}
							onClick={() => setFilename("readme")}
						>
							<Markdown className="size-5" />
							README.md
						</Button>

						<button
							type="button"
							className="absolute bottom-0 left-0 flex w-full cursor-pointer flex-row items-center justify-start gap-2 px-4 py-4 transition-colors hover:bg-muted-foreground/30 data-[active=true]:bg-muted-foreground/30"
							data-active={filename === "about"}
							onClick={() => setFilename("about")}
						>
							<span className="relative size-8">
								<Image
									src={"https://github.com/raphaeleliass.png"}
									fill
									alt="image"
									className="rounded-full"
								/>
							</span>

							<p className="text-xs">Raphael Elias</p>

							<ChevronRight className="ml-auto size-4" />
						</button>
					</EditorSidebar>

					<EditorContent>
						{filename === "project" && (
							<Project loading={isLoading} project={project} />
						)}
						{filename === "readme" && <Readme />}
						{filename === "about" && <AboutMe />}
					</EditorContent>
				</EditorWrapper>
			</Editor>
		</main>
	);
}
