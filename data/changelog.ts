export type ChangelogCategory = "Added" | "Changed" | "Fixed" | "Removed";

export interface ChangelogItem {
	category: ChangelogCategory;
	items: string[];
}

export interface ChangelogRelease {
	version: string;
	date: string;
	title: string;
	changes: ChangelogItem[];
}

export const CHANGELOG_DATA: ChangelogRelease[] = [
	{
		version: "1.0.0",
		date: "Nov 14, 2026",
		title: "The Initial Release — Bring Your Threads to Life",
		changes: [
			{
				category: "Added",
				items: [
					"Zero-Latency Sound Synthesis: Every time you tap the like button on a post, ThreadFX synthesizes crisp, satisfying acoustic feedback on the fly with zero lag and zero network loading time.",
					"Four Curated Sound Packs: Choose from Bubble Pop (warm organic bounce), 8-Bit Coin (arcade retro chime), Hype Spark (electric celebratory pulse), and Minimal Click (subtle mechanical switch click for deep focus).",
					"Heart-Anchored Neon Confetti Cannons: Tap the heart icon and watch an explosion of electric cyan, neon pink, deep violet, and diamond white particles radiate outward across your screen.",
					"Docked Chrome Side Panel Dashboard: ThreadFX lives natively in your browser's persistent Side Panel beside your feed, eliminating temporary popups that close when you click away.",
					"Interactive Web Soundboard & Live Audition: Test presets directly in your browser or Side Panel dashboard and fine-tune audio intensity with instant live preview.",
					"Enhanced Likes Counter: Track your milestones with a live lifetime counter that celebrates every like you've energized.",
				],
			},
		],
	},
];
