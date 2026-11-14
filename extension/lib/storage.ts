// Type-safe chrome.storage helper for ThreadFX

export interface ThreadFXSettings {
  enabled: boolean;
  volume: number;
  soundPack: 'bubble' | 'retro' | 'hype' | 'blip';
  confettiEnabled: boolean;
  likesJuicedCount: number;
}

export const DEFAULT_SETTINGS: ThreadFXSettings = {
  enabled: true,
  volume: 0.6,
  soundPack: 'bubble',
  confettiEnabled: true,
  likesJuicedCount: 0,
};

export async function getSettings(): Promise<ThreadFXSettings> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) {
    return DEFAULT_SETTINGS;
  }
  return new Promise((resolve) => {
    chrome.storage.local.get(DEFAULT_SETTINGS, (items) => {
      resolve(items as ThreadFXSettings);
    });
  });
}

export async function saveSettings(settings: Partial<ThreadFXSettings>): Promise<void> {
  if (typeof chrome === 'undefined' || !chrome.storage?.local) {
    return;
  }
  return new Promise((resolve) => {
    chrome.storage.local.set(settings, () => {
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

export function onSettingsChanged(callback: (settings: ThreadFXSettings) => void): () => void {
  if (typeof chrome === 'undefined' || !chrome.storage?.onChanged) {
    return () => {};
  }
  const listener = (changes: { [key: string]: chrome.storage.StorageChange }, areaName: string) => {
    if (areaName === 'local') {
      getSettings().then(callback);
    }
  };
  chrome.storage.onChanged.addListener(listener);
  return () => chrome.storage.onChanged.removeListener(listener);
}
