export default defineBackground(() => {
	// Automatically open the side panel when the user clicks the extension action icon
	if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
		chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => {
			console.warn("[ThreadFX] Failed to set sidePanel behavior:", error);
		});
	}

	let sidePanelPort: chrome.runtime.Port | null = null;

	// Track Side Panel connection lifecycle
	chrome.runtime.onConnect.addListener((port) => {
		if (port.name === "threadfx-sidepanel") {
			sidePanelPort = port;
			port.onDisconnect.addListener(() => {
				sidePanelPort = null;
			});
		}
	});

	// Toggle side panel when user triggers keyboard shortcut (Alt+Shift+T)
	if (typeof chrome !== "undefined" && chrome.commands?.onCommand) {
		chrome.commands.onCommand.addListener(async (command) => {
			if (command === "toggle-sidepanel") {
				if (sidePanelPort) {
					try {
						sidePanelPort.postMessage({ type: "CLOSE_SIDEPANEL" });
					} catch {
						sidePanelPort = null;
					}
					return;
				}

				try {
					const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
					if (activeTab?.windowId && chrome.sidePanel?.open) {
						await chrome.sidePanel.open({ windowId: activeTab.windowId });
					}
				} catch (error) {
					console.warn("[ThreadFX] Failed to open side panel via command:", error);
				}
			}
		});
	}

	// Handle toggle request from in-feed content script or side panel
	chrome.runtime.onMessage.addListener(async (msg, sender) => {
		if (msg?.type === "TOGGLE_SIDEPANEL") {
			if (sidePanelPort) {
				try {
					sidePanelPort.postMessage({ type: "CLOSE_SIDEPANEL" });
				} catch {
					sidePanelPort = null;
				}
				return;
			}

			try {
				const windowId = sender.tab?.windowId;
				if (windowId && chrome.sidePanel?.open) {
					await chrome.sidePanel.open({ windowId });
				} else {
					const [activeTab] = await chrome.tabs.query({ active: true, currentWindow: true });
					if (activeTab?.windowId && chrome.sidePanel?.open) {
						await chrome.sidePanel.open({ windowId: activeTab.windowId });
					}
				}
			} catch (error) {
				console.warn("[ThreadFX] Failed to open side panel:", error);
			}
		}
	});

	console.log("[ThreadFX] Background service worker initialized.");
});
