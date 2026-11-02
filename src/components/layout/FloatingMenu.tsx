import MotionArrow from "../ui/motion-arrow";
import ThemeToggle from "../ui/theme-toggle";
export default function FloatingMenu() {
	return (
		<header className="site-header">
			<a
				className="wordmark"
				href="#inicio"
				aria-label="Raphael Elias — início"
			>
				Raphael Elias<span aria-hidden="true">.</span>
			</a>
			<nav aria-label="Navegação principal">
				<a href="#trajetoria">Trajetória</a>
				<a href="#sobre">Sobre</a>
				<a href="#contato">Contato</a>
				<a
					className="nav-apps"
					href="https://apps.raphaelelias.dev"
					target="_blank"
					rel="noopener noreferrer"
				>
					Apps <MotionArrow />
					<span className="sr-only"> (nova aba)</span>
				</a>
			</nav>
			<ThemeToggle />
		</header>
	);
}
