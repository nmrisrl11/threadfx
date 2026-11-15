import { APP_INFO } from "@data/app";
import { useEffect, useState } from "react";

export type SupportedPlatformId = "threads" | null;

export interface ActiveTabStatus {
	isSupportedPlatform: boolean;
	activePlatform: SupportedPlatformId;
	isThreadsActive: boolean; // Convenience flag for backward-compatibility while Threads is flagship
}

export function useActiveTabStatus(): ActiveTabStatus {
	const [status, setStatus] = useState<ActiveTabStatus>({
		isSupportedPlatform: true, // Default to true to prevent initial layout flash
		activePlatform: "threads",
		isThreadsActive: true,
	});

	useEffect(() => {
		const checkActiveTab = async () => {
			if (typeof chrome === "undefined" || !chrome.tabs?.query) {
				setStatus({
					isSupportedPlatform: false,
					activePlatform: null,
					isThreadsActive: false,
				});
				return;
			}

			try {
				const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
				if (!activeTab) {
					setStatus({
						isSupportedPlatform: false,
						activePlatform: null,
						isThreadsActive: false,
					});
					return;
				}

				const url = activeTab.url || activeTab.pendingUrl || "";
				const isThreadsDomain =
					url.includes(APP_INFO.platform.domain) || url.includes(APP_INFO.platform.legacyDomain);

				if (isThreadsDomain) {
					setStatus({
						isSupportedPlatform: true,
						activePlatform: "threads",
						isThreadsActive: true,
					});
					return;
				}

				// If the tab URL wasn't directly accessible (due to minimal permissions), test responsive ping to content script
				if (activeTab.id) {
					chrome.tabs.sendMessage(activeTab.id, { type: "PING_THREADFX" }, (res) => {
						if (!chrome.runtime.lastError && res?.active) {
							setStatus({
								isSupportedPlatform: true,
								activePlatform: "threads",
								isThreadsActive: true,
							});
						} else {
							setStatus({
								isSupportedPlatform: false,
								activePlatform: null,
								isThreadsActive: false,
							});
						}
					});
				} else {
					setStatus({
						isSupportedPlatform: false,
						activePlatform: null,
						isThreadsActive: false,
					});
				}
			} catch {
				setStatus({
					isSupportedPlatform: false,
					activePlatform: null,
					isThreadsActive: false,
				});
			}
		};

		checkActiveTab();

		// Listen for user switching between tabs or updating URLs
		const handleTabActivated = () => {
			checkActiveTab();
		};

		const handleTabUpdated = (_tabId: number, changeInfo: { status?: string; url?: string }) => {
			if (changeInfo.status === "complete" || changeInfo.url) {
				checkActiveTab();
			}
		};

		if (typeof chrome !== "undefined" && chrome.tabs) {
			chrome.tabs.onActivated?.addListener(handleTabActivated);
			chrome.tabs.onUpdated?.addListener(handleTabUpdated);
		}

		return () => {
			if (typeof chrome !== "undefined" && chrome.tabs) {
				chrome.tabs.onActivated?.removeListener(handleTabActivated);
				chrome.tabs.onUpdated?.removeListener(handleTabUpdated);
			}
		};
	}, []);

	return status;
}
