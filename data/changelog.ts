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
		date: "Nov 17, 2026",
		title: "The Initial Release — Bring Your Threads to Life",
		changes: [
			{
				category: "Added",
				items: [
					"Zero-Latency Procedural Sound: Every interaction on Threads synthesizes crisp, satisfying acoustic feedback in real time with zero delay and zero network downloads.",
					"Eight Signature Sound Profiles: Explore a diverse acoustic palette including Bubble Pop, 8-Bit Coin, Hype Spark, Minimal Click, Retro Zap, Wooden Knock, Water Drop, and Sub Thump.",
					"Acoustic Pitch Modulation: Customize the tone of any sound profile from 0.5x deep bass up to 2.0x bright treble with live auditioning and natural micro-pitch jitter on consecutive taps.",
					"Tactile Visual Particle Physics: Celebrate every like with responsive particle bursts across six curated palettes, including Rose Gold, Neon Pop, Cyber Violet, Pure White, Mint Aurora, and Sunset Coral.",
					"Custom Emoji Reaction Bursts: Transform likes into expressive confetti bursts using your favorite emojis, complete with an instant reaction tray and full catalog search.",
					"Rich Social Feed Interactivity: Tactile acoustic feedback extends across the feed with gentle retreat tones on unlikes, crisp chimes with emerald sparks on reposts, and celebratory fanfare on newly published threads.",
					"Gamified Sensory Milestones: Track your lifetime enhanced interactions across seven progression ranks—Bronze, Silver, Gold, Diamond, Master, Grand, and Mythic—unlocking handcrafted 3D achievement medals.",
					"Intelligent Anti-Farming Shield: Enjoy tactile feedback without metric inflation; repeated likes and unlikes on the same post preserve real-time feedback while protecting your authentic lifetime milestone tally.",
					"Docked Chrome Side Panel Dashboard: Access controls instantly beside your feed using Alt+Shift+T or your browser toolbar, featuring docked live frequency and particle horizon telemetry monitors.",
					"On-Device Privacy & Storage Hub: Manage preferences and telemetry with 100% on-device data retention, real-time storage meters, and safe preference resets.",
					"Independent Appearance Modes: Seamlessly switch between crisp daylight clarity, obsidian dark contrast, or automatic system appearance synchronization.",
					"Interactive Web Simulator Studio: Test-drive the full audio and visual interaction suite directly in your browser with live soundboard keys, particle sliders, and an expanding 3D milestone showcase.",
				],
			},
			{
				category: "Changed",
				items: [
					"Ultra-Lean Package Footprint: Optimized Latin variable typography and vector assets to deliver a featherweight 880 KB extension bundle for instant installation.",
					"Seamless Overwrite Updates: Unpacked extension updates preserve 100% of your preferences, lifetime like tallies, and unlocked 3D milestone badges without resetting.",
					"Quiet Release Notifications: Periodic background update checks gently notify you when a fresh version is available with a 10-second reload walkthrough.",
				],
			},
			{
				category: "Fixed",
				items: [
					"Feed Action Discrimination: Isolated like actions to genuine reaction triggers, eliminating accidental sound triggers when clicking comments, repost counts, or navigation links.",
					"Rapid Tap Debouncing: Hardened interaction listeners to maintain fluid, responsive audio playback during rapid feed scrolling without stuttering or audio overlapping.",
				],
			},
		],
	},
];
