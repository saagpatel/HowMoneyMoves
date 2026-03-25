import { motion } from "framer-motion";
import { DURATION, EASE } from "../../lib/animation-config";

interface TimingLabelProps {
	x: number;
	y: number;
	text: string;
	visible: boolean;
	badge?: boolean;
	color?: string;
	fontSize?: number;
}

export function TimingLabel({
	x,
	y,
	text,
	visible,
	badge = false,
	color = "var(--text-secondary)",
	fontSize = 11,
}: TimingLabelProps) {
	const padding = 6;
	const estimatedWidth = text.length * fontSize * 0.55 + padding * 2;

	return (
		<motion.g
			initial={{ opacity: 0 }}
			animate={{ opacity: visible ? 1 : 0 }}
			transition={{
				duration: DURATION.fade,
				ease: EASE.standard as unknown as number[],
			}}
		>
			{badge && (
				<rect
					x={x - estimatedWidth / 2}
					y={y - fontSize / 2 - padding}
					width={estimatedWidth}
					height={fontSize + padding * 2}
					rx={4}
					fill="var(--bg-elevated)"
					stroke="var(--border)"
					strokeWidth={0.5}
				/>
			)}
			<text
				x={x}
				y={y}
				textAnchor="middle"
				dominantBaseline="central"
				fill={color}
				fontSize={fontSize}
				fontWeight={500}
				fontFamily="'JetBrains Mono', monospace"
			>
				{text}
			</text>
		</motion.g>
	);
}
