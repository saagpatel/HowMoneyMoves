/** Base duration for auto-play step advance (ms) */
export const STEP_DURATION_MS = 4000;

/** Animation durations (seconds) for Framer Motion */
export const DURATION = {
	/** Trace path draw along SVG stroke */
	tracePath: 0.8,
	/** Element fade in/out */
	fade: 0.4,
	/** Element slide + fade */
	reveal: 0.5,
	/** Pulse highlight loop */
	pulse: 1.2,
	/** Section transition crossfade */
	sectionTransition: 0.3,
} as const;

/** Easing curves for Framer Motion */
export const EASE = {
	/** Default for most animations */
	standard: [0.4, 0, 0.2, 1] as const,
	/** Enter/appear animations */
	enter: [0, 0, 0.2, 1] as const,
	/** Exit/disappear animations */
	exit: [0.4, 0, 1, 1] as const,
	/** Trace path drawing */
	trace: "easeInOut" as const,
} as const;

/** SVG viewBox defaults */
export const SVG_VIEWBOX = {
	width: 800,
	height: 500,
	/** preserveAspectRatio for responsive SVGs */
	aspectRatio: "xMidYMid meet" as const,
} as const;
