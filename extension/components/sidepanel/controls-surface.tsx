import { Volume2, VolumeX, Sparkles } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

interface ControlsSurfaceProps {
	volume: number;
	onVolumeChange: (volume: number) => void;
	confettiEnabled: boolean;
	onToggleConfetti: (enabled: boolean) => void;
	onTestConfetti: () => void;
}

export function ControlsSurface({
	volume,
	onVolumeChange,
	confettiEnabled,
	onToggleConfetti,
	onTestConfetti,
}: ControlsSurfaceProps) {
	return (
		<div className="divide-y divide-white/[0.05] rounded-xl border border-white/[0.06] bg-white/[0.02]">
			{/* Volume Slider */}
			<div className="space-y-2 p-3">
				<div className="flex items-center justify-between text-xs">
					<div className="flex items-center gap-2 text-zinc-300">
						{volume === 0 ? (
							<VolumeX className="h-3.5 w-3.5 text-zinc-500" />
						) : (
							<Volume2 className="h-3.5 w-3.5 text-zinc-300" />
						)}
						<span className="text-xs font-medium">Playback Volume</span>
					</div>
					<span className="font-mono text-[11px] text-zinc-400">{Math.round(volume * 100)}%</span>
				</div>

				<Slider
					value={[volume]}
					min={0}
					max={1}
					step={0.05}
					onValueChange={(vals: number[]) => {
						const v = vals[0];
						if (v !== undefined) onVolumeChange(v);
					}}
					className="w-full"
				/>
			</div>

			{/* Visual Effects & Particle Bursts */}
			<div className="flex items-center justify-between p-3">
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
						onClick={onTestConfetti}
						className="h-6 rounded-md border border-white/[0.08] bg-white/[0.06] px-2.5 text-[11px] font-medium text-zinc-300 transition-all hover:bg-white/[0.1] active:scale-95"
					>
						Test
					</button>
					<Switch checked={confettiEnabled} onCheckedChange={onToggleConfetti} />
				</div>
			</div>
		</div>
	);
}
