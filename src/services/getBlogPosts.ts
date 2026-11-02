import type { TypeBlogPost } from "@/types";

export async function getBlogPosts(): Promise<TypeBlogPost[]> {
	try {
		const response = await fetch(
			"https://api-raphacodes.vercel.app/public/posts",
			{
				method: "GET",
				next: { revalidate: 10, tags: ["blog-posts"] },
			},
		);

		if (!response.ok) throw new Error("Erro ao buscar publicações do blog");

		const posts = await response.json();

		return Array.isArray(posts) ? posts.filter((post) => !post.draft) : [];
	} catch {
		console.error("Não foi possível carregar os artigos do portfólio.");
		return [];
	}
}
