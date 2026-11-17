import { HeroScrollCue } from "@/components/hero/hero-scroll-cue";
import { HeroWaveform } from "@/components/hero/hero-waveform";
import { emitAudioPulse } from "@/lib/audio-events";
import { APP_INFO } from "@data/app";
import { CONFETTI_PALETTES } from "@data/particles";
import { SOUND_PACK_LIST } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import type { MouseEvent } from "react";
import { useCallback, useState } from "react";

export function HeroSection() {
	const [soundIndex, setSoundIndex] = useState(0);

	const handleAudition = useCallback(
		(e: MouseEvent<HTMLButtonElement>) => {
			const pack = SOUND_PACK_LIST[soundIndex % SOUND_PACK_LIST.length];
			setSoundIndex((prev) => (prev + 1) % SOUND_PACK_LIST.length);

			// Procedural audio synthesis
			zzfx(0.4, ...pack.params);
			emitAudioPulse(pack);

			// Subtle Silver Minimal flanking particles (shoots from behind each side of the logo)
			const rect = e.currentTarget.getBoundingClientRect();
			const y = (rect.top + rect.height * 0.35) / window.innerHeight;
			const leftX = (rect.left + rect.width * 0.12) / window.innerWidth;
			const rightX = (rect.left + rect.width * 0.88) / window.innerWidth;

			// Left flank: arcs up and outward to the left from the logo
			confetti({
				particleCount: 10,
				angle: 125,
				spread: 40,
				startVelocity: 14,
				ticks: 85,
				gravity: 0.8,
				scalar: 0.65,
				origin: { x: leftX, y },
				colors: CONFETTI_PALETTES.monochrome.colors,
				disableForReducedMotion: true,
				zIndex: 30,
			});

			// Right flank: arcs up and outward to the right from the logo
			confetti({
				particleCount: 10,
				angle: 55,
				spread: 40,
				startVelocity: 14,
				ticks: 85,
				gravity: 0.8,
				scalar: 0.65,
				origin: { x: rightX, y },
				colors: CONFETTI_PALETTES.monochrome.colors,
				disableForReducedMotion: true,
				zIndex: 30,
			});
		},
		[soundIndex],
	);

	return (
		<section
			id="hero"
			className="hero-scroll-fade relative flex min-h-dvh w-full flex-col items-center justify-between px-4 py-8 sm:px-6 sm:py-12"
		>
			{/* Top Spacer for balanced vertical centering */}
			<div className="h-4 shrink-0 sm:h-8" />

			{/* Centered Content: [Logo + Acoustic Pedestal] -> [Title] -> [Description] -> [Single Primary CTA] */}
			<div className="my-auto flex w-full max-w-4xl flex-col items-center py-4 text-center">
				{/* 3D Brand Logo with Integrated Acoustic Resonance Pedestal & Flanking Particles */}
				<button
					type="button"
					onClick={handleAudition}
					aria-label="Audition procedural sound and particle feedback"
					title="Tap to cycle tactile sounds and particles"
					className="group focus-visible:ring-ring relative z-10 flex cursor-pointer flex-col items-center rounded-2xl p-2 transition-transform duration-300 ease-out select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98]"
				>
					<picture className="relative z-10 inline-block size-28 select-none sm:size-36">
						<source srcSet="/icons/512.webp" type="image/webp" />
						<img
							src="/icons/512.png"
							alt="ThreadFX official 3D tactile icon emblem"
							title="ThreadFX official 3D tactile icon emblem"
							draggable={false}
							width={144}
							height={144}
							fetchPriority="high"
							className="size-full -rotate-6 object-contain filter-(--drop-shadow-hero) transition-transform duration-300 ease-out select-none group-hover:scale-105 group-hover:rotate-0"
						/>
					</picture>

					{/* Logo-Anchored Acoustic Resonance Spectrum */}
					<HeroWaveform />
				</button>

				{/* Title: Guaranteed 2-liner typography (Freely selectable) */}
				<h1 className="text-foreground mt-8 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl sm:leading-[1.1]">
					Turn silent scrolling <br className="hidden sm:inline" />
					into a tactile experience.
				</h1>

				{/* Description: Consumer-friendly future-proof 2-liner copywriting (Freely selectable) */}
				<p className="text-muted-foreground mx-auto mt-5 max-w-2xl text-base leading-relaxed sm:text-lg">
					Procedural sound synthesis and particle dynamics for social feeds.{" "}
					<br className="hidden sm:inline" />
					Made for the social web, docked right in your browser.
				</p>

				{/* Single Primary CTA Button: Protected from text selection, automatically adapting high-contrast */}
				<div className="mt-8 flex justify-center">
					<a
						href={APP_INFO.urls.download}
						title={`Download ${APP_INFO.name} Extension (.zip)`}
						className="group bg-primary text-primary-foreground border-border/80 focus-visible:ring-ring relative inline-block cursor-pointer overflow-hidden rounded-full border px-10 py-4 text-[16px] font-semibold shadow-sm transition-all duration-300 ease-out select-none hover:opacity-90 hover:shadow-md focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] sm:px-11 sm:py-4.5 sm:text-[17px]"
					>
						Download {APP_INFO.name}
					</a>
				</div>
			</div>

			{/* Bottom Scroll Indicator: Fades out quickly upon scroll */}
			<HeroScrollCue />
		</section>
	);
}
