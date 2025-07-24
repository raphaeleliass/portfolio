import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import { Toaster } from "sonner";

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
        {children}
        <Toaster/>
      </ThemeProvider>
    </>
  );
}
