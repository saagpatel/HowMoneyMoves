import { AnimatePresence, motion } from "framer-motion";
import type { ComponentType } from "react";
import { useParams } from "react-router-dom";
import { AnimationScene } from "../components/AnimationScene";
import { SECTIONS } from "../data/sections";
import { DURATION } from "../lib/animation-config";
import { AchScene } from "../scenes/AchScene";
import { DirectDepositScene } from "../scenes/DirectDepositScene";
import { FedSettlementScene } from "../scenes/FedSettlementScene";
import { FractionalReserveScene } from "../scenes/FractionalReserveScene";
import { PaycheckScene } from "../scenes/PaycheckScene";
import { SwiftScene } from "../scenes/SwiftScene";

// Scene registry: all 6 sections
const SCENE_COMPONENTS: Record<
	string,
	ComponentType<{ currentStep: number }>
> = {
	paycheck: PaycheckScene,
	"direct-deposit": DirectDepositScene,
	ach: AchScene,
	"fed-settlement": FedSettlementScene,
	swift: SwiftScene,
	"fractional-reserve": FractionalReserveScene,
};

export function SectionPage() {
	const { sectionId } = useParams<{ sectionId: string }>();
	const section = SECTIONS[sectionId ?? ""];

	if (!section) {
		return (
			<div className="flex min-h-[60vh] items-center justify-center">
				<p className="text-text-secondary">Section not found.</p>
			</div>
		);
	}

	const SceneComponent = SCENE_COMPONENTS[section.id];

	return (
		<AnimatePresence mode="wait">
			<motion.div
				key={sectionId}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: DURATION.sectionTransition }}
			>
				<div className="mb-8">
					<h1 className="text-3xl font-bold text-text-primary">
						<span className="mr-3">{section.icon}</span>
						{section.title}
					</h1>
					<p className="mt-2 text-text-secondary">{section.subtitle}</p>
				</div>

				{SceneComponent && (
					<AnimationScene steps={section.steps}>
						{(currentStep) => <SceneComponent currentStep={currentStep} />}
					</AnimationScene>
				)}
			</motion.div>
		</AnimatePresence>
	);
}
