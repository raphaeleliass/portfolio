"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { Button } from "./button";

export default function ThemeToggle({ className }: { className?: string }) {
	const symbol = useRef<HTMLSpanElement>(null);
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => setMounted(true), []);

	useGSAP(
		() => {
			if (!mounted) return;
			const media = gsap.matchMedia();
			media.add("(prefers-reduced-motion: no-preference)", () => {
				gsap.fromTo(
					symbol.current,
					{ rotation: -60, scale: 0.7, opacity: 0 },
					{
						rotation: 0,
						scale: 1,
						opacity: 1,
						duration: 0.45,
						ease: "expo.out",
						clearProps: "transform,opacity",
					},
				);
			});
			return () => media.revert();
		},
		{
			scope: symbol,
			dependencies: [mounted, resolvedTheme],
			revertOnUpdate: true,
		},
	);

	function toggleTheme() {
		setTheme(resolvedTheme === "light" ? "dark" : "light");
	}

	return (
		<Button
			type="button"
			aria-label={
				mounted && resolvedTheme === "dark"
					? "Ativar tema claro"
					: "Ativar tema escuro"
			}
			disabled={!mounted}
			onClick={toggleTheme}
			variant={"outline"}
			size={"icon"}
			className={className}
		>
			<span ref={symbol} className="theme-symbol">
				{mounted && resolvedTheme === "dark" ? (
					<Sun aria-hidden="true" />
				) : (
					<Moon aria-hidden="true" />
				)}
			</span>
		</Button>
	);
}
