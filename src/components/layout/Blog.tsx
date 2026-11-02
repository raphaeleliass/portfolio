import { use } from "react";
import type { TypeBlogPost } from "@/types";
import MotionArrow from "../ui/motion-arrow";
export default function Blog({
	postsData,
}: {
	postsData: Promise<TypeBlogPost[]>;
}) {
	const posts = use(postsData);
	return (
		<section
			id="artigos"
			className="section-grid content-section"
			aria-labelledby="blog-title"
		>
			<div className="section-intro">
				<h2 id="blog-title">
					Artigos e
					<br />
					<em>anotações.</em>
				</h2>
				<p>
					No Rapha Codes, escrevo sobre o que aprendo desenvolvendo meus
					projetos.
				</p>
				<a
					className="text-link"
					href="https://rapha-codes.vercel.app"
					target="_blank"
					rel="noopener noreferrer"
				>
					Visitar o blog <MotionArrow />
					<span className="sr-only"> (nova aba)</span>
				</a>
			</div>
			<div className="article-list">
				{posts.length ? (
					posts.slice(0, 2).map((item) => (
						<a
							className="article-link"
							href={`https://rapha-codes.vercel.app/post/${encodeURIComponent(item.id)}`}
							target="_blank"
							rel="noopener noreferrer"
							key={item.id}
						>
							<time dateTime={item.createdAt}>
								{new Date(item.createdAt).toLocaleDateString("pt-BR", {
									month: "long",
									year: "numeric",
								})}
							</time>
							<h3>{item.title}</h3>
							<span className="text-link">
								Ler artigo <MotionArrow />
							</span>
							<span className="sr-only"> (nova aba)</span>
						</a>
					))
				) : (
					<p>Você pode ler meus artigos diretamente no Rapha Codes.</p>
				)}
			</div>
		</section>
	);
}
