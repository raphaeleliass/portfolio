"use client";
import { Folder, Markdown } from "@react-symbols/icons";
import Image from "next/image";
import { useEffect } from "react";
import {
	Editor,
	EditorContent,
	EditorFloatingMenu,
	EditorHeader,
	EditorSidebar,
	EditorWrapper,
} from "@/components/layout/editor";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { projectsData } from "@/data";
import { useProjectStore } from "@/store/useProjectsStore";
import { useSectionStore } from "@/store/useSectionStore";

export default function Home() {
	const { projects, setProjects, setProject, project } = useProjectStore();
	const { section, setSection } = useSectionStore();

	//biome-ignore lint: not necessary add dependencies at array
	useEffect(() => {
		setProjects(JSON.parse(JSON.stringify(projectsData)));
		setProject(JSON.parse(JSON.stringify(projectsData[0])));
	}, []);

	function formatDate(date: string) {
		const newDate = new Date(date).toLocaleString("pt-br", {
			month: "long",
			year: "numeric",
		});

		return newDate;
	}

	return (
		<main className="h-dvh place-content-center justify-items-center bg-gradient-to-tr from-green-500 via-purple-500 to-indigo-500 p-2 md:p-6">
			<Editor>
				<EditorHeader>
					<DropdownMenu>
						<DropdownMenuTrigger className="mx-auto w-1/3 rounded-full bg-muted-foreground/40 py-1">
							<p className="text-muted-foreground/90 text-sm">{section}</p>
						</DropdownMenuTrigger>

						<DropdownMenuContent align="center" className="w-56">
							<DropdownMenuGroup>
								<DropdownMenuItem onClick={() => setSection("Home")}>
									Home
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setSection("Sobre")}>
									Sobre
								</DropdownMenuItem>
							</DropdownMenuGroup>
						</DropdownMenuContent>
					</DropdownMenu>
				</EditorHeader>

				<EditorWrapper className="">
					<EditorSidebar className="">
						<Accordion type="multiple">
							<AccordionItem value="projects">
								<AccordionTrigger className="mt-4 flex cursor-pointer flex-row items-center py-0">
									<span className="flex flex-row items-center gap-2 py-2 text-sm">
										<Folder className="size-5" />
										Projetos
									</span>
								</AccordionTrigger>

								<AccordionContent className="flex flex-col justify-between bg-muted-foreground/5 pb-0">
									{projects.map((i) => (
										<Button
											key={i.id}
											variant={"ghost"}
											type="button"
											className="z-50 w-full cursor-pointer justify-start rounded-none text-muted-foreground text-xs data-[active=true]:bg-muted-foreground/20"
											data-active={project?.title === i.title}
											onClick={() => setProject(i)}
										>
											<Markdown className="size-5" />
											{i.title.replace(/[ -]/g, "")}.md
										</Button>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</EditorSidebar>

					<EditorContent>
						<EditorFloatingMenu />
						{project && (
							<div className="mx-auto flex w-full flex-col gap-12 max-sm:w-xs md:w-2xl">
								<h2 className="font-bold text-4xl max-sm:text-2xl">
									<span className="text-muted-foreground/50">#</span>{" "}
									{project?.title}
								</h2>
								<p className="text-balance text-muted-foreground max-sm:text-sm">
									{project?.description}
								</p>
								<div className="flex flex-col items-start justify-start">
									<Image
										src={project.imageUrl}
										alt={`${project.title} image`}
										width={1000}
										height={1000}
										quality={100}
										priority
										className="aspect-video h-auto w-full"
									/>
									<p className="mt-2 text-muted-foreground text-xs">
										{" "}
										Projeto criado em {formatDate(project.createdAt)}
									</p>
								</div>

								<div className="flex w-fit flex-col gap-4 text-sm">
									<a
										href={project.imageUrl}
										target="_blank"
										rel="noreferrer noopener"
									>
										<p className="text-muted-foreground">
											[
											<span className="font-semibold text-blue-500 underline underline-offset-2">
												confira o site
											</span>
											]
										</p>
									</a>
									<a
										href={project.imageUrl}
										target="_blank"
										rel="noreferrer noopener"
									>
										<p className="text-muted-foreground">
											[
											<span className="font-semibold text-blue-500 underline underline-offset-2">
												confira o repositório
											</span>
											]
										</p>
									</a>
								</div>

								<div>
									<h2 className="inline-flex gap-2 text-muted-foreground/50">
										**{" "}
										<span className="font-bold text-foreground">
											Tecnologias
										</span>{" "}
										**
									</h2>
									<ul className="list-inside list-disc pl-4 text-muted-foreground">
										{project.technologies.map(({ tech }) => (
											<li key={tech} className="text-sm">
												{tech}
											</li>
										))}
									</ul>
								</div>
							</div>
						)}
					</EditorContent>
				</EditorWrapper>
			</Editor>
		</main>
	);
}
