import { subscribeAudioPulse } from "@/lib/audio-events";
import type { SoundPack } from "@data/presets";
import { SOUND_PACKS } from "@data/presets";
import { useEffect, useRef, useState } from "react";

// 28 frequency bands across the acoustic spectrum (matching extension Sound FX tab)
const NUM_BARS = 28;

// Base curve: authentic EQ bell curve (higher in mids, tapering at subsonic and high frequencies)
const BASE_CURVE = [
	0.18, 0.28, 0.38, 0.5, 0.62, 0.74, 0.85, 0.94, 1.0, 0.98, 0.94, 0.88, 0.82, 0.76, 0.7, 0.64, 0.58,
	0.52, 0.46, 0.4, 0.35, 0.3, 0.26, 0.22, 0.19, 0.16, 0.14, 0.12,
];

export function HeroWaveform() {
	const [isPulsing, setIsPulsing] = useState(false);
	const [activePack, setActivePack] = useState<SoundPack>(SOUND_PACKS.bubble);
	const [dynamicAmplitudes, setDynamicAmplitudes] = useState<number[]>(() =>
		BASE_CURVE.map((val) => val * 0.24),
	);
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// Listen for live audio pulses triggered from logo interaction
	useEffect(() => {
		return subscribeAudioPulse((pack) => {
			const currentPack = pack ?? SOUND_PACKS.bubble;
			setActivePack(currentPack);

			// Clear previous decay timer on rapid consecutive taps
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}

			setIsPulsing(true);

			// Calculate resonant frequency center based on the preset frequency (150Hz - 950Hz)
			const freq = currentPack.frequency ?? 420;
			const normalizedFreq = Math.min(1, Math.max(0, (freq - 150) / 800));
			const centerBar = Math.round(normalizedFreq * (NUM_BARS - 1));

			// Generate randomized acoustic peaks biased toward the preset's resonant band
			const peaks = BASE_CURVE.map((curve, idx) => {
				const dist = Math.abs(idx - centerBar) / NUM_BARS;
				const resonanceBoost = Math.max(0.65, 1.25 - dist * 0.85);
				const randomJitter = 0.75 + Math.random() * 0.45;
				return Math.min(1, Math.max(0.2, curve * resonanceBoost * randomJitter * 0.95));
			});
			setDynamicAmplitudes(peaks);

			// Ballistic decay back to resting baseline
			timeoutRef.current = setTimeout(() => {
				setIsPulsing(false);
				setDynamicAmplitudes(BASE_CURVE.map((val) => val * 0.24));
			}, 460);
		});
	}, []);

	return (
		<div className="mt-3.5 flex flex-col items-center gap-1.5 transition-all duration-300">
			{/* Waveform Surface: 28 Frequency Bands Centered Beneath Logo */}
			<div className="relative flex h-5 w-44 items-end justify-between gap-[2.5px] px-0.5 sm:h-6 sm:w-52">
				{Array.from({ length: NUM_BARS }).map((_, idx) => {
					const amp = dynamicAmplitudes[idx] ?? 0.2;

					return (
						<div
							key={idx}
							className={`flex-1 rounded-full transition-all duration-150 ease-out ${
								isPulsing
									? "bg-foreground opacity-95 shadow-xs"
									: "bg-muted-foreground/30 group-hover:bg-muted-foreground/60 opacity-40 group-hover:opacity-75"
							}`}
							style={{
								height: `${Math.round(amp * 100)}%`,
								minHeight: "3px",
								transformOrigin: "bottom",
								transitionProperty: "height, opacity, background-color, box-shadow",
							}}
						/>
					);
				})}
			</div>

			{/* Micro-Affordance Whisper: LED dot + Active Preset Name + Frequency */}
			<div className="text-muted-foreground group-hover:text-foreground flex items-center gap-1.5 font-mono text-[10px] transition-colors duration-200">
				<span className="relative flex h-1.5 w-1.5">
					<span
						className={`absolute inline-flex h-full w-full rounded-full transition-opacity duration-150 ${
							isPulsing ? "bg-foreground animate-ping opacity-75" : "opacity-0"
						}`}
					/>
					<span
						className={`relative inline-flex h-1.5 w-1.5 rounded-full transition-all duration-200 ${
							isPulsing
								? "bg-foreground shadow-xs"
								: "bg-muted-foreground/60 ring-border group-hover:bg-muted-foreground ring-1"
						}`}
					/>
				</span>
				<span className="font-medium tracking-tight">
					{activePack.name} · {activePack.frequency ? `${activePack.frequency}Hz` : "Tactile"}
				</span>
			</div>
		</div>
	);
}
