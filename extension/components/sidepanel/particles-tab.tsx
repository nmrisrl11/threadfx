import { memo, useMemo, useCallback } from "react";
import { Sparkles, Check } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { CONFETTI_PALETTE_LIST } from "@/lib/particles";
import type { ConfettiPalette, ConfettiPaletteId } from "@/lib/particles";
import { useParticleSettings } from "@/hooks/use-settings";

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
					? "border border-white/20 bg-white/[0.07] text-white shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
					: "border border-white/[0.05] bg-white/[0.02] text-zinc-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
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
					<span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-zinc-950">
						<Check className="h-2.5 w-2.5 stroke-[3]" />
					</span>
				) : null}
			</div>
			<span className="block text-xs font-semibold tracking-tight text-zinc-100">
				{palette.name}
			</span>
			<span className="mt-0.5 line-clamp-1 text-[10px] leading-snug text-zinc-400">
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
			<div className="flex items-center justify-between rounded-xl border border-white/[0.06] bg-white/[0.02] p-3">
				<div className="flex items-center gap-2.5">
					<div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.04] text-zinc-300">
						<Sparkles className="h-3.5 w-3.5" />
					</div>
					<div>
						<span className="block text-xs font-medium text-zinc-200">Particle Bursts</span>
						<span className="block text-[10px] text-zinc-400">Visual feedback on like</span>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={testConfetti}
						className="h-6 cursor-pointer rounded-md border border-white/[0.08] bg-white/[0.06] px-2.5 text-[11px] font-medium text-zinc-300 transition-all hover:bg-white/[0.1] active:scale-95"
					>
						Test Burst
					</button>
					<Switch checked={confettiEnabled} onCheckedChange={toggleConfetti} />
				</div>
			</div>

			{/* Palette Selection Grid */}
			<section className="space-y-2">
				<div className="flex items-center justify-between px-0.5">
					<span className="text-xs font-medium text-zinc-400">Color Palette</span>
					<span className="text-[10px] text-zinc-500">Live preview swatches</span>
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
			<div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-white/[0.02]">
				{/* Particle Count / Density */}
				<div className="space-y-2 p-3">
					<div className="flex items-center justify-between text-xs">
						<span className="font-medium text-zinc-300">Particle Density</span>
						<span className="font-mono text-[11px] text-zinc-400">{confettiCount} count</span>
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
						<span className="font-medium text-zinc-300">Burst Spread</span>
						<span className="font-mono text-[11px] text-zinc-400">{confettiSpread}° angle</span>
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
