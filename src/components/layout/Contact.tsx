"use client";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import Section from "../ui/section";

export default function Contact() {
	function handleCopyEmail() {
		navigator.clipboard.writeText("raphaeleliass@outlook.com");
		toast.success("Email copiado para área de transferência");
	}

	return (
		<Section className="mt-32 flex flex-col gap-4">
			<Badge className="mx-auto">Contato</Badge>
			<h1 className="mt-4 text-balance text-center">
				Entre em contato comigo.
			</h1>
			<p className="text-center">
				Você pode falar comigo via{" "}
				<button
					type="button"
					className="relative cursor-pointer text-foreground underline underline-offset-2"
					onClick={() => handleCopyEmail()}
				>
					email
				</button>{" "}
				ou redes sociais, eu responderei assim que puder.
			</p>
		</Section>
	);
}
