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

export default async function Home() {
	"use cache";
	cacheLife("minutes");
	const posts = getBlogPosts();
	return (
		<PortfolioMotion>
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
