import { APP_INFO } from "@data/app";
import { CheckIcon, DownloadIcon, FolderArchiveIcon } from "lucide-react";
import React from "react";

interface StepDownloadCardProps {
	id?: string;
	className?: string;
}

export const StepDownloadCard = React.forwardRef<HTMLDivElement, StepDownloadCardProps>(
	function StepDownloadCard({ id, className = "" }, ref) {
		return (
			<div
				ref={ref}
				id={id}
				className={`border-border bg-card text-card-foreground shadow-card overflow-hidden rounded-2xl border p-6 transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="border-border flex items-center gap-2 border-b pb-4">
					<span className="text-muted-foreground font-mono text-xs font-semibold tracking-wider uppercase">
						Step 01
					</span>
					<span className="text-muted-foreground/60">·</span>
					<span className="text-foreground/90 text-xs font-medium">Download &amp; Unzip</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Copy */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-foreground text-xl font-bold tracking-tight sm:text-2xl">
								Download {APP_INFO.name}
							</h3>
							<p className="text-muted-foreground text-sm leading-relaxed">
								Get the latest release archive. Once downloaded, double-click to unzip the folder
								anywhere on your computer.
							</p>
						</div>

						{/* Primary Tactile CTA */}
						<div className="flex flex-col gap-2 pt-2">
							<a
								href={APP_INFO.urls.download}
								className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl px-5 py-3 text-sm font-semibold transition-transform duration-150 focus-visible:ring-2 focus-visible:outline-none active:scale-[0.98] sm:w-fit"
							>
								<DownloadIcon aria-hidden="true" className="size-4" />
								<span>Download {APP_INFO.name}</span>
							</a>

							<span className="text-muted-foreground text-xs">
								Free &amp; open source for Chrome, Brave, Edge, and Arc.
							</span>
						</div>
					</div>

					{/* Right: Unpacked Folder Guide */}
					<div className="border-border bg-surface-subtle rounded-xl border p-5">
						<div className="border-border flex items-center gap-3 border-b pb-3">
							<div className="border-border bg-muted/60 flex size-9 items-center justify-center rounded-lg border">
								<FolderArchiveIcon aria-hidden="true" className="text-foreground size-4" />
							</div>
							<div className="flex flex-col">
								<span className="text-foreground text-xs font-semibold">
									{APP_INFO.name} Folder
								</span>
								<span className="text-muted-foreground text-[11px]">
									Extracted &amp; ready to load
								</span>
							</div>
						</div>

						<div className="text-foreground/80 mt-3.5 flex flex-col gap-2.5 text-xs">
							<div className="flex items-center gap-2.5">
								<CheckIcon aria-hidden="true" className="text-muted-foreground size-3.5 shrink-0" />
								<span>Save the extracted folder anywhere on your local drive</span>
							</div>
							<div className="flex items-center gap-2.5">
								<CheckIcon aria-hidden="true" className="text-muted-foreground size-3.5 shrink-0" />
								<span>No installer, admin rights, or extra software required</span>
							</div>
							<div className="flex items-center gap-2.5">
								<CheckIcon aria-hidden="true" className="text-muted-foreground size-3.5 shrink-0" />
								<span>Runs 100% locally in your browser with zero data collection</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
