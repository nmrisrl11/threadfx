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
				disableForReducedMotion: false,
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
					? "bg-card/95 h-[430px] sm:h-[460px] md:grow-[4.5]"
					: "bg-card/60 hover:bg-card/90 h-14 sm:h-16 md:grow",
			)}
		>
			{/* Atmospheric Gamified Environmental Background Image (Smooth scale on hover for collapsed card) */}
			<img
				src={tier.bgImage}
				alt=""
				aria-hidden="true"
				width={1024}
				height={1024}
				loading={milestone.level === 1 ? "eager" : "lazy"}
				decoding="async"
				className={cn(
					"pointer-events-none absolute inset-0 size-full object-cover transition-all duration-700 ease-[cubic-bezier(0.65,0,0.35,1)] select-none",
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
						? "bg-gradient-to-t from-black/95 via-black/45 to-black/25"
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
					"pointer-events-none absolute inset-0 flex flex-row items-center justify-between px-4 transition-opacity md:flex-col md:p-5",
					isActive ? "opacity-0 duration-150" : "opacity-100 delay-200 duration-500",
				)}
				aria-hidden={isActive}
			>
				{/* Top (Desktop) / Left (Mobile): Mini Badge & Level */}
				<div className="flex items-center gap-2.5 md:flex-col md:gap-2">
					<picture className="relative size-8 shrink-0 select-none">
						<source srcSet={`/badges/${milestone.badgeFile}`} type="image/webp" />
						<img
							src={`/badges/${milestone.badgeFile}`}
							alt=""
							width={32}
							height={32}
							loading="lazy"
							className="size-full object-contain opacity-80"
						/>
					</picture>
					<span className="font-mono text-[11px] font-bold tracking-wider text-zinc-300">
						0{milestone.level}
					</span>
					<span className="text-sm font-semibold text-zinc-200 md:hidden">{milestone.title}</span>
				</div>

				{/* Mobile Right: Unlock Threshold */}
				<div className="font-mono text-xs text-zinc-400 md:hidden">
					<span>{milestone.threshold.toLocaleString()} Likes</span>
				</div>

				{/* Bottom: Editorial Rotated Label on Desktop */}
				<div className="hidden py-4 md:flex md:flex-1 md:items-end md:justify-center">
					<span className="rotate-180 font-mono text-xs font-bold tracking-widest whitespace-nowrap text-zinc-300 uppercase transition-colors duration-200 [writing-mode:vertical-rl] group-hover:text-white">
						{milestone.rank}
					</span>
				</div>
			</div>

			{/* Expanded Panel Presentation (Fixed width container on desktop prevents text reflow during transition) */}
			<div
				className={cn(
					"absolute inset-y-0 left-0 flex size-full flex-col justify-between p-5 transition-opacity sm:p-6 md:w-[460px] md:p-7",
					reveal,
				)}
			>
				{/* Top Bar: Eyebrow Tag + Compact Sound Pill */}
				<div className="flex items-center justify-between gap-3">
					<div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium tracking-wider text-zinc-200 uppercase shadow-md backdrop-blur-md">
						<TrophyIcon className="size-3 text-zinc-400" />
						<span className="font-semibold text-white">Rank 0{milestone.level}</span>
						<span className="text-zinc-500">/</span>
						<span className="text-zinc-400">07</span>
					</div>

					{/* Redesigned Minimal Audio Pill */}
					<button
						ref={fanfareBtnRef}
						type="button"
						onClick={handleAuditionFanfare}
						aria-label={`Audition ${milestone.title} celebration audio`}
						className={cn(
							"group/btn inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/15 bg-black/60 px-3 py-1 font-mono text-[11px] font-medium text-zinc-200 shadow-md backdrop-blur-md transition-all duration-150 outline-none",
							"hover:border-white/30 hover:bg-black/80 hover:text-white active:scale-95",
							isPlayingAudio && "border-white/40 bg-white/20 text-white",
						)}
					>
						<Volume2Icon
							className={cn(
								"size-3 text-zinc-300 transition-colors group-hover/btn:text-white",
								isPlayingAudio && "animate-pulse text-white",
							)}
						/>
						<span>{isPlayingAudio ? "Playing Fanfare" : "Listen to Fanfare"}</span>
					</button>
				</div>

				{/* Center Exhibit: 3D Floating Medal Showcase */}
				<div className="relative my-auto flex flex-col items-center justify-center py-1 sm:py-2">
					{/* Ambient Glow Aura */}
					<div
						className={cn(
							"absolute size-28 rounded-full opacity-60 blur-2xl transition-all duration-300 sm:size-36",
							tier.ambientGlow,
						)}
						style={{ backgroundColor: tier.accentColor }}
					/>

					{/* 3D WebP Medal Asset */}
					<picture className="relative size-24 shrink-0 transition-transform duration-300 ease-[var(--ease-out)] select-none sm:size-30">
						<source srcSet={`/badges/${milestone.badgeFile}`} type="image/webp" />
						<img
							src={`/badges/${milestone.badgeFile}`}
							alt={`${milestone.title} 3D Medal`}
							width={120}
							height={120}
							className="size-full object-contain [filter:drop-shadow(0_12px_24px_rgba(0,0,0,0.35))]"
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
