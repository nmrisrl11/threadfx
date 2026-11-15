import type { ConfettiPaletteId } from "@data/particles";
import type { SoundPackId } from "@data/presets";

// Type-safe chrome.storage helper for ThreadFX

export type ThemeMode = "system" | "dark" | "light";

export interface ThreadFXSettings {
	enabled: boolean;
	volume: number;
	soundPack: SoundPackId;
	confettiEnabled: boolean;
	likesJuicedCount: number;
	confettiPalette: ConfettiPaletteId;
	confettiCount: number;
	confettiSpread: number;
	theme: ThemeMode;
}

export const DEFAULT_SETTINGS: ThreadFXSettings = {
	enabled: true,
	volume: 0.6,
	soundPack: "bubble",
	confettiEnabled: true,
	likesJuicedCount: 0,
	confettiPalette: "rose",
	confettiCount: 30,
	confettiSpread: 55,
	theme: "system",
};

export async function getSettings(): Promise<ThreadFXSettings> {
	if (typeof chrome === "undefined" || !chrome.storage?.local) {
		return DEFAULT_SETTINGS;
	}
	return new Promise((resolve) => {
		chrome.storage.local.get(DEFAULT_SETTINGS as unknown as Record<string, unknown>, (items) => {
			resolve(items as unknown as ThreadFXSettings);
		});
	});
}

export async function saveSettings(settings: Partial<ThreadFXSettings>): Promise<void> {
	if (typeof chrome === "undefined" || !chrome.storage?.local) {
		return;
	}
	return new Promise((resolve) => {
		chrome.storage.local.set(settings as unknown as Record<string, unknown>, () => {
			resolve();
		});
	});
}

export async function incrementLikesJuiced(): Promise<number> {
	const current = await getSettings();
	const nextCount = (current.likesJuicedCount || 0) + 1;
	await saveSettings({ likesJuicedCount: nextCount });
	return nextCount;
}

export function onSettingsChanged(callback: (settings: ThreadFXSettings) => void): () => void {
	if (typeof chrome === "undefined" || !chrome.storage?.onChanged) {
		return () => {};
	}
	const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
		if (areaName === "local") {
			getSettings().then(callback);
		}
	};
	chrome.storage.onChanged.addListener(listener);
	return () => chrome.storage.onChanged.removeListener(listener);
}
