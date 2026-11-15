import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useParticleSettings } from "@/hooks/use-settings";
import type { ConfettiPalette, ConfettiPaletteId } from "@data/particles";
import { CONFETTI_PALETTE_LIST } from "@data/particles";
import { CheckIcon, SparklesIcon } from "lucide-react";
import { memo, useCallback, useMemo } from "react";

interface PaletteCardProps {
	palette: ConfettiPalette;
	isSelected: boolean;
	onSelect: (paletteId: ConfettiPaletteId) => void;
}

const PaletteCard = memo(function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
	const handleClick = useCallback(() => {
		onSelect(palette.id);
	}, [onSelect, palette.id]);

	return (
		<button
			type="button"
			onClick={handleClick}
			className={`group relative flex flex-col justify-between rounded-xl p-2.5 text-left transition-all duration-150 active:scale-[0.98] ${
				isSelected
					? "border-foreground/20 bg-surface-muted text-foreground border shadow-xs"
					: "border-border bg-surface-subtle text-muted-foreground hover:border-foreground/15 hover:bg-surface-muted hover:text-foreground border"
			}`}
		>
			<div className="mb-2 flex w-full items-center justify-between">
				<div className="flex items-center gap-1">
					{palette.colors.slice(0, 4).map((color, idx) => (
						<span
							key={idx}
							className="inline-block size-2 rounded-full border border-black/30 shadow-xs"
							style={{ backgroundColor: color }}
						/>
					))}
				</div>
				{isSelected ? (
					<span className="bg-foreground text-background flex h-4 w-4 shrink-0 items-center justify-center rounded-full">
						<CheckIcon className="h-2.5 w-2.5 stroke-[3]" />
					</span>
				) : null}
			</div>
			<span className="text-foreground block text-xs font-semibold tracking-tight">
				{palette.name}
			</span>
			<span className="text-muted-foreground mt-0.5 line-clamp-1 text-[10px] leading-snug">
				{palette.description}
			</span>
		</button>
	);
});

export function ParticlesTab() {
	const {
		confettiEnabled,
		confettiPalette,
		confettiCount,
		confettiSpread,
		toggleConfetti,
		setPalette,
		setCount,
		setSpread,
		testConfetti,
	} = useParticleSettings();

	// Stable array references for sliders
	const countValue = useMemo(() => [confettiCount], [confettiCount]);
	const spreadValue = useMemo(() => [confettiSpread], [confettiSpread]);

	const handleCountChange = useCallback(
		(vals: number[]) => {
			const v = vals[0];
			if (v !== undefined) setCount(v);
		},
		[setCount],
	);

	const handleSpreadChange = useCallback(
		(vals: number[]) => {
			const v = vals[0];
			if (v !== undefined) setSpread(v);
		},
		[setSpread],
	);

	return (
		<div className="space-y-3.5">
			{/* Master Toggle & Quick Action */}
			<div className="border-border bg-surface-subtle flex items-center justify-between rounded-xl border p-3 transition-colors">
				<div className="flex items-center gap-2.5">
					<div className="border-border bg-surface-muted text-foreground flex h-7 w-7 items-center justify-center rounded-lg border">
						<SparklesIcon className="h-3.5 w-3.5" />
					</div>
					<div>
						<span className="text-foreground block text-xs font-medium">Particle Bursts</span>
						<span className="text-muted-foreground block text-[10px]">Visual feedback on like</span>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={testConfetti}
						className="border-border bg-surface-muted text-foreground hover:bg-muted h-6 cursor-pointer rounded-md border px-2.5 text-[11px] font-medium transition-all active:scale-95"
					>
						Test Burst
					</button>
					<Switch checked={confettiEnabled} onCheckedChange={toggleConfetti} />
				</div>
			</div>

			{/* Palette Selection Grid */}
			<section className="space-y-2">
				<div className="flex items-center justify-between px-0.5">
					<span className="text-muted-foreground text-xs font-medium">Color Palette</span>
					<span className="text-muted-foreground/80 text-[10px]">Live preview swatches</span>
				</div>

				<div className="grid grid-cols-2 gap-2">
					{CONFETTI_PALETTE_LIST.map((palette) => (
						<PaletteCard
							key={palette.id}
							palette={palette}
							isSelected={confettiPalette === palette.id}
							onSelect={setPalette}
						/>
					))}
				</div>
			</section>

			{/* Dynamics Sliders */}
			<div className="divide-border border-border bg-surface-subtle divide-y rounded-xl border transition-colors">
				{/* Particle Count / Density */}
				<div className="space-y-2 p-3">
					<div className="flex items-center justify-between text-xs">
						<span className="text-foreground font-medium">Particle Density</span>
						<span className="text-muted-foreground font-mono text-[11px]">
							{confettiCount} count
						</span>
					</div>
					<Slider
						value={countValue}
						min={10}
						max={60}
						step={5}
						onValueChange={handleCountChange}
						className="w-full"
					/>
				</div>

				{/* Particle Spread */}
				<div className="space-y-2 p-3">
					<div className="flex items-center justify-between text-xs">
						<span className="text-foreground font-medium">Burst Spread</span>
						<span className="text-muted-foreground font-mono text-[11px]">
							{confettiSpread}° angle
						</span>
					</div>
					<Slider
						value={spreadValue}
						min={30}
						max={90}
						step={5}
						onValueChange={handleSpreadChange}
						className="w-full"
					/>
				</div>
			</div>
		</div>
	);
}
