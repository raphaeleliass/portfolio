"use client";
import Image from "next/image";

export default function Home() {
	function formatDate(date: string) {
		const newDate = new Date(date).toLocaleString("pt-br", {
			month: "long",
			year: "numeric",
		});

		return newDate;
	}
	return (
		<>
			{project && (
				<div className="flex flex-col gap-12">
					<h2 className="font-bold text-4xl max-sm:text-2xl">
						<span className="text-muted-foreground/50">#</span> {project?.title}
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
							** <span className="font-bold text-foreground">Tecnologias</span>{" "}
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
		</>
	);
}
