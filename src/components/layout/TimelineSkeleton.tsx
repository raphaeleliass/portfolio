import { Skeleton } from "../ui/skeleton";

export default function TimelineSkeleton() {
	return (
		<div className="flex flex-col gap-2">
			{[1, 2, 3, 4].map((i) => (
				<Skeleton key={i} className="h-50 w-full" />
			))}
		</div>
	);
}
