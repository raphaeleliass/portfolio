export async function fetchAllProjects() {
	const projects = await fetch("http://localhost:3000/api/projects", {
		/* next: { revalidate: 60, tags: ["projects"] }, */
	});

	const data = await projects.json();

	return data;
}
