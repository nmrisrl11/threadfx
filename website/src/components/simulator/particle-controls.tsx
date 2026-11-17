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
		<div className="border-border bg-card/75 shadow-card w-full space-y-3.5 rounded-2xl border p-4.5 backdrop-blur-md">
			{/* Pod Header */}
			<div className="flex items-center justify-between">
				<div className="text-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
					<SparklesIcon className="text-muted-foreground size-3.5" />
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
					<div className="border-border bg-muted/60 grid grid-cols-2 rounded-lg border p-0.5 text-xs">
						<button
							type="button"
							onClick={() => onSelectBurstMode("palette")}
							className={cn(
								"cursor-pointer rounded-md py-1 text-center font-medium transition-colors duration-150 select-none",
								burstMode === "palette"
									? "bg-card text-foreground font-semibold shadow-xs"
									: "text-muted-foreground hover:text-foreground",
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
									? "bg-card text-foreground font-semibold shadow-xs"
									: "text-muted-foreground hover:text-foreground",
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
												? "border-foreground/30 bg-accent text-foreground shadow-xs"
												: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/15 hover:bg-muted hover:text-foreground",
											"active:bg-accent/80",
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
													isSelected
														? "text-foreground"
														: "text-muted-foreground group-hover:text-foreground",
												)}
											>
												{palette.name.replace(/ (Minimal|Neon|Aurora|Coral)/, "")}
											</span>
										</div>

										{/* Permanent indicator slot to eliminate flexbox layout shift */}
										<span
											className={cn(
												"size-1.5 shrink-0 rounded-full transition-opacity duration-150",
												isSelected ? "bg-foreground opacity-100 shadow-xs" : "opacity-0",
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
												? "border-foreground/30 bg-accent shadow-xs"
												: "border-border bg-surface-subtle hover:border-foreground/15 hover:bg-muted",
											"active:bg-accent/80",
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
				<div className="text-muted-foreground py-4 text-center font-mono text-[11px]">
					Visual bursts disabled
				</div>
			)}
		</div>
	);
}
