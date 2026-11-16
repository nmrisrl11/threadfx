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
				className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c10] p-6 text-white shadow-2xl transition-colors duration-150 sm:p-8 ${className}`}
			>
				{/* Top Card Header */}
				<div className="flex items-center gap-2 border-b border-white/10 pb-4">
					<span className="font-mono text-xs font-semibold tracking-wider text-zinc-400 uppercase">
						Step 01
					</span>
					<span className="text-zinc-600">·</span>
					<span className="text-xs text-zinc-300">Download &amp; Unzip</span>
				</div>

				{/* Two-Column Interior */}
				<div className="mt-6 grid grid-cols-1 items-center gap-6 lg:grid-cols-2 lg:gap-8">
					{/* Left: Action & Copy */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<h3 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
								Download {APP_INFO.name}
							</h3>
							<p className="text-sm leading-relaxed text-zinc-400">
								Get the latest release archive. Once downloaded, double-click to unzip the folder
								anywhere on your computer.
							</p>
						</div>

						{/* Primary Tactile CTA */}
						<div className="flex flex-col gap-2 pt-2">
							<a
								href={APP_INFO.urls.download}
								className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-zinc-950 transition-transform duration-150 hover:bg-zinc-200 active:scale-[0.98] sm:w-fit"
							>
								<DownloadIcon className="size-4" />
								<span>Download {APP_INFO.name}</span>
							</a>

							<span className="text-xs text-zinc-500">
								Free &amp; open source for Chrome, Brave, Edge, and Arc.
							</span>
						</div>
					</div>

					{/* Right: Unpacked Folder Guide */}
					<div className="rounded-xl border border-white/10 bg-black/60 p-5">
						<div className="flex items-center gap-3 border-b border-white/10 pb-3">
							<div className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-white/5">
								<FolderArchiveIcon className="size-4 text-zinc-300" />
							</div>
							<div className="flex flex-col">
								<span className="text-xs font-semibold text-white">{APP_INFO.name} Folder</span>
								<span className="text-[11px] text-zinc-400">Extracted &amp; ready to load</span>
							</div>
						</div>

						<div className="mt-3.5 flex flex-col gap-2.5 text-xs text-zinc-300">
							<div className="flex items-center gap-2.5">
								<CheckIcon className="size-3.5 shrink-0 text-zinc-400" />
								<span>Save the extracted folder anywhere on your local drive</span>
							</div>
							<div className="flex items-center gap-2.5">
								<CheckIcon className="size-3.5 shrink-0 text-zinc-400" />
								<span>No installer, admin rights, or extra software required</span>
							</div>
							<div className="flex items-center gap-2.5">
								<CheckIcon className="size-3.5 shrink-0 text-zinc-400" />
								<span>Runs 100% locally in your browser with zero data collection</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	},
);
