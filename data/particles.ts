// ThreadFX Particle/Confetti Preset Palettes
// Centralized configuration shared between extension and landing website.

export type ConfettiPaletteId = "rose" | "monochrome" | "neon" | "amber" | "mint" | "coral";

export interface ConfettiPalette {
	id: ConfettiPaletteId;
	name: string;
	description: string;
	colors: string[];
}

export const CONFETTI_PALETTES: Record<ConfettiPaletteId, ConfettiPalette> = {
	rose: {
		id: "rose",
		name: "Soft Rose",
		description: "Signature Threads soft tones",
		colors: ["#FFFFFF", "#F43F5E", "#FF2E93", "#E4E4E7"],
	},
	monochrome: {
		id: "monochrome",
		name: "Silver Minimal",
		description: "Clean monochrome metals",
		colors: ["#FFFFFF", "#E4E4E7", "#A1A1AA", "#71717A"],
	},
	neon: {
		id: "neon",
		name: "Cyber Neon",
		description: "Ultraviolet electric spark",
		colors: ["#00F5FF", "#7928CA", "#FF2E93", "#FFFFFF"],
	},
	amber: {
		id: "amber",
		name: "Warm Gold",
		description: "Radiant golden sparkles",
		colors: ["#FBBF24", "#F59E0B", "#FEF3C7", "#FFFFFF"],
	},
	mint: {
		id: "mint",
		name: "Mint Aurora",
		description: "Crisp emerald & cyan glow",
		colors: ["#10B981", "#34D399", "#06B6D4", "#FFFFFF"],
	},
	coral: {
		id: "coral",
		name: "Sunset Coral",
		description: "Warm peach & vibrant coral",
		colors: ["#F43F5E", "#FB7185", "#F97316", "#FED7AA"],
	},
};

export const DEFAULT_CONFETTI_PALETTE: ConfettiPaletteId = "rose";
export const DEFAULT_PARTICLE_COUNT = 30;
export const DEFAULT_PARTICLE_SPREAD = 55;

export type BurstMode = "palette" | "emoji";
export const DEFAULT_BURST_MODE: BurstMode = "palette";
export const DEFAULT_EMOJI = "❤️";

export const QUICK_EMOJIS = ["❤️", "🔥", "✨", "🎉", "⚡", "🚀", "💎", "💯"] as const;

export const CONFETTI_PALETTE_LIST: readonly ConfettiPalette[] = Object.values(CONFETTI_PALETTES);
