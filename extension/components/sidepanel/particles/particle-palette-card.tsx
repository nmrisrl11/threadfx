import { cn } from "@/lib/utils";
import type { ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { memo, useCallback } from "react";

interface ParticlePaletteCardProps {
	palette: ConfettiPalette;
	isSelected: boolean;
	onSelect: (paletteId: ConfettiPaletteId) => void;
	onPreview: (palette: ConfettiPalette) => void;
}

export const ParticlePaletteCard = memo(function ParticlePaletteCard({
	palette,
	isSelected,
	onSelect,
	onPreview,
}: ParticlePaletteCardProps) {
	const handleClick = useCallback(() => {
		onSelect(palette.id);
		onPreview(palette);
	}, [onSelect, onPreview, palette]);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={cn(
				"group focus-visible:ring-ring relative flex cursor-pointer flex-col justify-between rounded-xl border p-2.5 text-left transition-colors duration-150 select-none focus-visible:ring-1 focus-visible:outline-none",
				isSelected
					? "border-foreground/30 bg-surface-muted text-foreground"
					: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/20 hover:bg-surface-muted hover:text-foreground",
			)}
		>
			<div className="mb-2 flex w-full items-center justify-between">
				{/* 4-Color Swatch Indicators */}
				<div className="flex items-center gap-1">
					{palette.colors.slice(0, 4).map((color, idx) => (
						<span
							key={idx}
							className="inline-block size-2.5 rounded-full border border-black/30 shadow-xs transition-transform duration-150 group-hover:scale-110"
							style={{ backgroundColor: color }}
						/>
					))}
				</div>

				{/* Selection Checkmark / Hover Sparkle Icon */}
				<div className="flex h-4 w-4 shrink-0 items-center justify-center">
					{isSelected ? (
						<span className="bg-foreground text-background flex h-4 w-4 items-center justify-center rounded-full">
							<CheckIcon className="h-2.5 w-2.5 stroke-3" />
						</span>
					) : (
						<SparklesIcon className="text-muted-foreground group-hover:text-foreground h-3 w-3 opacity-60 transition-colors group-hover:opacity-100" />
					)}
				</div>
			</div>

			<div>
				<span className="text-foreground block text-xs font-semibold tracking-tight">
					{palette.name}
				</span>
				<span className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] leading-snug">
					{palette.description}
				</span>
			</div>
		</button>
	);
});
