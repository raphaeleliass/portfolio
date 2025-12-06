import { Globe } from "lucide-react";
import { Activity, use } from "react";
import type { TypeBlogPost } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Section from "../ui/section";

export default function Blog({
	postsData,
}: {
	postsData: Promise<TypeBlogPost[]>;
}) {
	const posts = use(postsData);

	return (
		<Activity mode={posts.length > 0 ? "visible" : "hidden"}>
			<Section className="mt-32 flex w-full flex-col gap-4">
				<Badge className="mx-auto">Artigos e postagens</Badge>
				<h1 className="mt-4 text-balance text-center">
					Confira meu blog pessoal.
				</h1>
				<p className="text-balance text-center">
					Rapha Codes é onde compartilho todas as minhas experiências durante o
					desenvolvimento dos meus projetos pessoais.
				</p>
				<div className="mt-8 flex flex-col gap-8 md:flex-row md:gap-2">
					{posts.slice(0, 2).map((item, i) => (
						<a
							href={`https://rapha-codes.vercel.app/post/${item.id}`}
							target="_blank"
							rel="noreferrer noopener"
							className="group relative w-full overflow-hidden rounded border pb-2 shadow-xl"
							key={item.id}
						>
							<div className="aspect-video w-full place-content-center justify-items-center truncate rounded-t-md bg-foreground">
								<Badge
									variant={"secondary"}
									className="absolute top-1 right-0 scale-75 data-[active=false]:hidden"
									data-active={i === 0}
								>
									NOVO
								</Badge>
								<p className="bg-linear-to-tr from-foreground to-background bg-clip-text text-center font-bold text-sm text-transparent uppercase drop-shadow-white transition-transform group-hover:scale-110">
									Blog Post
								</p>
							</div>
							<div className="my-4 px-2">
								<h3 className="truncate font-semibold text-lg">{item.title}</h3>
								<p className="text-xs">
									{new Date(item.createdAt).toLocaleDateString("pt-br", {
										month: "short",
										year: "numeric",
									})}
								</p>
							</div>
							<Button className="ml-2" size={"sm"} variant={"outline"}>
								<Globe /> Leia mais
							</Button>
						</a>
					))}
				</div>
			</Section>
		</Activity>
	);
}
