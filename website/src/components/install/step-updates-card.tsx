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
				className={`border-border bg-card text-card-foreground shadow-card overflow-hidden rounded-2xl border p-6 transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="border-border flex items-center gap-2 border-b pb-4">
					<span className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
						Step 04
					</span>
					<span className="text-muted-foreground/60">·</span>
					<span className="text-foreground/90 text-xs font-medium">Fast Updates</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
								Updating takes 10 seconds
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
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
								className="group border-border bg-card text-foreground hover:bg-accent focus-visible:ring-ring inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-xs font-semibold shadow-xs transition-transform duration-150 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] sm:w-fit sm:min-w-[190px]"
							>
								<RefreshCwIcon
									aria-hidden="true"
									className={`size-3.5 shrink-0 transition-transform duration-700 ${
										isReloading
											? "text-foreground animate-spin motion-reduce:animate-none"
											: "text-muted-foreground group-hover:text-foreground"
									}`}
								/>
								<span role="status" aria-live="polite" className="truncate">
									{isReloading
										? "Reloading…"
										: reloadSuccess
											? "Reload complete!"
											: "Test 1-click reload"}
								</span>
							</button>

							<span className="text-muted-foreground text-xs">
								Your sound settings and milestone medals stay saved automatically
							</span>
						</div>
					</div>

					{/* Right: What Stays Saved */}
					<div className="border-border bg-surface-subtle rounded-xl border p-5">
						<div className="border-border flex items-center justify-between border-b pb-3">
							<span className="text-foreground text-xs font-semibold">Always Kept Safe</span>
							<span
								className={`font-mono text-[11px] transition-colors ${
									reloadSuccess ? "font-bold text-emerald-500" : "text-muted-foreground"
								}`}
							>
								{reloadSuccess ? "SAVED & ACTIVE" : "ZERO DATA LOSS"}
							</span>
						</div>

						<div className="mt-3.5 flex flex-col gap-2.5">
							<div className="border-border bg-card/60 flex items-center justify-between rounded-lg border p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon aria-hidden="true" className="text-muted-foreground size-3.5" />
									<span className="text-foreground/90">
										All unlocked milestone medals &amp; ranks
									</span>
								</div>
								<span className="text-muted-foreground font-mono text-[10px]">Preserved</span>
							</div>

							<div className="border-border bg-card/60 flex items-center justify-between rounded-lg border p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon aria-hidden="true" className="text-muted-foreground size-3.5" />
									<span className="text-foreground/90">
										Selected sound pack, volume &amp; pitch
									</span>
								</div>
								<span className="text-muted-foreground font-mono text-[10px]">Preserved</span>
							</div>

							<div className="border-border bg-card/60 flex items-center justify-between rounded-lg border p-2.5 text-xs">
								<div className="flex items-center gap-2">
									<CheckCircle2Icon aria-hidden="true" className="text-muted-foreground size-3.5" />
									<span className="text-foreground/90">
										Confetti palettes &amp; reaction emojis
									</span>
								</div>
								<span className="text-muted-foreground font-mono text-[10px]">Preserved</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
