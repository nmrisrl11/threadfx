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
				className={`border-border bg-card text-card-foreground shadow-card overflow-hidden rounded-2xl border p-6 transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="border-border flex items-center gap-2 border-b pb-4">
					<span className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
						Step 02
					</span>
					<span className="text-muted-foreground/60">·</span>
					<span className="text-foreground/90 text-xs font-medium">Browser Settings</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Instructions */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
								Turn on Developer mode
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
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
								className="group border-border bg-surface-subtle hover:bg-accent text-foreground inline-flex w-full cursor-pointer items-center justify-between rounded-xl border px-4 py-3 font-mono text-xs transition-colors duration-150 sm:w-fit sm:min-w-[300px]"
							>
								<div className="flex items-center gap-2">
									<span className="bg-muted-foreground/60 group-hover:bg-muted-foreground size-2 rounded-full" />
									<span className="text-foreground font-semibold">chrome://extensions</span>
								</div>

								<div className="inline-flex w-16 items-center justify-end font-sans text-xs">
									{copied ? (
										<span className="inline-flex items-center gap-1 font-medium text-emerald-500">
											<CheckIcon className="size-3.5" />
											<span>Copied</span>
										</span>
									) : (
										<span className="text-muted-foreground group-hover:text-foreground inline-flex items-center gap-1 transition-colors">
											<CopyIcon className="size-3.5" />
											<span>Copy</span>
										</span>
									)}
								</div>
							</button>

							<span className="text-muted-foreground text-xs">
								Paste into your address bar and press Enter
							</span>
						</div>
					</div>

					{/* Right: Interactive Chrome Extensions Toolbar Simulator */}
					<div className="border-border bg-surface-subtle rounded-xl border p-5">
						<div className="border-border flex items-center justify-between border-b pb-3">
							<span className="text-muted-foreground text-xs font-medium">Extensions Manager</span>

							{/* Interactive Developer Mode Toggle using Standard Radix Switch */}
							<div className="flex items-center gap-2.5">
								<span className="text-foreground text-xs font-semibold">Developer mode</span>
								<Switch
									id="dev-mode-sim-switch"
									checked={devModeActive}
									onCheckedChange={handleToggleDevMode}
									aria-label="Toggle developer mode simulator"
								/>
							</div>
						</div>

						<div className="border-border bg-card/60 mt-4 flex items-center justify-between rounded-lg border p-3 text-xs">
							<div className="flex items-center gap-2">
								<div
									className={`size-2 rounded-full transition-colors ${
										devModeActive ? "bg-emerald-500" : "bg-muted-foreground/40"
									}`}
								/>
								<span className="text-foreground/90">
									{devModeActive ? "Developer mode is ON" : "Click the toggle above to preview"}
								</span>
							</div>
							<span className="text-muted-foreground font-mono text-[11px]">
								{devModeActive ? "Ready for Step 3" : "Toggle switch"}
							</span>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
