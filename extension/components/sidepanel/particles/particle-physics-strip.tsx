import { ParticleSliderCard } from "@/components/sidepanel/particles/particle-slider-card";
import { DEFAULT_PARTICLE_COUNT, DEFAULT_PARTICLE_SPREAD } from "@data/particles";
import { SlidersHorizontalIcon, SparklesIcon } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

interface ParticlePhysicsStripProps {
	confettiCount: number;
	confettiSpread: number;
	onCountChange: (count: number) => void;
	onSpreadChange: (spread: number) => void;
}

export const ParticlePhysicsStrip = memo(function ParticlePhysicsStrip({
	confettiCount,
	confettiSpread,
	onCountChange,
	onSpreadChange,
}: ParticlePhysicsStripProps) {
	// Stable array references to avoid slider re-renders
	const countValue = useMemo(() => [confettiCount], [confettiCount]);
	const spreadValue = useMemo(() => [confettiSpread], [confettiSpread]);

	const handleSliderCountChange = useCallback(
		(vals: number[]) => {
			const v = vals[0];
			if (v !== undefined) onCountChange(v);
		},
		[onCountChange],
	);

	const handleSliderSpreadChange = useCallback(
		(vals: number[]) => {
			const s = vals[0];
			if (s !== undefined) onSpreadChange(s);
		},
		[onSpreadChange],
	);

	const handleResetCount = useCallback(() => {
		onCountChange(DEFAULT_PARTICLE_COUNT);
	}, [onCountChange]);

	const handleResetSpread = useCallback(() => {
		onSpreadChange(DEFAULT_PARTICLE_SPREAD);
	}, [onSpreadChange]);

	return (
		<div className="@container/physics">
			<div className="grid grid-cols-1 gap-2.5 @[480px]/physics:grid-cols-2">
				{/* Channel 1: Particle Density */}
				<ParticleSliderCard
					icon={<SparklesIcon className="text-foreground h-3.5 w-3.5" />}
					label="Particle Density"
					valueText={`${confettiCount} count`}
					value={countValue}
					min={10}
					max={60}
					step={5}
					onValueChange={handleSliderCountChange}
					ticks={["10 MIN", "30 (DEF)", "60 MAX"]}
					isModified={confettiCount !== DEFAULT_PARTICLE_COUNT}
					onReset={handleResetCount}
					resetTooltip={`Reset density to ${DEFAULT_PARTICLE_COUNT} count`}
				/>

				{/* Channel 2: Burst Spread */}
				<ParticleSliderCard
					icon={<SlidersHorizontalIcon className="text-foreground h-3.5 w-3.5" />}
					label="Burst Spread"
					valueText={`${confettiSpread}° arc`}
					value={spreadValue}
					min={30}
					max={90}
					step={5}
					onValueChange={handleSliderSpreadChange}
					ticks={["30° TIGHT", "55° (DEF)", "90° WIDE"]}
					isModified={confettiSpread !== DEFAULT_PARTICLE_SPREAD}
					onReset={handleResetSpread}
					resetTooltip={`Reset spread to ${DEFAULT_PARTICLE_SPREAD}° arc`}
				/>
			</div>
		</div>
	);
});
