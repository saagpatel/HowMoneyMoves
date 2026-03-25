import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { SceneStep } from "../types";
import { useScene } from "./use-scene";

const mockSteps: SceneStep[] = [
	{ id: "step-1", label: "Step 1", narrative: "First step" },
	{ id: "step-2", label: "Step 2", narrative: "Second step" },
	{ id: "step-3", label: "Step 3", narrative: "Third step" },
];

describe("useScene", () => {
	it("initializes at step 0", () => {
		const { result } = renderHook(() => useScene(mockSteps));
		const [state] = result.current;

		expect(state.currentStep).toBe(0);
		expect(state.totalSteps).toBe(3);
		expect(state.isPlaying).toBe(false);
		expect(state.playbackSpeed).toBe(1);
	});

	it("canGoBack is false at step 0", () => {
		const { result } = renderHook(() => useScene(mockSteps));
		expect(result.current[0].canGoBack).toBe(false);
	});

	it("canGoForward is true when not at last step", () => {
		const { result } = renderHook(() => useScene(mockSteps));
		expect(result.current[0].canGoForward).toBe(true);
	});

	it("advances to next step on next()", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].next());

		expect(result.current[0].currentStep).toBe(1);
		expect(result.current[0].canGoBack).toBe(true);
	});

	it("does not go past last step", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].goTo(2));
		act(() => result.current[1].next());

		expect(result.current[0].currentStep).toBe(2);
		expect(result.current[0].canGoForward).toBe(false);
	});

	it("goes back on prev()", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].next());
		act(() => result.current[1].prev());

		expect(result.current[0].currentStep).toBe(0);
	});

	it("does not go before step 0", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].prev());

		expect(result.current[0].currentStep).toBe(0);
	});

	it("goTo jumps to specific step", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].goTo(2));

		expect(result.current[0].currentStep).toBe(2);
	});

	it("goTo ignores out-of-bounds values", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].goTo(10));

		expect(result.current[0].currentStep).toBe(0);
	});

	it("togglePlay toggles isPlaying", () => {
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].togglePlay());
		expect(result.current[0].isPlaying).toBe(true);

		act(() => result.current[1].togglePlay());
		expect(result.current[0].isPlaying).toBe(false);
	});

	it("autoplay advances step after 4000ms at 1x speed", () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].togglePlay());

		act(() => vi.advanceTimersByTime(4000));
		expect(result.current[0].currentStep).toBe(1);

		act(() => vi.advanceTimersByTime(4000));
		expect(result.current[0].currentStep).toBe(2);

		vi.useRealTimers();
	});

	it("2x speed advances step after 2000ms", () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].setSpeed(2));
		act(() => result.current[1].togglePlay());

		act(() => vi.advanceTimersByTime(2000));
		expect(result.current[0].currentStep).toBe(1);

		vi.useRealTimers();
	});

	it("autoplay stops at last step", () => {
		vi.useFakeTimers();
		const { result } = renderHook(() => useScene(mockSteps));

		act(() => result.current[1].goTo(1));
		act(() => result.current[1].togglePlay());

		// Advance to step 2 (last)
		act(() => vi.advanceTimersByTime(4000));
		expect(result.current[0].currentStep).toBe(2);

		// Should stop playing at last step
		act(() => vi.advanceTimersByTime(4000));
		expect(result.current[0].isPlaying).toBe(false);
		expect(result.current[0].currentStep).toBe(2);

		vi.useRealTimers();
	});
});
