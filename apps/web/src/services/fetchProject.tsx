export async function fetchProject(projectId: string) {
	try {
		const projects = await fetch("http://localhost:3000/api/project", {
			method: "POST",
			body: JSON.stringify({ projectId }),
			next: {
				revalidate: 60,
				tags: ["project", projectId],
			},
		});

		const data = await projects.json();

		return data;
	} catch (err) {
		console.log(err);
	}
}
