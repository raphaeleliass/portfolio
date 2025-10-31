"use client";

import { motion } from "motion/react";
export default function About() {
	return (
		<section className="flex flex-col gap-10">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					ease: [0.25, 0.1, 0.25, 1],
					duration: 0.7,
					delay: 0.1,
				}}
				viewport={{
					once: true,
					margin: "-50px",
				}}
				className="flex flex-row justify-between gap-2 lg:gap-5"
			>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					transition={{
						ease: [0.25, 0.1, 0.25, 1],
						duration: 0.7,
						delay: 0.1,
					}}
					viewport={{
						once: true,
						margin: "-50px",
					}}
					className="w-full"
				>
					<h1>Raphael Elias</h1>
					<p className="mt-2 text-balance text-left text-foreground">
						Desenvolvedor full-stack empenhado em criar soluções criativas,
						performáticas e escaláveis.
					</p>
				</motion.div>
				<div className="place-content-start justify-items-end">
					<p className="rounded-full bg-muted p-11">RE</p>
				</div>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					ease: [0.25, 0.1, 0.25, 1],
					duration: 0.7,
					delay: 0.1,
				}}
				viewport={{
					once: true,
					margin: "-50px",
				}}
			>
				<h2>Sobre mim</h2>
				<p className="text-balance text-left text-muted-foreground">
					Comecei minha jornada na programação logo na adolescência movido por
					pura curiosidade. Em 2022 dei um passo muito importante em minha
					jornada, comecei minha{" "}
					<strong>formação em Análise e Desenvolvimento de Sistemas</strong>.
				</p>
				<br />
				<p>
					Hoje, <strong>Desenvolvedor full-stack</strong>, focado em{" "}
					<strong>React</strong>, <strong>Next.js</strong>,{" "}
					<strong>Node</strong>, <strong>Express</strong>, <strong>Hono</strong>{" "}
					e <strong>PostgreSQL</strong>, sempre busco aplicar código limpo, boas
					práticas e visão de produto em meus projetos, passando boa parte do
					meu dia mergulhado em código, explorando novas ideias e aplicando meus
					conhecimentos em projetos reais.
				</p>
				<br />
				<p>
					Meu objetivo é <strong>evoluir</strong> nessa área,{" "}
					<strong>dominar</strong> o ciclo completo do desenvolvimento web e me
					tornar um <strong>profissional completo</strong>, capaz de transformar
					conceitos em soluções sólidas e inteligentes.
				</p>
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{
					ease: [0.25, 0.1, 0.25, 1],
					duration: 0.7,
					delay: 0.1,
				}}
				viewport={{
					once: true,
					margin: "-50px",
				}}
			>
				<h2>Hobby</h2>
				<p>
					Nos meus momentos livres, gosto de criar projetos pessoais que
					desafiem minhas habilidades como desenvolvedor full-stack. Costumo
					explorar novas ideias, tecnologias e arquiteturas. Também dedico meu
					tempo a estudar mais sobre desenvolvimento em geral transformando
					minha curiosidade em algo aplicável no mundo real.
				</p>
			</motion.div>
		</section>
	);
}
