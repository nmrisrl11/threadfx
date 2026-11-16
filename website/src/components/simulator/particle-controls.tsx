import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { BurstMode, ConfettiPaletteId } from "@data/particles";
import { CONFETTI_PALETTE_LIST, QUICK_EMOJIS } from "@data/particles";
import { SparklesIcon } from "lucide-react";

interface ParticleControlsProps {
	confettiActive: boolean;
	burstMode: BurstMode;
	selectedPalette: ConfettiPaletteId;
	selectedEmoji: string;
	onToggleConfetti: (active: boolean) => void;
	onSelectBurstMode: (mode: BurstMode) => void;
	onSelectPalette: (id: ConfettiPaletteId) => void;
	onSelectEmoji: (emoji: string) => void;
}

export function ParticleControls({
	confettiActive,
	burstMode,
	selectedPalette,
	selectedEmoji,
	onToggleConfetti,
	onSelectBurstMode,
	onSelectPalette,
	onSelectEmoji,
}: ParticleControlsProps) {
	return (
		<div className="w-full space-y-3.5 rounded-2xl border border-white/[0.06] bg-[#0e0e12]/75 p-4.5 backdrop-blur-md">
			{/* Pod Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-300 uppercase">
					<SparklesIcon className="size-3.5 text-zinc-400" />
					<span>Particles</span>
				</div>
				<Switch
					checked={confettiActive}
					onCheckedChange={onToggleConfetti}
					aria-label="Toggle live particle burst feedback"
				/>
			</div>

			{confettiActive ? (
				<div className="space-y-3 pt-0.5">
					{/* Mode Segmented Switcher */}
					<div className="grid grid-cols-2 rounded-lg border border-white/[0.06] bg-black/40 p-0.5 text-xs">
						<button
							type="button"
							onClick={() => onSelectBurstMode("palette")}
							className={cn(
								"cursor-pointer rounded-md py-1 text-center font-medium transition-colors duration-150 select-none",
								burstMode === "palette"
									? "bg-[#222228] text-white shadow-xs"
									: "text-zinc-400 hover:text-white",
							)}
						>
							Palettes
						</button>
						<button
							type="button"
							onClick={() => onSelectBurstMode("emoji")}
							className={cn(
								"cursor-pointer rounded-md py-1 text-center font-medium transition-colors duration-150 select-none",
								burstMode === "emoji"
									? "bg-[#222228] text-white shadow-xs"
									: "text-zinc-400 hover:text-white",
							)}
						>
							Emojis
						</button>
					</div>

					{/* Palettes Grid - Zero Layout Shift Geometry */}
					{burstMode === "palette" ? (
						<div className="grid grid-cols-2 gap-1.5">
							{CONFETTI_PALETTE_LIST.map((palette) => {
								const isSelected = selectedPalette === palette.id;
								return (
									<button
										key={palette.id}
										type="button"
										onClick={() => onSelectPalette(palette.id)}
										className={cn(
											"group flex cursor-pointer items-center justify-between rounded-lg border p-2 text-left transition-colors duration-150 outline-none select-none",
											isSelected
												? "border-white/30 bg-[#18181e] text-white shadow-xs"
												: "border-white/[0.06] bg-white/[0.02] text-zinc-400 hover:border-white/15 hover:bg-white/[0.04] hover:text-zinc-200",
											"active:bg-[#202028]",
										)}
									>
										<div className="flex min-w-0 items-center gap-1.5">
											<div className="flex shrink-0 items-center gap-0.5">
												{palette.colors.slice(0, 3).map((color, idx) => (
													<span
														key={idx}
														className="size-1.5 rounded-full"
														style={{ backgroundColor: color }}
													/>
												))}
											</div>
											<span
												className={cn(
													"block truncate font-mono text-[10px] font-medium transition-colors duration-150",
													isSelected ? "text-white" : "text-zinc-400 group-hover:text-zinc-200",
												)}
											>
												{palette.name.replace(/ (Minimal|Neon|Aurora|Coral)/, "")}
											</span>
										</div>

										{/* Permanent indicator slot to eliminate flexbox layout shift */}
										<span
											className={cn(
												"size-1.5 shrink-0 rounded-full transition-opacity duration-150",
												isSelected
													? "bg-white opacity-100 shadow-[0_0_6px_rgba(255,255,255,0.6)]"
													: "opacity-0",
											)}
										/>
									</button>
								);
							})}
						</div>
					) : (
						/* Emojis Grid - Zero Layout Shift Geometry */
						<div className="grid grid-cols-4 gap-1.5">
							{QUICK_EMOJIS.map((emoji) => {
								const isSelected = selectedEmoji === emoji;
								return (
									<button
										key={emoji}
										type="button"
										onClick={() => onSelectEmoji(emoji)}
										className={cn(
											"flex h-8 cursor-pointer items-center justify-center rounded-lg border text-base transition-colors duration-150 outline-none select-none",
											isSelected
												? "border-white/30 bg-[#18181e] shadow-xs"
												: "border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]",
											"active:bg-[#202028]",
										)}
									>
										{emoji}
									</button>
								);
							})}
						</div>
					)}
				</div>
			) : (
				<div className="py-4 text-center font-mono text-[11px] text-zinc-500">
					Visual bursts disabled
				</div>
			)}
		</div>
	);
}
