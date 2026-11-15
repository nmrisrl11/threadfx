// ThreadFX Sound Presets (Numeric parameter arrays for ZzFX)
// Zero external audio files required. Procedural Web Audio API synthesis.

export type SoundPackId = "bubble" | "retro" | "hype" | "blip" | "wood" | "zap" | "drop" | "thump";

export type SoundCategory = "tactile" | "arcade" | "organic";

export interface SoundPack {
	id: SoundPackId;
	name: string;
	category: SoundCategory;
	description: string;
	frequency: number;
	params: (number | undefined)[];
}

export const SOUND_PACKS: Record<SoundPackId, SoundPack> = {
	bubble: {
		id: "bubble",
		name: "Bubble Pop",
		category: "organic",
		description: "Crisp, gentle upward pop. Perfect for everyday aesthetic scrolling.",
		frequency: 420,
		// [vol, randomness, freq, attack, sustain, decay, shape, mod, pitchJump, pitchJumpTime]
		params: [1.2, 0, 420, 0.01, 0.04, 0.08, 0, 0, 350, 0.02],
	},
	retro: {
		id: "retro",
		name: "8-Bit Coin",
		category: "arcade",
		description: "Classic arcade coin pickup sound. Instant nostalgia.",
		frequency: 650,
		params: [1.0, 0, 650, 0.01, 0.08, 0.14, 3, 0, 400, 0.04],
	},
	hype: {
		id: "hype",
		name: "Hype Spark",
		category: "organic",
		description: "Bright harmonic chime that feels like a special powerup.",
		frequency: 520,
		params: [1.1, 0.05, 520, 0.02, 0.1, 0.22, 1, 1.2, 280, 0.03],
	},
	blip: {
		id: "blip",
		name: "Minimal Click",
		category: "tactile",
		description: "Ultra-subtle tactile mechanical switch click.",
		frequency: 800,
		params: [0.8, 0, 800, 0.005, 0.02, 0.03, 0, 0, -200, 0.01],
	},
	wood: {
		id: "wood",
		name: "Wood Tap",
		category: "tactile",
		description: "Warm, organic hollow wooden clack with ASMR presence.",
		frequency: 320,
		params: [1.1, 0, 320, 0.001, 0.01, 0.04, 1, 0, -120, 0.01],
	},
	zap: {
		id: "zap",
		name: "Neon Zap",
		category: "arcade",
		description: "High-tech electric laser chirp with cyber neon energy.",
		frequency: 850,
		params: [1.0, 0.02, 850, 0.005, 0.02, 0.08, 2, 0, -600, 0.02],
	},
	drop: {
		id: "drop",
		name: "Water Drop",
		category: "organic",
		description: "Pure resonant acoustic droplet pop with serene presence.",
		frequency: 920,
		params: [1.1, 0, 920, 0.005, 0.02, 0.08, 0, 0, 320, 0.015],
	},
	thump: {
		id: "thump",
		name: "Sub Thump",
		category: "tactile",
		description: "Deep low-end acoustic 808 pulse. Heavy, punchy, and grounded.",
		frequency: 180,
		params: [1.2, 0, 180, 0.001, 0.02, 0.12, 0, 0, -80, 0.01],
	},
};

export const DEFAULT_SOUND_PACK: SoundPackId = "bubble";

export const SOUND_PACK_LIST: readonly SoundPack[] = Object.values(SOUND_PACKS);

export const SOUND_CATEGORIES: { id: "all" | SoundCategory; label: string }[] = [
	{ id: "all", label: "All" },
	{ id: "tactile", label: "Tactile" },
	{ id: "arcade", label: "Arcade" },
	{ id: "organic", label: "Organic" },
];

/**
 * Dynamically adjusts preset parameters by a pitch multiplier (0.5x - 2.0x)
 * and an optional organic micro-jitter ratio (e.g. 0.03 for ±3% acoustic variance).
 */
export function applyPitch(
	params: (number | undefined)[],
	pitchMultiplier = 1,
	jitterRatio = 0,
): (number | undefined)[] {
	if (!params[2]) return params;
	const baseFreq = params[2] as number;
	const jitterMultiplier = jitterRatio > 0 ? 1 + (Math.random() * 2 - 1) * jitterRatio : 1;
	const targetFreq = Math.round(baseFreq * pitchMultiplier * jitterMultiplier);
	if (targetFreq === baseFreq && pitchMultiplier === 1) return params;
	const modified = [...params];
	modified[2] = targetFreq;
	return modified;
}
