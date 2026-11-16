import { Switch } from "@/components/ui/switch";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useState } from "react";

interface StepDeveloperCardProps {
	id?: string;
	className?: string;
}

export const StepDeveloperCard = React.forwardRef<HTMLDivElement, StepDeveloperCardProps>(
	function StepDeveloperCard({ id, className = "" }, ref) {
		const [copied, setCopied] = useState<boolean>(false);
		const [devModeActive, setDevModeActive] = useState<boolean>(false);

		const handleCopyUrl = async () => {
			try {
				await navigator.clipboard.writeText("chrome://extensions");
				setCopied(true);
				setTimeout(() => setCopied(false), 2000);
			} catch {
				// Fallback silently
			}
		};

		const handleToggleDevMode = () => {
			setDevModeActive((prev) => !prev);
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
						Step 02
					</span>
					<span className="text-zinc-600">·</span>
					<span className="text-xs text-zinc-300">Browser Settings</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
								Turn on Developer mode
							</h3>
							<p className="text-sm leading-relaxed text-zinc-400">
								Navigate to your browser extensions manager and switch on Developer mode in the
								top-right corner.
							</p>
						</div>

						{/* Copyable Address Bar Pill */}
						<div className="flex flex-col gap-2 pt-2">
							<button
								type="button"
								onClick={handleCopyUrl}
								aria-label="Copy extensions URL"
								className="group inline-flex w-full cursor-pointer items-center justify-between rounded-xl border border-white/15 bg-black/60 px-4 py-3 font-mono text-xs text-zinc-200 transition-colors duration-150 hover:border-white/30 hover:bg-black/80 hover:text-white sm:w-fit sm:min-w-[300px]"
							>
								<div className="flex items-center gap-2">
									<span className="size-2 rounded-full bg-zinc-600 group-hover:bg-zinc-400" />
									<span className="font-semibold text-zinc-300">chrome://extensions</span>
								</div>

								<div className="inline-flex w-16 items-center justify-end font-sans text-xs">
									{copied ? (
										<span className="inline-flex items-center gap-1 font-medium text-emerald-400">
											<CheckIcon className="size-3.5" />
											<span>Copied</span>
										</span>
									) : (
										<span className="inline-flex items-center gap-1 text-zinc-400 transition-colors group-hover:text-zinc-200">
											<CopyIcon className="size-3.5" />
											<span>Copy</span>
										</span>
									)}
								</div>
							</button>

							<span className="text-xs text-zinc-500">
								Paste into your address bar and press Enter
							</span>
						</div>
					</div>

					{/* Right: Interactive Chrome Extensions Toolbar Simulator */}
					<div className="rounded-xl border border-white/10 bg-black/60 p-5">
						<div className="flex items-center justify-between border-b border-white/10 pb-3">
							<span className="text-xs font-medium text-zinc-400">Extensions Manager</span>

							{/* Interactive Developer Mode Toggle using Standard Radix Switch */}
							<div className="flex items-center gap-2.5">
								<span className="text-xs font-semibold text-white">Developer mode</span>
								<Switch
									id="dev-mode-sim-switch"
									checked={devModeActive}
									onCheckedChange={handleToggleDevMode}
									aria-label="Toggle developer mode simulator"
								/>
							</div>
						</div>

						<div className="mt-4 flex items-center justify-between rounded-lg border border-white/5 bg-white/[0.03] p-3 text-xs">
							<div className="flex items-center gap-2">
								<div
									className={`size-2 rounded-full transition-colors ${
										devModeActive ? "bg-emerald-400" : "bg-zinc-600"
									}`}
								/>
								<span className="text-zinc-300">
									{devModeActive ? "Developer mode is ON" : "Click the toggle above to preview"}
								</span>
							</div>
							<span className="font-mono text-[11px] text-zinc-500">
								{devModeActive ? "Ready for Step 3" : "Toggle switch"}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
