// Centralized ThreadFX Juicer Milestones & Sensory Tiers
// Procedural gamification milestones for enhanced social feed interactions.

export interface JuicerMilestone {
	level: number;
	threshold: number;
	rank: string;
	title: string;
	description: string;
	badgeFile: string;
}

export const JUICER_MILESTONES: readonly JuicerMilestone[] = [
	{
		level: 1,
		threshold: 10,
		rank: "Bronze",
		title: "Bronze Juicer",
		description: "Tactile Pioneer (10+ likes juiced)",
		badgeFile: "milestone-1.webp",
	},
	{
		level: 2,
		threshold: 25,
		rank: "Silver",
		title: "Silver Juicer",
		description: "Acoustic Artisan (25+ likes juiced)",
		badgeFile: "milestone-2.webp",
	},
	{
		level: 3,
		threshold: 50,
		rank: "Gold",
		title: "Gold Juicer",
		description: "Sonic Virtuoso (50+ likes juiced)",
		badgeFile: "milestone-3.webp",
	},
	{
		level: 4,
		threshold: 100,
		rank: "Diamond",
		title: "Diamond Juicer",
		description: "Master of Kinetic Juice (100+ likes juiced)",
		badgeFile: "milestone-4.webp",
	},
	{
		level: 5,
		threshold: 250,
		rank: "Master",
		title: "Master Juicer",
		description: "Tactile Legend (250+ likes juiced)",
		badgeFile: "milestone-5.webp",
	},
	{
		level: 6,
		threshold: 500,
		rank: "Grand",
		title: "Grand Juicer",
		description: "Obsidian Flow Royalty (500+ likes juiced)",
		badgeFile: "milestone-6.webp",
	},
	{
		level: 7,
		threshold: 1000,
		rank: "Mythic",
		title: "Mythic Juicer",
		description: "ThreadFX Luminary (1000+ likes juiced)",
		badgeFile: "milestone-7.webp",
	},
] as const;

export function getBadgeAssetUrl(badgeFile: string): string {
	const globalChrome = (
		globalThis as { chrome?: { runtime?: { getURL?: (path: string) => string } } }
	).chrome;
	if (globalChrome?.runtime?.getURL) {
		try {
			return globalChrome.runtime.getURL(`badges/${badgeFile}`);
		} catch {
			return `/badges/${badgeFile}`;
		}
	}
	return `/badges/${badgeFile}`;
}

export interface JuicerRankResult {
	current: JuicerMilestone | null;
	next: JuicerMilestone | null;
	progress: number;
}

export function getJuicerRank(count: number): JuicerRankResult {
	let current: JuicerMilestone | null = null;
	let next: JuicerMilestone | null = null;

	for (const m of JUICER_MILESTONES) {
		if (count >= m.threshold) {
			current = m;
		} else if (!next) {
			next = m;
		}
	}

	const prevThreshold = current ? current.threshold : 0;
	const nextThreshold = next ? next.threshold : prevThreshold + 100;
	const progress = Math.min(
		1,
		Math.max(0, (count - prevThreshold) / (nextThreshold - prevThreshold)),
	);

	return { current, next, progress };
}

export function isMilestoneHit(count: number): boolean {
	return JUICER_MILESTONES.some((m) => m.threshold === count);
}
