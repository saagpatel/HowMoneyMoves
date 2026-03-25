import { motion } from "framer-motion";
import { DollarPill } from "../components/svg/DollarPill";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TimingLabel } from "../components/svg/TimingLabel";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface AchSceneProps {
	currentStep: number;
}

// Nodes: left-to-right but conceptually a "pull" from right to left
const ORIGINATOR = { x: 30, y: 200, w: 130, h: 80 };
const ODFI = { x: 195, y: 200, w: 120, h: 80 };
const ACH_OP = { x: 345, y: 200, w: 120, h: 80 };
const RDFI = { x: 505, y: 200, w: 120, h: 80 };
const ACCOUNT = { x: 660, y: 200, w: 120, h: 80 };

// Trace paths (left to right: origination flow)
const TRACE_1 = `M ${ORIGINATOR.x + ORIGINATOR.w} ${ORIGINATOR.y + ORIGINATOR.h / 2} L ${ODFI.x} ${ODFI.y + ODFI.h / 2}`;
const TRACE_2 = `M ${ODFI.x + ODFI.w} ${ODFI.y + ODFI.h / 2} L ${ACH_OP.x} ${ACH_OP.y + ACH_OP.h / 2}`;
const TRACE_3 = `M ${ACH_OP.x + ACH_OP.w} ${ACH_OP.y + ACH_OP.h / 2} L ${RDFI.x} ${RDFI.y + RDFI.h / 2}`;
const TRACE_4 = `M ${RDFI.x + RDFI.w} ${RDFI.y + RDFI.h / 2} L ${ACCOUNT.x} ${ACCOUNT.y + ACCOUNT.h / 2}`;

// Pull path: money flows right-to-left (from account back to originator)
const PULL_PATH = `M ${ACCOUNT.x + ACCOUNT.w / 2} ${ACCOUNT.y + ACCOUNT.h / 2} C ${RDFI.x + RDFI.w} ${ACCOUNT.y + ACCOUNT.h / 2}, ${RDFI.x + RDFI.w / 2} ${RDFI.y + RDFI.h / 2}, ${ACH_OP.x + ACH_OP.w / 2} ${ACH_OP.y + ACH_OP.h / 2} C ${ACH_OP.x} ${ACH_OP.y + ACH_OP.h / 2}, ${ODFI.x + ODFI.w} ${ODFI.y + ODFI.h / 2}, ${ORIGINATOR.x + ORIGINATOR.w / 2} ${ORIGINATOR.y + ORIGINATOR.h / 2}`;

// Return codes
const RETURN_CODES = [
	{ code: "R01", label: "Insufficient Funds", color: "var(--trace-primary)" },
	{ code: "R02", label: "Account Closed", color: "var(--text-secondary)" },
	{
		code: "R03",
		label: "No Account / Unable to Locate",
		color: "var(--text-secondary)",
	},
	{ code: "R10", label: "Customer Advises Unauthorized", color: "#f59e0b" },
];

export function AchScene({ currentStep }: AchSceneProps) {
	return (
		<svg
			viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
			preserveAspectRatio={SVG_VIEWBOX.aspectRatio}
			className="w-full"
		>
			<SvgDefs />

			{/* Title */}
			<motion.text
				x={SVG_VIEWBOX.width / 2}
				y={35}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize={13}
				fontFamily="'JetBrains Mono', monospace"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				ACH Debit (Pull) Flow
			</motion.text>

			{/* Authorization banner (step 0) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep === 0 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={SVG_VIEWBOX.width / 2 - 120}
					y={55}
					width={240}
					height={28}
					rx={6}
					fill="var(--bg-elevated)"
					stroke="#f59e0b"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={73}
					textAnchor="middle"
					fill="#f59e0b"
					fontSize={11}
					fontWeight={600}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					⚠️ Authorization Required First
				</text>
			</motion.g>

			{/* Pull direction arrows (dashed, right-to-left) */}
			<TracePath d={TRACE_1} active={currentStep >= 1} />
			<TracePath d={TRACE_2} active={currentStep >= 2} delay={0.2} />
			<TracePath d={TRACE_3} active={currentStep >= 3} delay={0.2} />
			<TracePath d={TRACE_4} active={currentStep >= 3} delay={0.4} />

			{/* Pull direction indicator */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={175}
				text="← PULL direction (money flows right to left) →"
				visible={currentStep >= 3}
				fontSize={9}
				color="var(--trace-primary)"
			/>

			{/* Nodes */}
			<InstitutionNode
				x={ORIGINATOR.x}
				y={ORIGINATOR.y}
				width={ORIGINATOR.w}
				height={ORIGINATOR.h}
				label="Originator"
				icon="🏪"
				color="var(--node-employer)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			<InstitutionNode
				x={ODFI.x}
				y={ODFI.y}
				width={ODFI.w}
				height={ODFI.h}
				label="ODFI"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 1}
				highlighted={currentStep === 1}
			/>

			<InstitutionNode
				x={ACH_OP.x}
				y={ACH_OP.y}
				width={ACH_OP.w}
				height={ACH_OP.h}
				label="ACH Operator"
				icon="🏛️"
				color="var(--node-fed)"
				visible={currentStep >= 2}
				highlighted={currentStep === 2}
				variant="octagon"
			/>

			<InstitutionNode
				x={RDFI.x}
				y={RDFI.y}
				width={RDFI.w}
				height={RDFI.h}
				label="RDFI (Your Bank)"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 3}
				highlighted={currentStep === 3}
			/>

			<InstitutionNode
				x={ACCOUNT.x}
				y={ACCOUNT.y}
				width={ACCOUNT.w}
				height={ACCOUNT.h}
				label="Your Account"
				icon="👤"
				color="var(--trace-primary)"
				visible={currentStep >= 3}
				highlighted={currentStep === 3}
			/>

			{/* ACH Debit Entry label */}
			<TimingLabel
				x={(ORIGINATOR.x + ORIGINATOR.w + ODFI.x) / 2}
				y={ORIGINATOR.y - 15}
				text="ACH Debit Entry"
				visible={currentStep >= 1}
				badge
				color="var(--text-accent)"
			/>

			{/* Dollar pill — pull direction */}
			<DollarPill
				amount="$150"
				pathData={PULL_PATH}
				progress={currentStep >= 4 ? 1 : 0}
				visible={currentStep >= 4}
			/>

			{/* T+1 Settlement label */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={340}
				text="Settlement: T+1 business day"
				visible={currentStep >= 4}
				badge
				color="var(--text-accent)"
			/>

			{/* Return codes panel (step 5) */}
			<motion.g
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: currentStep >= 5 ? 1 : 0,
					y: currentStep >= 5 ? 0 : 10,
				}}
				transition={{
					duration: DURATION.reveal,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<rect
					x={140}
					y={370}
					width={SVG_VIEWBOX.width - 280}
					height={110}
					rx={8}
					fill="var(--bg-card)"
					stroke="var(--border)"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={392}
					textAnchor="middle"
					fill="var(--text-primary)"
					fontSize={12}
					fontWeight={700}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					Common ACH Return Codes
				</text>

				{RETURN_CODES.map((rc, i) => (
					<g key={rc.code}>
						<text
							x={180}
							y={415 + i * 16}
							fill={rc.color}
							fontSize={10}
							fontWeight={700}
							fontFamily="'JetBrains Mono', monospace"
						>
							{rc.code}
						</text>
						<text
							x={225}
							y={415 + i * 16}
							fill="var(--text-secondary)"
							fontSize={10}
							fontFamily="'Space Grotesk', system-ui, sans-serif"
						>
							{rc.label}
						</text>
					</g>
				))}
			</motion.g>
		</svg>
	);
}
