import { APP_INFO } from "@data/app";
import { SOUND_PACKS } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import { HeartIcon, SparklesIcon } from "lucide-react";
import React, { useRef, useState } from "react";

interface StepLoadCardProps {
	id?: string;
	className?: string;
}

export const StepLoadCard = React.forwardRef<HTMLDivElement, StepLoadCardProps>(
	function StepLoadCard({ id, className = "" }, ref) {
		const [testLikes, setTestLikes] = useState<number>(0);
		const [isBursting, setIsBursting] = useState<boolean>(false);
		const buttonRef = useRef<HTMLButtonElement | null>(null);

		const handleTestLike = (e: React.MouseEvent<HTMLButtonElement>) => {
			e.stopPropagation();
			const nextCount = testLikes + 1;
			setTestLikes(nextCount);
			setIsBursting(true);
			setTimeout(() => setIsBursting(false), 400);

			// Procedural audio feedback
			try {
				const sound = SOUND_PACKS.bubble.params;
				zzfx(0.7, ...sound);
			} catch {
				// AudioContext fallback
			}

			// Particle burst centered on test heart
			if (buttonRef.current) {
				const rect = buttonRef.current.getBoundingClientRect();
				const x = (rect.left + rect.width / 2) / window.innerWidth;
				const y = (rect.top + rect.height / 2) / window.innerHeight;

				confetti({
					particleCount: 24,
					spread: 55,
					startVelocity: 18,
					ticks: 80,
					origin: { x, y },
					colors: ["#ffffff", "#e4e4e7", "#a1a1aa"],
					disableForReducedMotion: false,
				});
			}
		};

		return (
			<div
				ref={ref}
				id={id}
				className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] p-6 text-white shadow-2xl transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="flex items-center gap-2 border-b border-white/10 pb-4">
					<span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
						Step 03
					</span>
					<span className="text-zinc-600">·</span>
					<span className="text-xs text-zinc-300">Load &amp; Enjoy</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
								Click Load unpacked
							</h3>
							<p className="text-sm leading-relaxed text-zinc-400">
								Click &quot;Load unpacked&quot; in the top-left toolbar, select your unzipped{" "}
								{APP_INFO.name} folder, and open {APP_INFO.platform.name}. You&apos;re ready to
								start juicing your feed!
							</p>
						</div>

						{/* Global Shortcut Hint */}
						<div className="flex flex-col gap-2 pt-2">
							<div className="inline-flex w-full items-center gap-2.5 rounded-xl border border-white/10 bg-black/60 px-4 py-3 text-xs text-zinc-300 sm:w-fit">
								<kbd className="rounded border border-white/20 bg-white/10 px-2 py-0.5 font-mono text-[11px] font-semibold text-white">
									Alt + Shift + T
								</kbd>
								<span>Shortcut to toggle the Side Panel anytime</span>
							</div>

							<span className="text-xs text-zinc-500">
								You can also click the {APP_INFO.name} icon pinned in your browser toolbar
							</span>
						</div>
					</div>

					{/* Right: Interactive Live Feed Ignition Test Pad */}
					<div className="rounded-xl border border-white/10 bg-black/60 p-5 text-center">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<span className="text-xs font-semibold text-white">Interactive Feed Preview</span>
							<span className="text-[11px] text-zinc-400">Try before installing</span>
						</div>

						<div className="mt-4 flex flex-col items-center justify-center gap-3 py-2">
							<span className="text-xs text-zinc-400">
								Click the heart to preview procedural sound &amp; confetti:
							</span>

							{/* Interactive Test Like Heart (No Layout Shift) */}
							<button
								ref={buttonRef}
								type="button"
								onClick={handleTestLike}
								aria-label="Test like sound effect and confetti"
								className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2.5 font-medium text-white shadow-xs transition-transform duration-150 outline-none hover:border-white/30 hover:bg-white/15 active:scale-[0.97]"
							>
								<HeartIcon
									className={`size-4 transition-transform duration-200 ease-out ${
										isBursting ? "scale-125 text-rose-400" : "text-zinc-300 group-hover:scale-110"
									}`}
								/>
								<span className="text-xs font-semibold">Test Like Reaction</span>
							</button>

							<div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-500 tabular-nums">
								<SparklesIcon className="size-3 text-zinc-400" />
								<span>Reactions tested: {testLikes}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
