import { motion } from "framer-motion";
import { DollarPill } from "../components/svg/DollarPill";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TimingLabel } from "../components/svg/TimingLabel";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface SwiftSceneProps {
	currentStep: number;
}

// 4 nodes in correspondent chain
const YOUR_BANK = { x: 20, y: 180, w: 140, h: 80 };
const CORR_A = { x: 220, y: 180, w: 140, h: 80 };
const CORR_B = { x: 440, y: 180, w: 140, h: 80 };
const BENEFICIARY = { x: 640, y: 180, w: 140, h: 80 };

// Trace paths
const TRACE_1 = `M ${YOUR_BANK.x + YOUR_BANK.w} ${YOUR_BANK.y + YOUR_BANK.h / 2} C ${YOUR_BANK.x + YOUR_BANK.w + 30} ${YOUR_BANK.y + YOUR_BANK.h / 2}, ${CORR_A.x - 30} ${CORR_A.y + CORR_A.h / 2}, ${CORR_A.x} ${CORR_A.y + CORR_A.h / 2}`;
const TRACE_2 = `M ${CORR_A.x + CORR_A.w} ${CORR_A.y + CORR_A.h / 2} C ${CORR_A.x + CORR_A.w + 40} ${CORR_A.y + CORR_A.h / 2}, ${CORR_B.x - 40} ${CORR_B.y + CORR_B.h / 2}, ${CORR_B.x} ${CORR_B.y + CORR_B.h / 2}`;
const TRACE_3 = `M ${CORR_B.x + CORR_B.w} ${CORR_B.y + CORR_B.h / 2} C ${CORR_B.x + CORR_B.w + 30} ${CORR_B.y + CORR_B.h / 2}, ${BENEFICIARY.x - 30} ${BENEFICIARY.y + BENEFICIARY.h / 2}, ${BENEFICIARY.x} ${BENEFICIARY.y + BENEFICIARY.h / 2}`;
const FULL_PATH = `M ${YOUR_BANK.x + YOUR_BANK.w / 2} ${YOUR_BANK.y + YOUR_BANK.h / 2} C ${YOUR_BANK.x + YOUR_BANK.w + 15} ${YOUR_BANK.y + YOUR_BANK.h / 2}, ${CORR_A.x - 15} ${CORR_A.y + CORR_A.h / 2}, ${CORR_A.x + CORR_A.w / 2} ${CORR_A.y + CORR_A.h / 2} C ${CORR_A.x + CORR_A.w + 20} ${CORR_A.y + CORR_A.h / 2}, ${CORR_B.x - 20} ${CORR_B.y + CORR_B.h / 2}, ${CORR_B.x + CORR_B.w / 2} ${CORR_B.y + CORR_B.h / 2} C ${CORR_B.x + CORR_B.w + 15} ${CORR_B.y + CORR_B.h / 2}, ${BENEFICIARY.x - 15} ${BENEFICIARY.y + BENEFICIARY.h / 2}, ${BENEFICIARY.x + BENEFICIARY.w / 2} ${BENEFICIARY.y + BENEFICIARY.h / 2}`;

// MT103 data trace (dashed purple — message, not money)
const MT103_TRACE = `M ${YOUR_BANK.x + YOUR_BANK.w} ${YOUR_BANK.y + 20} L ${SVG_VIEWBOX.width - 20} ${YOUR_BANK.y + 20}`;

// Fee data
const FEES = [
	{ node: YOUR_BANK, label: "Sending: $40", x: YOUR_BANK.x + YOUR_BANK.w / 2 },
	{ node: CORR_A, label: "Intermediary: $25", x: CORR_A.x + CORR_A.w / 2 },
	{ node: CORR_B, label: "Intermediary: $15", x: CORR_B.x + CORR_B.w / 2 },
	{
		node: BENEFICIARY,
		label: "Receiving: $10",
		x: BENEFICIARY.x + BENEFICIARY.w / 2,
	},
];

export function SwiftScene({ currentStep }: SwiftSceneProps) {
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
				SWIFT International Wire Transfer
			</motion.text>

			{/* MT103 message trace (step 1 — dashed purple) */}
			<TracePath
				d={MT103_TRACE}
				active={currentStep >= 1}
				color="var(--trace-secondary)"
				dashed
				strokeWidth={1.5}
			/>

			{/* Money trace paths */}
			<TracePath d={TRACE_1} active={currentStep >= 2} />
			<TracePath d={TRACE_2} active={currentStep >= 3} delay={0.2} />
			<TracePath d={TRACE_3} active={currentStep >= 6} delay={0.2} />

			{/* Sanctions screening overlay (step 5) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep === 5 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={0}
					y={0}
					width={SVG_VIEWBOX.width}
					height={SVG_VIEWBOX.height}
					fill="rgba(245, 158, 11, 0.05)"
				/>
				<rect
					x={SVG_VIEWBOX.width / 2 - 160}
					y={60}
					width={320}
					height={35}
					rx={8}
					fill="var(--bg-card)"
					stroke="#f59e0b"
					strokeWidth={2}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={82}
					textAnchor="middle"
					fill="#f59e0b"
					fontSize={14}
					fontWeight={700}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					🔍 SANCTIONS SCREENING — OFAC / EU / UN
				</text>
			</motion.g>

			{/* Nodes — dim during sanctions step */}
			<motion.g
				animate={{ opacity: currentStep === 5 ? 0.4 : 1 }}
				transition={{ duration: DURATION.fade }}
			>
				<InstitutionNode
					x={YOUR_BANK.x}
					y={YOUR_BANK.y}
					width={YOUR_BANK.w}
					height={YOUR_BANK.h}
					label="Your Bank"
					icon="🏦"
					color="var(--node-bank)"
					visible={currentStep >= 0}
					highlighted={currentStep === 0}
				/>

				<InstitutionNode
					x={CORR_A.x}
					y={CORR_A.y}
					width={CORR_A.w}
					height={CORR_A.h}
					label="Correspondent A"
					icon="🌐"
					color="var(--node-swift)"
					visible={currentStep >= 2}
					highlighted={currentStep === 2}
				/>

				<InstitutionNode
					x={CORR_B.x}
					y={CORR_B.y}
					width={CORR_B.w}
					height={CORR_B.h}
					label="Correspondent B"
					icon="🌐"
					color="var(--node-swift)"
					visible={currentStep >= 3}
					highlighted={currentStep === 3}
				/>

				<InstitutionNode
					x={BENEFICIARY.x}
					y={BENEFICIARY.y}
					width={BENEFICIARY.w}
					height={BENEFICIARY.h}
					label="Beneficiary Bank"
					icon="🏦"
					color="var(--node-bank)"
					visible={currentStep >= 6}
					highlighted={currentStep === 6}
				/>
			</motion.g>

			{/* Form fields annotation (step 0) */}
			<TimingLabel
				x={YOUR_BANK.x + YOUR_BANK.w / 2}
				y={YOUR_BANK.y + YOUR_BANK.h + 35}
				text="BIC · IBAN · Amount · Purpose"
				visible={currentStep === 0}
				fontSize={9}
			/>

			{/* MT103 label (step 1) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 1 && currentStep <= 2 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={YOUR_BANK.x + YOUR_BANK.w + 10}
					y={YOUR_BANK.y + 8}
					width={85}
					height={24}
					rx={4}
					fill="var(--bg-elevated)"
					stroke="var(--trace-secondary)"
					strokeWidth={1}
				/>
				<text
					x={YOUR_BANK.x + YOUR_BANK.w + 52}
					y={YOUR_BANK.y + 24}
					textAnchor="middle"
					fill="var(--trace-secondary)"
					fontSize={10}
					fontWeight={600}
					fontFamily="'JetBrains Mono', monospace"
				>
					MT103
				</text>
			</motion.g>

			{/* "SWIFT ≠ money" annotation (step 1) */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={YOUR_BANK.y + 12}
				text="SWIFT is a message — not the money"
				visible={currentStep === 1}
				badge
				color="var(--trace-secondary)"
				fontSize={10}
			/>

			{/* Nostro/Vostro labels (step 2+) */}
			<TimingLabel
				x={(YOUR_BANK.x + YOUR_BANK.w + CORR_A.x) / 2}
				y={YOUR_BANK.y + YOUR_BANK.h + 35}
				text="Nostro ↔ Vostro"
				visible={currentStep >= 2}
				fontSize={9}
				color="var(--node-swift)"
			/>

			<TimingLabel
				x={(CORR_A.x + CORR_A.w + CORR_B.x) / 2}
				y={CORR_A.y + CORR_A.h + 35}
				text="Nostro ↔ Vostro"
				visible={currentStep >= 3}
				fontSize={9}
				color="var(--node-swift)"
			/>

			{/* "Debit nostro, credit vostro" (step 3) */}
			<TimingLabel
				x={SVG_VIEWBOX.width / 2}
				y={130}
				text="Debit nostro → Credit vostro at each hop"
				visible={currentStep === 3}
				badge
				color="var(--node-swift)"
				fontSize={10}
			/>

			{/* FX conversion (step 4) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep === 4 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={(CORR_B.x + CORR_B.w + BENEFICIARY.x) / 2 - 55}
					y={140}
					width={110}
					height={45}
					rx={6}
					fill="var(--bg-elevated)"
					stroke="#f59e0b"
					strokeWidth={1}
				/>
				<text
					x={(CORR_B.x + CORR_B.w + BENEFICIARY.x) / 2}
					y={157}
					textAnchor="middle"
					fill="#f59e0b"
					fontSize={10}
					fontWeight={600}
					fontFamily="'JetBrains Mono', monospace"
				>
					FX Conversion
				</text>
				<text
					x={(CORR_B.x + CORR_B.w + BENEFICIARY.x) / 2}
					y={175}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={9}
					fontFamily="'JetBrains Mono', monospace"
				>
					$10,000 → €9,200
				</text>
			</motion.g>

			{/* Dollar pill travels the chain (step 3+) */}
			<DollarPill
				amount="$10K"
				pathData={FULL_PATH}
				progress={currentStep >= 6 ? 1 : currentStep >= 3 ? 0.5 : 0}
				visible={currentStep >= 3 && currentStep !== 5}
			/>

			{/* 1-5 business days timing (step 6) */}
			<TimingLabel
				x={BENEFICIARY.x + BENEFICIARY.w / 2}
				y={BENEFICIARY.y + BENEFICIARY.h + 35}
				text="1–5 business days"
				visible={currentStep >= 6}
				badge
				color="var(--text-accent)"
			/>

			{/* SWIFT gpi badge (step 6) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 6 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={BENEFICIARY.x + BENEFICIARY.w / 2 - 40}
					y={BENEFICIARY.y - 30}
					width={80}
					height={20}
					rx={10}
					fill="var(--trace-primary)"
					opacity={0.2}
				/>
				<text
					x={BENEFICIARY.x + BENEFICIARY.w / 2}
					y={BENEFICIARY.y - 16}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={9}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					SWIFT gpi ✓
				</text>
			</motion.g>

			{/* Fee waterfall (step 7) */}
			<motion.g
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: currentStep >= 7 ? 1 : 0,
					y: currentStep >= 7 ? 0 : 10,
				}}
				transition={{
					duration: DURATION.reveal,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<rect
					x={60}
					y={SVG_VIEWBOX.height - 100}
					width={SVG_VIEWBOX.width - 120}
					height={80}
					rx={8}
					fill="var(--bg-card)"
					stroke="var(--border)"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={SVG_VIEWBOX.height - 78}
					textAnchor="middle"
					fill="var(--text-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					Fee Waterfall
				</text>

				{FEES.map((fee) => (
					<g key={fee.label}>
						<text
							x={fee.x}
							y={SVG_VIEWBOX.height - 55}
							textAnchor="middle"
							fill="var(--text-secondary)"
							fontSize={9}
							fontFamily="'JetBrains Mono', monospace"
						>
							{fee.label}
						</text>
					</g>
				))}

				{/* Total */}
				<rect
					x={SVG_VIEWBOX.width / 2 - 55}
					y={SVG_VIEWBOX.height - 42}
					width={110}
					height={22}
					rx={4}
					fill="var(--node-swift)"
					opacity={0.2}
				/>
				<text
					x={SVG_VIEWBOX.width / 2}
					y={SVG_VIEWBOX.height - 27}
					textAnchor="middle"
					fill="#f59e0b"
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					Total fees: ~$90
				</text>
			</motion.g>
		</svg>
	);
}
