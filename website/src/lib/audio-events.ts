import type { SoundPack } from "@data/presets";

const audioPulseListeners = new Set<(pack?: SoundPack) => void>();

/**
 * Subscribes a listener to audio pulse events.
 * Returns an unsubscribe cleanup function.
 */
export function subscribeAudioPulse(listener: (pack?: SoundPack) => void): () => void {
	audioPulseListeners.add(listener);
	return () => {
		audioPulseListeners.delete(listener);
	};
}

/**
 * Emits an audio pulse event to all active listeners.
 */
export function emitAudioPulse(pack?: SoundPack): void {
	audioPulseListeners.forEach((listener) => {
		listener(pack);
	});
}
