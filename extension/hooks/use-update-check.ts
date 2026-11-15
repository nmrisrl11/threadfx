import { APP_INFO } from "@data/app";
import { useCallback, useEffect, useState } from "react";

export const UPDATE_STORAGE_KEY = "threadfx_update_info";
const CHECK_INTERVAL_MS = 12 * 60 * 60 * 1000; // 12 hours
const FETCH_TIMEOUT_MS = 4000; // 4 seconds

export interface RemoteVersionPayload {
	version: string;
	releaseDate?: string;
	downloadUrl?: string;
	releaseNotesUrl?: string;
	highlights?: string[];
}

export interface UpdateState {
	currentVersion: string;
	latestVersion: string;
	hasUpdate: boolean;
	releaseDate: string | null;
	downloadUrl: string;
	releaseNotesUrl: string;
	highlights: string[];
	lastCheckedAt: number;
	isChecking: boolean;
	error: string | null;
}

const DEFAULT_UPDATE_STATE: UpdateState = {
	currentVersion: APP_INFO.version,
	latestVersion: APP_INFO.version,
	hasUpdate: false,
	releaseDate: null,
	downloadUrl: APP_INFO.urls.download,
	releaseNotesUrl: APP_INFO.urls.releases,
	highlights: [],
	lastCheckedAt: 0,
	isChecking: false,
	error: null,
};

/**
 * Compares two semantic version strings (e.g., "1.0.1" vs "1.0.0").
 * Returns true if remote is strictly greater than current.
 */
export function isNewerVersion(remote: string, current: string): boolean {
	const parse = (v: string) =>
		v
			.replace(/^v/i, "")
			.split(".")
			.map((n) => Number.parseInt(n, 10) || 0);

	const [rMajor = 0, rMinor = 0, rPatch = 0] = parse(remote);
	const [cMajor = 0, cMinor = 0, cPatch = 0] = parse(current);

	if (rMajor !== cMajor) return rMajor > cMajor;
	if (rMinor !== cMinor) return rMinor > cMinor;
	return rPatch > cPatch;
}

/**
 * Fetches latest version metadata from Vercel Edge with timeout and fallback.
 */
async function fetchRemoteVersion(): Promise<RemoteVersionPayload> {
	const endpoints = [
		`${APP_INFO.urls.production}/version.json`,
		`${APP_INFO.urls.fallback}/version.json`,
	];

	for (const url of endpoints) {
		try {
			const controller = new AbortController();
			const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

			const res = await fetch(url, {
				signal: controller.signal,
				cache: "no-cache",
				headers: { Accept: "application/json" },
			});
			clearTimeout(timeoutId);

			if (res.ok) {
				const data = (await res.json()) as RemoteVersionPayload;
				if (data && typeof data.version === "string") {
					return data;
				}
			}
		} catch {
			// Try fallback endpoint
		}
	}

	throw new Error("Unable to check for updates at this time.");
}

export function useUpdateCheck() {
	const [state, setState] = useState<UpdateState>(DEFAULT_UPDATE_STATE);

	// Load cached state from chrome.storage.local on mount and refresh if stale
	useEffect(() => {
		if (typeof chrome === "undefined" || !chrome.storage?.local) return;

		chrome.storage.local.get([UPDATE_STORAGE_KEY], (result) => {
			const cached = result[UPDATE_STORAGE_KEY] as Partial<UpdateState> | undefined;
			const now = Date.now();
			if (cached && typeof cached === "object") {
				const hasNewer = isNewerVersion(cached.latestVersion || APP_INFO.version, APP_INFO.version);
				setState((prev) => ({
					...prev,
					...cached,
					currentVersion: APP_INFO.version,
					hasUpdate: hasNewer,
				}));

				// If cache is older than CHECK_INTERVAL_MS, perform a quiet background revalidation
				if (!cached.lastCheckedAt || now - cached.lastCheckedAt > CHECK_INTERVAL_MS) {
					fetchRemoteVersion()
						.then((remote) => {
							const hasRemoteNewer = isNewerVersion(remote.version, APP_INFO.version);
							const nextState: UpdateState = {
								currentVersion: APP_INFO.version,
								latestVersion: remote.version,
								hasUpdate: hasRemoteNewer,
								releaseDate: remote.releaseDate || null,
								downloadUrl: remote.downloadUrl || APP_INFO.urls.download,
								releaseNotesUrl: remote.releaseNotesUrl || APP_INFO.urls.releases,
								highlights: Array.isArray(remote.highlights) ? remote.highlights : [],
								lastCheckedAt: now,
								isChecking: false,
								error: null,
							};
							setState(nextState);
							chrome.storage.local.set({ [UPDATE_STORAGE_KEY]: nextState });
						})
						.catch(() => {});
				}
			} else {
				// Initial run with zero cache
				fetchRemoteVersion()
					.then((remote) => {
						const hasRemoteNewer = isNewerVersion(remote.version, APP_INFO.version);
						const nextState: UpdateState = {
							currentVersion: APP_INFO.version,
							latestVersion: remote.version,
							hasUpdate: hasRemoteNewer,
							releaseDate: remote.releaseDate || null,
							downloadUrl: remote.downloadUrl || APP_INFO.urls.download,
							releaseNotesUrl: remote.releaseNotesUrl || APP_INFO.urls.releases,
							highlights: Array.isArray(remote.highlights) ? remote.highlights : [],
							lastCheckedAt: now,
							isChecking: false,
							error: null,
						};
						setState(nextState);
						chrome.storage.local.set({ [UPDATE_STORAGE_KEY]: nextState });
					})
					.catch(() => {});
			}
		});
	}, []);

	const checkForUpdate = useCallback(async (): Promise<void> => {
		const now = Date.now();
		setState((prev) => ({ ...prev, isChecking: true, error: null }));

		try {
			const remote = await fetchRemoteVersion();
			const hasNewer = isNewerVersion(remote.version, APP_INFO.version);

			const updatedState: UpdateState = {
				currentVersion: APP_INFO.version,
				latestVersion: remote.version,
				hasUpdate: hasNewer,
				releaseDate: remote.releaseDate || null,
				downloadUrl: remote.downloadUrl || APP_INFO.urls.download,
				releaseNotesUrl: remote.releaseNotesUrl || APP_INFO.urls.releases,
				highlights: Array.isArray(remote.highlights) ? remote.highlights : [],
				lastCheckedAt: now,
				isChecking: false,
				error: null,
			};

			setState(updatedState);

			if (typeof chrome !== "undefined" && chrome.storage?.local) {
				chrome.storage.local.set({ [UPDATE_STORAGE_KEY]: updatedState });
			}
		} catch (err) {
			setState((prev) => ({
				...prev,
				isChecking: false,
				error: err instanceof Error ? err.message : "Update check failed",
			}));
		}
	}, []);

	return {
		...state,
		checkForUpdate,
	};
}
