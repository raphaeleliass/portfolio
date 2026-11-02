import { technologies } from "@/data";
export default function Skills() {
	return (
		<section
			id="sobre"
			className="section-grid content-section"
			aria-labelledby="about-title"
		>
			<div className="section-intro">
				<h2 id="about-title">
					Sobre
					<br />
					<em>mim.</em>
				</h2>
			</div>
			<div className="about-content">
				<p>
					Gosto de trabalhar nas diferentes partes de uma aplicação e entender
					como cada escolha afeta quem vai usá-la.
				</p>
				<p>
					Estudo desenvolvimento web e uso projetos pessoais para testar o que
					aprendo. Quero aprofundar minha prática full-stack e fazer parte de
					uma equipe de desenvolvimento.
				</p>
				<h3>Tecnologias que uso</h3>
				<ul className="technology-list">
					{technologies.map((item) => (
						<li key={item.title}>{item.title}</li>
					))}
				</ul>
			</div>
		</section>
	);
}
