import { technologies } from "@/data";
import { Badge } from "../ui/badge";
import Section from "../ui/section";
export default function Skills() {
	return (
		<Section>
			<h2>Skills</h2>

			<div className="mt-4 flex flex-row flex-wrap gap-2">
				{technologies.map((item) => (
					<Badge variant={"outline"} className="capitalize" key={item.title}>
						{item.title}
					</Badge>
				))}
			</div>
		</Section>
	);
}
