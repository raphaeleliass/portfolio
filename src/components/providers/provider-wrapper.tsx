import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "sonner";
import Navbar from "../ui/navbar";

export default function ProviderWrapper({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <ThemeProvider
        attribute={"class"}
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <Navbar />
        {children}
        <Toaster />
      </ThemeProvider>
    </>
  );
}
