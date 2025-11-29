export async function getBlogPosts() {
	const response = await fetch(
		"https://api-raphacodes.vercel.app/public/posts",
		{
			method: "GET",
			next: { revalidate: 10, tags: ["blog-posts"] },
		},
	);

	if (!response.ok) throw new Error("Erro ao buscar publicações do blog");

	const posts = await response.json();

	return posts;
}
