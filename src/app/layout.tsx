import ProviderWrapper from "@/components/providers/provider-wrapper";
import type { Metadata } from "next";
import { Lora, Plus_Jakarta_Sans, Roboto_Mono } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin-ext"],
  variable: "--font-plus-jakarta",
});

const lora = Lora({
  subsets: ["latin-ext"],
  variable: "--font-lora",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin-ext"],
  variable: "--font-roboto-mono",
});

export const metadata: Metadata = {
  title: "Raphael Elias - Portfólio",
  description:
    "Explore meu portfólio e descubra um pouco mais da minha trajetória e projetos realizados até aqui.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      suppressHydrationWarning
    >
      <body
        className={`${plusJakarta.variable} ${lora.variable} ${robotoMono.variable} antialiased`}
      >
        <ProviderWrapper>{children}</ProviderWrapper>
      </body>
    </html>
  );
}
