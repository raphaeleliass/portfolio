"use client";
import clsx from "clsx";
import { SidebarCloseIcon, SidebarOpenIcon } from "lucide-react";
import type { HTMLAttributes, ReactNode, Ref } from "react";
import { useSidebar } from "@/hooks/useSidebar";
import { Button } from "../ui/button";
import ThemeToggle from "../ui/theme-toggle";

interface EditorProps<T extends HTMLElement>
	extends HTMLAttributes<HTMLDivElement> {
	className?: string;
	children?: ReactNode;
	ref?: Ref<T>;
}

function Editor({
	className,
	ref,
	children,
	...props
}: EditorProps<HTMLDivElement>) {
	return (
		<section
			className={clsx(
				"container flex h-full w-full flex-col overflow-hidden rounded-xl bg-background/90 shadow-2xl outline-4 outline-muted/20",
				className,
			)}
			ref={ref}
			{...props}
		>
			{children}
		</section>
	);
}

function EditorHeader({
	className,
	children,
	ref,
	...props
}: EditorProps<HTMLHeadElement>) {
	return (
		<header
			className={clsx(
				"inline-flex h-10 w-full items-center justify-between border-b bg-muted px-4 py-1.5",
				className,
			)}
			ref={ref}
			{...props}
		>
			<div className="inline-flex items-center gap-2">
				<div className="size-2.5 rounded-full bg-green-500" />
				<div className="size-2.5 rounded-full bg-yellow-500" />
				<div className="size-2.5 rounded-full bg-red-500" />
			</div>
			{children}
		</header>
	);
}

function EditorWrapper({
	className,
	ref,
	children,
	...props
}: EditorProps<HTMLDivElement>) {
	return (
		<div
			className="inline-flex h-full w-full items-center"
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
}

function EditorSidebar({
	className,
	ref,
	children,
	...props
}: EditorProps<HTMLDivElement>) {
	const { isSidebarOpen } = useSidebar();

	return (
		<aside
			className={clsx(
				"relative h-full w-full max-w-2xl bg-muted px-2 pt-4 transition-all duration-300 ease-in-out data-[active=true]:w-0 data-[active=true]:px-0 data-[active=true]:text-transparent data-[active=true]:opacity-0 md:max-w-1/3 lg:max-w-1/4",
				className,
			)}
			data-active={isSidebarOpen}
			ref={ref}
			{...props}
		>
			<div>
				<h3 className="w-full border-b pb-2 text-muted-foreground text-sm uppercase">
					Explorer
				</h3>

				{children}
			</div>
		</aside>
	);
}

function EditorSidebarItem({
	className,
	ref,
	children,
	...props
}: EditorProps<HTMLDivElement>) {
	return (
		<div className={clsx("overflow-hidden", className)} ref={ref} {...props}>
			{children}
		</div>
	);
}

function EditorContent({
	className,
	ref,
	children,
	...props
}: EditorProps<HTMLDivElement>) {
	const { isSidebarOpen } = useSidebar();
	return (
		<div
			className={clsx(
				"relative h-full w-full overflow-x-hidden overflow-y-scroll bg-background/90 pt-4 pb-16 transition-all duration-300 selection:bg-foreground selection:text-background data-[active=false]:pl-4 data-[active=false]:max-sm:w-32",
				className,
			)}
			data-active={isSidebarOpen}
			ref={ref}
			{...props}
		>
			{children}
		</div>
	);
}

function EditorFloatingMenu({
	className,
	ref,
	...props
}: EditorProps<HTMLDivElement>) {
	const { isSidebarOpen, toggleSidebar } = useSidebar();
	return (
		<div
			className={clsx(
				"sticky top-0 left-2 mb-8 flex w-fit flex-row items-center gap-0.5 rounded-md border border-muted-foreground/10 bg-muted-foreground/20 p-0.5 shadow-2xl backdrop-blur-sm",
				className,
			)}
			data-ative={isSidebarOpen}
			ref={ref}
			{...props}
		>
			<Button
				variant={"secondary"}
				className="bg-transparent text-muted-foreground"
				size={"icon-sm"}
				onClick={toggleSidebar}
			>
				{isSidebarOpen ? <SidebarOpenIcon /> : <SidebarCloseIcon />}
			</Button>

			<ThemeToggle className="bg-transparent text-muted-foreground" />
		</div>
	);
}

export {
	Editor,
	EditorHeader,
	EditorWrapper,
	EditorSidebar,
	EditorSidebarItem,
	EditorContent,
	EditorFloatingMenu,
};
