"use client";
import { Moon, Sun } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ThemeToggle({ className }: { className?: string }) {
	const reduceMotion = useReducedMotion();
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => setMounted(true), []);

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
			<motion.span
				className="theme-symbol"
				initial={false}
				animate={{ rotate: mounted && resolvedTheme === "dark" ? 90 : 0 }}
				transition={
					reduceMotion
						? { duration: 0 }
						: { type: "spring", bounce: 0, duration: 0.65 }
				}
			>
				{mounted && resolvedTheme === "dark" ? (
					<Sun aria-hidden="true" />
				) : (
					<Moon aria-hidden="true" />
				)}
			</motion.span>
		</Button>
	);
}
