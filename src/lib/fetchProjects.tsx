import { appApiKey, appBaseUrl } from "@/constants";
import { ProjectTypes } from "@/types";

export async function FetchProjects() {
  try {
    const response = await fetch(`${appBaseUrl}/api/projects/list`, {
      headers: {
        "x-internal-api-key": appApiKey!,
      },
      next: {
        revalidate: 15,
        tags: ["projects"],
      },
    });

    const data: ProjectTypes[] = await response.json();

    return data;
  } catch (err) {
    console.log("Error:", err);
  }
}
