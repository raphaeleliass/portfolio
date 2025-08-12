import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";
import Link from "next/link";

export default function notFound() {
  return (
    <main className="flex min-h-[90dvh] items-center justify-center">
      <div className="flex max-w-xs flex-col items-center justify-center gap-4 text-center text-pretty">
        <h1 className="from-background to-primary bg-gradient-to-t bg-clip-text font-mono text-8xl font-black text-transparent">
          404
        </h1>
        <p className="mt-4 text-sm">
          Essa página não existe ou não foi encontrada. <br /> Tente voltar ao
          início.
        </p>

        <Link href={"/"}>
          <Button>
            <Home /> Início
          </Button>
        </Link>
      </div>
    </main>
  );
}
