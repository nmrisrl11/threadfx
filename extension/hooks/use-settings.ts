import type { ThemeMode, ThreadFXSettings } from "@/lib/storage";
import { DEFAULT_SETTINGS, getSettings, onSettingsChanged, saveSettings } from "@/lib/storage";
import type { BurstMode, ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import {
	CONFETTI_PALETTES,
	DEFAULT_BURST_MODE,
	DEFAULT_CONFETTI_PALETTE,
	DEFAULT_EMOJI,
	DEFAULT_PARTICLE_COUNT,
	DEFAULT_PARTICLE_SPREAD,
} from "@data/particles";
import type { SoundPack, SoundPackId } from "@data/presets";
import { SOUND_PACKS, applyPitch } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import { useCallback, useSyncExternalStore } from "react";

// Module-level external store state
let currentSettings: ThreadFXSettings = DEFAULT_SETTINGS;
let lastLikesCount = 0;
const listeners = new Set<() => void>();
const audioPulseListeners = new Set<(pack: SoundPack) => void>();
const particlePulseListeners = new Set<(palette: ConfettiPalette) => void>();

export function subscribeAudioPulse(listener: (pack: SoundPack) => void) {
	audioPulseListeners.add(listener);
	return () => {
		audioPulseListeners.delete(listener);
	};
}

export function emitAudioPulse(pack: SoundPack) {
	audioPulseListeners.forEach((listener) => listener(pack));
}

export function subscribeParticlePulse(listener: (palette: ConfettiPalette) => void) {
	particlePulseListeners.add(listener);
	return () => {
		particlePulseListeners.delete(listener);
	};
}

export function emitParticlePulse(palette: ConfettiPalette) {
	particlePulseListeners.forEach((listener) => listener(palette));
}

function notify() {
	listeners.forEach((listener) => listener());
}

/**
 * Applies the given theme mode to the DOM.
 * Synchronizes <meta name="color-scheme">, document root classes, and data-theme.
 */
export function applyThemeToDOM(theme: ThemeMode) {
	if (typeof document === "undefined") return;

	const isSystemDark =
		typeof window !== "undefined" && window.matchMedia
			? window.matchMedia("(prefers-color-scheme: dark)").matches
			: true;

	const isDark = theme === "dark" || (theme === "system" && isSystemDark);

	// 1. Sync <meta name="color-scheme">
	const meta = document.querySelector('meta[name="color-scheme"]');
	if (meta) {
		meta.setAttribute("content", theme === "system" ? "light dark" : theme);
	}

	// 2. Sync documentElement classes and data-theme
	const root = document.documentElement;
	root.classList.toggle("dark", isDark);
	root.classList.toggle("light", !isDark);
	root.setAttribute("data-theme", isDark ? "dark" : "light");
}

// Listen to OS theme changes if theme is set to 'system'
if (typeof window !== "undefined" && window.matchMedia) {
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	mediaQuery.addEventListener("change", () => {
		if (currentSettings.theme === "system") {
			applyThemeToDOM("system");
			notify();
		}
	});
}

/**
 * Initializes theme immediately to prevent any flash of un-themed content (FOUC).
 */
export function initTheme() {
	let cachedTheme: ThemeMode = "system";
	try {
		const stored = localStorage.getItem("threadfx_theme") as ThemeMode | null;
		if (stored === "light" || stored === "dark" || stored === "system") {
			cachedTheme = stored;
		}
	} catch {
		// Ignore local storage errors
	}

	applyThemeToDOM(cachedTheme);

	if (typeof chrome !== "undefined" && chrome.storage?.local) {
		getSettings().then((s) => {
			if (s.theme) {
				try {
					localStorage.setItem("threadfx_theme", s.theme);
				} catch {}
				applyThemeToDOM(s.theme);
			}
		});
	}
}

// Initialize from storage & subscribe to live Chrome storage changes
if (typeof chrome !== "undefined" && chrome.storage?.local) {
	getSettings().then((s) => {
		currentSettings = s;
		lastLikesCount = s.likesJuicedCount || 0;
		if (s.theme) {
			applyThemeToDOM(s.theme);
		}
		notify();
	});

	onSettingsChanged((updated: ThreadFXSettings) => {
		if (updated.likesJuicedCount > lastLikesCount) {
			lastLikesCount = updated.likesJuicedCount;
			const pack = SOUND_PACKS[updated.soundPack] || SOUND_PACKS.bubble;
			emitAudioPulse(pack);
			const palette =
				CONFETTI_PALETTES[updated.confettiPalette] || CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];
			if (palette) {
				emitParticlePulse(palette);
			}
		}
		currentSettings = updated;
		if (updated.theme) {
			applyThemeToDOM(updated.theme);
		}
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
	const pitch = useSettingsSelector((s) => s.pitch ?? 1.0);

	const setSoundPack = useCallback((packId: SoundPackId) => {
		setSetting("soundPack", packId);
	}, []);

	const setVolume = useCallback((vol: number) => {
		setSetting("volume", vol);
	}, []);

	const setPitch = useCallback((p: number) => {
		setSetting("pitch", p);
	}, []);

	const previewSound = useCallback((pack: SoundPack) => {
		if (!currentSettings.enabled) return;
		const pitched = applyPitch(pack.params, currentSettings.pitch ?? 1.0);
		zzfx(currentSettings.volume, ...pitched);
		emitAudioPulse(pack);
	}, []);

	return {
		soundPack,
		volume,
		pitch,
		setSoundPack,
		setVolume,
		setPitch,
		previewSound,
	};
}

// 4. ParticlesTab: only re-renders when particle properties change
export function useParticleSettings() {
	const confettiEnabled = useSettingsSelector((s) => s.confettiEnabled);
	const confettiPalette = useSettingsSelector((s) => s.confettiPalette);
	const confettiCount = useSettingsSelector((s) => s.confettiCount);
	const confettiSpread = useSettingsSelector((s) => s.confettiSpread);
	const burstMode = useSettingsSelector((s) => s.burstMode ?? DEFAULT_BURST_MODE);
	const selectedEmoji = useSettingsSelector((s) => s.selectedEmoji ?? DEFAULT_EMOJI);

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

	const setBurstMode = useCallback((mode: BurstMode) => {
		setSetting("burstMode", mode);
	}, []);

	const setSelectedEmoji = useCallback((emoji: string) => {
		setSetting("selectedEmoji", emoji);
	}, []);

	const previewPalette = useCallback((palette: ConfettiPalette) => {
		confetti({
			particleCount: currentSettings.confettiCount ?? DEFAULT_PARTICLE_COUNT,
			spread: currentSettings.confettiSpread ?? DEFAULT_PARTICLE_SPREAD,
			origin: { y: 0.75 },
			colors: palette.colors,
			disableForReducedMotion: false,
		});
		emitParticlePulse(palette);
	}, []);

	const previewEmoji = useCallback((emoji: string) => {
		const shape = confetti.shapeFromText({ text: emoji, scalar: 1.8 });
		confetti({
			particleCount: currentSettings.confettiCount ?? DEFAULT_PARTICLE_COUNT,
			spread: currentSettings.confettiSpread ?? DEFAULT_PARTICLE_SPREAD,
			origin: { y: 0.75 },
			shapes: [shape],
			scalar: 1.8,
			flat: true,
			disableForReducedMotion: false,
		});
		const palette =
			CONFETTI_PALETTES[currentSettings.confettiPalette] ??
			CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];
		if (palette) {
			emitParticlePulse(palette);
		}
	}, []);

	const testConfetti = useCallback(() => {
		if (currentSettings.burstMode === "emoji" && currentSettings.selectedEmoji) {
			const shape = confetti.shapeFromText({
				text: currentSettings.selectedEmoji,
				scalar: 1.8,
			});
			confetti({
				particleCount: currentSettings.confettiCount ?? DEFAULT_PARTICLE_COUNT,
				spread: currentSettings.confettiSpread ?? DEFAULT_PARTICLE_SPREAD,
				origin: { y: 0.75 },
				shapes: [shape],
				scalar: 1.8,
				flat: true,
				disableForReducedMotion: false,
			});
		} else {
			const palette =
				CONFETTI_PALETTES[currentSettings.confettiPalette] ??
				CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];

			confetti({
				particleCount: currentSettings.confettiCount ?? DEFAULT_PARTICLE_COUNT,
				spread: currentSettings.confettiSpread ?? DEFAULT_PARTICLE_SPREAD,
				origin: { y: 0.75 },
				colors: palette ? palette.colors : ["#FFFFFF", "#F43F5E", "#FF2E93", "#E4E4E7"],
				disableForReducedMotion: false,
			});
		}

		const palette =
			CONFETTI_PALETTES[currentSettings.confettiPalette] ??
			CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];
		if (palette) {
			emitParticlePulse(palette);
		}
	}, []);

	return {
		confettiEnabled,
		confettiPalette,
		confettiCount,
		confettiSpread,
		burstMode,
		selectedEmoji,
		toggleConfetti,
		setPalette,
		setCount,
		setSpread,
		setBurstMode,
		setSelectedEmoji,
		previewPalette,
		previewEmoji,
		testConfetti,
	};
}

// 5. Header / Global: Theme selector hook
export function useTheme(): [ThemeMode, (theme: ThemeMode) => void] {
	const theme = useSettingsSelector((s) => s.theme ?? "system");

	const setTheme = useCallback((nextTheme: ThemeMode) => {
		setSetting("theme", nextTheme);
		try {
			localStorage.setItem("threadfx_theme", nextTheme);
		} catch {}
		applyThemeToDOM(nextTheme);
	}, []);

	return [theme, setTheme];
}
