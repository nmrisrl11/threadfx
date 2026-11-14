// ThreadFX Sound Presets (Numeric parameter arrays for ZzFX)
// Zero external audio files required.

export interface SoundPack {
	id: "bubble" | "retro" | "hype" | "blip";
	name: string;
	description: string;
	icon: string;
	params: (number | undefined)[];
}

export const SOUND_PACKS: Record<string, SoundPack> = {
	bubble: {
		id: "bubble",
		name: "Bubble Pop",
		description: "Crisp, gentle upward pop. Perfect for everyday aesthetic scrolling.",
		icon: "🫧",
		// [vol, randomness, freq, attack, sustain, decay, shape, mod, pitchJump, pitchJumpTime]
		params: [1.2, 0, 420, 0.01, 0.04, 0.08, 0, 0, 350, 0.02],
	},
	retro: {
		id: "retro",
		name: "8-Bit Coin",
		description: "Classic arcade coin pickup sound. Instant nostalgia.",
		icon: "🪙",
		params: [1.0, 0, 650, 0.01, 0.08, 0.14, 3, 0, 400, 0.04],
	},
	hype: {
		id: "hype",
		name: "Hype Spark",
		description: "Bright harmonic chime that feels like a special powerup.",
		icon: "⚡",
		params: [1.1, 0.05, 520, 0.02, 0.1, 0.22, 1, 1.2, 280, 0.03],
	},
	blip: {
		id: "blip",
		name: "Minimal Click",
		description: "Ultra-subtle tactile mechanical switch click.",
		icon: "🔘",
		params: [0.8, 0, 800, 0.005, 0.02, 0.03, 0, 0, -200, 0.01],
	},
};

export const DEFAULT_SOUND_PACK = "bubble";

export const SOUND_PACK_LIST: readonly SoundPack[] = Object.values(SOUND_PACKS);
