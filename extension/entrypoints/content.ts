import type { ThreadFXSettings } from "@/lib/storage";
import {
	DEFAULT_SETTINGS,
	JUICED_POSTS_STORAGE_KEY,
	getJuicedPostIds,
	getSettings,
	incrementLikesJuiced,
	onSettingsChanged,
	recordJuicedPost,
} from "@/lib/storage";
import { classifyThreadAction } from "@/lib/threads-detector";
import { isMilestoneHit } from "@data/milestones";
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
		// Prevent duplicate script execution or listener accumulation in the same tab
		const SCRIPT_GUARD = "__THREADFX_CONTENT_LOADED__";
		if ((window as unknown as Record<string, boolean>)[SCRIPT_GUARD]) {
			return;
		}
		(window as unknown as Record<string, boolean>)[SCRIPT_GUARD] = true;

		console.log("[ThreadFX] Content script loaded on Threads.");

		let settings: ThreadFXSettings = DEFAULT_SETTINGS;
		getSettings().then((s: ThreadFXSettings) => {
			settings = s;
		});

		onSettingsChanged((updated: ThreadFXSettings) => {
			settings = updated;
		});

		// Synchronized in-memory set of juiced post IDs for zero-latency dedup lookups
		const juicedPostIds = new Set<string>();
		getJuicedPostIds().then((ids) => {
			ids.forEach((id) => juicedPostIds.add(id));
		});

		// Synchronize juiced post set across all open Threads tabs
		if (typeof chrome !== "undefined" && chrome.storage?.onChanged) {
			chrome.storage.onChanged.addListener((changes, areaName) => {
				if (areaName === "local" && changes[JUICED_POSTS_STORAGE_KEY]) {
					const updatedList = changes[JUICED_POSTS_STORAGE_KEY].newValue;
					if (Array.isArray(updatedList)) {
						juicedPostIds.clear();
						updatedList.forEach((id: string) => juicedPostIds.add(id));
					}
				}
			});
		}

		// Respond to side panel active status pings
		if (typeof chrome !== "undefined" && chrome.runtime?.onMessage) {
			chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
				if (message?.type === "PING_THREADFX") {
					sendResponse({ active: true, domain: "threads.com" });
				}
				return true;
			});
		}

		// In-feed keyboard shortcut listener to toggle side panel (Alt+Shift+T)
		window.addEventListener("keydown", (e: KeyboardEvent) => {
			if (e.altKey && e.shiftKey && (e.key === "T" || e.key === "t" || e.code === "KeyT")) {
				e.preventDefault();
				chrome.runtime.sendMessage({ type: "TOGGLE_SIDEPANEL" }).catch(() => {});
			}
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

		// Track action timing to debounce synthetic duplicate events on the same interactive target
		let lastActionTime = 0;
		let lastActionButton: Element | null = null;

		// Velocity guard: Enforce a minimum interval (1000ms) between odometer increments
		// Rapid clicks still receive full audio/confetti tactile feedback, but do not increment
		// the gamification counter or trigger Meta's community protection rate limits.
		let lastJuicedLikeTime = 0;
		const JUICED_VELOCITY_COOLDOWN_MS = 1000;

		// Top-level click listener using event delegation in capture phase
		document.addEventListener(
			"click",
			(event: MouseEvent) => {
				// Ignore untrusted or synthetic events
				if (!event.isTrusted) return;
				if (!settings || !settings.enabled) return;

				const target = event.target as HTMLElement | null;
				const action = classifyThreadAction(target);
				if (!action) return;

				// Debounce duplicate clicks on the same action button (cooldown: 400ms)
				const now = Date.now();
				if (action.button === lastActionButton && now - lastActionTime < 400) {
					return;
				}

				lastActionTime = now;
				lastActionButton = action.button;

				switch (action.type) {
					case "like":
						handleLikeAction(action.button, action.postId);
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

		function handleLikeAction(button: Element, postId?: string | null) {
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

			// 3. Smart Juicer Guardrails: Cadence Gate & Unique Post Deduplication
			// Prevents farming by liking/unliking the same post, and protects the user
			// from triggering Meta's 24-hour community protection action blocks.
			const now = Date.now();
			if (now - lastJuicedLikeTime < JUICED_VELOCITY_COOLDOWN_MS) {
				// Too fast (autoclicker or rapid toggling): tactile FX played, but odometer is shielded
				return;
			}

			if (postId) {
				if (juicedPostIds.has(postId)) {
					// Post already juiced: tactile FX played, but odometer does not increment again
					return;
				}

				// Mark as juiced in memory immediately to guard against rapid duplicate clicks
				juicedPostIds.add(postId);
				lastJuicedLikeTime = now;

				recordJuicedPost(postId)
					.then((result) => {
						if (result.recorded && isMilestoneHit(result.nextCount)) {
							handleMilestoneCelebration(button);
						}
					})
					.catch(() => {});
			} else {
				// Fallback if post ID couldn't be extracted: enforce cadence cooldown
				lastJuicedLikeTime = now;
				incrementLikesJuiced()
					.then((nextCount) => {
						if (isMilestoneHit(nextCount)) {
							handleMilestoneCelebration(button);
						}
					})
					.catch(() => {});
			}
		}

		function handleMilestoneCelebration(button: Element) {
			// Celebratory milestone victory chime + grand fireworks confetti
			try {
				const pitched = applyPitch([...INTERACTION_SOUNDS.publish], settings.pitch ?? 1.0);
				zzfx(settings.volume ?? 0.5, ...pitched);
			} catch (err) {
				console.warn("[ThreadFX] Milestone fanfare error:", err);
			}

			if (settings.confettiEnabled) {
				try {
					const origin = getNormalizedOrigin(button);
					confetti({
						particleCount: 55,
						spread: 90,
						startVelocity: 32,
						ticks: 150,
						origin,
						colors: ["#FF2E93", "#7928CA", "#00F5FF", "#FBBF24", "#10B981", "#FFFFFF"],
						disableForReducedMotion: false,
					});
				} catch (err) {
					console.warn("[ThreadFX] Milestone confetti error:", err);
				}
			}
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
