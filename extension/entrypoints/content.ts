import type { ThreadFXSettings } from "@/lib/storage";
import {
	DEFAULT_SETTINGS,
	getSettings,
	incrementLikesJuiced,
	onSettingsChanged,
} from "@/lib/storage";
import { classifyThreadAction } from "@/lib/threads-detector";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@data/particles";
import { DEFAULT_SOUND_PACK, INTERACTION_SOUNDS, SOUND_PACKS, applyPitch } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";

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

		let settings: ThreadFXSettings = DEFAULT_SETTINGS;
		getSettings().then((s: ThreadFXSettings) => {
			settings = s;
		});

		onSettingsChanged((updated: ThreadFXSettings) => {
			settings = updated;
		});

		function getNormalizedOrigin(element: Element): { x: number; y: number } {
			const rect = element.getBoundingClientRect();
			const x = (rect.left + rect.width / 2) / window.innerWidth;
			const y = (rect.top + rect.height / 2) / window.innerHeight;
			return {
				x: Math.max(0, Math.min(1, x)),
				y: Math.max(0, Math.min(1, y)),
			};
		}

		// Top-level click listener using event delegation in capture phase
		document.addEventListener(
			"click",
			(event: MouseEvent) => {
				if (!settings || !settings.enabled) return;

				const target = event.target as HTMLElement | null;
				const action = classifyThreadAction(target);
				if (!action) return;

				switch (action.type) {
					case "like":
						handleLikeAction(action.button);
						break;
					case "unlike":
						handleUnlikeAction();
						break;
					case "repost":
						handleRepostAction(action.button);
						break;
					case "bookmark":
						handleBookmarkAction(action.button);
						break;
					case "publish":
						handlePublishAction(action.button);
						break;
				}
			},
			true,
		);

		function handleLikeAction(button: Element) {
			// 1. Audio FX Pipeline: Active sound pack with micro-pitch jitter (±3%)
			try {
				const pack = SOUND_PACKS[settings.soundPack] ?? SOUND_PACKS[DEFAULT_SOUND_PACK];
				if (pack) {
					const pitched = applyPitch(pack.params, settings.pitch ?? 1.0, 0.03);
					zzfx(settings.volume ?? 0.5, ...pitched);
				}
			} catch (err) {
				console.warn("[ThreadFX] Like sound trigger error:", err);
			}

			// 2. Visual Confetti Pipeline
			if (settings.confettiEnabled) {
				try {
					const origin = getNormalizedOrigin(button);

					if (settings.burstMode === "emoji" && settings.selectedEmoji) {
						const emojiShape = confetti.shapeFromText({
							text: settings.selectedEmoji,
							scalar: 1.8,
						});
						confetti({
							particleCount: settings.confettiCount ?? 30,
							spread: settings.confettiSpread ?? 55,
							startVelocity: 25,
							ticks: 120,
							shapes: [emojiShape],
							scalar: 1.8,
							flat: true,
							origin,
							disableForReducedMotion: false,
						});
					} else {
						const palette =
							CONFETTI_PALETTES[settings.confettiPalette] ??
							CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];

						confetti({
							particleCount: settings.confettiCount ?? 30,
							spread: settings.confettiSpread ?? 55,
							startVelocity: 25,
							ticks: 120,
							origin,
							colors: palette ? palette.colors : ["#FFFFFF", "#F43F5E", "#FF2E93", "#E4E4E7"],
							disableForReducedMotion: false,
						});
					}
				} catch (err) {
					console.warn("[ThreadFX] Like confetti trigger error:", err);
				}
			}

			// 3. Stats Increment
			incrementLikesJuiced().catch(() => {});
		}

		function handleUnlikeAction() {
			// Quiet retraction: gentle descending tone, zero particles, zero stat increments
			try {
				const pitched = applyPitch([...INTERACTION_SOUNDS.unlike], settings.pitch ?? 1.0);
				zzfx(settings.volume ?? 0.5, ...pitched);
			} catch (err) {
				console.warn("[ThreadFX] Unlike sound trigger error:", err);
			}
		}

		function handleRepostAction(button: Element) {
			// Uplifting dual-harmonic chime + subtle emerald particle burst
			try {
				const pitched = applyPitch([...INTERACTION_SOUNDS.repost], settings.pitch ?? 1.0);
				zzfx(settings.volume ?? 0.5, ...pitched);
			} catch (err) {
				console.warn("[ThreadFX] Repost sound trigger error:", err);
			}

			if (settings.confettiEnabled) {
				try {
					const origin = getNormalizedOrigin(button);
					confetti({
						particleCount: 20,
						spread: 45,
						startVelocity: 20,
						ticks: 90,
						origin,
						colors: ["#10B981", "#34D399", "#00F5FF", "#FFFFFF"],
						disableForReducedMotion: false,
					});
				} catch (err) {
					console.warn("[ThreadFX] Repost confetti trigger error:", err);
				}
			}
		}

		function handleBookmarkAction(button: Element) {
			// Sparkling tactile chime + warm gold sparkle burst
			try {
				const pitched = applyPitch([...INTERACTION_SOUNDS.bookmark], settings.pitch ?? 1.0);
				zzfx(settings.volume ?? 0.5, ...pitched);
			} catch (err) {
				console.warn("[ThreadFX] Bookmark sound trigger error:", err);
			}

			if (settings.confettiEnabled) {
				try {
					const origin = getNormalizedOrigin(button);
					confetti({
						particleCount: 16,
						spread: 40,
						startVelocity: 18,
						ticks: 80,
						origin,
						colors: ["#FBBF24", "#F59E0B", "#FEF3C7", "#FFFFFF"],
						disableForReducedMotion: false,
					});
				} catch (err) {
					console.warn("[ThreadFX] Bookmark confetti trigger error:", err);
				}
			}
		}

		function handlePublishAction(button: Element) {
			// Celebratory publish pop + fanfare burst
			try {
				const pitched = applyPitch([...INTERACTION_SOUNDS.publish], settings.pitch ?? 1.0);
				zzfx(settings.volume ?? 0.5, ...pitched);
			} catch (err) {
				console.warn("[ThreadFX] Publish sound trigger error:", err);
			}

			if (settings.confettiEnabled) {
				try {
					const origin = getNormalizedOrigin(button);
					confetti({
						particleCount: 45,
						spread: 75,
						startVelocity: 30,
						ticks: 140,
						origin,
						colors: ["#FF2E93", "#7928CA", "#00F5FF", "#FFFFFF", "#FBBF24"],
						disableForReducedMotion: false,
					});
				} catch (err) {
					console.warn("[ThreadFX] Publish confetti trigger error:", err);
				}
			}
		}
	},
});
