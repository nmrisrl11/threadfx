import { Card } from "@/components/ui/card";
import type { JuicerMilestone } from "@data/milestones";

interface MedalCardProps {
	milestone: JuicerMilestone;
}

export function MedalCard({ milestone }: MedalCardProps) {
	return (
		<Card className="group flex flex-col items-center border-white/8 bg-[#111114] p-4 text-center transition-[transform,border-color,background-color] duration-150 ease-[var(--ease-out)] select-none hover:-translate-y-0.5 hover:border-white/16 active:scale-[0.98]">
			<div className="relative mb-3 flex h-14 w-14 items-center justify-center">
				<div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#FF2E93]/20 via-[#7928CA]/20 to-[#00F5FF]/20 opacity-0 blur-md transition-opacity duration-200 group-hover:opacity-100" />
				<img
					src={`/badges/${milestone.badgeFile}`}
					alt={`${milestone.title} 3D Medal`}
					width="48"
					height="48"
					className="relative h-12 w-12 object-contain transition-transform duration-200 select-none group-hover:scale-105"
					loading="lazy"
					decoding="async"
					draggable={false}
				/>
			</div>

			<span className="text-muted-foreground font-mono text-[9px] tracking-wider uppercase">
				Rank {milestone.level}
			</span>

			<h3 className="text-foreground mt-0.5 text-xs font-bold">{milestone.rank}</h3>

			<div className="mt-2 inline-flex items-center rounded-full border border-white/8 bg-black/40 px-2 py-0.5 font-mono text-[9px] text-[#00F5FF]">
				{milestone.threshold} Likes
			</div>

			<p className="text-muted-foreground/80 mt-2 line-clamp-2 text-[10px] leading-snug">
				{milestone.description}
			</p>
		</Card>
	);
}
