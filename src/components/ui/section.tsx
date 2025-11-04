"use client";
import { motion } from "motion/react";
import type { ReactNode, Ref } from "react";

interface SectionProps {
	className?: string;
	ref?: Ref<HTMLDivElement>;
	children: ReactNode;
}

export default function Section({ children, ref, className }: SectionProps) {
	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: "-150px" }}
			className={className}
			ref={ref}
		>
			{children}
		</motion.section>
	);
}
