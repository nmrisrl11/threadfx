import { SoundChannelStrip } from "@/components/sidepanel/sound-fx/sound-channel-strip";
import { SoundProfileGrid } from "@/components/sidepanel/sound-fx/sound-profile-grid";
import { SoundProfileHeader } from "@/components/sidepanel/sound-fx/sound-profile-header";
import { WaveformMonitor } from "@/components/sidepanel/sound-fx/waveform-monitor";
import { useAudioSettings } from "@/hooks/use-settings";
import type { SoundCategory } from "@data/presets";
import { DEFAULT_SOUND_PACK, SOUND_PACK_LIST, SOUND_PACKS } from "@data/presets";
import { useCallback, useEffect, useState } from "react";

export function SoundFxTab() {
	const [activeCategory, setActiveCategory] = useState<"all" | SoundCategory>("all");
	const { soundPack, volume, pitch, setSoundPack, setVolume, setPitch, previewSound } =
		useAudioSettings();

	const handleResetPack = useCallback(() => {
		setSoundPack(DEFAULT_SOUND_PACK);
		const defaultPack = SOUND_PACKS[DEFAULT_SOUND_PACK];
		if (defaultPack) {
			previewSound(defaultPack);
		}
	}, [setSoundPack, previewSound]);

	// Hotkey Audition Listener: Keys 1 through 8
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement | null;
			if (
				target instanceof HTMLInputElement ||
				target instanceof HTMLTextAreaElement ||
				target?.isContentEditable
			) {
				return;
			}

			const num = parseInt(e.key, 10);
			if (num >= 1 && num <= 8) {
				const targetPack = SOUND_PACK_LIST[num - 1];
				if (targetPack) {
					e.preventDefault();
					setSoundPack(targetPack.id);
					previewSound(targetPack);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [setSoundPack, previewSound]);

	return (
		<div className="flex min-h-0 flex-1 flex-col justify-between">
			{/* 1. Fixed Header: Title, Reset & Category Filter Pills */}
			<div className="shrink-0 pb-2.5">
				<SoundProfileHeader
					selectedPackId={soundPack}
					activeCategory={activeCategory}
					onSelectCategory={setActiveCategory}
					onResetPack={handleResetPack}
				/>
			</div>

			{/* 2. Scrollable Body: Sound Preset Cards & 2-Channel Dynamics Sliders */}
			<div className="min-h-0 flex-1 space-y-3 overflow-x-hidden overflow-y-auto pr-1">
				<SoundProfileGrid
					selectedPackId={soundPack}
					activeCategory={activeCategory}
					onSelectPack={setSoundPack}
					onPreviewPack={previewSound}
				/>

				<SoundChannelStrip
					volume={volume}
					pitch={pitch}
					onVolumeChange={setVolume}
					onPitchChange={setPitch}
				/>
			</div>

			{/* 3. Docked Waveform Audio Monitor: Always pinned at bottom */}
			<div className="shrink-0 pt-2.5">
				<WaveformMonitor
					selectedPackId={soundPack}
					onPreviewPack={previewSound}
					volume={volume}
					pitch={pitch}
				/>
			</div>
		</div>
	);
}
