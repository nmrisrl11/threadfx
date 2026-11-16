import { AudioSliders } from "@/components/simulator/audio-sliders";
import { ParticleControls } from "@/components/simulator/particle-controls";
import { SoundboardPanel } from "@/components/simulator/soundboard-panel";
import { ThreadPostMock } from "@/components/simulator/thread-post-mock";
import { AnimatedContent } from "@/components/ui/animated-content";
import { emitAudioPulse } from "@/lib/audio-events";
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

export function SimulatorSection() {
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
	const [pressedKeyIndex, setPressedKeyIndex] = useState<number | null>(null);

	// Physical keyboard hotkeys [1-8] for instant sound auditioning & key depression
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
					setPressedKeyIndex(num - 1);
					setTimeout(() => setPressedKeyIndex(null), 150);

					const pitched = applyPitch(targetPack.params, pitch);
					zzfx(volume, ...pitched);
					emitAudioPulse(targetPack);
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
			emitAudioPulse(pack);
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
			emitAudioPulse(pack);

			// Canvas particle burst centered on the like button
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
		<section
			id="simulator"
			className="section-scroll-fade relative flex min-h-dvh w-full flex-col items-center justify-center px-4 py-8 sm:px-6 sm:py-12"
		>
			<div className="my-auto w-full max-w-6xl">
				{/* Section Header (Static - No animation) */}
				<div className="mb-10 text-center">
					<h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
						Feel the feedback.
					</h2>
					<p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg">
						Select sound profiles with keys 1–8 and tap like to test your haptic setup live.
					</p>
				</div>

				{/* Layer 1: Spatial Stage (Thread Post Mock with Controls) */}
				<AnimatedContent
					distance={0}
					scale={0.85}
					blur={6}
					duration={0.9}
					ease="power3.out"
					stagger={0.08}
					threshold={0.1}
					once={false}
					className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:items-center lg:gap-8"
				>
					{/* Center Stage: The Hero Thread Post Mock (First in DOM -> Animates First) */}
					<div className="order-1 flex justify-center lg:order-2 lg:col-span-6">
						<ThreadPostMock
							isLiked={isLiked}
							likeCount={likeCount}
							repostCount={repostCount}
							onLike={handleSimulatedLike}
							onRepost={handleSimulatedRepost}
						/>
					</div>

					{/* Left Satellite: Acoustics Controller (Second in DOM -> Animates Second) */}
					<div className="order-2 lg:order-1 lg:col-span-3">
						<AudioSliders
							volume={volume}
							pitch={pitch}
							onVolumeChange={setVolume}
							onPitchChange={setPitch}
						/>
					</div>

					{/* Right Satellite: Particles Controller (Third in DOM -> Animates Third) */}
					<div className="order-3 lg:col-span-3">
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
				</AnimatedContent>

				{/* Layer 2: Musical Soundboard Keybed */}
				<div className="mx-auto mt-8 w-full max-w-4xl">
					<SoundboardPanel
						selectedPack={selectedPack}
						onSelectPack={handleSelectPack}
						pressedKeyIndex={pressedKeyIndex}
					/>
				</div>
			</div>
		</section>
	);
}
