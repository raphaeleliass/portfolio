export default function Timeline() {
	return (
		<section
			id="trajetoria"
			className="section-grid content-section"
			aria-labelledby="trajectory-title"
		>
			<div className="section-intro">
				<h2 id="trajectory-title">
					Minha
					<br />
					<em>trajetória.</em>
				</h2>
				<p>
					Comecei a estudar programação na adolescência e sigo aprendendo com
					projetos pessoais.
				</p>
			</div>
			<ol className="trajectory-list">
				<li>
					<span className="entry-meta">O início</span>
					<h3>Primeiros estudos</h3>
					<p>Comecei a estudar programação na adolescência, por curiosidade.</p>
				</li>
				<li>
					<span className="entry-meta">2022</span>
					<h3>Análise e Desenvolvimento de Sistemas</h3>
					<p>
						Em 2022, comecei minha formação em Análise e Desenvolvimento de
						Sistemas para aprofundar meus conhecimentos em desenvolvimento de
						software.
					</p>
				</li>
				<li>
					<span className="entry-meta">Hoje</span>
					<h3>Projetos pessoais</h3>
					<p>
						Desenvolvo projetos pessoais com React, Next.js, Node.js e
						PostgreSQL. É onde pratico a integração entre interface, APIs e
						banco de dados, com atenção à organização do código e ao desempenho.
					</p>
				</li>
			</ol>
		</section>
	);
}
