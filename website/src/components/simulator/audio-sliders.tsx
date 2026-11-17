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
		<div className="border-border bg-card/75 shadow-card w-full space-y-4 rounded-2xl border p-4.5 backdrop-blur-md">
			{/* Pod Header */}
			<div className="flex items-center justify-between">
				<div className="text-foreground flex items-center gap-1.5 font-mono text-[11px] tracking-wider uppercase">
					<SlidersIcon className="text-muted-foreground size-3.5" />
					<span>Acoustics</span>
				</div>
				{isCustomized && (
					<button
						type="button"
						onClick={() => {
							onVolumeChange(0.5);
							onPitchChange(1.0);
						}}
						className="text-muted-foreground hover:text-foreground cursor-pointer font-mono text-[10px] transition-colors"
						title="Reset to default acoustic values"
					>
						Reset
					</button>
				)}
			</div>

			{/* Volume Control Strip */}
			<div className="space-y-2">
				<div className="flex items-center justify-between text-xs">
					<div className="text-foreground/90 flex items-center gap-1.5">
						<Volume2Icon className="text-muted-foreground size-3.5" />
						<span className="text-foreground/90 font-medium">Volume</span>
					</div>
					<span className="text-foreground font-mono text-[11px] font-semibold">
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
					<div className="text-foreground/90 flex items-center gap-1.5">
						<span className="text-muted-foreground font-mono text-[11px] font-semibold">Hz</span>
						<span className="text-foreground/90 font-medium">Pitch Multiplier</span>
					</div>
					<span className="text-foreground font-mono text-[11px] font-semibold">
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
				<div className="text-muted-foreground/80 flex justify-between font-mono text-[9px]">
					<span>0.5x (Bass)</span>
					<span>1.0x (True)</span>
					<span>2.0x (Air)</span>
				</div>
			</div>
		</div>
	);
}
