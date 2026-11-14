import confetti from "canvas-confetti";
import { zzfx } from "@/lib/zzfx";
import { SOUND_PACKS, DEFAULT_SOUND_PACK } from "@/lib/presets";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@/lib/particles";
import { getSettings, onSettingsChanged, incrementLikesJuiced } from "@/lib/storage";
import type { ThreadFXSettings } from "@/lib/storage";

export default defineContentScript({
	matches: [
		"https://*.threads.com/*",
		"https://threads.com/*",
		"https://*.threads.net/*",
		"https://threads.net/*",
	],
	runAt: "document_idle",
	main() {
		console.log("[ThreadFX] Content script loaded on Threads.");

		let settings: ThreadFXSettings;
		getSettings().then((s: ThreadFXSettings) => {
			settings = s;
		});

		onSettingsChanged((updated: ThreadFXSettings) => {
			settings = updated;
		});

		// Top-level click listener using event delegation
		document.addEventListener(
			"click",
			(event: MouseEvent) => {
				if (!settings || !settings.enabled) return;

				const target = event.target as HTMLElement | null;
				if (!target) return;

				// Locate the nearest button or interactive container
				const button = target.closest('[role="button"]') || target.closest("button");
				if (!button) return;

				// Check aria-label or inner SVG aria-label for 'Like'
				const buttonLabel = button.getAttribute("aria-label") || "";
				const svg = button.querySelector("svg");
				const svgLabel = svg?.getAttribute("aria-label") || "";
				const label = (buttonLabel || svgLabel).toLowerCase();

				// Only trigger when liking (avoid triggering on 'Unlike')
				const isLike = label.includes("like") && !label.includes("unlike");

				// Also detect heart SVG icon paths as fallback
				const hasHeartIcon = !!button.querySelector('svg path[d*="M12"]');

				if (isLike || hasHeartIcon) {
					handleLikeAction(button);
				}
			},
			true,
		);

		function handleLikeAction(button: Element) {
			// 1. Audio FX Pipeline
			try {
				const pack = SOUND_PACKS[settings.soundPack] ?? SOUND_PACKS[DEFAULT_SOUND_PACK];
				if (pack) {
					zzfx(settings.volume, ...pack.params);
				}
			} catch (err) {
				console.warn("[ThreadFX] Sound trigger error:", err);
			}

			// 2. Visual Confetti Pipeline
			if (settings.confettiEnabled) {
				try {
					const rect = button.getBoundingClientRect();
					const originX = (rect.left + rect.width / 2) / window.innerWidth;
					const originY = (rect.top + rect.height / 2) / window.innerHeight;

					const palette =
						CONFETTI_PALETTES[settings.confettiPalette] ??
						CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];

					confetti({
						particleCount: settings.confettiCount ?? 30,
						spread: settings.confettiSpread ?? 50,
						startVelocity: 25,
						ticks: 120,
						origin: {
							x: Math.max(0, Math.min(1, originX)),
							y: Math.max(0, Math.min(1, originY)),
						},
						colors: palette ? palette.colors : ["#FFFFFF", "#F43F5E", "#FF2E93", "#E4E4E7"],
						disableForReducedMotion: false,
					});
				} catch (err) {
					console.warn("[ThreadFX] Confetti trigger error:", err);
				}
			}

			// 3. Stats Increment
			incrementLikesJuiced().catch(() => {});
		}
	},
});
