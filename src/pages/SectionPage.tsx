import type { ComponentType } from "react";
import { useParams } from "react-router-dom";
import { AnimationScene } from "../components/AnimationScene";
import { SECTIONS } from "../data/sections";
import { SVG_VIEWBOX } from "../lib/animation-config";
import { DirectDepositScene } from "../scenes/DirectDepositScene";
import { FedSettlementScene } from "../scenes/FedSettlementScene";
import { PaycheckScene } from "../scenes/PaycheckScene";

// Scene registry: maps section IDs to their SVG scene components
const SCENE_COMPONENTS: Record<
	string,
	ComponentType<{ currentStep: number }>
> = {
	paycheck: PaycheckScene,
	"direct-deposit": DirectDepositScene,
	"fed-settlement": FedSettlementScene,
};

function PlaceholderScene({
	currentStep,
	title,
}: {
	currentStep: number;
	title: string;
}) {
	return (
		<svg
			viewBox={`0 0 ${SVG_VIEWBOX.width} ${SVG_VIEWBOX.height}`}
			preserveAspectRatio={SVG_VIEWBOX.aspectRatio}
			className="w-full"
		>
			<text
				x={SVG_VIEWBOX.width / 2}
				y={SVG_VIEWBOX.height / 2 - 10}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize="18"
			>
				{title}
			</text>
			<text
				x={SVG_VIEWBOX.width / 2}
				y={SVG_VIEWBOX.height / 2 + 20}
				textAnchor="middle"
				fill="var(--text-secondary)"
				fontSize="14"
				opacity={0.6}
			>
				Step {currentStep + 1} — Scene coming in Phase 2
			</text>
		</svg>
	);
}

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
		<div>
			<div className="mb-8">
				<h1 className="text-3xl font-bold text-text-primary">
					<span className="mr-3">{section.icon}</span>
					{section.title}
				</h1>
				<p className="mt-2 text-text-secondary">{section.subtitle}</p>
			</div>

			<AnimationScene steps={section.steps}>
				{(currentStep) =>
					SceneComponent ? (
						<SceneComponent currentStep={currentStep} />
					) : (
						<PlaceholderScene currentStep={currentStep} title={section.title} />
					)
				}
			</AnimationScene>
		</div>
	);
}
