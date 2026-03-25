import { useCallback, useEffect, useState } from "react";
import type { SceneControls, SceneState, SceneStep } from "../types";
import { STEP_DURATION_MS } from "./animation-config";

export function useScene(steps: SceneStep[]): [SceneState, SceneControls] {
	const [currentStep, setCurrentStep] = useState(0);
	const [isPlaying, setIsPlaying] = useState(false);
	const [playbackSpeed, setPlaybackSpeed] = useState<1 | 1.5 | 2>(1);

	// Auto-advance timer
	useEffect(() => {
		if (!isPlaying) return;

		const delay = STEP_DURATION_MS / playbackSpeed;
		const timer = setTimeout(() => {
			if (currentStep < steps.length - 1) {
				setCurrentStep((s) => s + 1);
			} else {
				setIsPlaying(false);
			}
		}, delay);

		return () => clearTimeout(timer);
	}, [isPlaying, currentStep, playbackSpeed, steps.length]);

	const next = useCallback(
		() => setCurrentStep((s) => Math.min(s + 1, steps.length - 1)),
		[steps.length],
	);

	const prev = useCallback(() => setCurrentStep((s) => Math.max(s - 1, 0)), []);

	const goTo = useCallback(
		(step: number) => {
			if (step >= 0 && step < steps.length) {
				setCurrentStep(step);
			}
		},
		[steps.length],
	);

	const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

	const setSpeed = useCallback(
		(speed: 1 | 1.5 | 2) => setPlaybackSpeed(speed),
		[],
	);

	const state: SceneState = {
		currentStep,
		totalSteps: steps.length,
		isPlaying,
		playbackSpeed,
		canGoBack: currentStep > 0,
		canGoForward: currentStep < steps.length - 1,
	};

	const controls: SceneControls = {
		next,
		prev,
		goTo,
		togglePlay,
		setSpeed,
	};

	return [state, controls];
}
