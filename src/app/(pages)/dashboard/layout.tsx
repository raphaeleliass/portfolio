import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Dashboard - Portfólio",
  robots: {
    follow: false,
    index: false,
    googleBot: { follow: false, index: false },
  },
};
export default function DashboardLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return <main>{children}</main>;
}
