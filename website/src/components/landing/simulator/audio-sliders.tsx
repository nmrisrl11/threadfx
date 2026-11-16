import { Slider } from "@/components/ui/slider";
import { SlidersIcon, Volume2Icon } from "lucide-react";

interface AudioSlidersProps {
	volume: number;
	pitch: number;
	onVolumeChange: (val: number) => void;
	onPitchChange: (val: number) => void;
}

export function AudioSliders({ volume, pitch, onVolumeChange, onPitchChange }: AudioSlidersProps) {
	return (
		<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
			{/* Volume Channel */}
			<div className="space-y-2 rounded-xl border border-white/8 bg-[#0D0D0F] p-3">
				<div className="flex items-center justify-between text-xs">
					<div className="text-muted-foreground flex items-center gap-1.5">
						<Volume2Icon className="h-3.5 w-3.5 text-[#FF2E93]" />
						<span className="font-medium">Volume</span>
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

			{/* Pitch Multiplier Channel */}
			<div className="space-y-2 rounded-xl border border-white/8 bg-[#0D0D0F] p-3">
				<div className="flex items-center justify-between text-xs">
					<div className="text-muted-foreground flex items-center gap-1.5">
						<SlidersIcon className="h-3.5 w-3.5 text-[#00F5FF]" />
						<span className="font-medium">Pitch</span>
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
			</div>
		</div>
	);
}
