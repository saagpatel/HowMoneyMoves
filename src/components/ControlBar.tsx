import { ChevronLeft, ChevronRight, Gauge, Pause, Play } from "lucide-react";
import type { SceneControls, SceneState } from "../types";

interface ControlBarProps {
	state: SceneState;
	controls: SceneControls;
}

const SPEED_OPTIONS = [1, 1.5, 2] as const;

export function ControlBar({ state, controls }: ControlBarProps) {
	const nextSpeed = () => {
		const currentIndex = SPEED_OPTIONS.indexOf(state.playbackSpeed);
		const nextIndex = (currentIndex + 1) % SPEED_OPTIONS.length;
		controls.setSpeed(SPEED_OPTIONS[nextIndex]);
	};

	return (
		<div className="flex items-center justify-center gap-3">
			<button
				onClick={controls.prev}
				disabled={!state.canGoBack}
				className="flex h-11 w-11 items-center justify-center rounded-lg bg-card text-text-primary transition-colors hover:bg-elevated disabled:opacity-30 disabled:hover:bg-card"
				aria-label="Previous step"
			>
				<ChevronLeft size={20} />
			</button>

			<button
				onClick={controls.togglePlay}
				className="flex h-11 w-11 items-center justify-center rounded-lg bg-trace-primary text-base transition-colors hover:opacity-90"
				aria-label={state.isPlaying ? "Pause" : "Play"}
			>
				{state.isPlaying ? <Pause size={20} /> : <Play size={20} />}
			</button>

			<button
				onClick={controls.next}
				disabled={!state.canGoForward}
				className="flex h-11 w-11 items-center justify-center rounded-lg bg-card text-text-primary transition-colors hover:bg-elevated disabled:opacity-30 disabled:hover:bg-card"
				aria-label="Next step"
			>
				<ChevronRight size={20} />
			</button>

			<button
				onClick={nextSpeed}
				className="ml-2 flex h-11 items-center gap-1.5 rounded-lg bg-card px-3 text-sm text-text-secondary transition-colors hover:bg-elevated"
				aria-label={`Playback speed: ${state.playbackSpeed}x`}
			>
				<Gauge size={16} />
				{state.playbackSpeed}x
			</button>
		</div>
	);
}
