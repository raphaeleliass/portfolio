import { cacheLife } from "next/cache";
import { Suspense } from "react";
import About from "@/components/layout/About";
import Blog from "@/components/layout/Blog";
import Contact from "@/components/layout/Contact";
import FloatingMenu from "@/components/layout/FloatingMenu";
import Skills from "@/components/layout/Skills";
import Timeline from "@/components/layout/Timeline";
import TimelineSkeleton from "@/components/layout/TimelineSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { getBlogPosts } from "@/services/getBlogPosts";
import { getPinnedRepos } from "@/services/getPinnedRepos";

export default async function Home() {
	"use cache";

	cacheLife("minutes");

	const pinned = getPinnedRepos();
	const blogPosts = getBlogPosts();

	return (
		<main className="relative mx-auto w-1/3 space-y-20 px-6 pt-24 pb-12 max-sm:w-sm max-sm:px-2 max-sm:py-12 max-[900px]:w-xl">
			<About />

			<Suspense fallback={<TimelineSkeleton />}>
				<Timeline pinnedData={pinned} />
			</Suspense>

			<Skills />

			<Suspense fallback={<Skeleton className="aspect-square" />}>
				<Blog postsData={blogPosts} />
			</Suspense>

			<Contact />

			<FloatingMenu />
		</main>
	);
}
