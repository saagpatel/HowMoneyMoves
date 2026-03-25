/** A single step in an animation scene */
export interface SceneStep {
	id: string;
	label: string;
	narrative: string;
	detail?: string;
	wonkyFact?: string;
	wonkyFactSource?: string;
	errorCase?: {
		title: string;
		description: string;
	};
	animateIn?: string[];
	highlight?: string[];
	animateOut?: string[];
	tracePathId?: string;
}

export interface Section {
	id: string;
	title: string;
	subtitle: string;
	icon: string;
	steps: SceneStep[];
	estimatedMinutes: number;
}

export interface SceneState {
	currentStep: number;
	totalSteps: number;
	isPlaying: boolean;
	playbackSpeed: 1 | 1.5 | 2;
	canGoBack: boolean;
	canGoForward: boolean;
}

export interface SceneControls {
	next: () => void;
	prev: () => void;
	goTo: (step: number) => void;
	togglePlay: () => void;
	setSpeed: (speed: 1 | 1.5 | 2) => void;
}
