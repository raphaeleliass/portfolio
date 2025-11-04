import Image from "next/image";
import Section from "../ui/section";
export default function About() {
	return (
		<Section className="flex flex-col gap-10">
			<div className="flex flex-row justify-between gap-2 lg:gap-5">
				<div className="w-full">
					<h1>Raphael Elias</h1>
					<p className="mt-2 text-balance text-left text-foreground">
						Desenvolvedor full-stack empenhado em criar soluções criativas,
						performáticas e escaláveis.
					</p>
				</div>

				<Image
					src={"https://github.com/raphaeleliass.png"}
					alt="foto de Raphael Elias"
					width={100}
					height={100}
					className="size-28 rounded-full"
				/>
			</div>

			<article>
				<h2>Sobre mim</h2>
				<p className="text-balance text-left text-muted-foreground">
					Minha jornada na programação começou na adolescência movida por pura
					curiosidade, e em 2022 dei um passo crucial ao iniciar minha{" "}
					<strong>formação em Análise e Desenvolvimento de Sistemas</strong>.
					Atualmente atuo como <strong>Desenvolvedor full-stack</strong>, com
					foco em <strong>React</strong>, <strong>Next.js</strong>,{" "}
					<strong>Node</strong>, <strong>Express</strong>, <strong>Hono</strong>{" "}
					e <strong>PostgreSQL</strong>, aplicando código limpo, boas práticas e
					visão de produto em meus projetos. Meu objetivo é{" "}
					<strong>evoluir</strong> continuamente, <strong>dominar</strong> o
					ciclo completo do desenvolvimento web e me tornar um{" "}
					<strong>profissional completo</strong>, transformando conceitos em
					soluções sólidas.
				</p>
			</article>

			<article>
				<h2>Hobby</h2>
				<p>
					Nos meus momentos livres, gosto de criar projetos pessoais que
					desafiem minhas habilidades como desenvolvedor full-stack. Costumo
					explorar novas ideias, tecnologias e arquiteturas. Também dedico meu
					tempo a estudar mais sobre desenvolvimento em geral transformando
					minha curiosidade em algo aplicável no mundo real.
				</p>
			</article>
		</Section>
	);
}
