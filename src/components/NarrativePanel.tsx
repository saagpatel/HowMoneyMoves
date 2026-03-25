import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, ChevronDown, Info } from "lucide-react";
import { useState } from "react";
import { DURATION, EASE } from "../lib/animation-config";
import type { SceneStep } from "../types";

interface NarrativePanelProps {
	step: SceneStep;
}

export function NarrativePanel({ step }: NarrativePanelProps) {
	const [showDetail, setShowDetail] = useState(false);
	const [showError, setShowError] = useState(false);

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={step.id}
				initial={{ opacity: 0, y: 8 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: -8 }}
				transition={{
					duration: DURATION.fade,
					ease: EASE.standard as unknown as number[],
				}}
				className="flex flex-col gap-4"
			>
				<p className="text-base leading-relaxed text-text-primary">
					{step.narrative}
				</p>

				{step.detail && (
					<button
						onClick={() => setShowDetail((d) => !d)}
						className="flex items-center gap-1.5 text-sm text-text-accent transition-colors hover:opacity-80"
					>
						<Info size={14} />
						Show details
						<ChevronDown
							size={14}
							className={`transition-transform ${showDetail ? "rotate-180" : ""}`}
						/>
					</button>
				)}

				<AnimatePresence>
					{showDetail && step.detail && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: "auto", opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: DURATION.fade }}
							className="overflow-hidden"
						>
							<p className="rounded-lg border border-border bg-card p-3 text-sm leading-relaxed text-text-secondary">
								{step.detail}
							</p>
						</motion.div>
					)}
				</AnimatePresence>

				{step.wonkyFact && (
					<div className="rounded-lg border border-trace-primary/20 bg-trace-primary/5 p-3">
						<p className="text-sm font-medium text-text-accent">
							{step.wonkyFact}
						</p>
						{step.wonkyFactSource && (
							<p className="mt-1 text-xs text-text-secondary">
								Source: {step.wonkyFactSource}
							</p>
						)}
					</div>
				)}

				{step.errorCase && (
					<>
						<button
							onClick={() => setShowError((e) => !e)}
							className="flex items-center gap-1.5 text-sm text-amber-400 transition-colors hover:opacity-80"
						>
							<AlertTriangle size={14} />
							What could go wrong?
							<ChevronDown
								size={14}
								className={`transition-transform ${showError ? "rotate-180" : ""}`}
							/>
						</button>

						<AnimatePresence>
							{showError && (
								<motion.div
									initial={{ height: 0, opacity: 0 }}
									animate={{ height: "auto", opacity: 1 }}
									exit={{ height: 0, opacity: 0 }}
									transition={{ duration: DURATION.fade }}
									className="overflow-hidden"
								>
									<div className="rounded-lg border border-amber-400/20 bg-amber-400/5 p-3">
										<p className="text-sm font-medium text-amber-400">
											{step.errorCase.title}
										</p>
										<p className="mt-1 text-sm text-text-secondary">
											{step.errorCase.description}
										</p>
									</div>
								</motion.div>
							)}
						</AnimatePresence>
					</>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
