import { useSyncExternalStore, useCallback } from "react";
import confetti from "canvas-confetti";
import { getSettings, saveSettings, onSettingsChanged, DEFAULT_SETTINGS } from "@/lib/storage";
import type { ThreadFXSettings } from "@/lib/storage";
import { zzfx } from "@/lib/zzfx";
import type { SoundPack } from "@/lib/presets";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@/lib/particles";
import type { ConfettiPaletteId } from "@/lib/particles";

// Module-level external store state
let currentSettings: ThreadFXSettings = DEFAULT_SETTINGS;
const listeners = new Set<() => void>();

function notify() {
	listeners.forEach((listener) => listener());
}

// Initialize from storage & subscribe to live Chrome storage changes
if (typeof chrome !== "undefined" && chrome.storage?.local) {
	getSettings().then((s) => {
		currentSettings = s;
		notify();
	});

	onSettingsChanged((updated: ThreadFXSettings) => {
		currentSettings = updated;
		notify();
	});
}

function subscribe(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

function getSnapshot(): ThreadFXSettings {
	return currentSettings;
}

// Generic selector hook using native React useSyncExternalStore
export function useSettingsSelector<T>(selector: (settings: ThreadFXSettings) => T): T {
	return useSyncExternalStore(subscribe, () => selector(getSnapshot()));
}

// Global optimistic updater with bailout
export function setSetting<K extends keyof ThreadFXSettings>(key: K, value: ThreadFXSettings[K]) {
	if (currentSettings[key] === value) return;
	currentSettings = { ...currentSettings, [key]: value };
	notify();
	saveSettings({ [key]: value });
}

// --- Domain-Specific Isolated Hooks ---

// 1. Header: only re-renders when master enabled state flips
export function useMasterToggle(): [boolean, (enabled: boolean) => void] {
	const enabled = useSettingsSelector((s) => s.enabled);
	const toggle = useCallback((val: boolean) => setSetting("enabled", val), []);
	return [enabled, toggle];
}

// 2. MetricStrip: only re-renders when likesJuicedCount increments
export function useLikesCounter(): number {
	return useSettingsSelector((s) => s.likesJuicedCount);
}

// 3. AudioTab: only re-renders when audio properties change
export function useAudioSettings() {
	const soundPack = useSettingsSelector((s) => s.soundPack);
	const volume = useSettingsSelector((s) => s.volume);

	const setSoundPack = useCallback((packId: SoundPack["id"]) => {
		setSetting("soundPack", packId);
	}, []);

	const setVolume = useCallback((vol: number) => {
		setSetting("volume", vol);
	}, []);

	const previewSound = useCallback((pack: SoundPack) => {
		if (!currentSettings.enabled) return;
		zzfx(currentSettings.volume, ...pack.params);
	}, []);

	return {
		soundPack,
		volume,
		setSoundPack,
		setVolume,
		previewSound,
	};
}

// 4. ParticlesTab: only re-renders when particle properties change
export function useParticleSettings() {
	const confettiEnabled = useSettingsSelector((s) => s.confettiEnabled);
	const confettiPalette = useSettingsSelector((s) => s.confettiPalette);
	const confettiCount = useSettingsSelector((s) => s.confettiCount);
	const confettiSpread = useSettingsSelector((s) => s.confettiSpread);

	const toggleConfetti = useCallback((enabled: boolean) => {
		setSetting("confettiEnabled", enabled);
	}, []);

	const setPalette = useCallback((paletteId: ConfettiPaletteId) => {
		setSetting("confettiPalette", paletteId);
	}, []);

	const setCount = useCallback((count: number) => {
		setSetting("confettiCount", count);
	}, []);

	const setSpread = useCallback((spread: number) => {
		setSetting("confettiSpread", spread);
	}, []);

	const testConfetti = useCallback(() => {
		const palette =
			CONFETTI_PALETTES[currentSettings.confettiPalette] ??
			CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];

		confetti({
			particleCount: currentSettings.confettiCount ?? 30,
			spread: currentSettings.confettiSpread ?? 55,
			origin: { y: 0.75 },
			colors: palette ? palette.colors : ["#FFFFFF", "#F43F5E", "#FF2E93", "#E4E4E7"],
			disableForReducedMotion: false,
		});
	}, []);

	return {
		confettiEnabled,
		confettiPalette,
		confettiCount,
		confettiSpread,
		toggleConfetti,
		setPalette,
		setCount,
		setSpread,
		testConfetti,
	};
}
