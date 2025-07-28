import { Button } from "@/components/ui/button";
import { FetchProjects } from "@/lib/fetchProjects";
import { ProjectTypes } from "@/types";
import Link from "next/link";

export default async function Home() {
  let proj: ProjectTypes[] = [];
  const data = await FetchProjects();

  proj = data ?? [];

  return (
    <div>
      <div>
        {data?.map((pro) => (
          <div key={pro.id}>{pro.title}</div>
        ))}
      </div>
      <Link
        href={"/dashboard"}
        prefetch
      >
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
