import About from "@/components/layout/About";
import Timeline from "@/components/layout/Timeline";

export default function Home() {
	return (
		<main className="mx-auto w-1/3 px-6 py-24 max-sm:w-sm max-sm:px-2 max-sm:py-12 max-[900px]:w-xl">
			<About />
			<Timeline />
		</main>
	);
}
