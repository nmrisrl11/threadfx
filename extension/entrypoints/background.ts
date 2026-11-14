export default defineBackground(() => {
  // Automatically open the side panel when the user clicks the extension action icon
  if (chrome.sidePanel && chrome.sidePanel.setPanelBehavior) {
    chrome.sidePanel.setPanelBehavior({ openPanelOnActionClick: true }).catch((error) => {
      console.warn('[ThreadFX] Failed to set sidePanel behavior:', error);
    });
  }

  console.log('[ThreadFX] Background service worker initialized.');
});
