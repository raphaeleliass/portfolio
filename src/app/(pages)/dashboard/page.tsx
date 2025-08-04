import AddProject from "@/components/features/dashboard-components/add-project";
import CarouselDashboard from "@/components/features/dashboard-components/carousel-dashboard";
import { ProjectsDataTable } from "@/components/features/dashboard-components/projects-data-table";
import { fetchProjects } from "@/lib/fetchProjects";

export default async function Dashboard() {
  const data = await fetchProjects();

  if (!data || data.length === 0) {
    return (
      <section className="mx-auto flex h-dvh w-full items-center justify-center px-2 py-5 md:max-w-4xl md:px-7">
        <div className="text-center">
          <h2 className="text-2xl font-bold">No projects found</h2>
          <p className="text-muted-foreground">
            Add a new project to see your dashboard.
          </p>
          <AddProject />
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto min-h-dvh w-full justify-items-center px-2 py-5 md:px-7">
      <article className="flex w-full max-w-4xl flex-col gap-2 max-sm:h-[dvh] md:flex-row">
        <AddProject />
        <CarouselDashboard data={data} />
      </article>
      <article className="mt-5 w-full max-w-4xl">
        <ProjectsDataTable projects={data} />
      </article>
    </section>
  );
}
