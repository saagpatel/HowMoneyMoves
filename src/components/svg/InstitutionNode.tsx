import { motion } from "framer-motion";
import { DURATION, EASE } from "../../lib/animation-config";

interface InstitutionNodeProps {
	x: number;
	y: number;
	width?: number;
	height?: number;
	label: string;
	icon: string;
	color: string;
	visible: boolean;
	highlighted?: boolean;
	variant?: "default" | "octagon";
	dashed?: boolean;
}

function octagonPoints(cx: number, cy: number, r: number): string {
	return Array.from({ length: 8 }, (_, i) => {
		const angle = Math.PI / 8 + (i * Math.PI) / 4;
		const px = cx + r * Math.cos(angle);
		const py = cy + r * Math.sin(angle);
		return `${px},${py}`;
	}).join(" ");
}

export function InstitutionNode({
	x,
	y,
	width = 140,
	height = 80,
	label,
	icon,
	color,
	visible,
	highlighted = false,
	variant = "default",
	dashed = false,
}: InstitutionNodeProps) {
	const cx = x + width / 2;
	const iconY = y + height / 2 - 4;
	const labelY = y + height + 18;

	return (
		<motion.g
			initial={{ opacity: 0, y: 10 }}
			animate={{
				opacity: visible ? 1 : 0,
				y: visible ? 0 : 10,
			}}
			transition={{
				duration: DURATION.reveal,
				ease: EASE.standard as unknown as number[],
			}}
		>
			{/* Highlight glow */}
			{highlighted && variant === "default" && (
				<motion.rect
					x={x - 4}
					y={y - 4}
					width={width + 8}
					height={height + 8}
					rx={16}
					fill="none"
					stroke={color}
					strokeWidth={1.5}
					initial={{ opacity: 0 }}
					animate={{ opacity: [0.3, 0.7, 0.3] }}
					transition={{
						duration: DURATION.pulse,
						repeat: Infinity,
						ease: "easeInOut",
					}}
				/>
			)}

			{variant === "octagon" ? (
				<>
					{highlighted && (
						<motion.polygon
							points={octagonPoints(cx, y + height / 2, height / 2 + 6)}
							fill="none"
							stroke={color}
							strokeWidth={1.5}
							initial={{ opacity: 0 }}
							animate={{ opacity: [0.3, 0.7, 0.3] }}
							transition={{
								duration: DURATION.pulse,
								repeat: Infinity,
								ease: "easeInOut",
							}}
						/>
					)}
					<polygon
						points={octagonPoints(cx, y + height / 2, height / 2)}
						fill={color}
						stroke="var(--border)"
						strokeWidth={1.5}
						opacity={0.9}
					/>
				</>
			) : (
				<rect
					x={x}
					y={y}
					width={width}
					height={height}
					rx={12}
					fill={color}
					stroke="var(--border)"
					strokeWidth={1.5}
					strokeDasharray={dashed ? "6 3" : undefined}
					opacity={0.9}
				/>
			)}

			{/* Icon */}
			<text
				x={cx}
				y={iconY}
				textAnchor="middle"
				dominantBaseline="central"
				fontSize={22}
				style={{ userSelect: "none" }}
			>
				{icon}
			</text>

			{/* Label */}
			<text
				x={cx}
				y={labelY}
				textAnchor="middle"
				fill="var(--text-primary)"
				fontSize={12}
				fontWeight={500}
				fontFamily="'Space Grotesk', system-ui, sans-serif"
			>
				{label}
			</text>
		</motion.g>
	);
}
