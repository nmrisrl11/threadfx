import { subscribeParticlePulse } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import type { BurstMode, ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@data/particles";
import { PlayIcon } from "lucide-react";
import { memo, useCallback, useEffect, useMemo, useState } from "react";

interface ParticleDockMonitorProps {
	selectedPaletteId: ConfettiPaletteId;
	burstMode: BurstMode;
	selectedEmoji: string;
	confettiEnabled: boolean;
	confettiCount: number;
	confettiSpread: number;
	onTriggerBurst: () => void;
}

// 24 simulated particle nodes across the horizon arc
const NUM_PARTICLES = 24;

// Base resting amplitudes across the particle horizon
const RESTING_AMPLITUDES = [
	0.18, 0.22, 0.28, 0.35, 0.42, 0.5, 0.58, 0.65, 0.72, 0.78, 0.82, 0.85, 0.85, 0.82, 0.78, 0.72,
	0.65, 0.58, 0.5, 0.42, 0.35, 0.28, 0.22, 0.18,
];

export const ParticleDockMonitor = memo(function ParticleDockMonitor({
	selectedPaletteId,
	burstMode,
	selectedEmoji,
	confettiEnabled,
	confettiCount,
	confettiSpread,
	onTriggerBurst,
}: ParticleDockMonitorProps) {
	const [isPulsing, setIsPulsing] = useState(false);
	const [dynamicAmplitudes, setDynamicAmplitudes] = useState<number[]>(() =>
		RESTING_AMPLITUDES.map((val) => val * 0.28),
	);

	const activePalette: ConfettiPalette = useMemo(
		() => CONFETTI_PALETTES[selectedPaletteId] ?? CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE],
		[selectedPaletteId],
	);

	// Listen for live particle pulses (both in-panel tests and in-feed likes)
	useEffect(() => {
		return subscribeParticlePulse(() => {
			setIsPulsing(true);

			// Generate lively particle peak trajectories scaled by particle density
			const densityScale = Math.min(1.2, Math.max(0.6, confettiCount / 30));
			const peaks = RESTING_AMPLITUDES.map((curve) => {
				const randomJitter = 0.7 + Math.random() * 0.6;
				return Math.min(1, Math.max(0.2, curve * randomJitter * densityScale));
			});
			setDynamicAmplitudes(peaks);

			// Decay back to resting state
			const timer = setTimeout(() => {
				setIsPulsing(false);
				setDynamicAmplitudes(RESTING_AMPLITUDES.map((val) => val * 0.28));
			}, 480);

			return () => clearTimeout(timer);
		});
	}, [confettiCount]);

	const handleClick = useCallback(() => {
		onTriggerBurst();
	}, [onTriggerBurst]);

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
				<div className="mb-2.5 flex items-center justify-between gap-2">
					<div className="flex min-w-0 flex-1 items-center gap-2">
						{/* Hardware Status LED (Emerald green matching Sound FX monitor & header) */}
						<span className="relative flex h-2 w-2 shrink-0">
							<span
								className={cn(
									"absolute inline-flex h-full w-full rounded-full transition-opacity duration-150",
									isPulsing
										? "animate-ping bg-emerald-400 opacity-75"
										: confettiEnabled
											? "bg-emerald-500/30 opacity-0"
											: "bg-zinc-500/30 opacity-0",
								)}
							/>
							<span
								className={cn(
									"relative inline-flex h-2 w-2 rounded-full transition-colors duration-200",
									isPulsing
										? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
										: confettiEnabled
											? "bg-emerald-500/70"
											: "bg-muted-foreground/40",
								)}
							/>
						</span>

						{/* Active Palette Name or Emoji Glyph Badge */}
						<div className="flex min-w-0 flex-1 items-center gap-1.5">
							{burstMode === "emoji" ? (
								<>
									<span className="border-border/80 bg-surface-muted flex size-5 shrink-0 items-center justify-center rounded-md border text-xs">
										{selectedEmoji}
									</span>
									<span className="text-foreground truncate text-xs font-semibold tracking-tight">
										Emoji Reaction
									</span>
								</>
							) : (
								<>
									<span className="text-foreground truncate text-xs font-semibold tracking-tight">
										{activePalette.name}
									</span>

									{/* Mini Swatches */}
									<div className="flex shrink-0 items-center gap-0.5">
										{activePalette.colors.slice(0, 4).map((c, i) => (
											<span
												key={i}
												className="inline-block size-1.5 rounded-full border border-black/30"
												style={{ backgroundColor: c }}
											/>
										))}
									</div>
								</>
							)}

							<span className="text-muted-foreground/70 hidden shrink-0 font-mono text-[10px] @[340px]/monitor:inline">
								{confettiCount}p · {confettiSpread}°
							</span>
						</div>
					</div>

					{/* Center status for wide viewports */}
					<div className="text-muted-foreground/50 hidden items-center gap-1.5 font-mono text-[9px] tracking-wider uppercase @[520px]/monitor:flex">
						<span className="h-1 w-1 rounded-full bg-emerald-400/80" />
						<span>
							{burstMode === "emoji" ? "Canvas Emoji Viewport" : "Canvas Palette Viewport"}
						</span>
					</div>

					{/* Tap to test hint */}
					<div className="text-muted-foreground group-hover:text-foreground flex shrink-0 items-center gap-1 font-mono text-[10px] transition-colors">
						<span>Trigger Burst</span>
						<PlayIcon className="h-2.5 w-2.5 fill-current opacity-70 group-hover:opacity-100" />
					</div>
				</div>

				{/* Particle Burst Horizon Surface */}
				<div className="relative flex h-8 w-full items-end justify-between gap-[3px] px-0.5">
					{Array.from({ length: NUM_PARTICLES }).map((_, idx) => {
						const amp = dynamicAmplitudes[idx] ?? 0.25;
						const color =
							activePalette.colors[idx % activePalette.colors.length] ?? activePalette.colors[0];

						return (
							<div
								key={idx}
								className={cn(
									"flex-1 rounded-full transition-all duration-150 ease-out",
									!isPulsing && "opacity-50",
									!confettiEnabled && "opacity-30 grayscale",
								)}
								style={{
									height: `${Math.round(amp * 100)}%`,
									backgroundColor: color,
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
					<span>PARTICLE MONITOR</span>
					<span className="hidden @[440px]/monitor:inline">
						{!confettiEnabled
							? "BURSTS MUTED"
							: burstMode === "emoji"
								? "EMOJI BURST"
								: "PALETTE OVERLAY"}
					</span>
					<span>HARDWARE ACCEL</span>
				</div>
			</div>
		</div>
	);
});
