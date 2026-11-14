import { useMemo, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { SoundProfileGrid } from "./sound-profile-grid";
import { useAudioSettings } from "@/hooks/use-settings";

export function AudioTab() {
	const { soundPack, volume, setSoundPack, setVolume, previewSound } = useAudioSettings();

	// Stable array reference to prevent slider re-renders
	const sliderValue = useMemo(() => [volume], [volume]);

	const handleValueChange = useCallback(
		(vals: number[]) => {
			const v = vals[0];
			if (v !== undefined) setVolume(v);
		},
		[setVolume],
	);

	return (
		<div className="space-y-3.5">
			<SoundProfileGrid
				selectedPackId={soundPack}
				onSelectPack={setSoundPack}
				onPreviewPack={previewSound}
			/>

			{/* Volume Controls Surface */}
			<div className="border-border bg-surface-subtle space-y-2 rounded-xl border p-3 transition-colors">
				<div className="flex items-center justify-between text-xs">
					<div className="text-foreground flex items-center gap-2">
						{volume === 0 ? (
							<VolumeX className="text-muted-foreground h-3.5 w-3.5" />
						) : (
							<Volume2 className="text-foreground h-3.5 w-3.5" />
						)}
						<span className="text-xs font-medium">Audition & Playback Volume</span>
					</div>
					<span className="text-muted-foreground font-mono text-[11px]">
						{Math.round(volume * 100)}%
					</span>
				</div>

				<Slider
					value={sliderValue}
					min={0}
					max={1}
					step={0.05}
					onValueChange={handleValueChange}
					className="w-full"
				/>
			</div>
		</div>
	);
}
