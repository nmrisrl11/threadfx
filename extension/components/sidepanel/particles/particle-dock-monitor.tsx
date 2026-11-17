import { subscribeParticlePulse } from "@/hooks/use-settings";
import { cn } from "@/lib/utils";
import type { BurstMode, ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE } from "@data/particles";
import { PlayIcon } from "lucide-react";
import { memo, useEffect, useMemo, useState } from "react";

interface ParticleDockMonitorProps {
	selectedPaletteId: ConfettiPaletteId;
	burstMode: BurstMode;
	selectedEmoji: string;
	confettiEnabled: boolean;
	confettiCount: number;
	confettiSpread: number;
	onTriggerBurst: () => void;
}

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

	const activePalette: ConfettiPalette = useMemo(
		() => CONFETTI_PALETTES[selectedPaletteId] ?? CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE],
		[selectedPaletteId],
	);

	// Listen for live particle pulses (both in-panel auditions and in-feed likes)
	useEffect(() => {
		return subscribeParticlePulse(() => {
			setIsPulsing(true);
			const timer = setTimeout(() => setIsPulsing(false), 350);
			return () => clearTimeout(timer);
		});
	}, []);

	return (
		<div className="@container/dock">
			<div className="border-border bg-card/80 flex items-center justify-between rounded-xl border px-3 py-2 text-xs shadow-xs backdrop-blur-xs transition-colors select-none">
				{/* Left: Hardware Status Indicator & Active Style */}
				<div className="flex min-w-0 items-center gap-2">
					{/* Status LED */}
					<span className="relative flex h-2 w-2 shrink-0">
						<span
							className={cn(
								"absolute inline-flex h-full w-full rounded-full transition-opacity duration-150",
								isPulsing ? "animate-ping bg-emerald-400 opacity-75" : "opacity-0",
							)}
						/>
						<span
							className={cn(
								"relative inline-flex h-2 w-2 rounded-full transition-colors duration-200",
								isPulsing
									? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
									: confettiEnabled
										? "bg-emerald-500"
										: "bg-muted-foreground/40",
							)}
						/>
					</span>

					{/* Active Palette Swatches or Emoji Reaction Badge */}
					<div className="flex min-w-0 items-center gap-1.5">
						{burstMode === "emoji" ? (
							<div className="flex min-w-0 items-center gap-1.5">
								<span
									className={cn(
										"border-border/80 bg-surface-muted flex size-5 shrink-0 items-center justify-center rounded-md border text-xs transition-transform duration-150",
										isPulsing && "scale-125",
									)}
								>
									{selectedEmoji}
								</span>
								<span className="text-foreground truncate text-[11px] font-medium">
									Emoji Burst
								</span>
							</div>
						) : (
							<div className="flex min-w-0 items-center gap-1.5">
								<span className="text-foreground max-w-21.25 truncate text-[11px] font-medium @[360px]/dock:max-w-30">
									{activePalette.name}
								</span>

								{/* Mini Swatches */}
								<div
									className={cn(
										"flex shrink-0 items-center gap-0.5 transition-transform duration-150",
										isPulsing && "scale-110",
									)}
								>
									{activePalette.colors.slice(0, 4).map((c, i) => (
										<span
											key={i}
											className="inline-block size-2 rounded-full border border-black/20"
											style={{ backgroundColor: c }}
										/>
									))}
								</div>
							</div>
						)}
					</div>

					{/* Center: Live Physics Telemetry Pill (Responsive container query) */}
					<div className="border-border/60 text-muted-foreground hidden shrink-0 items-center gap-1 border-l pl-2 font-mono text-[10px] @[320px]/dock:flex">
						<span>{confettiEnabled ? `${confettiCount}p · ${confettiSpread}° arc` : "Muted"}</span>
					</div>
				</div>

				{/* Right: Tactile Trigger Burst Button */}
				<button
					type="button"
					onClick={onTriggerBurst}
					title="Test active particle burst"
					className="border-border/80 hover:bg-accent text-foreground flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md border px-2.5 py-1 font-mono text-[10px] font-medium transition-colors duration-150 active:scale-[0.98]"
				>
					<PlayIcon className="h-2.5 w-2.5 fill-current opacity-80" />
					<span>Trigger Burst</span>
				</button>
			</div>
		</div>
	);
});
