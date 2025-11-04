import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers";

const geist = Geist({
	variable: "--font-geist",
	subsets: ["latin"],
});
const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://raphaelelias.vercel.app"),
	title: {
		default: "Raphael Elias",
		template: "%s | Raphael Elias",
	},
	description:
		"Desenvolvedor Full-Stack, criador de soluções inovadoras e eficientes. Explore meu portfólio para ver meus projetos e artigos.",
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
			"Desenvolvedor Full-Stack criador de soluções inovadoras e eficientes.",
		url: "https://raphaelelias.vercel.app",
		siteName: "Raphael Elias",
		images: [
			{
				url: "https://raphaelelias.vercel.app/website-preview.png",
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
			"Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras e eficientes.",
		creator: "@faeleliass",
		images: ["https://raphaelelias.vercel.app/website-preview.png"],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pt-BR" suppressHydrationWarning>
			<body className={`${geist.variable} ${geistMono.variable} antialiased`}>
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}
