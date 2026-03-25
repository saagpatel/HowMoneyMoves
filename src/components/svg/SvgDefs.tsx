/** Shared SVG filter definitions — include once per scene SVG */
export function SvgDefs() {
	return (
		<defs>
			{/* Cyan glow for trace paths */}
			<filter id="trace-glow" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur stdDeviation="4" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>

			{/* Purple glow for Fed elements */}
			<filter id="fed-glow" x="-20%" y="-20%" width="140%" height="140%">
				<feGaussianBlur stdDeviation="6" result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
	);
}
