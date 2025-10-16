import type { ReactNode } from "react";
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
			{children}
		</ThemeProvider>
	);
}
