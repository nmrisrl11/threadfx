import { AudioChannelCard } from "@/components/sidepanel/sound-fx/audio-channel-card";
import { DEFAULT_SETTINGS } from "@/lib/storage";
import { SlidersHorizontalIcon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { memo, useCallback, useMemo, useState } from "react";

interface SoundChannelStripProps {
	volume: number;
	pitch: number;
	onVolumeChange: (vol: number) => void;
	onPitchChange: (pitch: number) => void;
}

export const SoundChannelStrip = memo(function SoundChannelStrip({
	volume,
	pitch,
	onVolumeChange,
	onPitchChange,
}: SoundChannelStripProps) {
	// Stable array references to avoid slider re-renders
	const volumeValue = useMemo(() => [volume], [volume]);
	const pitchValue = useMemo(() => [pitch], [pitch]);

	const [lastNonZeroVolume, setLastNonZeroVolume] = useState(DEFAULT_SETTINGS.volume);

	const handleSliderVolumeChange = useCallback(
		(vals: number[]) => {
			const v = vals[0];
			if (v !== undefined) onVolumeChange(v);
		},
		[onVolumeChange],
	);

	const handleSliderPitchChange = useCallback(
		(vals: number[]) => {
			const p = vals[0];
			if (p !== undefined) onPitchChange(p);
		},
		[onPitchChange],
	);

	const handleResetVolume = useCallback(() => {
		onVolumeChange(DEFAULT_SETTINGS.volume);
	}, [onVolumeChange]);

	const handleResetPitch = useCallback(() => {
		onPitchChange(1.0);
	}, [onPitchChange]);

	const handleToggleMute = useCallback(() => {
		if (volume > 0) {
			setLastNonZeroVolume(volume);
			onVolumeChange(0);
		} else {
			onVolumeChange(lastNonZeroVolume || DEFAULT_SETTINGS.volume);
		}
	}, [volume, lastNonZeroVolume, onVolumeChange]);

	const defaultVolPercent = Math.round(DEFAULT_SETTINGS.volume * 100);
	const currentVolPercent = Math.round(volume * 100);

	return (
		<div className="@container/controls">
			<div className="grid grid-cols-1 gap-2.5 @[480px]/controls:grid-cols-2">
				{/* Channel 1: Audition & Playback Volume */}
				<AudioChannelCard
					icon={
						<button
							type="button"
							onClick={handleToggleMute}
							title={volume === 0 ? "Unmute audio" : "Mute audio"}
							className="text-foreground flex cursor-pointer items-center transition-opacity hover:opacity-80"
						>
							{volume === 0 ? (
								<VolumeXIcon className="text-muted-foreground h-3.5 w-3.5" />
							) : (
								<Volume2Icon className="text-foreground h-3.5 w-3.5" />
							)}
						</button>
					}
					label="Volume"
					valueText={`${currentVolPercent}%`}
					value={volumeValue}
					min={0}
					max={1}
					step={0.05}
					onValueChange={handleSliderVolumeChange}
					ticks={["MUTE", "50%", "100%"]}
					isModified={currentVolPercent !== defaultVolPercent}
					onReset={handleResetVolume}
					resetTooltip={`Reset volume to ${defaultVolPercent}%`}
				/>

				{/* Channel 2: Pitch Modulation */}
				<AudioChannelCard
					icon={<SlidersHorizontalIcon className="text-foreground h-3.5 w-3.5" />}
					label="Pitch Modulation"
					valueText={`${pitch.toFixed(2)}x`}
					value={pitchValue}
					min={0.5}
					max={2.0}
					step={0.05}
					onValueChange={handleSliderPitchChange}
					ticks={["0.5X LOW", "1.0X", "2.0X HIGH"]}
					isModified={pitch !== 1}
					onReset={handleResetPitch}
					resetTooltip="Reset pitch to 1.0x"
				/>
			</div>
		</div>
	);
});
