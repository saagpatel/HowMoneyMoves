import { motion } from "framer-motion";
import { DollarPill } from "../components/svg/DollarPill";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TimingLabel } from "../components/svg/TimingLabel";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface FedSettlementSceneProps {
	currentStep: number;
}

// Hub-and-spoke layout: Fed at top center, banks on sides, CHIPS below
const FED = { x: 330, y: 80, w: 140, h: 100 };
const ORIG_BANK = { x: 40, y: 300, w: 150, h: 80 };
const RECV_BANK = { x: 610, y: 300, w: 150, h: 80 };
const CHIPS = { x: 330, y: 380, w: 140, h: 70 };

// Trace paths: banks to Fed (V shape)
const TRACE_ORIG_TO_FED = `M ${ORIG_BANK.x + ORIG_BANK.w / 2} ${ORIG_BANK.y} C ${ORIG_BANK.x + ORIG_BANK.w / 2} ${ORIG_BANK.y - 80}, ${FED.x + FED.w / 2} ${FED.y + FED.h + 80}, ${FED.x + FED.w / 2} ${FED.y + FED.h}`;
const TRACE_FED_TO_RECV = `M ${FED.x + FED.w / 2} ${FED.y + FED.h} C ${FED.x + FED.w / 2} ${FED.y + FED.h + 80}, ${RECV_BANK.x + RECV_BANK.w / 2} ${RECV_BANK.y - 80}, ${RECV_BANK.x + RECV_BANK.w / 2} ${RECV_BANK.y}`;
const TRACE_CHIPS_TO_RECV = `M ${CHIPS.x + CHIPS.w} ${CHIPS.y + CHIPS.h / 2} C ${CHIPS.x + CHIPS.w + 60} ${CHIPS.y + CHIPS.h / 2}, ${RECV_BANK.x - 60} ${RECV_BANK.y + RECV_BANK.h / 2}, ${RECV_BANK.x} ${RECV_BANK.y + RECV_BANK.h / 2}`;

// Fedwire path (direct, bold): Originating → Fed → Receiving
const FEDWIRE_PATH = `M ${ORIG_BANK.x + ORIG_BANK.w / 2} ${ORIG_BANK.y} C ${ORIG_BANK.x + ORIG_BANK.w / 2} ${ORIG_BANK.y - 60}, ${FED.x + FED.w / 2 - 40} ${FED.y + FED.h + 40}, ${FED.x + FED.w / 2} ${FED.y + FED.h} C ${FED.x + FED.w / 2 + 40} ${FED.y + FED.h + 40}, ${RECV_BANK.x + RECV_BANK.w / 2} ${RECV_BANK.y - 60}, ${RECV_BANK.x + RECV_BANK.w / 2} ${RECV_BANK.y}`;

// Balance values
const BALANCES = {
	orig: { initial: "$2.4B", final: "$2.1B" },
	recv: { initial: "$1.8B", final: "$2.1B" },
};

// Timeline segments
const TIMELINE_SEGMENTS = [
	{ label: "Same-day ACH", x: 80, width: 140, color: "var(--trace-primary)" },
	{ label: "T+1 ACH", x: 240, width: 120, color: "var(--trace-primary)" },
	{
		label: "Fedwire (real-time)",
		x: 380,
		width: 170,
		color: "var(--node-fed)",
	},
	{ label: "T+2 Checks", x: 570, width: 130, color: "var(--text-secondary)" },
];

export function FedSettlementScene({ currentStep }: FedSettlementSceneProps) {
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
				y={30}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize={13}
				fontFamily="'JetBrains Mono', monospace"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
			>
				Federal Reserve Settlement
			</motion.text>

			{/* ACH settlement trace paths (step 1) */}
			<TracePath d={TRACE_ORIG_TO_FED} active={currentStep >= 1} />
			<TracePath d={TRACE_FED_TO_RECV} active={currentStep >= 1} delay={0.3} />

			{/* Fedwire bold trace (step 2) */}
			<TracePath
				d={FEDWIRE_PATH}
				active={currentStep >= 2}
				color="var(--node-fed)"
				strokeWidth={3}
			/>

			{/* CHIPS trace (step 3) */}
			<TracePath
				d={TRACE_CHIPS_TO_RECV}
				active={currentStep >= 3}
				dashed
				color="var(--text-secondary)"
			/>

			{/* Institution nodes */}
			<InstitutionNode
				x={FED.x}
				y={FED.y}
				width={FED.w}
				height={FED.h}
				label="Federal Reserve"
				icon="🏛️"
				color="var(--node-fed)"
				visible={currentStep >= 0}
				highlighted={currentStep >= 1 && currentStep <= 2}
				variant="octagon"
			/>

			<InstitutionNode
				x={ORIG_BANK.x}
				y={ORIG_BANK.y}
				width={ORIG_BANK.w}
				height={ORIG_BANK.h}
				label="Originating Bank"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			<InstitutionNode
				x={RECV_BANK.x}
				y={RECV_BANK.y}
				width={RECV_BANK.w}
				height={RECV_BANK.h}
				label="Receiving Bank"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			<InstitutionNode
				x={CHIPS.x}
				y={CHIPS.y}
				width={CHIPS.w}
				height={CHIPS.h}
				label="CHIPS"
				icon="🔗"
				color="var(--node-bank)"
				visible={currentStep >= 3}
				dashed
			/>

			{/* Reserve account balance labels */}
			<TimingLabel
				x={ORIG_BANK.x + ORIG_BANK.w / 2}
				y={ORIG_BANK.y - 20}
				text={`Reserve: ${currentStep >= 4 ? BALANCES.orig.final : BALANCES.orig.initial}`}
				visible={currentStep >= 0}
				badge
				color={
					currentStep >= 4 ? "var(--trace-secondary)" : "var(--text-secondary)"
				}
				fontSize={10}
			/>

			<TimingLabel
				x={RECV_BANK.x + RECV_BANK.w / 2}
				y={RECV_BANK.y - 20}
				text={`Reserve: ${currentStep >= 4 ? BALANCES.recv.final : BALANCES.recv.initial}`}
				visible={currentStep >= 0}
				badge
				color={
					currentStep >= 4 ? "var(--trace-primary)" : "var(--text-secondary)"
				}
				fontSize={10}
			/>

			{/* Deferred Net Settlement label (step 1) */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={55}
				text="Deferred Net Settlement"
				visible={currentStep === 1}
				badge
				color="var(--trace-primary)"
			/>

			{/* Net calculation label (step 1) */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={FED.y + FED.h + 30}
				text="Net: $3M from Orig → Recv"
				visible={currentStep === 1}
				color="var(--text-accent)"
				fontSize={10}
			/>

			{/* Real-time Gross Settlement label (step 2) */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={55}
				text="Fedwire — Real-time Gross Settlement"
				visible={currentStep === 2}
				badge
				color="var(--node-fed)"
			/>

			{/* Fedwire dollar pill (step 2 — fast animation) */}
			<DollarPill
				amount="$4M"
				pathData={FEDWIRE_PATH}
				progress={currentStep >= 2 ? 1 : 0}
				visible={currentStep === 2}
				color="var(--node-fed)"
			/>

			{/* CHIPS label (step 3) */}
			<TimingLabel
				x={CHIPS.x + CHIPS.w / 2}
				y={CHIPS.y + CHIPS.h + 18}
				text="95% cross-border USD"
				visible={currentStep >= 3}
				fontSize={9}
			/>

			{/* End of Day / Clock (step 4) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 4 ? 1 : 0 }}
				transition={{
					duration: DURATION.fade,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={55}
					textAnchor="middle"
					fill="var(--text-accent)"
					fontSize={13}
					fontWeight={600}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					🕐 End of Day — Books Must Balance
				</text>
			</motion.g>

			{/* Timeline bar (step 5) */}
			<motion.g
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: currentStep >= 5 ? 1 : 0,
					y: currentStep >= 5 ? 0 : 10,
				}}
				transition={{ duration: DURATION.reveal }}
			>
				{/* Background bar */}
				<rect
					x={60}
					y={SVG_VIEWBOX.height - 55}
					width={SVG_VIEWBOX.width - 120}
					height={30}
					rx={6}
					fill="var(--bg-card)"
					stroke="var(--border)"
					strokeWidth={1}
				/>

				{TIMELINE_SEGMENTS.map((seg) => (
					<g key={seg.label}>
						<rect
							x={seg.x}
							y={SVG_VIEWBOX.height - 52}
							width={seg.width - 10}
							height={24}
							rx={4}
							fill={seg.color}
							opacity={0.15}
						/>
						<text
							x={seg.x + (seg.width - 10) / 2}
							y={SVG_VIEWBOX.height - 37}
							textAnchor="middle"
							fill={seg.color}
							fontSize={9}
							fontWeight={600}
							fontFamily="'JetBrains Mono', monospace"
						>
							{seg.label}
						</text>
					</g>
				))}
			</motion.g>
		</svg>
	);
}
