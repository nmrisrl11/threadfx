import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useLikesCounter } from "@/hooks/use-settings";
import {
	JUICER_MILESTONES,
	getBadgeAssetUrl,
	getJuicerRank,
	type JuicerMilestone,
} from "@data/milestones";
import { CheckIcon, HeartIcon, LockIcon, SparklesIcon, TrophyIcon } from "lucide-react";
import { useState } from "react";

export function MilestonesPopover() {
	const count = useLikesCounter();
	const { current, next, progress } = getJuicerRank(count);
	const [selectedMilestone, setSelectedMilestone] = useState<JuicerMilestone | null>(null);

	// Display selected milestone, or fallback to current unlocked, or first milestone
	const fallbackMilestone: JuicerMilestone = JUICER_MILESTONES[0] ?? {
		level: 1,
		threshold: 10,
		rank: "Bronze",
		title: "Bronze Juicer",
		description: "Tactile Pioneer (10+ likes juiced)",
		badgeFile: "milestone-1.webp",
	};
	const inspected: JuicerMilestone = selectedMilestone ?? current ?? fallbackMilestone;
	const isInspectedUnlocked = count >= inspected.threshold;

	const tooltipText = next
		? `${count} / ${next.threshold} to ${next.title} (Click to view achievements)`
		: current
			? `${current.title} • Max Sensory Tier (Click to view achievements)`
			: `${count} likes juiced • Click to view Sensory Tiers`;

	return (
		<Popover>
			<PopoverTrigger asChild>
				<button
					type="button"
					title={tooltipText}
					className="hover:bg-accent/40 -ml-1 flex cursor-pointer items-center gap-2 rounded-lg px-1.5 py-0.5 text-left transition-colors outline-none select-none active:scale-[0.98]"
				>
					{current ? (
						<img
							src={getBadgeAssetUrl(current.badgeFile)}
							alt={current.title}
							width={18}
							height={18}
							className="h-4.5 w-4.5 shrink-0 object-contain drop-shadow-xs"
							decoding="async"
							loading="eager"
						/>
					) : (
						<HeartIcon className="text-muted-foreground h-3.5 w-3.5 shrink-0" />
					)}
					<div className="flex items-baseline gap-1.5">
						<span className="text-muted-foreground text-[11px] font-medium">
							{current ? current.rank : "Likes juiced"}
						</span>
						<span className="text-foreground font-mono text-xs font-semibold">{count}</span>
					</div>
					<TrophyIcon className="text-muted-foreground/60 hover:text-foreground h-3 w-3 shrink-0 transition-colors" />
				</button>
			</PopoverTrigger>

			<PopoverContent
				align="start"
				sideOffset={8}
				className="border-border bg-popover text-popover-foreground w-80 p-3.5 shadow-xl"
			>
				{/* Header & Overall Level Status */}
				<div className="border-border flex items-center justify-between border-b pb-2.5">
					<div className="flex items-center gap-2">
						<div className="bg-primary/10 text-primary flex h-6 w-6 items-center justify-center rounded-md">
							<TrophyIcon className="h-3.5 w-3.5" />
						</div>
						<div>
							<h4 className="text-foreground text-xs font-semibold tracking-tight">
								Sensory Achievements
							</h4>
							<p className="text-muted-foreground text-[10px]">
								{current ? `${current.title} unlocked` : "Start liking posts on Threads"}
							</p>
						</div>
					</div>
					<span className="text-foreground bg-muted rounded px-1.5 py-0.5 font-mono text-[11px] font-semibold">
						{count} likes
					</span>
				</div>

				{/* Progress to Next Tier */}
				{next && (
					<div className="border-border space-y-1.5 border-b py-2.5">
						<div className="flex items-center justify-between text-[10px]">
							<span className="text-muted-foreground font-medium">Next: {next.title}</span>
							<span className="text-foreground font-mono font-semibold">
								{count} / {next.threshold}
							</span>
						</div>
						<div className="bg-muted h-1.5 w-full overflow-hidden rounded-full">
							<div
								className="bg-primary h-full rounded-full transition-all duration-300"
								style={{ width: `${Math.round(progress * 100)}%` }}
							/>
						</div>
					</div>
				)}

				{/* 7-Tier Achievements Badge Shelf */}
				<div className="space-y-1.5 py-2.5">
					<span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
						Milestone Medallions
					</span>
					<div className="grid grid-cols-7 gap-1.5 pt-0.5">
						{JUICER_MILESTONES.map((m) => {
							const isUnlocked = count >= m.threshold;
							const isSelected = inspected.level === m.level;

							return (
								<button
									key={m.level}
									type="button"
									onClick={() => setSelectedMilestone(m)}
									title={`${m.title} (${m.threshold} likes)`}
									className={`relative flex cursor-pointer flex-col items-center justify-center rounded-lg p-1 transition-all outline-none ${
										isSelected ? "bg-accent ring-1.5 ring-primary" : "hover:bg-accent/50"
									}`}
								>
									<img
										src={getBadgeAssetUrl(m.badgeFile)}
										alt={m.title}
										width={36}
										height={36}
										className={`h-7 w-7 object-contain transition-all ${
											isUnlocked
												? "opacity-100 drop-shadow-xs"
												: "opacity-30 brightness-75 grayscale"
										}`}
										decoding="async"
										loading="eager"
									/>
									<span className="text-muted-foreground mt-0.5 font-mono text-[9px] font-medium">
										{m.threshold}
									</span>
									{isUnlocked ? (
										<span className="absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full bg-emerald-500 text-white">
											<CheckIcon className="h-2 w-2 stroke-3" />
										</span>
									) : (
										<span className="bg-muted text-muted-foreground absolute -top-1 -right-1 flex h-3 w-3 items-center justify-center rounded-full">
											<LockIcon className="h-1.5 w-1.5" />
										</span>
									)}
								</button>
							);
						})}
					</div>
				</div>

				{/* Inspected Badge Detail Card */}
				<div className="bg-surface-subtle border-border/80 flex items-center gap-3 rounded-lg border p-2.5">
					<img
						src={getBadgeAssetUrl(inspected.badgeFile)}
						alt={inspected.title}
						width={48}
						height={48}
						className={`h-11 w-11 shrink-0 object-contain transition-all ${
							isInspectedUnlocked ? "drop-shadow-md" : "opacity-35 grayscale"
						}`}
						decoding="async"
						loading="eager"
					/>
					<div className="min-w-0 flex-1">
						<div className="flex items-center gap-1.5">
							<span className="text-foreground truncate text-xs font-semibold">
								{inspected.title}
							</span>
							{isInspectedUnlocked ? (
								<span className="flex items-center gap-0.5 rounded bg-emerald-500/10 px-1 text-[9px] font-semibold text-emerald-500">
									<SparklesIcon className="h-2 w-2" /> Unlocked
								</span>
							) : (
								<span className="bg-muted text-muted-foreground flex items-center gap-0.5 rounded px-1 text-[9px] font-semibold">
									<LockIcon className="h-2 w-2" /> Locked
								</span>
							)}
						</div>
						<p className="text-muted-foreground mt-0.5 line-clamp-2 text-[10px]">
							{inspected.description}
						</p>
					</div>
				</div>
			</PopoverContent>
		</Popover>
	);
}
