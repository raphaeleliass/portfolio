import { ReactNode } from "react";

export const metadate = {
  title: "Sobre Raphael Elias",
  description:"Saiba mais sobre mim e o caminho que estou trilhando."
};

export default function AboutLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <main>{children}</main>;
}
