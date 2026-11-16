import { Slider } from "@/components/ui/slider";
import { SlidersIcon, Volume2Icon } from "lucide-react";

interface AudioSlidersProps {
	volume: number;
	pitch: number;
	onVolumeChange: (val: number) => void;
	onPitchChange: (val: number) => void;
}

export function AudioSliders({ volume, pitch, onVolumeChange, onPitchChange }: AudioSlidersProps) {
	const isCustomized = pitch !== 1.0 || volume !== 0.5;

	return (
		<div className="w-full space-y-4 rounded-2xl border border-white/[0.06] bg-[#0e0e12]/75 p-4.5 backdrop-blur-md">
			{/* Pod Header */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-300 uppercase">
					<SlidersIcon className="size-3.5 text-zinc-400" />
					<span>Acoustics</span>
				</div>
				{isCustomized && (
					<button
						type="button"
						onClick={() => {
							onVolumeChange(0.5);
							onPitchChange(1.0);
						}}
						className="cursor-pointer font-mono text-[10px] text-zinc-500 transition-colors hover:text-white"
						title="Reset to default acoustic values"
					>
						Reset
					</button>
				)}
			</div>

			{/* Volume Control Strip */}
			<div className="space-y-2">
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-1.5 text-zinc-300">
						<Volume2Icon className="size-3.5 text-zinc-400" />
						<span className="font-medium text-zinc-300">Volume</span>
					</div>
					<span className="font-mono text-[11px] font-semibold text-white">
						{Math.round(volume * 100)}%
					</span>
				</div>
				<Slider
					value={[volume]}
					min={0}
					max={1}
					step={0.05}
					onValueChange={(vals: number[]) => onVolumeChange(vals[0])}
					className="w-full"
				/>
			</div>

			{/* Pitch Control Strip */}
			<div className="space-y-2 pt-1">
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-1.5 text-zinc-300">
						<span className="font-mono text-[11px] font-semibold text-zinc-400">Hz</span>
						<span className="font-medium text-zinc-300">Pitch Multiplier</span>
					</div>
					<span className="font-mono text-[11px] font-semibold text-white">
						{pitch.toFixed(2)}x
					</span>
				</div>
				<Slider
					value={[pitch]}
					min={0.5}
					max={2.0}
					step={0.05}
					onValueChange={(vals: number[]) => onPitchChange(vals[0])}
					className="w-full"
				/>
				<div className="flex justify-between font-mono text-[9px] text-zinc-600">
					<span>0.5x (Bass)</span>
					<span>1.0x (True)</span>
					<span>2.0x (Air)</span>
				</div>
			</div>
		</div>
	);
}
