import { ParticlePaletteCard } from "@/components/sidepanel/particles/particle-palette-card";
import type { ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import { CONFETTI_PALETTE_LIST } from "@data/particles";
import { memo } from "react";

interface ParticlePaletteGridProps {
	selectedPaletteId: ConfettiPaletteId;
	onSelectPalette: (paletteId: ConfettiPaletteId) => void;
	onPreviewPalette: (palette: ConfettiPalette) => void;
}

export const ParticlePaletteGrid = memo(function ParticlePaletteGrid({
	selectedPaletteId,
	onSelectPalette,
	onPreviewPalette,
}: ParticlePaletteGridProps) {
	return (
		<div className="@container/grid">
			<div className="grid grid-cols-2 gap-2 @[440px]/grid:grid-cols-3">
				{CONFETTI_PALETTE_LIST.map((palette) => (
					<ParticlePaletteCard
						key={palette.id}
						palette={palette}
						isSelected={selectedPaletteId === palette.id}
						onSelect={onSelectPalette}
						onPreview={onPreviewPalette}
					/>
				))}
			</div>
		</div>
	);
});
