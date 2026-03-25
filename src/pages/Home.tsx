import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { DURATION } from "../lib/animation-config";
import { useDocumentHead } from "../lib/use-document-head";

export function Home() {
	useDocumentHead(
		"How Money Moves — See the Plumbing of US Banking",
		"Trace a dollar from paycheck to bank account to Federal Reserve settlement. Interactive animated explainer of ACH, Fedwire, SWIFT, and the rails behind every transaction.",
	);

	return (
		<div className="flex min-h-[70vh] flex-col items-center justify-center text-center">
			<motion.h1
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: DURATION.reveal }}
				className="text-5xl font-bold tracking-tight text-text-primary md:text-7xl"
			>
				How Money <span className="text-text-accent">Moves</span>
			</motion.h1>

			<motion.p
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: DURATION.reveal, delay: 0.2 }}
				className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary"
			>
				Trace a dollar from paycheck to bank account to Federal Reserve
				settlement. See the actual plumbing of the US banking system — the rails
				you use daily but have never seen.
			</motion.p>

			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: DURATION.reveal, delay: 0.4 }}
				className="mt-10"
			>
				<Link
					to="/paycheck"
					className="inline-flex items-center gap-2 rounded-xl bg-trace-primary px-6 py-3 text-lg font-bold text-base no-underline transition-opacity hover:opacity-90"
				>
					Start with Paycheck
					<ArrowRight size={20} />
				</Link>
			</motion.div>
		</div>
	);
}
