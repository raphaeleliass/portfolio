"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "./button";

export default function ThemeToggle({ className }: { className?: string }) {
	const { setTheme, theme } = useTheme();
	const [mounted, setMounted] = useState<boolean>(false);

	useEffect(() => setMounted(true), []);

	function toggleTheme() {
		setTheme(theme === "light" ? "dark" : "light");
	}

	return (
		<Button
			type="button"
			onClick={toggleTheme}
			variant={"ghost"}
			size={"icon"}
			className={className}
		>
			{mounted && theme === "light" ? <Moon /> : <Sun />}
		</Button>
	);
}
