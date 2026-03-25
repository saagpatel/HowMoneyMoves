import { motion } from "framer-motion";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface FractionalReserveSceneProps {
	currentStep: number;
}

// Cascade rows — each row is deposit → reserves + lend → next bank
const ROW_Y = [100, 210, 310];
const BANK_X = 40;
const RESERVE_X = 240;
const LEND_X = 400;
const NEXT_BANK_X = 580;

const ROWS = [
	{
		deposit: "$100",
		reserves: "$10",
		lent: "$90",
		bank: "Bank A",
		nextBank: "Bank B",
	},
	{
		deposit: "$90",
		reserves: "$9",
		lent: "$81",
		bank: "Bank B",
		nextBank: "Bank C",
	},
	{
		deposit: "$81",
		reserves: "$8.10",
		lent: "$72.90",
		bank: "Bank C",
		nextBank: "...",
	},
];

// Running totals
const RUNNING_TOTALS = ["$100", "$190", "$271"];

export function FractionalReserveScene({
	currentStep,
}: FractionalReserveSceneProps) {
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
				Fractional Reserve Banking
			</motion.text>

			{/* Column headers */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 1 ? 0.5 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<text
					x={BANK_X + 55}
					y={80}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={9}
					fontFamily="'JetBrains Mono', monospace"
				>
					Deposit
				</text>
				<text
					x={RESERVE_X + 40}
					y={80}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={9}
					fontFamily="'JetBrains Mono', monospace"
				>
					Reserves
				</text>
				<text
					x={LEND_X + 40}
					y={80}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={9}
					fontFamily="'JetBrains Mono', monospace"
				>
					Lent Out
				</text>
			</motion.g>

			{/* Row 1: Bank A — $100 deposit (step 0-1) */}
			<InstitutionNode
				x={BANK_X}
				y={ROW_Y[0]}
				width={110}
				height={60}
				label="Bank A"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			{/* $100 deposit pill */}
			<motion.g
				initial={{ opacity: 0, x: -30 }}
				animate={{
					opacity: currentStep >= 0 ? 1 : 0,
					x: currentStep >= 0 ? 0 : -30,
				}}
				transition={{ duration: DURATION.reveal }}
			>
				<rect
					x={BANK_X - 5}
					y={ROW_Y[0] - 5}
					width={50}
					height={24}
					rx={12}
					fill="var(--bg-card)"
					stroke="var(--trace-primary)"
					strokeWidth={1.5}
				/>
				<text
					x={BANK_X + 20}
					y={ROW_Y[0] + 11}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					$100
				</text>
			</motion.g>

			{/* Row 1: Reserves + Lend split (step 1) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 1 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				{/* Reserves block (dim) */}
				<rect
					x={RESERVE_X}
					y={ROW_Y[0] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--border)"
					opacity={0.5}
				/>
				<text
					x={RESERVE_X + 40}
					y={ROW_Y[0] + 35}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={11}
					fontWeight={600}
					fontFamily="'JetBrains Mono', monospace"
				>
					$10
				</text>

				{/* Lent block */}
				<rect
					x={LEND_X}
					y={ROW_Y[0] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--trace-primary)"
					opacity={0.15}
					stroke="var(--trace-primary)"
					strokeWidth={1}
				/>
				<text
					x={LEND_X + 40}
					y={ROW_Y[0] + 35}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					$90
				</text>
			</motion.g>

			{/* Trace: Bank A → Bank B */}
			<TracePath
				d={`M ${LEND_X + 80} ${ROW_Y[0] + 30} L ${NEXT_BANK_X} ${ROW_Y[0] + 30}`}
				active={currentStep >= 1}
				delay={0.3}
			/>

			{/* Row 2: Bank B (step 2) */}
			<InstitutionNode
				x={BANK_X}
				y={ROW_Y[1]}
				width={110}
				height={60}
				label="Bank B"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 2}
				highlighted={currentStep === 2}
			/>

			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={RESERVE_X}
					y={ROW_Y[1] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--border)"
					opacity={0.5}
				/>
				<text
					x={RESERVE_X + 40}
					y={ROW_Y[1] + 35}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={11}
					fontWeight={600}
					fontFamily="'JetBrains Mono', monospace"
				>
					$9
				</text>

				<rect
					x={LEND_X}
					y={ROW_Y[1] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--trace-primary)"
					opacity={0.15}
					stroke="var(--trace-primary)"
					strokeWidth={1}
				/>
				<text
					x={LEND_X + 40}
					y={ROW_Y[1] + 35}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					$81
				</text>
			</motion.g>

			<TracePath
				d={`M ${LEND_X + 80} ${ROW_Y[1] + 30} L ${NEXT_BANK_X} ${ROW_Y[1] + 30}`}
				active={currentStep >= 2}
				delay={0.3}
			/>

			{/* Row 3: Bank C (step 3) */}
			<InstitutionNode
				x={BANK_X}
				y={ROW_Y[2]}
				width={110}
				height={60}
				label="Bank C"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 3}
				highlighted={currentStep === 3}
			/>

			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={RESERVE_X}
					y={ROW_Y[2] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--border)"
					opacity={0.5}
				/>
				<text
					x={RESERVE_X + 40}
					y={ROW_Y[2] + 35}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={11}
					fontWeight={600}
					fontFamily="'JetBrains Mono', monospace"
				>
					$8.10
				</text>

				<rect
					x={LEND_X}
					y={ROW_Y[2] + 10}
					width={80}
					height={40}
					rx={6}
					fill="var(--trace-primary)"
					opacity={0.15}
					stroke="var(--trace-primary)"
					strokeWidth={1}
				/>
				<text
					x={LEND_X + 40}
					y={ROW_Y[2] + 35}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					$72.90
				</text>

				{/* Fade to "..." */}
				<text
					x={NEXT_BANK_X + 30}
					y={ROW_Y[2] + 38}
					fill="var(--text-secondary)"
					fontSize={18}
					fontFamily="'JetBrains Mono', monospace"
				>
					...
				</text>
			</motion.g>

			{/* Running total counter (right side, step 2+) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
				transition={{ duration: DURATION.fade }}
			>
				<rect
					x={SVG_VIEWBOX.width - 170}
					y={95}
					width={155}
					height={currentStep >= 3 ? 180 : 120}
					rx={8}
					fill="var(--bg-card)"
					stroke="var(--trace-primary)"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width - 92}
					y={118}
					textAnchor="middle"
					fill="var(--text-primary)"
					fontSize={11}
					fontWeight={700}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					Total Deposits
				</text>

				{ROWS.map((row, i) => (
					<motion.g
						key={row.bank}
						initial={{ opacity: 0 }}
						animate={{ opacity: currentStep >= i + 1 ? 1 : 0 }}
						transition={{ duration: DURATION.fade }}
					>
						<text
							x={SVG_VIEWBOX.width - 150}
							y={140 + i * 22}
							fill="var(--text-secondary)"
							fontSize={10}
							fontFamily="'JetBrains Mono', monospace"
						>
							{row.bank}: {row.deposit}
						</text>
					</motion.g>
				))}

				{/* Running total */}
				<motion.text
					x={SVG_VIEWBOX.width - 92}
					y={140 + Math.min(currentStep, 3) * 22 + 5}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={14}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
					initial={{ opacity: 0 }}
					animate={{ opacity: currentStep >= 2 ? 1 : 0 }}
				>
					= {RUNNING_TOTALS[Math.min(currentStep - 1, 2)] ?? "$100"}
				</motion.text>
			</motion.g>

			{/* Money Multiplier label (step 3) */}
			<motion.g
				initial={{ opacity: 0, scale: 0.8 }}
				animate={{
					opacity: currentStep >= 3 ? 1 : 0,
					scale: currentStep >= 3 ? 1 : 0.8,
				}}
				transition={{
					duration: DURATION.reveal,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<rect
					x={SVG_VIEWBOX.width - 170}
					y={290}
					width={155}
					height={45}
					rx={8}
					fill="var(--trace-primary)"
					opacity={0.1}
					stroke="var(--trace-primary)"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width - 92}
					y={310}
					textAnchor="middle"
					fill="var(--trace-primary)"
					fontSize={10}
					fontWeight={600}
					fontFamily="'Space Grotesk', system-ui, sans-serif"
				>
					Money Multiplier
				</text>
				<text
					x={SVG_VIEWBOX.width - 92}
					y={328}
					textAnchor="middle"
					fill="var(--text-accent)"
					fontSize={18}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					10×
				</text>
			</motion.g>

			{/* M1/M2 breakdown (step 4) */}
			<motion.g
				initial={{ opacity: 0, y: 10 }}
				animate={{
					opacity: currentStep >= 4 ? 1 : 0,
					y: currentStep >= 4 ? 0 : 10,
				}}
				transition={{ duration: DURATION.reveal }}
			>
				{/* Background */}
				<rect
					x={30}
					y={SVG_VIEWBOX.height - 90}
					width={SVG_VIEWBOX.width - 60}
					height={75}
					rx={8}
					fill="var(--bg-card)"
					stroke="var(--border)"
					strokeWidth={1}
				/>

				{/* Physical cash bar */}
				<rect
					x={60}
					y={SVG_VIEWBOX.height - 72}
					width={80}
					height={20}
					rx={4}
					fill="var(--node-employer)"
					opacity={0.6}
				/>
				<text
					x={150}
					y={SVG_VIEWBOX.height - 58}
					fill="var(--text-secondary)"
					fontSize={10}
					fontFamily="'JetBrains Mono', monospace"
				>
					Physical cash: $2.3T
				</text>

				{/* Digital entries bar */}
				<rect
					x={60}
					y={SVG_VIEWBOX.height - 47}
					width={400}
					height={20}
					rx={4}
					fill="var(--trace-primary)"
					opacity={0.2}
					stroke="var(--trace-primary)"
					strokeWidth={0.5}
				/>
				<text
					x={470}
					y={SVG_VIEWBOX.height - 33}
					fill="var(--trace-primary)"
					fontSize={10}
					fontFamily="'JetBrains Mono', monospace"
				>
					Digital entries: $18.7T
				</text>

				{/* M2 total */}
				<text
					x={SVG_VIEWBOX.width - 120}
					y={SVG_VIEWBOX.height - 58}
					fill="var(--text-primary)"
					fontSize={12}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					M2: $21T
				</text>

				{/* 0% reserve badge */}
				<rect
					x={SVG_VIEWBOX.width - 220}
					y={SVG_VIEWBOX.height - 50}
					width={140}
					height={22}
					rx={11}
					fill="#f59e0b"
					opacity={0.15}
					stroke="#f59e0b"
					strokeWidth={1}
				/>
				<text
					x={SVG_VIEWBOX.width - 150}
					y={SVG_VIEWBOX.height - 35}
					textAnchor="middle"
					fill="#f59e0b"
					fontSize={10}
					fontWeight={700}
					fontFamily="'JetBrains Mono', monospace"
				>
					0% reserve since 2020
				</text>
			</motion.g>
		</svg>
	);
}
