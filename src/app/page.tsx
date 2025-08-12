import Experience from "@/components/layout/home/experience";
import Projects from "@/components/layout/home/projects";
import { fetchProjects } from "@/lib/fetchProjects";

export default async function Home() {
  const data = await fetchProjects();

  return (
    <main className="section-view">
      <Experience className="border-muted-foreground max-sm:border-b md:border-r" />

      <Projects projects={data} />
    </main>
  );
}
