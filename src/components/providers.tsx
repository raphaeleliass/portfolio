import type { ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "./theme-provider";

export default function Providers({
	children,
}: {
	children: Readonly<ReactNode>;
}) {
	return (
		<ThemeProvider
			attribute={"class"}
			defaultTheme="system"
			disableTransitionOnChange
			enableSystem
		>
			<Toaster richColors />

			{children}
		</ThemeProvider>
	);
}
