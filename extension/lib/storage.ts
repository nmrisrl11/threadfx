import {
	DEFAULT_BURST_MODE,
	DEFAULT_EMOJI,
	type BurstMode,
	type ConfettiPaletteId,
} from "@data/particles";
import type { SoundPackId } from "@data/presets";

// Type-safe chrome.storage helper for ThreadFX

export type ThemeMode = "system" | "dark" | "light";

export interface ThreadFXSettings {
	enabled: boolean;
	volume: number;
	soundPack: SoundPackId;
	pitch: number;
	confettiEnabled: boolean;
	likesJuicedCount: number;
	confettiPalette: ConfettiPaletteId;
	confettiCount: number;
	confettiSpread: number;
	burstMode: BurstMode;
	selectedEmoji: string;
	theme: ThemeMode;
}

export const DEFAULT_SETTINGS: ThreadFXSettings = {
	enabled: true,
	volume: 0.5,
	soundPack: "bubble",
	pitch: 1.0,
	confettiEnabled: true,
	likesJuicedCount: 0,
	confettiPalette: "rose",
	confettiCount: 30,
	confettiSpread: 55,
	burstMode: DEFAULT_BURST_MODE,
	selectedEmoji: DEFAULT_EMOJI,
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

// --- Bounded Juiced Posts Deduplication Registry ---

export const JUICED_POSTS_STORAGE_KEY = "threadfx_juiced_post_ids";
export const MAX_JUICED_POSTS_HISTORY = 1000;

export interface RecordJuicedResult {
	recorded: boolean;
	nextCount: number;
}

/**
 * Retrieves the list of recently juiced post IDs from local extension storage.
 */
export async function getJuicedPostIds(): Promise<string[]> {
	if (typeof chrome === "undefined" || !chrome.storage?.local) {
		return [];
	}
	return new Promise((resolve) => {
		chrome.storage.local.get({ [JUICED_POSTS_STORAGE_KEY]: [] }, (items) => {
			const list = items[JUICED_POSTS_STORAGE_KEY];
			resolve(Array.isArray(list) ? list : []);
		});
	});
}

/**
 * Records a unique post like in the bounded LRU registry and increments the odometer
 * if and only if the post has not been juiced previously.
 * Capped at MAX_JUICED_POSTS_HISTORY (1,000 items) to keep the storage footprint negligible (~15KB).
 */
export async function recordJuicedPost(postId: string | null): Promise<RecordJuicedResult> {
	if (!postId) {
		const nextCount = await incrementLikesJuiced();
		return { recorded: true, nextCount };
	}

	const postIds = await getJuicedPostIds();
	if (postIds.includes(postId)) {
		const current = await getSettings();
		return { recorded: false, nextCount: current.likesJuicedCount || 0 };
	}

	const nextList = [...postIds, postId];
	if (nextList.length > MAX_JUICED_POSTS_HISTORY) {
		nextList.splice(0, nextList.length - MAX_JUICED_POSTS_HISTORY);
	}

	if (typeof chrome !== "undefined" && chrome.storage?.local) {
		await new Promise<void>((resolve) => {
			chrome.storage.local.set({ [JUICED_POSTS_STORAGE_KEY]: nextList }, () => resolve());
		});
	}

	const nextCount = await incrementLikesJuiced();
	return { recorded: true, nextCount };
}

/**
 * Clears the juiced posts registry cache.
 */
export async function clearJuicedPostIds(): Promise<void> {
	if (typeof chrome === "undefined" || !chrome.storage?.local) {
		return;
	}
	return new Promise((resolve) => {
		chrome.storage.local.remove(JUICED_POSTS_STORAGE_KEY, () => resolve());
	});
}

// --- Storage Metrics & Telemetry ---

export interface StorageTelemetry {
	totalBytesUsed: number;
	quotaBytes: number;
	juicedPostsBytes: number;
	settingsBytes: number;
	juicedPostsCount: number;
	remainingBytes: number;
	percentUsed: number;
}

export function formatBytes(bytes: number): string {
	if (bytes === 0) return "0 B";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

/**
 * Calculates current local extension storage usage, remaining quota,
 * and slice breakdowns.
 */
export async function getStorageTelemetry(): Promise<StorageTelemetry> {
	// Standard Chrome local storage quota is 10 MB (10,485,760 bytes)
	const quotaBytes =
		(typeof chrome !== "undefined" && chrome.storage?.local?.QUOTA_BYTES) || 10485760;

	if (typeof chrome === "undefined" || !chrome.storage?.local) {
		// Fallback for simulation / mock environment
		const mockJuiced = 16 * 1024;
		const mockSettings = 1200;
		const total = mockJuiced + mockSettings;
		return {
			totalBytesUsed: total,
			quotaBytes,
			juicedPostsBytes: mockJuiced,
			settingsBytes: mockSettings,
			juicedPostsCount: 42,
			remainingBytes: Math.max(0, quotaBytes - total),
			percentUsed: (total / quotaBytes) * 100,
		};
	}

	return new Promise((resolve) => {
		if (typeof chrome.storage.local.getBytesInUse === "function") {
			chrome.storage.local.getBytesInUse(null, (totalBytes) => {
				chrome.storage.local.getBytesInUse(JUICED_POSTS_STORAGE_KEY, (juicedBytes) => {
					getJuicedPostIds().then((postIds) => {
						const total = totalBytes || 0;
						const juiced = juicedBytes || 0;
						const settings = Math.max(0, total - juiced);
						resolve({
							totalBytesUsed: total,
							quotaBytes,
							juicedPostsBytes: juiced,
							settingsBytes: settings,
							juicedPostsCount: postIds.length,
							remainingBytes: Math.max(0, quotaBytes - total),
							percentUsed: (total / quotaBytes) * 100,
						});
					});
				});
			});
		} else {
			chrome.storage.local.get(null, (items) => {
				const juicedList = items[JUICED_POSTS_STORAGE_KEY] || [];
				const juicedBytes = new Blob([JSON.stringify(juicedList)]).size;
				const totalBytes = new Blob([JSON.stringify(items)]).size;
				const settingsBytes = Math.max(0, totalBytes - juicedBytes);
				resolve({
					totalBytesUsed: totalBytes,
					quotaBytes,
					juicedPostsBytes: juicedBytes,
					settingsBytes: settingsBytes,
					juicedPostsCount: Array.isArray(juicedList) ? juicedList.length : 0,
					remainingBytes: Math.max(0, quotaBytes - totalBytes),
					percentUsed: (totalBytes / quotaBytes) * 100,
				});
			});
		}
	});
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
