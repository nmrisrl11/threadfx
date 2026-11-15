import type { StorageTelemetry } from "@/lib/storage";
import {
	DEFAULT_SETTINGS,
	clearJuicedPostIds,
	getStorageTelemetry,
	saveSettings,
} from "@/lib/storage";
import { useCallback, useState, useSyncExternalStore } from "react";

// Module-level external store state
let cachedTelemetry: StorageTelemetry | null = null;
const listeners = new Set<() => void>();

function notify() {
	listeners.forEach((listener) => listener());
}

export function subscribeStorageTelemetry(listener: () => void) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

export async function refreshStorageTelemetry(): Promise<StorageTelemetry | null> {
	try {
		cachedTelemetry = await getStorageTelemetry();
		notify();
		return cachedTelemetry;
	} catch (err) {
		console.warn("[ThreadFX] Failed to load storage telemetry:", err);
		return null;
	}
}

// Initial fetch on module load
refreshStorageTelemetry();

// Synchronize storage metrics when local extension storage changes
if (typeof chrome !== "undefined" && chrome.storage?.onChanged) {
	chrome.storage.onChanged.addListener((_changes, areaName) => {
		if (areaName === "local") {
			refreshStorageTelemetry();
		}
	});
}

export function useStorageTelemetry() {
	const telemetry = useSyncExternalStore(
		subscribeStorageTelemetry,
		() => cachedTelemetry,
		() => null,
	);
	const [isRefreshing, setIsRefreshing] = useState(false);

	const refresh = useCallback(async () => {
		setIsRefreshing(true);
		try {
			await refreshStorageTelemetry();
		} finally {
			setIsRefreshing(false);
		}
	}, []);

	const clearJuicedHistory = useCallback(async () => {
		try {
			await clearJuicedPostIds();
			await refreshStorageTelemetry();
		} catch (err) {
			console.warn("[ThreadFX] Failed to clear juiced post history:", err);
		}
	}, []);

	const resetSettingsToDefault = useCallback(async () => {
		try {
			await saveSettings(DEFAULT_SETTINGS);
			await refreshStorageTelemetry();
		} catch (err) {
			console.warn("[ThreadFX] Failed to reset settings:", err);
		}
	}, []);

	const resetLikesCounter = useCallback(async () => {
		try {
			await saveSettings({ likesJuicedCount: 0 });
			await refreshStorageTelemetry();
		} catch (err) {
			console.warn("[ThreadFX] Failed to reset likes counter:", err);
		}
	}, []);

	return {
		telemetry,
		loading: telemetry === null || isRefreshing,
		refresh,
		clearJuicedHistory,
		resetSettingsToDefault,
		resetLikesCounter,
	};
}
