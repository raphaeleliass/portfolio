import { Skeleton } from "../ui/skeleton";

export default function ProjectSkeleton() {
	return (
		<div className="flex flex-col gap-8">
			<Skeleton className="h-16 w-full" />
			<Skeleton className="h-44 w-full" />
			<Skeleton className="aspect-video w-full" />
		</div>
	);
}
