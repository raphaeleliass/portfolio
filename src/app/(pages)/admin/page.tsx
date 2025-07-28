import Signin from "@/components/features/auth/components/signin";
import { auth } from "@/lib/auth";
import { ArrowRight } from "lucide-react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function Admin() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) redirect("/dashboard");

  return (
    <section className="h-dvh place-content-center justify-items-center max-sm:px-2 max-sm:py-10">
      <div className="container flex h-full w-full flex-col px-4 md:aspect-video md:h-4/5 lg:flex-row">
        <article className="bg-foreground text-background/60 relative h-1/2 w-full place-content-center justify-items-center rounded-xl max-sm:px-7 md:h-full">
          <h1 className="max-w-xs text-5xl font-medium drop-shadow-2xl select-none">
            Inicie uma sessão.
          </h1>
          <ArrowRight
            size={44}
            className="absolute right-7 bottom-7 rounded-full"
          />
        </article>
        <div className="h-1/2 w-full place-content-center justify-items-center md:h-full">
          <Signin />
        </div>
      </div>
    </section>
  );
}
