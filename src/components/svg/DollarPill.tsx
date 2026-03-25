import { motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { DURATION } from "../../lib/animation-config";

interface DollarPillProps {
	amount: string;
	pathData: string;
	progress: number;
	visible: boolean;
	color?: string;
}

function samplePath(d: string, t: number): { x: number; y: number } {
	if (typeof document === "undefined") return { x: 0, y: 0 };

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", d);
	svg.appendChild(path);
	document.body.appendChild(svg);

	const length = path.getTotalLength();
	const point = path.getPointAtLength(t * length);

	document.body.removeChild(svg);
	return { x: point.x, y: point.y };
}

export function DollarPill({
	amount,
	pathData,
	progress,
	visible,
	color = "var(--trace-primary)",
}: DollarPillProps) {
	const motionProgress = useMotionValue(0);
	const pointsCache = useRef<{ x: number; y: number }[]>([]);

	// Pre-sample path points
	useEffect(() => {
		const samples = 100;
		pointsCache.current = Array.from({ length: samples + 1 }, (_, i) =>
			samplePath(pathData, i / samples),
		);
	}, [pathData]);

	useEffect(() => {
		motionProgress.set(visible ? progress : 0);
	}, [progress, visible, motionProgress]);

	const x = useTransform(motionProgress, (p) => {
		const points = pointsCache.current;
		if (points.length === 0) return 0;
		const idx = Math.min(
			Math.floor(p * (points.length - 1)),
			points.length - 1,
		);
		return points[idx]?.x ?? 0;
	});

	const y = useTransform(motionProgress, (p) => {
		const points = pointsCache.current;
		if (points.length === 0) return 0;
		const idx = Math.min(
			Math.floor(p * (points.length - 1)),
			points.length - 1,
		);
		return points[idx]?.y ?? 0;
	});

	return (
		<motion.g
			initial={{ opacity: 0 }}
			animate={{ opacity: visible ? 1 : 0 }}
			transition={{ duration: DURATION.fade }}
		>
			{/* Glow filter */}
			<defs>
				<filter id="pill-glow" x="-50%" y="-50%" width="200%" height="200%">
					<feGaussianBlur stdDeviation="3" result="blur" />
					<feMerge>
						<feMergeNode in="blur" />
						<feMergeNode in="SourceGraphic" />
					</feMerge>
				</filter>
			</defs>

			<motion.g style={{ x, y }} filter="url(#pill-glow)">
				<rect
					x={-30}
					y={-12}
					width={60}
					height={24}
					rx={12}
					fill="var(--bg-card)"
					stroke={color}
					strokeWidth={1.5}
				/>
				<text
					x={0}
					y={0}
					textAnchor="middle"
					dominantBaseline="central"
					fill={color}
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					{amount}
				</text>
			</motion.g>
		</motion.g>
	);
}
