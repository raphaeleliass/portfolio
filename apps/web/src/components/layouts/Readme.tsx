export default function Readme() {
	return (
		<div className="flex flex-col gap-12 text-sm">
			<h2 className="font-bold text-4xl max-sm:text-2xl">
				<span className="text-muted-foreground/50">#</span> Portfolio Monorepo
			</h2>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">Sobre o Projeto</span>{" "}
					**
				</h2>
				<p className="mt-4 text-balance text-muted-foreground max-sm:text-sm">
					Este é um projeto de portfólio full-stack construído com uma
					arquitetura monorepo usando pnpm e Turborepo. O objetivo é mostrar
					minhas habilidades em desenvolvimento web, desde o frontend com
					Next.js até o backend com Hono.
				</p>
			</div>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">Tecnologias</span> **
				</h2>
				<div className="mt-4 flex flex-col gap-4 text-muted-foreground">
					<div>
						<h3 className="font-semibold text-foreground">Frontend:</h3>
						<ul className="list-inside list-disc pl-4">
							<li>Next.js com Turbopack</li>
							<li>TypeScript</li>
							<li>Tailwind CSS</li>
							<li>Zustand para gerenciamento de estado</li>
							<li>Radix UI e lucide-react para componentes de UI</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-foreground">Backend:</h3>
						<ul className="list-inside list-disc pl-4">
							<li>
								Hono (um framework de API pequeno, rápido e padrão da web para a
								Edge)
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-semibold text-foreground">Tooling:</h3>
						<ul className="list-inside list-disc pl-4">
							<li>Biome para linting e formatação</li>
							<li>Husky para ganchos de pré-commit</li>
						</ul>
					</div>
				</div>
			</div>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">Arquitetura</span> **
				</h2>
				<p className="mt-4 text-balance text-muted-foreground max-sm:text-sm">
					O projeto utiliza uma estrutura monorepo para gerenciar o código do
					frontend e do backend em um único repositório.
				</p>
				<ul className="mt-2 list-inside list-disc pl-4 text-muted-foreground">
					<li>
						<code className="rounded-sm bg-muted px-1 py-0.5 font-mono">
							apps/web
						</code>
						: Aplicação frontend Next.js.
					</li>
					<li>
						<code className="rounded-sm bg-muted px-1 py-0.5 font-mono">
							apps/server
						</code>
						: Aplicação backend Hono.
					</li>
				</ul>
			</div>

			<div>
				<h2 className="inline-flex gap-2 text-muted-foreground/50">
					** <span className="font-bold text-foreground">Como Rodar</span> **
				</h2>
				<div className="mt-4 flex flex-col gap-2 text-muted-foreground">
					<div>
						<p>Instalação:</p>
						<pre className="mt-2 rounded-md bg-muted p-4">
							<code className="font-mono text-sm">pnpm install</code>
						</pre>{" "}
					</div>
					<div>
						<p>
							Desenvolvimento (inicia o servidor de desenvolvimento para web e
							server):
						</p>
						<pre className="mt-2 rounded-md bg-muted p-4">
							<code className="font-mono text-sm">pnpm dev</code>
						</pre>
					</div>
					<div>
						<p>Build para produção:</p>
						<pre className="mt-2 rounded-md bg-muted p-4">
							<code className="font-mono text-sm">pnpm build</code>
						</pre>
					</div>
				</div>
			</div>

			<div className="flex w-fit flex-col gap-4 text-sm">
				<a
					href="https://github.com/raphaeleliass/portfolio"
					target="_blank"
					rel="noreferrer noopener"
				>
					<p className="text-muted-foreground">
						[
						<span className="font-semibold text-blue-500 underline underline-offset-2">
							confira o repositório
						</span>
						]
					</p>
				</a>
			</div>
		</div>
	);
}
