import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import { Suspense } from "react";
import About from "@/components/layout/About";
import Blog from "@/components/layout/Blog";
import Contact from "@/components/layout/Contact";
import FloatingMenu from "@/components/layout/FloatingMenu";
import Skills from "@/components/layout/Skills";
import Timeline from "@/components/layout/Timeline";
import PortfolioMotion from "@/components/portfolio-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts } from "@/services/getBlogPosts";

export const metadata: Metadata = {
	alternates: { canonical: "https://raphaelelias.dev" },
};

const structuredData = {
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": "https://raphaelelias.dev/#person",
			name: "Raphael Elias",
			url: "https://raphaelelias.dev",
			image: "https://github.com/raphaeleliass.png",
			jobTitle: "Desenvolvedor full-stack",
			sameAs: [
				"https://github.com/raphaeleliass",
				"https://linkedin.com/in/raphaeleliass",
			],
			knowsAbout: ["React", "Next.js", "TypeScript", "Node.js"],
		},
		{
			"@type": "WebSite",
			"@id": "https://raphaelelias.dev/#website",
			url: "https://raphaelelias.dev",
			name: "Raphael Elias",
			inLanguage: "pt-BR",
			publisher: { "@id": "https://raphaelelias.dev/#person" },
		},
		{
			"@type": "ProfilePage",
			"@id": "https://raphaelelias.dev/#profile",
			url: "https://raphaelelias.dev",
			name: "Raphael Elias | Desenvolvedor Full-Stack React e Next.js",
			inLanguage: "pt-BR",
			isPartOf: { "@id": "https://raphaelelias.dev/#website" },
			mainEntity: { "@id": "https://raphaelelias.dev/#person" },
		},
	],
};

export default async function Home() {
	"use cache";
	cacheLife("minutes");
	const posts = getBlogPosts();
	return (
		<PortfolioMotion>
			<script type="application/ld+json">
				{JSON.stringify(structuredData).replace(/</g, "\\u003c")}
			</script>
			<a className="skip-link" href="#conteudo">
				Pular para o conteúdo
			</a>
			<FloatingMenu />
			<main id="conteudo" className="portfolio-shell">
				<About />
				<Timeline />
				<Skills />
				<Suspense
					fallback={
						<section
							className="content-section"
							aria-label="Carregando artigos"
						>
							<Skeleton className="h-32 w-full" />
						</section>
					}
				>
					<Blog postsData={posts} />
				</Suspense>
				<Contact />
			</main>
			<footer className="portfolio-footer">
				<span>Raphael Elias</span>
				<span>Desenvolvedor full-stack</span>
				<a href="#inicio">Voltar ao início ↑</a>
			</footer>
		</PortfolioMotion>
	);
}
