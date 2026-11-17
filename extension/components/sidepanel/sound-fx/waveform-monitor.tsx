import { subscribeAudioPulse } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import type { SoundPack, SoundPackId } from "@data/presets";
import { SOUND_PACKS } from "@data/presets";
import { PlayIcon } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface WaveformMonitorProps {
	selectedPackId: SoundPackId;
	onPreviewPack: (pack: SoundPack) => void;
	volume: number;
	pitch?: number;
}

// 28 frequency bands across the acoustic spectrum
const NUM_BARS = 28;

// Base curve: authentic EQ bell curve (higher in mids, tapering at subsonic and high frequencies)
const BASE_CURVE = [
	0.18, 0.28, 0.38, 0.5, 0.62, 0.74, 0.85, 0.94, 1.0, 0.98, 0.94, 0.88, 0.82, 0.76, 0.7, 0.64, 0.58,
	0.52, 0.46, 0.4, 0.35, 0.3, 0.26, 0.22, 0.19, 0.16, 0.14, 0.12,
];

// Color mapping for ThreadFX signature gradient (#FF2E93 -> #7928CA -> #00F5FF)
function getBarColor(idx: number, total: number): string {
	const progress = idx / (total - 1);
	if (progress < 0.45) {
		// Pink to Violet
		return "var(--bar-pink, #FF2E93)";
	} else if (progress < 0.75) {
		// Violet
		return "var(--bar-violet, #7928CA)";
	}
	// Cyan
	return "var(--bar-cyan, #00F5FF)";
}

export const WaveformMonitor = memo(function WaveformMonitor({
	selectedPackId,
	onPreviewPack,
	volume,
	pitch = 1,
}: WaveformMonitorProps) {
	const [isPulsing, setIsPulsing] = useState(false);
	const [dynamicAmplitudes, setDynamicAmplitudes] = useState<number[]>(() =>
		BASE_CURVE.map((val) => val * 0.28),
	);

	const activePack = useMemo(
		() => SOUND_PACKS[selectedPackId] || SOUND_PACKS.bubble,
		[selectedPackId],
	);

	// Listen for live audio pulses (both in-panel auditions and in-feed likes)
	useEffect(() => {
		return subscribeAudioPulse(() => {
			setIsPulsing(true);

			// Generate randomized acoustic peaks scaled by volume
			const peaks = BASE_CURVE.map((curve) => {
				const randomJitter = 0.75 + Math.random() * 0.5;
				const amp = Math.min(1, Math.max(0.2, curve * randomJitter * Math.max(0.4, volume)));
				return amp;
			});
			setDynamicAmplitudes(peaks);

			// Decay back to resting state
			const timer = setTimeout(() => {
				setIsPulsing(false);
				setDynamicAmplitudes(BASE_CURVE.map((val) => val * 0.28));
			}, 480);

			return () => clearTimeout(timer);
		});
	}, [volume]);

	const handleClick = useCallback(() => {
		onPreviewPack(activePack);
	}, [onPreviewPack, activePack]);

	return (
		<div className="@container/monitor">
			<div
				role="button"
				tabIndex={0}
				onClick={handleClick}
				onKeyDown={(e) => {
					if (e.key === "Enter" || e.key === " ") {
						e.preventDefault();
						handleClick();
					}
				}}
				className="group border-border bg-surface-subtle hover:border-foreground/20 hover:bg-surface-muted relative cursor-pointer overflow-hidden rounded-xl border p-3 transition-colors duration-200 select-none"
			>
				{/* Top Header Row */}
				<div className="mb-2.5 flex items-center justify-between">
					<div className="flex items-center gap-2">
						{/* Glowing Audio LED */}
						<span className="relative flex h-2 w-2">
							<span
								className={cn(
									"absolute inline-flex h-full w-full rounded-full transition-opacity duration-150",
									isPulsing
										? "animate-ping bg-emerald-400 opacity-75"
										: "bg-emerald-500/30 opacity-0",
								)}
							/>
							<span
								className={cn(
									"relative inline-flex h-2 w-2 rounded-full transition-colors duration-200",
									isPulsing
										? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
										: "bg-emerald-500/70",
								)}
							/>
						</span>

						<div className="flex items-baseline gap-1.5">
							<span className="text-foreground text-xs font-semibold tracking-tight">
								{activePack.name}
							</span>
							<span className="text-muted-foreground/70 font-mono text-[10px]">
								{Math.round(activePack.frequency * pitch)}Hz
							</span>
							{pitch !== 1 && (
								<span className="text-muted-foreground/50 font-mono text-[9px]">
									({pitch.toFixed(1)}x)
								</span>
							)}
						</div>
					</div>

					{/* Center status for wide viewports */}
					<div className="text-muted-foreground/50 hidden items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase @[520px]/monitor:flex">
						<span className="h-1 w-1 rounded-full bg-cyan-400/80" />
						<span>Synthesized Web Audio</span>
					</div>

					{/* Tap to test hint */}
					<div className="text-muted-foreground group-hover:text-foreground flex items-center gap-1 font-mono text-[10px] transition-colors">
						<span>Audition</span>
						<PlayIcon className="h-2.5 w-2.5 fill-current opacity-70 group-hover:opacity-100" />
					</div>
				</div>

				{/* Audio Visualizer Waveform Surface */}
				<div className="relative flex h-8 w-full items-end justify-between gap-0.75 px-0.5">
					{Array.from({ length: NUM_BARS }).map((_, idx) => {
						const amp = dynamicAmplitudes[idx] ?? 0.25;
						const barColor = getBarColor(idx, NUM_BARS);

						return (
							<div
								key={idx}
								className={cn(
									"flex-1 rounded-full transition-all duration-150 ease-out",
									!isPulsing && "opacity-60",
								)}
								style={{
									height: `${Math.round(amp * 100)}%`,
									backgroundColor: barColor,
									minHeight: "4px",
									transformOrigin: "bottom",
									transitionProperty: "height, opacity",
								}}
							/>
						);
					})}
				</div>

				{/* Bottom subtle metadata label */}
				<div className="border-border/40 text-muted-foreground/60 mt-2 flex items-center justify-between border-t pt-1.5 font-mono text-[9px]">
					<span>SPECTRUM MONITOR</span>
					<span className="hidden @[440px]/monitor:inline">44.1KHZ BUFFER</span>
					<span>ZERO LATENCY</span>
				</div>
			</div>
		</div>
	);
});
