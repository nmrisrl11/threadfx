// ThreadFX Particle/Confetti Preset Palettes

export type ConfettiPaletteId = "rose" | "monochrome" | "neon" | "amber";

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
};

export const DEFAULT_CONFETTI_PALETTE: ConfettiPaletteId = "rose";
export const DEFAULT_PARTICLE_COUNT = 30;
export const DEFAULT_PARTICLE_SPREAD = 55;

export const CONFETTI_PALETTE_LIST: readonly ConfettiPalette[] = Object.values(CONFETTI_PALETTES);
