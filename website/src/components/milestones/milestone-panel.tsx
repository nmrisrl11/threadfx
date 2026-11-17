import { getMilestoneTierConfig } from "@/components/milestones/milestone-theme";
import { cn } from "@/lib/utils";
import type { JuicerMilestone } from "@data/milestones";
import { INTERACTION_SOUNDS, applyPitch } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import { TrophyIcon, Volume2Icon } from "lucide-react";
import React, { useRef, useState } from "react";

interface MilestonePanelProps {
	milestone: JuicerMilestone;
	isActive: boolean;
	onActivate: () => void;
	onHover: () => void;
}

export function MilestonePanel({ milestone, isActive, onActivate, onHover }: MilestonePanelProps) {
	const tier = getMilestoneTierConfig(milestone.level);
	const [isPlayingAudio, setIsPlayingAudio] = useState(false);
	const fanfareBtnRef = useRef<HTMLButtonElement | null>(null);

	const handleAuditionFanfare = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		if (isPlayingAudio) return;

		setIsPlayingAudio(true);
		setTimeout(() => setIsPlayingAudio(false), 900);

		// Procedural milestone victory fanfare playback
		try {
			const pitched = applyPitch([...INTERACTION_SOUNDS.publish], tier.soundPitch);
			zzfx(0.75, ...pitched);
		} catch {
			// Fallback silently if audio context unavailable
		}

		// Centered particle celebration burst from the card button
		if (fanfareBtnRef.current) {
			const rect = fanfareBtnRef.current.getBoundingClientRect();
			const x = (rect.left + rect.width / 2) / window.innerWidth;
			const y = (rect.top + rect.height / 2) / window.innerHeight;

			confetti({
				particleCount: 28,
				spread: 60,
				startVelocity: 22,
				ticks: 120,
				origin: { x, y },
				colors: tier.particleColors,
				disableForReducedMotion: true,
			});
		}
	};

	// Smooth reveal delay: details fade in once panel has mostly opened
	const reveal = isActive
		? "opacity-100 delay-300 duration-500"
		: "opacity-0 pointer-events-none duration-150";

	return (
		<div
			role="button"
			tabIndex={0}
			onClick={onActivate}
			onMouseEnter={onHover}
			onFocus={onActivate}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					e.preventDefault();
					onActivate();
				}
			}}
			aria-expanded={isActive}
			aria-label={`${milestone.title} (${milestone.threshold} likes)`}
			className={cn(
				"group border-border/50 relative overflow-hidden rounded-2xl border text-white outline-none select-none",
				"focus-visible:ring-ring focus-visible:ring-2",
				// Smooth height transition on mobile, smooth flex-grow transition on desktop
				"transition-[height,flex-grow,background-color] duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] motion-reduce:transition-none",
				"md:h-auto md:min-w-0 md:basis-0",
				isActive
					? "bg-card/95 h-107.5 sm:h-115 md:grow-[4.75] lg:grow-[4.5]"
					: "bg-card/60 hover:bg-card/90 h-14 sm:h-16 md:grow",
			)}
		>
			{/* Atmospheric Gamified Environmental Background Image (Smooth scale on hover for collapsed card) */}
			<img
				src={tier.bgImage}
				alt={`${milestone.title} Level ${milestone.level} background artwork`}
				title={`${milestone.title} - Level ${milestone.level} (${milestone.threshold.toLocaleString()} Likes)`}
				aria-hidden="true"
				width={1024}
				height={1024}
				loading={milestone.level === 1 ? "eager" : "lazy"}
				decoding="async"
				className={cn(
					"pointer-events-none absolute inset-0 size-full object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] select-none",
					isActive
						? "scale-105 opacity-85"
						: "scale-100 opacity-40 group-hover:scale-105 group-hover:opacity-60",
				)}
			/>

			{/* Smooth Gradient Vignette (No boxy card border, natural fade-out) */}
			<div
				className={cn(
					"pointer-events-none absolute inset-0 transition-opacity duration-500",
					isActive
						? "bg-linear-to-t from-black/95 via-black/45 to-black/25"
						: "bg-black/55 group-hover:bg-black/35",
				)}
			/>

			{/* Active Atmospheric Radial Bloom */}
			{isActive && (
				<div
					className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-500"
					style={{ backgroundImage: tier.glowGradient }}
				/>
			)}

			{/* Collapsed Strip Presentation (Top Thumbnail + Bottom Rotated Label on Desktop; Horizontal row on Mobile) */}
			<div
				className={cn(
					"pointer-events-none absolute inset-0 flex flex-row items-center justify-between px-4 transition-opacity md:flex-col md:px-0 md:py-5",
					isActive ? "opacity-0 duration-150" : "opacity-100 delay-200 duration-500",
				)}
				aria-hidden={isActive}
			>
				{/* Top (Desktop) / Left (Mobile): Mini Badge & Level */}
				<div className="flex items-center gap-2.5 md:w-full md:flex-col md:items-center md:justify-center md:gap-2">
					<picture className="relative size-8 shrink-0 select-none">
						<source srcSet={`/badges/${milestone.badgeFile}`} type="image/webp" />
						<img
							src={`/badges/${milestone.badgeFile}`}
							alt={`${milestone.title} mini badge icon`}
							title={`${milestone.title} - Rank ${milestone.rank}`}
							width={32}
							height={32}
							loading="lazy"
							className="size-full object-contain opacity-80"
						/>
					</picture>
					<span className="text-center font-mono text-[11px] font-bold tracking-wider text-zinc-300">
						0{milestone.level}
					</span>
					<span className="text-sm font-semibold text-zinc-200 md:hidden">{milestone.title}</span>
				</div>

				{/* Mobile Right: Unlock Threshold */}
				<div className="font-mono text-xs text-zinc-400 md:hidden">
					<span>{milestone.threshold.toLocaleString()} Likes</span>
				</div>

				{/* Bottom: Editorial Rotated Label on Desktop */}
				<div className="hidden py-4 md:flex md:w-full md:flex-1 md:items-end md:justify-center">
					<span className="rotate-180 font-mono text-xs font-bold tracking-widest whitespace-nowrap text-zinc-300 uppercase transition-colors duration-200 [writing-mode:vertical-rl] group-hover:text-white">
						{milestone.rank}
					</span>
				</div>
			</div>

			{/* Expanded Panel Presentation (Centered on all screen sizes: mobile, tablet, and desktop) */}
			<div
				className={cn(
					"absolute inset-0 flex size-full flex-col justify-between p-4 transition-opacity sm:p-5 md:p-4 lg:p-6 xl:p-7",
					reveal,
				)}
			>
				{/* Top Bar: Eyebrow Tag + Compact Sound Pill */}
				<div className="flex w-full items-center justify-between gap-2">
					<div
						className={cn(
							"inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium shadow-xs backdrop-blur-md sm:px-3 sm:text-xs",
							tier.accentBadgeBg,
						)}
					>
						<TrophyIcon aria-hidden="true" className="size-3 opacity-80" />
						<span className="font-semibold">Rank 0{milestone.level}</span>
						<span className="hidden opacity-60 xl:inline">/ 07</span>
					</div>

					{/* Sleek Tactile Fanfare Audio Pill */}
					<button
						ref={fanfareBtnRef}
						type="button"
						tabIndex={isActive ? 0 : -1}
						aria-hidden={!isActive}
						onClick={handleAuditionFanfare}
						aria-label={`Audition ${milestone.title} celebration audio`}
						className={cn(
							"group/btn inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-full border border-white/20 bg-black/50 px-2.5 py-1 text-[11px] font-medium text-zinc-200 shadow-xs backdrop-blur-md transition-all duration-150 outline-none select-none sm:px-3 sm:text-xs",
							"hover:border-white/35 hover:bg-black/75 hover:text-white active:scale-95",
							"focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:outline-none",
							isPlayingAudio &&
								"border-white/40 bg-white/20 text-white shadow-[0_0_12px_rgba(255,255,255,0.25)]",
						)}
					>
						<Volume2Icon
							aria-hidden="true"
							className={cn(
								"size-3 text-zinc-300 transition-transform duration-150 group-hover/btn:text-white",
								isPlayingAudio ? "scale-110 text-white" : "group-hover/btn:scale-105",
							)}
						/>
						<span>
							{isPlayingAudio ? (
								"Playing"
							) : (
								<>
									<span className="hidden xl:inline">Play </span>Fanfare
								</>
							)}
						</span>
					</button>
				</div>

				{/* Center Exhibit: 3D Floating Medal Showcase */}
				<div className="relative my-auto flex w-full flex-col items-center justify-center py-1 sm:py-2">
					{/* Ambient Glow Aura */}
					<div
						className={cn(
							"absolute size-28 rounded-full opacity-60 blur-2xl transition-all duration-300 sm:size-36",
							tier.ambientGlow,
						)}
						style={{ backgroundColor: tier.accentColor }}
					/>

					{/* 3D WebP Medal Asset */}
					<picture className="relative size-24 shrink-0 transition-transform duration-300 ease-out select-none sm:size-30">
						<source srcSet={`/badges/${milestone.badgeFile}`} type="image/webp" />
						<img
							src={`/badges/${milestone.badgeFile}`}
							alt={`${milestone.title} 3D Achievement Medal`}
							title={`${milestone.title} 3D Achievement Medal (${milestone.threshold.toLocaleString()} Likes)`}
							width={120}
							height={120}
							className="size-full object-contain filter-[drop-shadow(0_12px_24px_rgba(0,0,0,0.35))]"
							draggable={false}
						/>
					</picture>
				</div>

				{/* Bottom Content: Clean Typography fading naturally into artwork */}
				<div className="flex flex-col gap-1.5 sm:gap-2">
					<h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl md:text-3xl">
						{milestone.title}
					</h3>

					<p className="text-xs leading-relaxed text-zinc-300 sm:text-[13px]">
						{tier.perkDescription}
					</p>

					{/* Editorial Metric Stat Row (Inspired by gallery1.tsx) */}
					<div className="mt-1 flex items-baseline gap-2 border-t border-white/15 pt-2.5 sm:mt-2 sm:pt-3">
						<span className="font-mono text-xl font-bold tracking-tight text-white sm:text-2xl">
							{milestone.threshold.toLocaleString()}
						</span>
						<span className="font-mono text-[10px] tracking-wider text-zinc-400 uppercase sm:text-[11px]">
							Likes required to unlock
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
