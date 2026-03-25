import { motion } from "framer-motion";
import type { SceneStep } from "../types";

interface StepIndicatorProps {
	steps: SceneStep[];
	currentStep: number;
	onStepClick: (step: number) => void;
}

export function StepIndicator({
	steps,
	currentStep,
	onStepClick,
}: StepIndicatorProps) {
	return (
		<div className="flex items-center gap-2">
			{steps.map((step, i) => (
				<button
					key={step.id}
					onClick={() => onStepClick(i)}
					className="group relative flex items-center justify-center"
					aria-label={`Go to ${step.label}`}
					aria-current={i === currentStep ? "step" : undefined}
				>
					<motion.div
						className="h-2.5 w-2.5 rounded-full"
						animate={{
							backgroundColor:
								i === currentStep
									? "var(--trace-primary)"
									: i < currentStep
										? "var(--text-secondary)"
										: "var(--border)",
							scale: i === currentStep ? 1.3 : 1,
						}}
						transition={{ duration: 0.2 }}
					/>
					<span className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs text-text-secondary opacity-0 transition-opacity group-hover:opacity-100">
						{step.label}
					</span>
				</button>
			))}
			<span className="ml-3 text-sm text-text-secondary">
				{currentStep + 1} / {steps.length}
			</span>
		</div>
	);
}
