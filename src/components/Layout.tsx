import { Link, Outlet } from "react-router-dom";
import { SectionNav } from "./SectionNav";

export function Layout() {
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

			<main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8">
				<Outlet />
			</main>
		</div>
	);
}
