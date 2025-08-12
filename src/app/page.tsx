import Experience from "@/components/layout/home/experience";
import Projects from "@/components/layout/home/projects";
import Navbar from "@/components/ui/navbar";
import { fetchProjects } from "@/lib/fetchProjects";

export default async function Home() {
  const data = await fetchProjects();

  return (
    <>
      <Navbar />

      <main className="mx-auto flex h-[89dvh] flex-col md:flex-row lg:max-w-7xl">
        <Experience className="border-muted-foreground max-sm:border-b md:border-r" />

        <Projects projects={data} />
      </main>
    </>
  );
}
