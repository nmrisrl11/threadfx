import { ParticleDockMonitor } from "@/components/sidepanel/particles/particle-dock-monitor";
import { ParticleEmojiCard } from "@/components/sidepanel/particles/particle-emoji-card";
import { ParticleHeader } from "@/components/sidepanel/particles/particle-header";
import { ParticleModeToggle } from "@/components/sidepanel/particles/particle-mode-toggle";
import { ParticlePaletteGrid } from "@/components/sidepanel/particles/particle-palette-grid";
import { ParticlePhysicsStrip } from "@/components/sidepanel/particles/particle-physics-strip";
import { useParticleSettings } from "@/hooks/use-settings";
import { CONFETTI_PALETTES, DEFAULT_CONFETTI_PALETTE, DEFAULT_EMOJI } from "@data/particles";
import { useCallback } from "react";

export function ParticlesTab() {
	const {
		confettiEnabled,
		confettiPalette,
		confettiCount,
		confettiSpread,
		burstMode,
		selectedEmoji,
		toggleConfetti,
		setPalette,
		setCount,
		setSpread,
		setBurstMode,
		setSelectedEmoji,
		previewPalette,
		previewEmoji,
		testConfetti,
	} = useParticleSettings();

	const handleResetPalette = useCallback(() => {
		setPalette(DEFAULT_CONFETTI_PALETTE);
		const defaultPalette = CONFETTI_PALETTES[DEFAULT_CONFETTI_PALETTE];
		if (defaultPalette) {
			previewPalette(defaultPalette);
		}
	}, [setPalette, previewPalette]);

	const handleResetEmoji = useCallback(() => {
		setSelectedEmoji(DEFAULT_EMOJI);
		previewEmoji(DEFAULT_EMOJI);
	}, [setSelectedEmoji, previewEmoji]);

	return (
		<div className="flex min-h-0 flex-1 flex-col justify-between">
			{/* 1. Fixed Header: Title, Reset & Master Bursts Switch */}
			<div className="shrink-0 pb-2.5">
				<ParticleHeader
					burstMode={burstMode}
					selectedPaletteId={confettiPalette}
					selectedEmoji={selectedEmoji}
					confettiEnabled={confettiEnabled}
					onResetPalette={handleResetPalette}
					onResetEmoji={handleResetEmoji}
					onToggleConfetti={toggleConfetti}
				/>
			</div>

			{/* 2. Scrollable Body: Mode Toggle, Config Card/Grid & 2-Channel Dynamics Sliders */}
			<div className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto pr-1">
				{/* Mode Selector: Color Palettes vs Emoji Reactions */}
				<ParticleModeToggle burstMode={burstMode} onSelectMode={setBurstMode} />

				{burstMode === "palette" ? (
					<ParticlePaletteGrid
						selectedPaletteId={confettiPalette}
						onSelectPalette={setPalette}
						onPreviewPalette={previewPalette}
					/>
				) : (
					<ParticleEmojiCard
						selectedEmoji={selectedEmoji}
						onSelectEmoji={setSelectedEmoji}
						onPreviewEmoji={previewEmoji}
					/>
				)}

				<ParticlePhysicsStrip
					confettiCount={confettiCount}
					confettiSpread={confettiSpread}
					onCountChange={setCount}
					onSpreadChange={setSpread}
				/>
			</div>

			{/* 3. Docked Particle Monitor: Always pinned at bottom */}
			<div className="shrink-0 pt-2.5">
				<ParticleDockMonitor
					selectedPaletteId={confettiPalette}
					burstMode={burstMode}
					selectedEmoji={selectedEmoji}
					confettiEnabled={confettiEnabled}
					confettiCount={confettiCount}
					confettiSpread={confettiSpread}
					onTriggerBurst={testConfetti}
				/>
			</div>
		</div>
	);
}
