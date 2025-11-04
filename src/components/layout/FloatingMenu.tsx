"use client";
import {
	Code2,
	Github,
	Instagram,
	Linkedin,
	SquareChartGantt,
} from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/theme-toggle";

const menuItems = [
	{ title: "projects", href: "#projects", icon: Code2 },
	{
		title: "blog",
		href: "https://rapha-codes.vercel.app",
		icon: SquareChartGantt,
	},
	{
		title: "github",
		href: "https://github.com/raphaeleliass",
		icon: Github,
	},
	{
		title: "linkedin",
		href: "https://linkedin.com/in/raphaeleliass",
		icon: Linkedin,
	},
	{
		title: "instagram",
		href: "https://instagram.com/raphaeleliass",
		icon: Instagram,
	},
];

export default function FloatingMenu() {
	return (
		<motion.nav
			initial={{ opacity: 0, y: 50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.3 }}
			className="-translate-x-1/2 fixed bottom-10 left-1/2 overflow-hidden rounded border bg-secondary/70 p-1 shadow-xl backdrop-blur-sm"
		>
			<ul className="flex flex-row gap-2">
				{menuItems.map((item) => {
					const Icon = item.icon;

					return (
						<li key={item.title}>
							{item.title === "projects" ? (
								<a href={item.href} title={item.title}>
									<p className="sr-only">acesse {item.title} </p>
									<Button variant={"ghost"} size={"icon"}>
										<Icon />
									</Button>
								</a>
							) : (
								<a
									href={item.href}
									target="_blank"
									rel="noreferrer noopener"
									title={item.title}
								>
									<p className="sr-only">{item.title}</p>
									<Button variant={"ghost"} size={"icon"}>
										<Icon />
									</Button>
								</a>
							)}
						</li>
					);
				})}

				<li
					className="border-muted-foreground/10 border-l pl-1"
					title="Mudar tema"
				>
					<ThemeToggle />
				</li>
			</ul>
		</motion.nav>
	);
}
