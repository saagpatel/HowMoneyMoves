import type { ReactNode } from "react";
import { useScene } from "../lib/use-scene";
import type { SceneStep } from "../types";
import { ControlBar } from "./ControlBar";
import { NarrativePanel } from "./NarrativePanel";
import { StepIndicator } from "./StepIndicator";

interface AnimationSceneProps {
	steps: SceneStep[];
	children: (currentStep: number, steps: SceneStep[]) => ReactNode;
}

export function AnimationScene({ steps, children }: AnimationSceneProps) {
	const [state, controls] = useScene(steps);
	const currentStepData = steps[state.currentStep];

	return (
		<div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
			{/* SVG canvas area */}
			<div className="flex-1">
				<div className="rounded-xl border border-border bg-card p-4">
					{children(state.currentStep, steps)}
				</div>

				<div className="mt-4 flex flex-col items-center gap-4">
					<StepIndicator
						steps={steps}
						currentStep={state.currentStep}
						onStepClick={controls.goTo}
					/>
					<ControlBar state={state} controls={controls} />
				</div>
			</div>

			{/* Narrative panel */}
			<div className="w-full lg:w-80">
				<div className="sticky top-4">
					<h3 className="mb-3 text-lg font-bold text-text-accent">
						{currentStepData.label}
					</h3>
					<NarrativePanel step={currentStepData} />
				</div>
			</div>
		</div>
	);
}
