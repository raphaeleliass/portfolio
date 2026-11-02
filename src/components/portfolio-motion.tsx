"use client";

import { animate, inView, useReducedMotion } from "motion/react";
import { type ReactNode, useEffect, useRef } from "react";

export default function PortfolioMotion({ children }: { children: ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);
	const reduceMotion = useReducedMotion();

	useEffect(() => {
		const root = scope.current;
		if (!root || reduceMotion !== false) return;
		const animations: ReturnType<typeof animate>[] = [];
		const ease = [0.16, 1, 0.3, 1] as const;
		// Visible server content must never replay an entrance after hydration.
		const upcoming = Array.from(
			root.querySelectorAll<HTMLElement>(
				".section-intro, .trajectory-list, .about-content, .article-list, .contact-section",
			),
		).filter(
			(element) => element.getBoundingClientRect().top >= window.innerHeight,
		);
		const stopObserving = inView(
			upcoming,
			(element) => {
				animations.push(
					animate(
						element,
						{ y: [8, 0], opacity: [0.8, 1] },
						{ duration: 0.6, ease },
					),
				);
			},
			{ margin: "0px 0px -48px 0px", amount: 0.12 },
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
