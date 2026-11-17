import { MilestonePanel } from "@/components/milestones/milestone-panel";
import { AnimatedContent } from "@/components/ui/animated-content";
import { JUICER_MILESTONES } from "@data/milestones";
import { TrophyIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";

// Wait 85ms before expanding on hover to prevent cursor sweep thrashing (from gallery1.tsx)
const HOVER_INTENT_MS = 85;

export function MilestonesSection() {
	// Default to Rank 1 (Bronze) as the entry milestone
	const [activeLevel, setActiveLevel] = useState<number>(1);
	const intent = useRef<ReturnType<typeof setTimeout>>(undefined);

	useEffect(() => () => clearTimeout(intent.current), []);

	const handleHover = (level: number) => {
		clearTimeout(intent.current);
		intent.current = setTimeout(() => setActiveLevel(level), HOVER_INTENT_MS);
	};

	const handleActivate = (level: number) => {
		clearTimeout(intent.current);
		setActiveLevel(level);
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === "ArrowRight" || e.key === "ArrowDown") {
			e.preventDefault();
			setActiveLevel((prev) => (prev >= 7 ? 1 : prev + 1));
		} else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
			e.preventDefault();
			setActiveLevel((prev) => (prev <= 1 ? 7 : prev - 1));
		} else if (e.key === "Home") {
			e.preventDefault();
			setActiveLevel(1);
		} else if (e.key === "End") {
			e.preventDefault();
			setActiveLevel(7);
		}
	};

	return (
		<section
			id="milestones"
			className="section-scroll-fade relative flex min-h-dvh w-full scroll-mt-24 flex-col items-center justify-center px-4 py-8 sm:scroll-mt-28 sm:px-6 sm:py-12"
		>
			<div className="my-auto w-full max-w-6xl">
				{/* Section Header (Symmetrical with Simulator & Feature Sections) */}
				<div className="mb-10 text-center">
					<div className="text-muted-foreground mb-2.5 flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
						<TrophyIcon className="text-muted-foreground size-3.5" />
						<span>Milestone Progression</span>
					</div>

					<h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-5xl">
						Collect every milestone.
					</h2>
					<p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-base leading-relaxed text-balance sm:text-lg">
						Every reaction you give builds toward rare 3D medals.
						<br className="hidden sm:inline" />
						Unlock celebratory fanfares and fireworks from 10 to 1,000 likes.
					</p>
				</div>

				{/* Accordion Showroom Gallery — Staggered Entry per panel via AnimatedContent */}
				<AnimatedContent
					distance={0}
					scale={0.85}
					blur={6}
					duration={0.9}
					ease="power3.out"
					stagger={0.05}
					threshold={0.1}
					once={false}
					delay={0.1}
					role="region"
					aria-label="Juicer Milestone Medals Gallery"
					onKeyDown={handleKeyDown}
					onMouseLeave={() => clearTimeout(intent.current)}
					className="flex w-full flex-col gap-2 md:h-[500px] md:flex-row md:gap-2.5"
				>
					{JUICER_MILESTONES.map((milestone) => (
						<MilestonePanel
							key={milestone.level}
							milestone={milestone}
							isActive={activeLevel === milestone.level}
							onActivate={() => handleActivate(milestone.level)}
							onHover={() => handleHover(milestone.level)}
						/>
					))}
				</AnimatedContent>
			</div>
		</section>
	);
}
