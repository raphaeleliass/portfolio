export async function getBlogPosts() {
	const response = await fetch(
		"https://api-rapha-codes.vercel.app/public/all-posts",
		{
			method: "GET",
			next: { revalidate: 60 },
		},
	);

	if (!response.ok) throw new Error("Erro ao buscar publicações do blog");

	const posts = await response.json();

	return posts;
}
