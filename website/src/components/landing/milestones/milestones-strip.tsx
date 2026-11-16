import { MedalCard } from "@/components/landing/milestones/medal-card";
import { JUICER_MILESTONES } from "@data/milestones";
import { TrophyIcon } from "lucide-react";

export function MilestonesStrip() {
	return (
		<section
			id="milestones"
			className="section-scroll-fade mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
		>
			<div className="mb-10 text-center">
				<div className="text-muted-foreground inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-[#121214] px-3 py-1 font-mono text-[11px]">
					<TrophyIcon className="h-3.5 w-3.5 text-[#FF2E93]" />
					<span>Gamified Sensory Progression</span>
				</div>
				<h2 className="text-foreground mt-3 text-2xl font-bold tracking-tight sm:text-3xl">
					Ascend the Juicer Ranks
				</h2>
				<p className="text-muted-foreground mx-auto mt-2 max-w-xl text-sm leading-relaxed">
					Every like enhanced feeds your private, on-device sensory odometer. Unlock victory
					fanfares, particle fireworks, and bespoke 3D medals as your journey progresses.
				</p>
			</div>

			<div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-7">
				{JUICER_MILESTONES.map((milestone) => (
					<MedalCard key={milestone.level} milestone={milestone} />
				))}
			</div>
		</section>
	);
}
