import Image from "next/image";

export default function page() {
  return (
    <section className="section-view mb-4 py-4 md:py-12">
      <article className="relative aspect-video   md:w-1/3">
        <Image
          src={"https://github.com/raphaeleliass.png"}
          alt="imagem de Raphael Elias"
          fill
          priority
          quality={100}
          className="rounded object-cover object-center"
        />
      </article>
      <article className="flex flex-col gap-4 text-pretty max-sm:mt-4 md:w-2/3 md:pl-4">
        <h1 className="text-2xl font-bold"> Oi, eu sou Raphael. </h1>

        <p>
          Sou desenvolvedor full-stack em crescimento, com foco em React,
          Next.js, Node.js, Express e PostgreSQL. Estudo Análise e
          Desenvolvimento de Sistemas e dedico boa parte do meu dia a criar
          projetos práticos, sempre buscando boas práticas e código limpo.
        </p>

        <p>
          Moro no estado do Espirito Santo e estou me preparando para atuar
          profissionalmente na área de desenvolvimento web. Gosto de transformar
          ideias em aplicações funcionais e bem construídas, explorando soluções
          que unem design, performance e usabilidade. Meu objetivo é criar
          experiências digitais que sejam intuitivas e escaláveis, sem perder de
          vista a qualidade do código.
        </p>

        <p>
          <strong>O que estou explorando agora:</strong> Integração de APIs,
          autenticação segura, otimização de performance no Next.js, arquitetura
          backend com Express e Hono e organização de bancos de dados no
          PostgreSQL.
        </p>

        <p>
          <strong>O que quero aprender mais a fundo:</strong> Testes
          automatizados, arquitetura de software, microsserviços, deploy e
          monitoramento em nuvem, WebSockets, WebGL, design patterns e
          escalabilidade de sistemas.
        </p>

        <p>
          <strong>O que me empolga:</strong> Resolver problemas complexos,
          aprender novas tecnologias, criar interfaces responsivas, refatorar
          código para melhorar performance e participar de desafios técnicos.
        </p>

        <p>
          <strong>Tecnologias favoritas:</strong> React, Next.js, Node.js,
          Express, Hono, PostgreSQL, Prisma, TailwindCSS, Shadcn UI, TypeScript.
        </p>
      </article>
    </section>
  );
}
