"use client";

import { animate, inView, stagger, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

export default function PortfolioMotion({ children }: { children: ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		const root = scope.current;
		if (!root || reduceMotion !== false) return;
		const animations: ReturnType<typeof animate>[] = [];
		const ease = [0.16, 1, 0.3, 1] as const;
		const enter = (selector: string, delay: number, duration: number) => {
			const elements = root.querySelectorAll<HTMLElement>(selector);
			if (elements.length)
				animations.push(
					animate(
						elements,
						{ y: [12, 0], opacity: [0.5, 1] },
						{ duration, delay: stagger(0.06, { startDelay: delay }), ease },
					),
				);
		};
		enter(
			".site-header > .wordmark, .site-header > button, .site-header nav > *",
			0,
			0.75,
		);
		const lines = root.querySelectorAll<HTMLElement>(".title-line > span");
		animations.push(
			animate(
				lines,
				{ y: ["110%", "0%"], rotate: [2, 0] },
				{ duration: 1.05, delay: stagger(0.12), ease },
			),
		);
		enter(".hero-identity, .hero-bottom, .hero-scroll", 0.16, 0.65);
		const stopObserving = inView(
			root.querySelectorAll<HTMLElement>(
				".section-intro, .trajectory-list li, .about-content, .article-link, .contact-section > *",
			),
			(element) => {
				animations.push(
					animate(
						element,
						{ y: [16, 0], opacity: [0.5, 1] },
						{ duration: 0.65, ease },
					),
				);
			},
			{ margin: "0px 0px -24px 0px" },
		);
		return () => {
			stopObserving();
			for (const animation of animations) animation.complete();
		};
	}, [reduceMotion]);

	return (
		<div ref={scope} className="motion-scope">
			{children}
		</div>
	);
}
