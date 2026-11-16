export interface MilestoneTierConfig {
	accentColor: string;
	accentBadgeBg: string;
	borderHighlight: string;
	glowGradient: string;
	ambientGlow: string;
	bgImage: string;
	perkTitle: string;
	perkDescription: string;
	soundPitch: number;
	particleColors: string[];
}

export const MILESTONE_TIER_CONFIGS: Record<number, MilestoneTierConfig> = {
	1: {
		accentColor: "#F59E0B",
		accentBadgeBg: "bg-amber-500/10 text-amber-300 border-amber-500/20",
		borderHighlight: "border-amber-500/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(217, 119, 6, 0.28) 0%, rgba(180, 83, 9, 0.1) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_36px_rgba(217,119,6,0.25)]",
		bgImage: "/milestones/milestone-1-bg.webp",
		perkTitle: "Tactile Pioneer",
		perkDescription:
			"Unlocks warm acoustic milestone chimes upon reaching your first 10 reactions.",
		soundPitch: 0.85,
		particleColors: ["#F59E0B", "#D97706", "#B45309", "#FFFFFF"],
	},
	2: {
		accentColor: "#94A3B8",
		accentBadgeBg: "bg-slate-400/10 text-slate-200 border-slate-400/20",
		borderHighlight: "border-slate-400/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(148, 163, 184, 0.26) 0%, rgba(100, 116, 139, 0.1) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_36px_rgba(148,163,184,0.22)]",
		bgImage: "/milestones/milestone-2-bg.webp",
		perkTitle: "Acoustic Artisan",
		perkDescription:
			"Unlocks bright dual-harmonic bell tones and cool titanium sparks upon completing 25 reactions.",
		soundPitch: 0.95,
		particleColors: ["#CBD5E1", "#94A3B8", "#64748B", "#FFFFFF"],
	},
	3: {
		accentColor: "#EAB308",
		accentBadgeBg: "bg-yellow-500/10 text-yellow-300 border-yellow-500/20",
		borderHighlight: "border-yellow-400/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(234, 179, 8, 0.28) 0%, rgba(161, 98, 7, 0.1) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_40px_rgba(234,179,8,0.26)]",
		bgImage: "/milestones/milestone-3-bg.webp",
		perkTitle: "Sonic Virtuoso",
		perkDescription:
			"Unlocks royal golden confetti fireworks and resonant harmonic celebration on your 50th reaction.",
		soundPitch: 1.1,
		particleColors: ["#FDE047", "#EAB308", "#CA8A04", "#FFFFFF"],
	},
	4: {
		accentColor: "#06B6D4",
		accentBadgeBg: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
		borderHighlight: "border-cyan-400/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(6, 182, 212, 0.3) 0%, rgba(14, 116, 144, 0.12) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_42px_rgba(6,182,212,0.28)]",
		bgImage: "/milestones/milestone-4-bg.webp",
		perkTitle: "Kinetic Master",
		perkDescription:
			"Unlocks hyper-velocity cyan crystal spark showers and pure crystalline earcons at 100 reactions.",
		soundPitch: 1.25,
		particleColors: ["#22D3EE", "#06B6D4", "#0891B2", "#FFFFFF"],
	},
	5: {
		accentColor: "#A855F7",
		accentBadgeBg: "bg-purple-500/10 text-purple-300 border-purple-500/20",
		borderHighlight: "border-purple-400/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(168, 85, 247, 0.3) 0%, rgba(107, 33, 168, 0.12) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_44px_rgba(168,85,247,0.3)]",
		bgImage: "/milestones/milestone-5-bg.webp",
		perkTitle: "Tactile Legend",
		perkDescription:
			"Unlocks deep ultraviolet shockwaves and pulsing kinetic resonance fanfare across your feed.",
		soundPitch: 1.4,
		particleColors: ["#C084FC", "#A855F7", "#7E22CE", "#FFFFFF"],
	},
	6: {
		accentColor: "#10B981",
		accentBadgeBg: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
		borderHighlight: "border-emerald-400/30",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(16, 185, 129, 0.3) 0%, rgba(4, 120, 87, 0.12) 45%, transparent 75%)",
		ambientGlow: "shadow-[0_0_44px_rgba(16,185,129,0.28)]",
		bgImage: "/milestones/milestone-6-bg.webp",
		perkTitle: "Obsidian Flow Royalty",
		perkDescription:
			"Unlocks sweeping emerald aurora confetti ribbons and royal harmonic chords at 500 reactions.",
		soundPitch: 1.55,
		particleColors: ["#34D399", "#10B981", "#059669", "#FFFFFF"],
	},
	7: {
		accentColor: "#FB7185",
		accentBadgeBg: "bg-rose-500/10 text-rose-300 border-rose-500/20",
		borderHighlight: "border-rose-400/35",
		glowGradient:
			"radial-gradient(ellipse at 50% 38%, rgba(251, 113, 133, 0.28) 0%, rgba(168, 85, 247, 0.18) 35%, rgba(6, 182, 212, 0.12) 65%, transparent 85%)",
		ambientGlow: "shadow-[0_0_48px_rgba(251,113,133,0.32)]",
		bgImage: "/milestones/milestone-7-bg.webp",
		perkTitle: "ThreadFX Luminary",
		perkDescription:
			"The pinnacle of mastery. Unlocks polychromatic celestial stardust fireworks and grand victory fanfare.",
		soundPitch: 1.7,
		particleColors: ["#FB7185", "#C084FC", "#38BDF8", "#FBBF24", "#34D399", "#FFFFFF"],
	},
};

export function getMilestoneTierConfig(level: number): MilestoneTierConfig {
	return MILESTONE_TIER_CONFIGS[level] ?? MILESTONE_TIER_CONFIGS[1];
}
