import { Github } from "lucide-react";
import React from "react";

export default function AboutMe() {
	return (
		<div className="flex flex-col gap-12 text-sm">
			<h2 className="font-bold text-4xl max-sm:text-2xl">
				<span className="text-muted-foreground/50">#</span> Raphael Elias
			</h2>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">👋 Sobre Mim</span> **
				</h2>
				<div className="mt-4 flex flex-col gap-4 text-balance text-muted-foreground max-sm:text-sm">
					<p>
						Olá! Eu sou Raphael Elias, um desenvolvedor full-stack do Espírito
						Santo, Brasil. Sou formado em Análise e Desenvolvimento de Sistemas
						e sou apaixonado por criar soluções de software eficientes e
						escaláveis.
					</p>
					<p>
						Com experiência em tecnologias modernas, busco sempre aprender e
						aplicar as melhores práticas de desenvolvimento. Tenho um interesse
						especial em arquiteturas de software e em como construir aplicações
						robustas e de fácil manutenção.
					</p>
				</div>
			</div>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">🛠️ Tecnologias</span> **
				</h2>
				<div className="mt-4 flex flex-col gap-4 text-muted-foreground">
					<p>Tenho experiência com as seguintes tecnologias:</p>
					<ul className="list-inside list-disc pl-4">
						<li>React</li>
						<li>Next.js</li>
						<li>TypeScript</li>
						<li>Node.js</li>
						<li>Express</li>
						<li>Hono</li>
						<li>PostgreSQL</li>
						<li>Drizzle ORM</li>
						<li>Bun</li>
					</ul>
				</div>
			</div>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">🎓 Formação</span> **
				</h2>
				<p className="mt-4 text-balance text-muted-foreground max-sm:text-sm">
					Sou formado em <strong>Análise e Desenvolvimento de Sistemas</strong>,
					onde adquiri uma base sólida em engenharia de software, estruturas de
					dados e algoritmos.
				</p>
			</div>

			<div className="flex w-fit flex-col gap-4 text-sm">
				<a
					href="https://github.com/raphaeleliass"
					target="_blank"
					rel="noreferrer noopener"
					className="inline-flex items-center gap-2"
				>
					<Github size={16} />
					<p className="text-muted-foreground">
						[
						<span className="font-semibold text-blue-500 underline underline-offset-2">
							confira meu GitHub
						</span>
						]
					</p>
				</a>
			</div>
		</div>
	);
}
