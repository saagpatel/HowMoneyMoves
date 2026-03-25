import { motion } from "framer-motion";
import { DollarPill } from "../components/svg/DollarPill";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TimingLabel } from "../components/svg/TimingLabel";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface DirectDepositSceneProps {
	currentStep: number;
}

// Node positions — 4 nodes in a line
const ODFI = { x: 20, y: 190, w: 130, h: 80 };
const ACH_OP = { x: 220, y: 190, w: 130, h: 80 };
const RDFI = { x: 420, y: 190, w: 130, h: 80 };
const ACCOUNT = { x: 620, y: 190, w: 140, h: 80 };

// Trace paths
const TRACE_1 = `M ${ODFI.x + ODFI.w} ${ODFI.y + ODFI.h / 2} C ${ODFI.x + ODFI.w + 40} ${ODFI.y + ODFI.h / 2}, ${ACH_OP.x - 40} ${ACH_OP.y + ACH_OP.h / 2}, ${ACH_OP.x} ${ACH_OP.y + ACH_OP.h / 2}`;
const TRACE_2 = `M ${ACH_OP.x + ACH_OP.w} ${ACH_OP.y + ACH_OP.h / 2} C ${ACH_OP.x + ACH_OP.w + 40} ${ACH_OP.y + ACH_OP.h / 2}, ${RDFI.x - 40} ${RDFI.y + RDFI.h / 2}, ${RDFI.x} ${RDFI.y + RDFI.h / 2}`;
const TRACE_3 = `M ${RDFI.x + RDFI.w} ${RDFI.y + RDFI.h / 2} C ${RDFI.x + RDFI.w + 40} ${RDFI.y + RDFI.h / 2}, ${ACCOUNT.x - 40} ${ACCOUNT.y + ACCOUNT.h / 2}, ${ACCOUNT.x} ${ACCOUNT.y + ACCOUNT.h / 2}`;
const FULL_PATH = `M ${ODFI.x + ODFI.w / 2} ${ODFI.y + ODFI.h / 2} C ${ODFI.x + ODFI.w + 20} ${ODFI.y + ODFI.h / 2}, ${ACH_OP.x - 20} ${ACH_OP.y + ACH_OP.h / 2}, ${ACH_OP.x + ACH_OP.w / 2} ${ACH_OP.y + ACH_OP.h / 2} C ${ACH_OP.x + ACH_OP.w + 20} ${ACH_OP.y + ACH_OP.h / 2}, ${RDFI.x - 20} ${RDFI.y + RDFI.h / 2}, ${RDFI.x + RDFI.w / 2} ${RDFI.y + RDFI.h / 2} C ${RDFI.x + RDFI.w + 20} ${RDFI.y + RDFI.h / 2}, ${ACCOUNT.x - 20} ${ACCOUNT.y + ACCOUNT.h / 2}, ${ACCOUNT.x + ACCOUNT.w / 2} ${ACCOUNT.y + ACCOUNT.h / 2}`;

export function DirectDepositScene({ currentStep }: DirectDepositSceneProps) {
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
				y={40}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize={13}
				fontFamily="'JetBrains Mono', monospace"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				Direct Deposit (ACH Credit) Flow
			</motion.text>

			{/* Trace paths */}
			<TracePath d={TRACE_1} active={currentStep >= 1} />
			<TracePath d={TRACE_2} active={currentStep >= 3} delay={0.2} />
			<TracePath d={TRACE_3} active={currentStep >= 4} delay={0.2} />

			{/* Nodes */}
			<InstitutionNode
				x={ODFI.x}
				y={ODFI.y}
				width={ODFI.w}
				height={ODFI.h}
				label="ODFI"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			<InstitutionNode
				x={ACH_OP.x}
				y={ACH_OP.y}
				width={ACH_OP.w}
				height={ACH_OP.h}
				label="ACH Operator (Fed)"
				icon="🏛️"
				color="var(--node-fed)"
				visible={currentStep >= 1}
				highlighted={currentStep === 1 || currentStep === 2}
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
				visible={currentStep >= 4}
				highlighted={currentStep === 4}
			/>

			{/* ACH Credit label (step 0) */}
			<TimingLabel
				x={ODFI.x + ODFI.w / 2}
				y={ODFI.y - 20}
				text="ACH Credit Push"
				visible={currentStep >= 0}
				badge
				color="var(--text-accent)"
			/>

			{/* Processing windows label (step 1-2) */}
			<TimingLabel
				x={ACH_OP.x + ACH_OP.w / 2}
				y={ACH_OP.y + ACH_OP.h + 40}
				text="Windows: 6am, 12pm, 4pm, 5:30pm ET"
				visible={currentStep >= 1 && currentStep <= 2}
				fontSize={9}
			/>

			{/* NACHA file annotation (step 2) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep === 2 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={(ODFI.x + ODFI.w + ACH_OP.x) / 2 - 55}
					y={145}
					width={110}
					height={30}
					rx={6}
					fill="var(--bg-elevated)"
					stroke="var(--trace-secondary)"
					strokeWidth={1}
				/>
				<text
					x={(ODFI.x + ODFI.w + ACH_OP.x) / 2}
					y={163}
					textAnchor="middle"
					fill="var(--trace-secondary)"
					fontSize={10}
					fontFamily="'JetBrains Mono', monospace"
				>
					94-char records
				</text>
			</motion.g>

			{/* T+0 availability label (step 4) */}
			<TimingLabel
				x={ACCOUNT.x + ACCOUNT.w / 2}
				y={ACCOUNT.y + ACCOUNT.h + 40}
				text="T+0 availability"
				visible={currentStep >= 4}
				badge
				color="var(--text-accent)"
			/>

			{/* Reserve account annotations (step 5) */}
			<TimingLabel
				x={ODFI.x + ODFI.w / 2}
				y={ODFI.y + ODFI.h + 40}
				text="Reserve: -$4,200"
				visible={currentStep >= 5}
				color="var(--trace-secondary)"
				fontSize={10}
			/>
			<TimingLabel
				x={RDFI.x + RDFI.w / 2}
				y={RDFI.y + RDFI.h + 40}
				text="Reserve: +$4,200"
				visible={currentStep >= 5}
				color="var(--trace-primary)"
				fontSize={10}
			/>

			{/* Fed debits/credits annotation (step 5) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 5 ? 1 : 0 }}
				transition={{
					duration: DURATION.fade,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<text
					x={ACH_OP.x + ACH_OP.w / 2}
					y={ACH_OP.y - 30}
					textAnchor="middle"
					fill="var(--node-fed)"
					fontSize={10}
					fontFamily="'JetBrains Mono', monospace"
				>
					Fed debits ODFI ↔ credits RDFI
				</text>
			</motion.g>

			{/* Dollar pill (step 5) */}
			<DollarPill
				amount="$4,200"
				pathData={FULL_PATH}
				progress={currentStep >= 5 ? 1 : 0}
				visible={currentStep >= 5}
			/>

			{/* Reg E banner (step 6) */}
			<motion.g
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: currentStep >= 6 ? 1 : 0,
					y: currentStep >= 6 ? 0 : 10,
				}}
				transition={{ duration: DURATION.reveal }}
			>
				<rect
					x={100}
					y={SVG_VIEWBOX.height - 65}
					width={SVG_VIEWBOX.width - 200}
					height={35}
					rx={8}
					fill="var(--bg-elevated)"
					stroke="var(--trace-secondary)"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={SVG_VIEWBOX.height - 44}
					textAnchor="middle"
					fill="var(--trace-secondary)"
					fontSize={12}
					fontWeight={600}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					🛡️ Reg E: 60-day dispute window — 10-day provisional credit
				</text>
			</motion.g>
		</svg>
	);
}
