"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { Activity, useEffectEvent, useState } from "react";
import { projectsData } from "@/data";
import type { GitHubLicense, GitHubRepository, GitHubUser } from "@/types";
import { Button } from "../ui/button";

interface TypeGithubPayload extends GitHubRepository {
	owner: GitHubUser;
	license: GitHubLicense;
}

export default function Timeline() {
	// const { data, isSuccess} = useQuery<TypeGithubPayload[]>({
	// 	queryKey: ["projects"],
	// 	queryFn: async () => {
	// 		const response = await fetch(
	// 			"https://api.github.com/users/raphaeleliass/repos",
	// 		);

	// 		const data: TypeGithubPayload[] = await response.json();

	// 		return data.sort(
	// 			(newest, oldest) =>
	// 				new Date(oldest.pushed_at).getTime() -
	// 				new Date(newest.pushed_at).getTime(),
	// 		);
	// 	},
	// });

	return (
		<ul className="max-sm: ml-4 divide-y divide-dashed border-l">
			{projectsData.map((item) => (
				<li key={item.id} className="aspect-square">
					{item.title}
				</li>
			))}
		</ul>
	);
}
