// ZzFX - Zuper Zmall Zound Zupplier - Micro Edition (MIT License)
// Procedural Web Audio API sound synthesis without any external audio files.
// Centralized procedural audio synthesis engine for ThreadFX.

let zzfxContext: AudioContext | null = null;

export function getAudioContext(): AudioContext {
	if (!zzfxContext) {
		const AudioContextClass =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		zzfxContext = new AudioContextClass();
	}
	if (zzfxContext.state === "suspended") {
		zzfxContext.resume();
	}
	return zzfxContext;
}

/**
 * Procedural audio generation using Web Audio API buffer.
 * @param volume - Master volume scale (0.0 to 1.0)
 * @param params - Numeric array defining the waveform parameters
 */
export function zzfx(volume = 1, ...params: (number | undefined)[]): AudioBufferSourceNode | null {
	try {
		const ctx = getAudioContext();
		const [
			vol = 1,
			randomness = 0,
			frequency = 220,
			attack = 0,
			sustain = 0,
			decay = 0.1,
			shape = 0,
			,
			pitchJump = 0,
			pitchJumpTime = 0,
		] = params;

		const sampleRate = ctx.sampleRate;
		const length = Math.max(1, Math.floor(sampleRate * (attack + sustain + decay)));
		const buffer = ctx.createBuffer(1, length, sampleRate);
		const data = buffer.getChannelData(0);

		let period = sampleRate / frequency;
		let phase = 0;

		for (let i = 0; i < length; i++) {
			// Calculate envelope
			let env = 1;
			if (i < attack * sampleRate) {
				env = i / (attack * sampleRate);
			} else if (i > (attack + sustain) * sampleRate) {
				env = 1 - (i - (attack + sustain) * sampleRate) / (decay * sampleRate);
			}

			// Add pitch jumps & modulation
			if (pitchJumpTime && i >= pitchJumpTime * sampleRate) {
				period = sampleRate / (frequency + pitchJump);
			}

			phase += 1 / period;
			if (phase >= 1) phase -= 1;

			// Waveform generator based on shape
			let sample = 0;
			switch (shape) {
				case 0: // Sine
					sample = Math.sin(phase * Math.PI * 2);
					break;
				case 1: // Triangle
					sample = Math.abs((phase % 1) * 2 - 1) * 2 - 1;
					break;
				case 2: // Sawtooth
					sample = (phase % 1) * 2 - 1;
					break;
				case 3: // Square
					sample = phase < 0.5 ? 1 : -1;
					break;
				case 4: // Noise
					sample = Math.random() * 2 - 1;
					break;
				default:
					sample = Math.sin(phase * Math.PI * 2);
			}

			// Random noise injection
			if (randomness) {
				sample += (Math.random() * 2 - 1) * randomness;
			}

			// Output sample with master and individual volume
			data[i] = sample * env * vol * volume;
		}

		const source = ctx.createBufferSource();
		source.buffer = buffer;
		source.connect(ctx.destination);
		source.start();
		return source;
	} catch (err) {
		console.warn("[ThreadFX] Audio playback failed:", err);
		return null;
	}
}
