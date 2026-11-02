import type { Metadata } from "next";
import { Geist, Instrument_Serif, Inter, Manrope } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});
const manrope = Manrope({
	variable: "--font-entity",
	subsets: ["latin"],
	weight: "600",
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const editorial = Instrument_Serif({
	variable: "--font-editorial",
	subsets: ["latin"],
	weight: "400",
	style: "italic",
});

export const metadata: Metadata = {
	metadataBase: new URL("https://raphaelelias.dev"),
	title: {
		default: "Raphael Elias",
		template: "%s | Raphael Elias",
	},
	description:
		"Raphael Elias, desenvolvedor full-stack. Conheça minha trajetória, acesse meus apps e leia meus artigos sobre desenvolvimento.",
	keywords: [
		"Desenvolvedor Full-Stack",
		"Next.js",
		"React",
		"TypeScript",
		"Node.js",
		"Tailwind CSS",
		"Portfolio",
		"Blog",
		"Projetos",
	],
	authors: [{ name: "Raphael Elias" }],
	robots: "index, follow",
	openGraph: {
		title: "Raphael Elias - Desenvolvedor Full-Stack",
		description:
			"Raphael Elias, desenvolvedor full-stack. Conheça minha trajetória, acesse meus apps e leia meus artigos sobre desenvolvimento.",
		url: "https://raphaelelias.dev",
		siteName: "Raphael Elias",
		images: [
			{
				url: "https://raphaelelias.dev/website-preview.png",
				width: 1280,
				height: 800,
			},
		],
		locale: "pt_BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Raphael Elias - Desenvolvedor Full-Stack",
		description:
			"Raphael Elias, desenvolvedor full-stack. Conheça minha trajetória, acesse meus apps e leia meus artigos sobre desenvolvimento.",
		creator: "@faeleliass",
		images: ["https://raphaelelias.dev/website-preview.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body
				className={`${geist.variable} ${inter.variable} ${editorial.variable} ${manrope.variable} antialiased`}
			>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
