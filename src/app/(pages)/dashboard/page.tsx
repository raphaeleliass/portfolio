import AddProject from "@/components/features/dashboard-components/add-project";
import LastProject from "@/components/features/dashboard-components/last-project";

export default async function Dashboard() {
  // const data = await FetchProjects();

  const data = [
    { createdAt: "2025-07-26T17:05:36.892+00:00" },
    { createdAt: "2025-07-26T17:05:36.892+00:00" },
    { createdAt: "2025-07-26T17:05:36.892+00:00" },
    { createdAt: "2025-07-26T17:05:36.892+00:00" },
  ];

  console.log(data?.length);

  return (
    <section className="mx-auto h-dvh w-full px-2 py-5 md:max-w-4xl md:px-7">
      <article className="grid h-3/4 grid-cols-4 grid-rows-4 gap-4">
        <AddProject />

        <LastProject
          className="col-span-4 row-span-2 h-full"
          projectsCount={data?.length}
          createdAt={data?.[0].createdAt as string}
        />

        <div className="col-span-3 row-span-1 bg-blue-400" />
        <div className="col-span-2 row-span-1 bg-blue-400" />
      </article>
    </section>
  );
}
