import { motion } from "framer-motion";
import { DURATION, EASE } from "../../lib/animation-config";

interface TracePathProps {
	d: string;
	active: boolean;
	color?: string;
	strokeWidth?: number;
	delay?: number;
	dashed?: boolean;
}

export function TracePath({
	d,
	active,
	color = "var(--trace-primary)",
	strokeWidth = 2,
	delay = 0,
	dashed = false,
}: TracePathProps) {
	return (
		<>
			{/* Background path (dim, always visible when active) */}
			<motion.path
				d={d}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinecap="round"
				strokeDasharray={dashed ? "6 4" : undefined}
				initial={{ opacity: 0 }}
				animate={{ opacity: active ? 0.15 : 0 }}
				transition={{ duration: DURATION.fade }}
			/>

			{/* Animated foreground path */}
			<motion.path
				d={d}
				stroke={color}
				strokeWidth={strokeWidth}
				fill="none"
				strokeLinecap="round"
				strokeDasharray={dashed ? "6 4" : undefined}
				initial={{ pathLength: 0, opacity: 0 }}
				animate={{
					pathLength: active ? 1 : 0,
					opacity: active ? 1 : 0,
				}}
				transition={{
					pathLength: {
						duration: DURATION.tracePath,
						ease: EASE.trace,
						delay,
					},
					opacity: { duration: DURATION.fade, delay },
				}}
			/>
		</>
	);
}
