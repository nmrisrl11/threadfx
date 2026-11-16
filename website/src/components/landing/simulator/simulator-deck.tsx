import { AudioSliders } from "@/components/landing/simulator/audio-sliders";
import { ParticleControls } from "@/components/landing/simulator/particle-controls";
import { SoundboardPanel } from "@/components/landing/simulator/soundboard-panel";
import { ThreadPostMock } from "@/components/landing/simulator/thread-post-mock";
import { Card } from "@/components/ui/card";
import type { BurstMode, ConfettiPaletteId } from "@data/particles";
import {
	CONFETTI_PALETTES,
	DEFAULT_BURST_MODE,
	DEFAULT_CONFETTI_PALETTE,
	DEFAULT_EMOJI,
} from "@data/particles";
import type { SoundPackId } from "@data/presets";
import { INTERACTION_SOUNDS, SOUND_PACKS, SOUND_PACK_LIST, applyPitch } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import React, { useEffect, useState } from "react";

export function SimulatorDeck() {
	const [selectedPack, setSelectedPack] = useState<SoundPackId>("bubble");
	const [volume, setVolume] = useState<number>(0.5);
	const [pitch, setPitch] = useState<number>(1.0);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(24);
	const [repostCount, setRepostCount] = useState<number>(4);
	const [confettiActive, setConfettiActive] = useState<boolean>(true);
	const [burstMode, setBurstMode] = useState<BurstMode>(DEFAULT_BURST_MODE);
	const [selectedPalette, setSelectedPalette] =
		useState<ConfettiPaletteId>(DEFAULT_CONFETTI_PALETTE);
	const [selectedEmoji, setSelectedEmoji] = useState<string>(DEFAULT_EMOJI);

	// Keyboard hotkeys [1-8] for instant sound auditioning
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
					setSelectedPack(targetPack.id);
					const pitched = applyPitch(targetPack.params, pitch);
					zzfx(volume, ...pitched);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [volume, pitch]);

	const handleSelectPack = (packId: SoundPackId) => {
		setSelectedPack(packId);
		const pack = SOUND_PACKS[packId];
		if (pack) {
			const pitched = applyPitch(pack.params, pitch);
			zzfx(volume, ...pitched);
		}
	};

	const handleSimulatedLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		const nextState = !isLiked;
		setIsLiked(nextState);
		setLikeCount((prev) => (nextState ? prev + 1 : prev - 1));

		if (nextState) {
			// Procedural audio synthesis
			const pack = SOUND_PACKS[selectedPack] || SOUND_PACKS.bubble;
			const pitched = applyPitch(pack.params, pitch, 0.03);
			zzfx(volume, ...pitched);

			// Canvas particle burst
			if (confettiActive) {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = (rect.left + rect.width / 2) / window.innerWidth;
				const y = (rect.top + rect.height / 2) / window.innerHeight;

				if (burstMode === "emoji" && selectedEmoji) {
					const emojiShape = confetti.shapeFromText({
						text: selectedEmoji,
						scalar: 1.8,
					});
					confetti({
						particleCount: 28,
						spread: 55,
						startVelocity: 24,
						ticks: 120,
						shapes: [emojiShape],
						scalar: 1.8,
						flat: true,
						origin: { x, y },
						disableForReducedMotion: false,
					});
				} else {
					const palette = CONFETTI_PALETTES[selectedPalette] || CONFETTI_PALETTES.rose;
					confetti({
						particleCount: 32,
						spread: 58,
						startVelocity: 24,
						ticks: 120,
						origin: { x, y },
						colors: palette.colors,
						disableForReducedMotion: false,
					});
				}
			}
		} else {
			// Descending retract tone
			const pitched = applyPitch([...INTERACTION_SOUNDS.unlike], pitch);
			zzfx(volume, ...pitched);
		}
	};

	const handleSimulatedRepost = (e: React.MouseEvent<HTMLButtonElement>) => {
		setRepostCount((prev) => prev + 1);
		const pitched = applyPitch([...INTERACTION_SOUNDS.repost], pitch);
		zzfx(volume, ...pitched);

		if (confettiActive) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = (rect.left + rect.width / 2) / window.innerWidth;
			const y = (rect.top + rect.height / 2) / window.innerHeight;
			confetti({
				particleCount: 20,
				spread: 45,
				startVelocity: 20,
				ticks: 90,
				origin: { x, y },
				colors: ["#10B981", "#34D399", "#00F5FF", "#FFFFFF"],
				disableForReducedMotion: false,
			});
		}
	};

	return (
		<section id="simulator" className="mx-auto max-w-5xl scroll-mt-20 px-6 py-16">
			<div className="mb-8 text-center">
				<h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
					The Instrument
				</h2>
				<p className="text-muted-foreground mt-2 text-sm">
					Audition procedural sound profiles and tune particle physics live before installing.
				</p>
			</div>

			<Card className="grid grid-cols-1 gap-6 border-white/8 bg-[#111114] p-5 shadow-2xl sm:p-7 md:grid-cols-12">
				{/* Audio & Particle Controls Column */}
				<div className="space-y-4 md:col-span-6 md:border-r md:border-white/8 md:pr-6">
					<SoundboardPanel selectedPack={selectedPack} onSelectPack={handleSelectPack} />

					<AudioSliders
						volume={volume}
						pitch={pitch}
						onVolumeChange={setVolume}
						onPitchChange={setPitch}
					/>

					<ParticleControls
						confettiActive={confettiActive}
						burstMode={burstMode}
						selectedPalette={selectedPalette}
						selectedEmoji={selectedEmoji}
						onToggleConfetti={setConfettiActive}
						onSelectBurstMode={setBurstMode}
						onSelectPalette={setSelectedPalette}
						onSelectEmoji={setSelectedEmoji}
					/>
				</div>

				{/* Social Feed Rig Column */}
				<div className="flex flex-col justify-center md:col-span-6 md:pl-2">
					<ThreadPostMock
						isLiked={isLiked}
						likeCount={likeCount}
						repostCount={repostCount}
						onLike={handleSimulatedLike}
						onRepost={handleSimulatedRepost}
					/>
				</div>
			</Card>
		</section>
	);
}
