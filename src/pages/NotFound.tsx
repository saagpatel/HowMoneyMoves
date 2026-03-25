import { Link } from "react-router-dom";

export function NotFound() {
	return (
		<div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
			<h1 className="text-6xl font-bold text-text-accent">404</h1>
			<p className="mt-4 text-lg text-text-secondary">
				This route doesn't exist in the banking system.
			</p>
			<Link
				to="/"
				className="mt-6 rounded-lg bg-card px-4 py-2 text-text-primary no-underline transition-colors hover:bg-elevated"
			>
				Back to Home
			</Link>
		</div>
	);
}
