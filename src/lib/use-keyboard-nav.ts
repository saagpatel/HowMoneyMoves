import { useEffect } from "react";
import type { SceneControls } from "../types";

/**
 * Keyboard shortcuts for scene navigation.
 * ArrowRight/Space = next, ArrowLeft = prev, P = toggle play.
 */
export function useKeyboardNav(controls: SceneControls) {
	useEffect(() => {
		function handleKeyDown(e: KeyboardEvent) {
			// Don't capture when user is typing in an input
			const tag = (e.target as HTMLElement).tagName;
			if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

			switch (e.key) {
				case "ArrowRight":
				case " ":
					e.preventDefault();
					controls.next();
					break;
				case "ArrowLeft":
					e.preventDefault();
					controls.prev();
					break;
				case "p":
				case "P":
					e.preventDefault();
					controls.togglePlay();
					break;
			}
		}

		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [controls]);
}
