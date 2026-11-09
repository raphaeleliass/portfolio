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
		default: "Raphael Elias | Desenvolvedor Full-Stack React e Next.js",
		template: "%s | Raphael Elias",
	},
	description:
		"Raphael Elias, desenvolvedor full-stack com React, Next.js, TypeScript e Node.js. Conheça minha trajetória, explore meus apps e leia artigos de desenvolvimento web.",
	authors: [{ name: "Raphael Elias", url: "https://raphaelelias.dev" }],
	creator: "Raphael Elias",
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	openGraph: {
		title: "Raphael Elias | Desenvolvedor Full-Stack React e Next.js",
		description:
			"Raphael Elias, desenvolvedor full-stack com React, Next.js, TypeScript e Node.js. Conheça minha trajetória, explore meus apps e leia artigos de desenvolvimento web.",
		url: "https://raphaelelias.dev",
		siteName: "Raphael Elias",
		images: [
			{
				url: "https://raphaelelias.dev/website-preview.png",
				width: 883,
				height: 552,
				alt: "Portfólio de Raphael Elias, desenvolvedor full-stack",
			},
		],
		locale: "pt_BR",
		type: "website",
	},
	twitter: {
		card: "summary_large_image",
		title: "Raphael Elias | Desenvolvedor Full-Stack React e Next.js",
		description:
			"Raphael Elias, desenvolvedor full-stack com React, Next.js, TypeScript e Node.js. Conheça minha trajetória, explore meus apps e leia artigos de desenvolvimento web.",
		creator: "@faeleliass",
		images: [
			{
				url: "https://raphaelelias.dev/website-preview.png",
				alt: "Portfólio de Raphael Elias, desenvolvedor full-stack",
			},
		],
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
