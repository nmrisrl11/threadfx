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
				className={`border-border bg-card text-card-foreground shadow-card overflow-hidden rounded-2xl border p-6 transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="border-border flex items-center gap-2 border-b pb-4">
					<span className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
						Step 03
					</span>
					<span className="text-muted-foreground/60">·</span>
					<span className="text-foreground/90 text-xs font-medium">Load &amp; Enjoy</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
								Click Load unpacked
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Click &quot;Load unpacked&quot; in the top-left toolbar, select your unzipped{" "}
								{APP_INFO.name} folder, and open {APP_INFO.platform.name}. You&apos;re ready to
								start juicing your feed!
							</p>
						</div>

						{/* Global Shortcut Hint */}
						<div className="flex flex-col gap-2 pt-2">
							<div className="border-border bg-surface-subtle text-foreground/90 inline-flex w-full items-center gap-2.5 rounded-xl border px-4 py-3 text-xs sm:w-fit">
								<kbd className="border-border bg-card text-foreground rounded border px-2 py-0.5 font-mono text-[11px] font-semibold shadow-xs">
									Alt + Shift + T
								</kbd>
								<span>Shortcut to toggle the Side Panel anytime</span>
							</div>

							<span className="text-muted-foreground text-xs">
								You can also click the {APP_INFO.name} icon pinned in your browser toolbar
							</span>
						</div>
					</div>

					{/* Right: Interactive Live Feed Ignition Test Pad */}
					<div className="border-border bg-surface-subtle rounded-xl border p-5 text-center">
						<div className="border-border flex items-center justify-between border-b pb-3">
							<span className="text-foreground text-xs font-semibold">
								Interactive Feed Preview
							</span>
							<span className="text-muted-foreground text-[11px]">Try before installing</span>
						</div>

						<div className="mt-4 flex flex-col items-center justify-center gap-3 py-2">
							<span className="text-muted-foreground text-xs">
								Click the heart to preview procedural sound &amp; confetti:
							</span>

							{/* Interactive Test Like Heart (No Layout Shift) */}
							<button
								ref={buttonRef}
								type="button"
								onClick={handleTestLike}
								aria-label="Test like sound effect and confetti"
								className="group border-border bg-card text-foreground hover:bg-accent inline-flex cursor-pointer items-center gap-2 rounded-full border px-5 py-2.5 font-medium shadow-xs transition-transform duration-150 outline-none active:scale-[0.97]"
							>
								<HeartIcon
									className={`size-4 transition-transform duration-200 ease-out ${
										isBursting
											? "scale-125 text-rose-500"
											: "text-muted-foreground group-hover:text-foreground group-hover:scale-110"
									}`}
								/>
								<span className="text-xs font-semibold">Test Like Reaction</span>
							</button>

							<div className="text-muted-foreground flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
								<SparklesIcon className="text-muted-foreground size-3" />
								<span>Reactions tested: {testLikes}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
