import type { Config } from "tailwindcss";

export default {
	content: ["./index.html", "./src/**/*.{ts,tsx}"],
	theme: {
		extend: {
			colors: {
				base: "var(--bg-base)",
				card: "var(--bg-card)",
				elevated: "var(--bg-elevated)",
				"trace-primary": "var(--trace-primary)",
				"trace-secondary": "var(--trace-secondary)",
				"node-bank": "var(--node-bank)",
				"node-fed": "var(--node-fed)",
				"node-employer": "var(--node-employer)",
				"node-swift": "var(--node-swift)",
				"text-primary": "var(--text-primary)",
				"text-secondary": "var(--text-secondary)",
				"text-accent": "var(--text-accent)",
				border: "var(--border)",
			},
			fontFamily: {
				mono: ["JetBrains Mono", "Fira Code", "monospace"],
				display: ["Space Grotesk", "system-ui", "sans-serif"],
				body: ["Space Grotesk", "system-ui", "sans-serif"],
			},
		},
	},
	plugins: [],
} satisfies Config;
