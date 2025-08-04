"use server";

import { appApiKey, appBaseUrl } from "@/constants";
import { ProjectTypes } from "@/types";

export async function fetchProjects() {
  const apiKey = appApiKey;

  if (!apiKey) throw new Error(`Missing API Key!`);

  try {
    const response = await fetch(`${appBaseUrl}/api/projects/list`, {
      headers: {
        "x-internal-api-key": apiKey!,
      },
      next: {
        revalidate: 15,
        tags: ["projects"],
      },
    });

    const data: ProjectTypes[] = await response.json();

    return data;
  } catch {
    throw new Error("Error fetching projects");
  }
}
