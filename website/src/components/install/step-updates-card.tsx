import { CheckCircle2Icon, RefreshCwIcon } from "lucide-react";
import React, { useState } from "react";

interface StepUpdatesCardProps {
	id?: string;
	className?: string;
}

export const StepUpdatesCard = React.forwardRef<HTMLDivElement, StepUpdatesCardProps>(
	function StepUpdatesCard({ id, className = "" }, ref) {
		const [isReloading, setIsReloading] = useState<boolean>(false);
		const [reloadSuccess, setReloadSuccess] = useState<boolean>(false);

		const handleSimulateReload = () => {
			if (isReloading) return;
			setIsReloading(true);
			setReloadSuccess(false);

			setTimeout(() => {
				setIsReloading(false);
				setReloadSuccess(true);
				setTimeout(() => setReloadSuccess(false), 2500);
			}, 700);
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
						Step 04
					</span>
					<span className="text-zinc-600">·</span>
					<span className="text-xs text-zinc-300">Fast Updates</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
								Updating takes 10 seconds
							</h3>
							<p className="text-sm leading-relaxed text-zinc-400">
								When an update drops, simply unzip the new version into your folder and click the
								reload icon in your browser.
							</p>
						</div>

						{/* Interactive Reload Trigger */}
						<div className="flex flex-col gap-2 pt-2">
							<button
								type="button"
								onClick={handleSimulateReload}
								aria-label="Simulate extension reload"
								className="group inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-semibold text-zinc-200 transition-transform duration-150 hover:border-white/30 hover:bg-white/10 hover:text-white active:scale-[0.98] sm:w-fit sm:min-w-[190px]"
							>
								<RefreshCwIcon
									className={`size-3.5 shrink-0 transition-transform duration-700 ${
										isReloading ? "animate-spin text-white" : "text-zinc-400"
									}`}
								/>
								<span className="truncate">
									{isReloading
										? "Reloading..."
										: reloadSuccess
											? "Reload complete!"
											: "Test 1-click reload"}
								</span>
							</button>

							<span className="text-xs text-zinc-500">
								Your sound settings and milestone medals stay saved automatically
							</span>
						</div>
					</div>

					{/* Right: What Stays Saved */}
					<div className="rounded-xl border border-white/10 bg-black/60 p-5">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<span className="text-xs font-semibold text-white">Always Kept Safe</span>
							<span
								className={`font-mono text-[11px] transition-colors ${
									reloadSuccess ? "font-bold text-emerald-400" : "text-zinc-500"
								}`}
							>
								{reloadSuccess ? "SAVED & ACTIVE" : "ZERO DATA LOSS"}
							</span>
						</div>

						<div className="mt-3.5 flex flex-col gap-2.5">
							<div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon className="size-3.5 text-zinc-400" />
									<span className="text-zinc-300">All unlocked milestone medals &amp; ranks</span>
								</div>
								<span className="font-mono text-[10px] text-zinc-500">Preserved</span>
							</div>

							<div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon className="size-3.5 text-zinc-400" />
									<span className="text-zinc-300">Selected sound pack, volume &amp; pitch</span>
								</div>
								<span className="font-mono text-[10px] text-zinc-500">Preserved</span>
							</div>

							<div className="flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.02] p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon className="size-3.5 text-zinc-400" />
									<span className="text-zinc-300">Confetti palettes &amp; reaction emojis</span>
								</div>
								<span className="font-mono text-[10px] text-zinc-500">Preserved</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
