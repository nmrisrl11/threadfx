import { Switch } from "@/components/ui/switch";
import type { BurstMode, ConfettiPaletteId } from "@data/particles";
import { DEFAULT_CONFETTI_PALETTE, DEFAULT_EMOJI } from "@data/particles";
import { RotateCcwIcon, SparklesIcon } from "lucide-react";
import { memo } from "react";

interface ParticleHeaderProps {
	burstMode: BurstMode;
	selectedPaletteId: ConfettiPaletteId;
	selectedEmoji: string;
	confettiEnabled: boolean;
	onResetPalette: () => void;
	onResetEmoji: () => void;
	onToggleConfetti: (enabled: boolean) => void;
}

export const ParticleHeader = memo(function ParticleHeader({
	burstMode,
	selectedPaletteId,
	selectedEmoji,
	confettiEnabled,
	onResetPalette,
	onResetEmoji,
	onToggleConfetti,
}: ParticleHeaderProps) {
	const isPaletteModified = selectedPaletteId !== DEFAULT_CONFETTI_PALETTE;
	const isEmojiModified = selectedEmoji !== DEFAULT_EMOJI;

	return (
		<div className="flex flex-wrap items-center justify-between gap-1.5 px-0.5">
			{/* Domain Title & Contextual Reset Button */}
			<div className="flex items-center gap-1.5">
				<span className="text-muted-foreground text-xs font-medium">Particle Bursts</span>

				{burstMode === "palette" && isPaletteModified && (
					<button
						type="button"
						onClick={onResetPalette}
						title="Reset to default palette (Soft Rose)"
						className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-0.5 font-mono text-[10px] transition-colors"
					>
						<RotateCcwIcon className="h-2.5 w-2.5" />
						<span>Reset</span>
					</button>
				)}

				{burstMode === "emoji" && isEmojiModified && (
					<button
						type="button"
						onClick={onResetEmoji}
						title="Reset to default emoji (Heart)"
						className="text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-0.5 font-mono text-[10px] transition-colors"
					>
						<RotateCcwIcon className="h-2.5 w-2.5" />
						<span>Reset</span>
					</button>
				)}
			</div>

			{/* Master Bursts Switch Toggle */}
			<div className="flex items-center gap-1.5">
				<div className="flex items-center gap-1">
					<SparklesIcon className="text-muted-foreground/70 h-3 w-3" />
					<span className="text-muted-foreground font-mono text-[10px]">Bursts</span>
				</div>
				<Switch
					checked={confettiEnabled}
					onCheckedChange={onToggleConfetti}
					aria-label="Toggle visual particle bursts on like"
				/>
			</div>
		</div>
	);
});
