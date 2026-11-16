import { Switch } from "@/components/ui/switch";
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
		<div className="space-y-3 rounded-xl border border-white/8 bg-[#0D0D0F] p-3.5">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<SparklesIcon className="h-3.5 w-3.5 text-[#00F5FF]" />
					<span className="text-foreground text-xs font-semibold">Particle Dynamics</span>
				</div>
				<Switch checked={confettiActive} onCheckedChange={onToggleConfetti} />
			</div>

			{confettiActive && (
				<div className="space-y-2.5 pt-1">
					{/* Segmented Mode Selector */}
					<div className="grid grid-cols-2 rounded-lg border border-white/8 bg-black/40 p-0.5 text-xs">
						<button
							type="button"
							onClick={() => onSelectBurstMode("palette")}
							className={`cursor-pointer rounded-md py-1 text-center font-medium transition-[background-color,color] duration-150 select-none ${
								burstMode === "palette"
									? "text-foreground bg-[#18181B] shadow-xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Color Palettes
						</button>
						<button
							type="button"
							onClick={() => onSelectBurstMode("emoji")}
							className={`cursor-pointer rounded-md py-1 text-center font-medium transition-[background-color,color] duration-150 select-none ${
								burstMode === "emoji"
									? "text-foreground bg-[#18181B] shadow-xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							Emoji Bursts
						</button>
					</div>

					{burstMode === "palette" ? (
						<div className="grid grid-cols-3 gap-1.5">
							{CONFETTI_PALETTE_LIST.map((palette) => {
								const isSelected = selectedPalette === palette.id;
								return (
									<button
										key={palette.id}
										type="button"
										onClick={() => onSelectPalette(palette.id)}
										className={`group flex cursor-pointer flex-col rounded-lg border p-1.5 text-left transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)] select-none active:scale-[0.97] ${
											isSelected
												? "border-[#00F5FF] bg-[#161618]"
												: "border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4"
										}`}
									>
										<div className="mb-1 flex gap-1">
											{palette.colors.slice(0, 3).map((color, idx) => (
												<span
													key={idx}
													className="h-2 w-2 rounded-full border border-black/30"
													style={{ backgroundColor: color }}
												/>
											))}
										</div>
										<span className="text-foreground block truncate font-mono text-[10px] font-medium">
											{palette.name}
										</span>
									</button>
								);
							})}
						</div>
					) : (
						<div className="grid grid-cols-4 gap-1.5">
							{QUICK_EMOJIS.map((emoji) => {
								const isSelected = selectedEmoji === emoji;
								return (
									<button
										key={emoji}
										type="button"
										onClick={() => onSelectEmoji(emoji)}
										className={`flex h-8 cursor-pointer items-center justify-center rounded-lg border text-base transition-[background-color,border-color,transform] duration-150 ease-[var(--ease-out)] select-none active:scale-[0.97] ${
											isSelected
												? "border-[#FF2E93] bg-[#161618]"
												: "border-white/6 bg-white/2 hover:border-white/12 hover:bg-white/4"
										}`}
									>
										{emoji}
									</button>
								);
							})}
						</div>
					)}
				</div>
			)}
		</div>
	);
}
