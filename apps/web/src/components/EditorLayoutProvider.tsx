"use client";
import { Folder, Markdown } from "@react-symbols/icons";
import type { ReactNode } from "react";
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
import {
	Editor,
	EditorContent,
	EditorFloatingMenu,
	EditorHeader,
	EditorSidebar,
	EditorWrapper,
} from "@/components/ui/editor";

export default function EditorLayoutProvider({
	children,
}: {
	children: ReactNode;
}) {
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
									<span className="flex flex-row items-center gap-2 py-2 text-xs">
										<Folder className="size-4" />
										Projetos
									</span>
								</AccordionTrigger>

								<AccordionContent className="flex flex-col justify-between rounded bg-muted-foreground/3 pb-0">
									{projects.map((i) => (
										<Button
											key={i.id}
											variant={"ghost"}
											type="button"
											className="z-50 w-full cursor-pointer justify-start rounded-none text-muted-foreground text-xs data-[active=true]:bg-muted-foreground/20"
											data-active={project?.title === i.title}
											onClick={() => setProject(i)}
										>
											<Markdown className="size-4" />
											{i.title.replace(/[ -]/g, "")}.md
										</Button>
									))}
								</AccordionContent>
							</AccordionItem>
						</Accordion>
					</EditorSidebar>

					<EditorContent>
						<EditorFloatingMenu />
						{children}
					</EditorContent>
				</EditorWrapper>
			</Editor>
		</main>
	);
}
