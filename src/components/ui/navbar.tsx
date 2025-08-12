import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { Button } from "./button";

export default async function Navbar() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <header className="bg-background border-b-muted-foreground sticky top-0 z-50 mx-auto flex min-h-[10dvh] w-full items-center justify-center border-b lg:max-w-7xl">
      <div className="flex w-full flex-row items-center justify-between">
        <Link
          href={"/"}
          className="font-sans text-xl font-bold"
        >
          Raphael Elias
        </Link>
        <nav className="flex flex-row">
          <Link href={"/sobre"}>
            <Button
              variant={"link"}
              className="text-foreground"
            >
              Sobre mim
            </Button>
          </Link>

          {session && (
            <Link href={"/dashboard"}>
              <Button>Dashboard</Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
