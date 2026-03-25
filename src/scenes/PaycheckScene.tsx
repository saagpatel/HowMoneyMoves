import { motion } from "framer-motion";
import { DollarPill } from "../components/svg/DollarPill";
import { InstitutionNode } from "../components/svg/InstitutionNode";
import { SvgDefs } from "../components/svg/SvgDefs";
import { TimingLabel } from "../components/svg/TimingLabel";
import { TracePath } from "../components/svg/TracePath";
import { DURATION, EASE, SVG_VIEWBOX } from "../lib/animation-config";

interface PaycheckSceneProps {
	currentStep: number;
}

// Node positions
const EMPLOYER = { x: 40, y: 190, w: 140, h: 80 };
const PROCESSOR = { x: 330, y: 190, w: 140, h: 80 };
const ODFI = { x: 620, y: 190, w: 140, h: 80 };

// Trace paths (connecting center-right of one node to center-left of next)
const TRACE_1 = `M ${EMPLOYER.x + EMPLOYER.w} ${EMPLOYER.y + EMPLOYER.h / 2} C ${EMPLOYER.x + EMPLOYER.w + 60} ${EMPLOYER.y + EMPLOYER.h / 2}, ${PROCESSOR.x - 60} ${PROCESSOR.y + PROCESSOR.h / 2}, ${PROCESSOR.x} ${PROCESSOR.y + PROCESSOR.h / 2}`;
const TRACE_2 = `M ${PROCESSOR.x + PROCESSOR.w} ${PROCESSOR.y + PROCESSOR.h / 2} C ${PROCESSOR.x + PROCESSOR.w + 60} ${PROCESSOR.y + PROCESSOR.h / 2}, ${ODFI.x - 60} ${ODFI.y + ODFI.h / 2}, ${ODFI.x} ${ODFI.y + ODFI.h / 2}`;
const FULL_PATH = `M ${EMPLOYER.x + EMPLOYER.w / 2} ${EMPLOYER.y + EMPLOYER.h / 2} C ${EMPLOYER.x + EMPLOYER.w + 30} ${EMPLOYER.y + EMPLOYER.h / 2}, ${PROCESSOR.x - 30} ${PROCESSOR.y + PROCESSOR.h / 2}, ${PROCESSOR.x + PROCESSOR.w / 2} ${PROCESSOR.y + PROCESSOR.h / 2} C ${PROCESSOR.x + PROCESSOR.w + 30} ${PROCESSOR.y + PROCESSOR.h / 2}, ${ODFI.x - 30} ${ODFI.y + ODFI.h / 2}, ${ODFI.x + ODFI.w / 2} ${ODFI.y + ODFI.h / 2}`;

export function PaycheckScene({ currentStep }: PaycheckSceneProps) {
	return (
		<svg
			viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
			preserveAspectRatio={SVG_VIEWBOX.aspectRatio}
			className="w-full"
		>
			<SvgDefs />

			{/* Title area */}
			<motion.text
				x={SVG_VIEWBOX.width / 2}
				y={40}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize={13}
				fontFamily="'JetBrains Mono', monospace"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: DURATION.fade }}
			>
				Paycheck &amp; Payroll Flow
			</motion.text>

			{/* Trace paths */}
			<TracePath d={TRACE_1} active={currentStep >= 1} />
			<TracePath d={TRACE_2} active={currentStep >= 2} delay={0.3} />

			{/* Extended trace to "ACH Operator" (step 4) */}
			<TracePath
				d={`M ${ODFI.x + ODFI.w} ${ODFI.y + ODFI.h / 2} L ${SVG_VIEWBOX.width + 20} ${ODFI.y + ODFI.h / 2}`}
				active={currentStep >= 3}
				delay={0.2}
				dashed
			/>

			{/* Institution nodes */}
			<InstitutionNode
				x={EMPLOYER.x}
				y={EMPLOYER.y}
				width={EMPLOYER.w}
				height={EMPLOYER.h}
				label="Employer"
				icon="🏢"
				color="var(--node-employer)"
				visible={currentStep >= 0}
				highlighted={currentStep === 0}
			/>

			<InstitutionNode
				x={PROCESSOR.x}
				y={PROCESSOR.y}
				width={PROCESSOR.w}
				height={PROCESSOR.h}
				label="Payroll Processor"
				icon="⚙️"
				color="var(--node-employer)"
				visible={currentStep >= 1}
				highlighted={currentStep === 1}
			/>

			<InstitutionNode
				x={ODFI.x}
				y={ODFI.y}
				width={ODFI.w}
				height={ODFI.h}
				label="ODFI Bank"
				icon="🏦"
				color="var(--node-bank)"
				visible={currentStep >= 2}
				highlighted={currentStep === 2}
			/>

			{/* NACHA File label (step 2+) */}
			<TimingLabel
				x={(PROCESSOR.x + PROCESSOR.w + ODFI.x) / 2}
				y={PROCESSOR.y - 20}
				text="NACHA File"
				visible={currentStep >= 2}
				badge
			/>

			{/* T-2 timing label (step 0+) */}
			<TimingLabel
				x={EMPLOYER.x + EMPLOYER.w / 2}
				y={EMPLOYER.y + EMPLOYER.h + 40}
				text="T-2 days before pay date"
				visible={currentStep >= 0}
				color="var(--text-accent)"
				fontSize={10}
			/>

			{/* ACH Operator label (step 3+) */}
			<motion.g
				initial={{ opacity: 0 }}
				animate={{ opacity: currentStep >= 3 ? 1 : 0 }}
				transition={{
					duration: DURATION.fade,
					ease: EASE.standard as unknown as number[],
				}}
			>
				<text
					x={ODFI.x + ODFI.w / 2}
					y={ODFI.y + ODFI.h + 40}
					textAnchor="middle"
					fill="var(--text-secondary)"
					fontSize={11}
					fontFamily="'JetBrains Mono', monospace"
				>
					→ ACH Operator (Fed/EPN)
				</text>
			</motion.g>

			{/* Dollar pill (step 4) */}
			<DollarPill
				amount="$4,200"
				pathData={FULL_PATH}
				progress={currentStep >= 4 ? 1 : 0}
				visible={currentStep >= 4}
			/>

			{/* "Your Bank" label at far right (step 4) */}
			<TimingLabel
				x={SVG_VIEWBOX.width - 60}
				y={ODFI.y + ODFI.h / 2}
				text="→ Your Bank"
				visible={currentStep >= 4}
				color="var(--trace-primary)"
				fontSize={12}
			/>

			{/* Step descriptions at bottom */}
			<motion.text
				x={SVG_VIEWBOX.width / 2}
				y={SVG_VIEWBOX.height - 30}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize={11}
				fontFamily="'Space Grotesk', system-ui, sans-serif"
				initial={{ opacity: 0 }}
				animate={{ opacity: 0.6 }}
			>
				{currentStep === 0 && "Employer sends payroll data to processor"}
				{currentStep === 1 &&
					"Processor calculates net pay, generates ACH file"}
				{currentStep === 2 && "ACH file submitted to Originating Bank (ODFI)"}
				{currentStep === 3 && "ODFI forwards batch to ACH Operator"}
				{currentStep === 4 && "Funds arrive at your bank account"}
			</motion.text>
		</svg>
	);
}
