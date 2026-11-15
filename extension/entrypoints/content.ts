import type { ThreadFXSettings } from "@/lib/storage";
import {
	DEFAULT_SETTINGS,
	getSettings,
	incrementLikesJuiced,
	onSettingsChanged,
} from "@/lib/storage";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@data/particles";
import { DEFAULT_SOUND_PACK, SOUND_PACKS, applyPitch } from "@data/presets";
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

		// Top-level click listener using event delegation in capture phase
		document.addEventListener(
			"click",
			(event: MouseEvent) => {
				if (!settings || !settings.enabled) return;

				const target = event.target as HTMLElement | null;
				if (!target) return;

				// Locate the nearest button or interactive container
				const button = target.closest('[role="button"]') || target.closest("button");
				if (!button) return;

				// Inspect aria-label on button or inner SVG
				const buttonLabel = button.getAttribute("aria-label") || "";
				const svg = button.querySelector("svg");
				const svgLabel = svg?.getAttribute("aria-label") || "";
				const label = (buttonLabel || svgLabel).toLowerCase();

				// Detect heart SVG icon as fallback
				const hasHeartIcon = !!button.querySelector('svg path[d*="M12"]');

				// Check whether this button is a Like/Reaction target
				const isLikeTarget =
					label.includes("like") ||
					label.includes("gusta") ||
					label.includes("curti") ||
					label.includes("jaime") ||
					label.includes("gefällt") ||
					hasHeartIcon ||
					button.querySelector('svg[color*="255, 48, 64"]') !== null ||
					button.querySelector('svg[style*="255, 48, 64"]') !== null;

				if (!isLikeTarget) return;

				// Determine if the post is CURRENTLY already liked (retraction / unlike action)
				// On Threads Web:
				// - Already liked button has aria-label="Liked" (past tense) or "Unlike"
				// - Heart SVG or container has red color "rgb(255, 48, 64)"
				// - Button may have aria-pressed="true"
				const isAlreadyLiked =
					label === "liked" ||
					label.includes("liked") ||
					label.includes("unlike") ||
					label.includes("remove like") ||
					label.includes("ya no me gusta") ||
					label.includes("descurtir") ||
					button.getAttribute("aria-pressed") === "true" ||
					button.querySelector('svg[color*="255, 48, 64"]') !== null ||
					button.querySelector('svg[style*="255, 48, 64"]') !== null ||
					button.querySelector('svg path[fill*="255, 48, 64"]') !== null ||
					button.querySelector('svg[color*="rgb(255,"]') !== null ||
					button.querySelector('svg[style*="rgb(255,"]') !== null;

				// Retraction / Unlike action: silent retreat with zero audio distraction
				if (isAlreadyLiked) {
					return;
				}

				// Otherwise, user is liking the post: trigger tactile delight!
				handleLikeAction(button);
			},
			true,
		);

		function handleLikeAction(button: Element) {
			// 1. Audio FX Pipeline
			try {
				const pack = SOUND_PACKS[settings.soundPack] ?? SOUND_PACKS[DEFAULT_SOUND_PACK];
				if (pack) {
					// Apply user pitch with subtle organic micro-jitter (±3% variance) to prevent machine-gun fatigue on rapid likes
					const pitched = applyPitch(pack.params, settings.pitch ?? 1.0, 0.03);
					zzfx(settings.volume ?? 0.5, ...pitched);
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
