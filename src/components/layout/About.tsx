import { ArrowDown } from "lucide-react";
import Image from "next/image";
import { Button } from "../ui/button";
import MotionArrow from "../ui/motion-arrow";

export default function About() {
	return (
		<section id="inicio" className="hero" aria-labelledby="hero-title">
			<div className="hero-identity">
				<Image
					src="https://github.com/raphaeleliass.png"
					alt="Raphael Elias"
					width={56}
					height={56}
					className="portrait"
					priority
				/>
				<span>Raphael Elias</span>
			</div>
			<h1 id="hero-title">
				<span className="title-line">
					<span>Desenvolvedor</span>
				</span>
				<span className="title-line">
					<span>
						<em>full-stack.</em>
					</span>
				</span>
			</h1>
			<div className="hero-bottom">
				<p>
					Crio aplicações web com React, Next.js e Node.js. Nos meus projetos,
					trabalho tanto na interface quanto nas APIs e no banco de dados.
				</p>
				<div className="hero-actions">
					<Button asChild variant="outline" size="lg">
						<a
							href="https://apps.raphaelelias.dev"
							target="_blank"
							rel="noopener noreferrer"
						>
							Explorar apps <MotionArrow />
							<span className="sr-only"> (nova aba)</span>
						</a>
					</Button>
					<Button asChild size="lg">
						<a href="#contato">
							Entrar em contato <MotionArrow />
						</a>
					</Button>
				</div>
			</div>
			<a className="hero-scroll" href="#trajetoria">
				Conheça minha trajetória <ArrowDown size={16} aria-hidden="true" />
			</a>
		</section>
	);
}
