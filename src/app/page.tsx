import { Button } from "@/components/ui/button";
import { FetchProjects } from "@/lib/fetchProjects";
import Link from "next/link";

export default async function Home() {
  const data = await FetchProjects();

  return (
    <div>
      <div>
        {data?.map((pro) => (
          <div key={pro.id}>{pro.title}</div>
        ))}
      </div>
      <Link href={"/dashboard"}>
        <Button>Dashboard</Button>
      </Link>
    </div>
  );
}
