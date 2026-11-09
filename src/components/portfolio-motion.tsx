"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ReactNode, useEffect, useRef, useState } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PortfolioMotion({ children }: { children: ReactNode }) {
	const scope = useRef<HTMLDivElement>(null);
	const [ready, setReady] = useState(false);

	useEffect(() => {
		let cancelled = false;
		document.fonts.ready.then(() => {
			if (!cancelled) setReady(true);
		});
		return () => {
			cancelled = true;
		};
	}, []);

	useGSAP(
		() => {
			const root = scope.current;
			if (!root || !ready) return;
			// Streamed articles hydrate and animate in their own scope.
			const owned = (selector: string) =>
				Array.from(root.querySelectorAll<HTMLElement>(selector)).filter(
					(element) => element.closest(".motion-scope") === root,
				);
			const media = gsap.matchMedia();
			media.add("(prefers-reduced-motion: no-preference)", () => {
				const mobile = window.matchMedia("(max-width: 640px)").matches;
				const animations: { block: HTMLElement; tween: gsap.core.Animation }[] =
					[];
				const entrance = gsap.timeline({ defaults: { ease: "expo.out" } });
				const hero = owned(".hero")[0];
				const support = owned(".hero-bottom > p, .hero-actions, .hero-scroll");
				const openingSupport =
					hero && hero.getBoundingClientRect().top >= -100
						? support.filter(
								(block) =>
									block.getBoundingClientRect().top < window.innerHeight * 0.86,
							)
						: [];
				if (hero && hero.getBoundingClientRect().top >= -100) {
					entrance
						.from(
							owned(
								".site-header > .wordmark, .site-header nav > *, .site-header > button",
							),
							{
								y: -12,
								opacity: 0,
								duration: 0.8,
								stagger: { amount: 0.18 },
								clearProps: "transform,opacity",
							},
							0,
						)
						.from(
							owned(".hero-identity > *"),
							{
								y: 16,
								opacity: 0,
								duration: 0.9,
								stagger: 0.08,
								clearProps: "transform,opacity",
							},
							0.12,
						)
						.from(
							owned(".title-line > span"),
							{
								yPercent: 110,
								rotation: 2,
								scale: 0.96,
								duration: 1.35,
								stagger: 0.14,
								clearProps: "transform",
							},
							0.2,
						)
						.from(
							openingSupport.flatMap((block) =>
								block.matches(".hero-actions")
									? Array.from(block.children)
									: [block],
							),
							{
								y: mobile ? 16 : 24,
								opacity: 0,
								duration: 1,
								stagger: { amount: 0.24 },
								clearProps: "transform,opacity",
							},
							0.48,
						);
					animations.push({ block: hero, tween: entrance });
					const header = owned(".site-header")[0];
					if (header) animations.push({ block: header, tween: entrance });
				}

				for (const block of [
					...owned(
						".section-intro, .trajectory-list > li, .about-content > p, .about-content > h3, .technology-list, .article-link, .article-list > p, .contact-section > h2, .contact-bottom, .contact-links, .portfolio-footer",
					),
					...support.filter((block) => !openingSupport.includes(block)),
				]) {
					// A restored scroll position must never hide content already passed.
					if (block.getBoundingClientRect().bottom <= 0) continue;
					const parts = Array.from(block.children).filter(
						(child) => !child.matches(".sr-only, br, em"),
					);
					const targets =
						block.matches("h2, h3, p, .hero-scroll") || !parts.length
							? [block]
							: parts;
					const tween = gsap.fromTo(
						targets,
						{
							y: mobile ? 16 : 28,
							scale: 0.98,
							opacity: 0,
							transformOrigin: "left top",
						},
						{
							y: 0,
							scale: 1,
							opacity: 1,
							duration: 0.95,
							ease: "expo.out",
							stagger: { amount: mobile ? 0.16 : 0.24 },
							clearProps: "transform,opacity,transformOrigin",
							scrollTrigger: {
								trigger: block,
								start: "clamp(top 86%)",
								once: true,
							},
						},
					);
					animations.push({ block, tween });
				}

				// Keyboard navigation reveals its destination without waiting for motion.
				const onFocus = (event: FocusEvent) => {
					if (!(event.target instanceof Node)) return;
					for (const { block, tween } of animations) {
						if (block.contains(event.target)) tween.progress(1);
					}
				};
				root.addEventListener("focusin", onFocus);
				let frame = requestAnimationFrame(() => ScrollTrigger.refresh());
				const observer = new ResizeObserver(() => {
					cancelAnimationFrame(frame);
					frame = requestAnimationFrame(() => ScrollTrigger.refresh());
				});
				const surface = root.querySelector("main, section");
				if (surface) observer.observe(surface);
				return () => {
					root.removeEventListener("focusin", onFocus);
					observer.disconnect();
					cancelAnimationFrame(frame);
				};
			});
			return () => media.revert();
		},
		{ scope, dependencies: [ready], revertOnUpdate: true },
	);

	return (
		<div ref={scope} className="motion-scope" data-motion-ready={ready}>
			{children}
		</div>
	);
}
