import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { SECTION_ORDER } from "../data/sections";
import { SectionNav } from "./SectionNav";

export function Layout() {
	const navigate = useNavigate();

	// 1-6 keys jump to sections
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			const tag = (e.target as HTMLElement).tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

			const num = Number.parseInt(e.key, 10);
			if (num >= 1 && num <= SECTION_ORDER.length) {
				e.preventDefault();
				navigate(`/${SECTION_ORDER[num - 1]}`);
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [navigate]);

	return (
		<div className="flex min-h-screen flex-col">
			<header className="border-b border-border bg-card/50 backdrop-blur-sm">
				<div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
					<Link
						to="/"
						className="text-lg font-bold tracking-tight text-text-primary no-underline"
					>
						How Money Moves
					</Link>
				</div>
				<div className="mx-auto max-w-7xl">
					<SectionNav />
				</div>
			</header>

			<main
				id="main-content"
				className="mx-auto w-full max-w-7xl flex-1 px-4 py-8"
			>
				<Outlet />
			</main>
		</div>
	);
}
