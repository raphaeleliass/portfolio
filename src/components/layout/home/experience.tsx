import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { experiences, socialMedia } from "@/data";
import clsx from "clsx";
import { HTMLAttributes, Ref } from "react";

interface ExperienceProps extends HTMLAttributes<HTMLDivElement> {
  classname?: string;
  ref?: Ref<HTMLDivElement>;
}

export default function Experience({
  className,
  ref,
  ...props
}: ExperienceProps) {
  return (
    <article
      className={clsx("pr-2 md:w-2/6 md:overflow-y-scroll", className)}
      ref={ref}
      {...props}
    >
      <div className="mt-4">
        <p className="font-semibold text-pretty">
          Olá! Sou Desenvolvedor full-stack que curte transformar ideias em
          experiências digitais marcantes. Meu foco é criar aplicações que
          conectam pessoas, despertam curiosidade e geram impacto no dia-a-dia.
        </p>

        <p className="text-muted-foreground mt-4 text-sm text-pretty">
          Atualmente cursando Análise e Desenvolvimento de Sistemas @
          Universidade Norte do Paraná {"(Unopar)"}.
        </p>

        <div className="mt-4 flex flex-row flex-nowrap gap-4">
          {socialMedia.map((link) => (
            <a
              href={link.href}
              target="_blank"
              rel="noreferrer noopener"
              key={link.title}
            >
              <Button
                variant={"link"}
                size={"sm"}
                className="cursor-pointer px-0 text-sm"
              >
                {link.title}
              </Button>
            </a>
          ))}
        </div>
      </div>

      <section>
        <h2 className="border-foreground mt-6 border-b pb-4 text-2xl font-bold">
          Experiência
        </h2>

        {experiences.map((xp) => (
          <article
            key={xp.title}
            className="mt-4 text-pretty md:pr-4"
          >
            <div className="flex flex-col gap-1">
              <div className="flex flex-row items-center justify-between">
                <h3 className="text-lg font-semibold">{xp.title}</h3>
                <p className="text-muted-foreground text-sm">
                  {xp.date} {xp.working ? "- Atual" : ""}
                </p>
              </div>
              <p className="text-muted-foreground text-sm">{xp.role}</p>
              <p className="text-sm">{xp.description}</p>
            </div>
            <Separator className="mt-5" />
          </article>
        ))}
      </section>
    </article>
  );
}
