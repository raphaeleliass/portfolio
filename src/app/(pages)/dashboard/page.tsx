import AddProject from "@/components/features/dashboard-components/add-project";
import LastProject from "@/components/features/dashboard-components/last-project";
import { TechnologiesChart } from "@/components/features/dashboard-components/technologies-chart";
import { FetchProjects } from "@/lib/fetchProjects";

export default async function Dashboard() {
  const data = await FetchProjects();

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
    <section className="mx-auto h-dvh w-full px-2 py-5 md:max-w-4xl md:px-7">
      <article className="grid grid-cols-4 grid-rows-2 gap-4 md:h-[90dvh]">
        <AddProject />

        <div className="col-span-4 md:col-span-2 md:row-span-1">
          <LastProject
            projectsCount={data.length}
            createdAt={data[0].createdAt}
          />
        </div>

        <div className="col-span-4 md:row-span-1">
          <TechnologiesChart projects={data} />
        </div>
      </article>
    </section>
  );
}
