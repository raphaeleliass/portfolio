"use client";
import { GithubIcon } from "lucide-react";
import { motion } from "motion/react";
import { Activity, use } from "react";
import { DateFormatter } from "@/lib/dateFormatter";
import type { TypeGithubPinned } from "@/types";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";

export default function Timeline({
	pinnedData,
}: {
	pinnedData: Promise<TypeGithubPinned[]>;
}) {
	const pinnedItems = use(pinnedData);

	function handleDisplayDate(date: string) {
		const formattedDate = DateFormatter(date);

		const result: string = formattedDate
			.slice(0, 1)
			.toUpperCase()
			.concat(formattedDate.slice(1));

		return result;
	}

	return (
		<ul
			className="max-sm: ml-6 divide-y divide-dashed border-l"
			id={"projects"}
		>
			<Activity mode={pinnedItems ? "visible" : "hidden"}>
				{pinnedItems.map((item, i) => (
					<motion.li
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{
							once: true,
							margin: "-150px",
						}}
						className="relative flex flex-col gap-4 pt-3.5 pr-4 pb-4 pl-10"
						key={item.id}
					>
						<span className="-left-6 absolute top-0 size-12 place-content-center justify-items-center rounded-full bg-secondary text-background">
							<p
								className={`font-bold uppercase ${i % 2 === 0 ? "text-blue-500" : "text-green-500"}`}
							>
								{item.name.slice(0, 1)}
							</p>
						</span>

						<div className="flex w-full flex-row items-center justify-between">
							<h3 className="bg-background text-start font-semibold capitalize">
								{item.name}
							</h3>

							<p className="text-xs">
								{handleDisplayDate(item.createdAt)} -{" "}
								{handleDisplayDate(item.updatedAt)}
							</p>
						</div>

						<p>{item.description}</p>

						<div className="flex flex-row gap-1">
							{item.languages.nodes.map((item) => (
								<Badge variant={"secondary"} key={item.name}>
									{item.name}
								</Badge>
							))}
						</div>
						<a href={item.url} target="_blank" rel="noreferrer noopener">
							<Button className="mt-4 w-fit cursor-pointer" variant={"outline"}>
								<GithubIcon /> Repositório
							</Button>
						</a>
					</motion.li>
				))}
			</Activity>
		</ul>
	);
}
