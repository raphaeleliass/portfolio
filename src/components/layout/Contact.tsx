import { Button } from "../ui/button";
import MotionArrow from "../ui/motion-arrow";
export default function Contact() {
	return (
		<section
			id="contato"
			className="contact-section"
			aria-labelledby="contact-title"
		>
			<h2 id="contact-title">
				Vamos
				<br />
				<em>conversar?</em>
			</h2>
			<div className="contact-bottom">
				<p>
					Se você está contratando para uma vaga de desenvolvimento, pode me
					chamar por email ou pelo LinkedIn.
				</p>
				<Button asChild size="lg">
					<a href="mailto:raphaeleliass@outlook.com">
						Enviar um email <MotionArrow />
					</a>
				</Button>
			</div>
			<div className="contact-links">
				<a href="mailto:raphaeleliass@outlook.com">raphaeleliass@outlook.com</a>
				<a
					href="https://linkedin.com/in/raphaeleliass"
					target="_blank"
					rel="noopener noreferrer"
				>
					LinkedIn <MotionArrow />
					<span className="sr-only"> (nova aba)</span>
				</a>
				<a
					href="https://github.com/raphaeleliass"
					target="_blank"
					rel="noopener noreferrer"
				>
					GitHub <MotionArrow />
					<span className="sr-only"> (nova aba)</span>
				</a>
			</div>
		</section>
	);
}
