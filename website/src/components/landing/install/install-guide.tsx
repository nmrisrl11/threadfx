import { UpdateCallout } from "@/components/landing/install/update-callout";
import { Card } from "@/components/ui/card";
import { APP_INFO } from "@data/app";
import { CheckIcon, CopyIcon, DownloadIcon } from "lucide-react";
import { useState } from "react";

export function InstallGuide() {
	const [copied, setCopied] = useState<boolean>(false);

	const handleCopyUrl = async () => {
		try {
			await navigator.clipboard.writeText("chrome://extensions");
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		} catch {
			// Fallback silently if clipboard permissions are restricted
		}
	};

	return (
		<section
			id="install-guide"
			className="section-scroll-fade mx-auto max-w-4xl scroll-mt-20 px-6 py-20"
		>
			<div className="mb-10 text-center">
				<h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
					Install in 3 Simple Steps
				</h2>
				<p className="text-muted-foreground mt-2 text-sm">
					ThreadFX is currently distributed as an open unpacked developer package.
				</p>
			</div>

			<div className="space-y-4">
				{/* Step 1 */}
				<Card className="flex items-start gap-4 border-white/8 bg-[#111114] p-5">
					<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#FF2E93]/10 font-mono text-xs font-bold text-[#FF2E93] ring-1 ring-[#FF2E93]/20">
						1
					</span>
					<div className="flex-1">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<h4 className="text-foreground text-sm font-bold">Download &amp; Extract</h4>
							<a
								href={APP_INFO.urls.download}
								className="inline-flex items-center gap-1.5 font-mono text-xs text-[#00F5FF] hover:underline"
							>
								<DownloadIcon className="h-3.5 w-3.5" />
								<span>Download .zip</span>
							</a>
						</div>
						<p className="text-muted-foreground mt-1 text-xs leading-relaxed">
							Download the latest archive and unzip it to any persistent folder on your local drive.
						</p>
					</div>
				</Card>

				{/* Step 2 */}
				<Card className="flex items-start gap-4 border-white/8 bg-[#111114] p-5">
					<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#7928CA]/15 font-mono text-xs font-bold text-[#A855F7] ring-1 ring-[#7928CA]/30">
						2
					</span>
					<div className="flex-1">
						<div className="flex flex-wrap items-center justify-between gap-2">
							<h4 className="text-foreground text-sm font-bold">Enable Developer Mode</h4>
							<button
								type="button"
								onClick={handleCopyUrl}
								className="group text-muted-foreground hover:text-foreground inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-white/8 bg-black/40 px-2 py-1 font-mono text-[11px] transition-[border-color,background-color] hover:border-white/16 active:scale-[0.97]"
							>
								{copied ? (
									<>
										<CheckIcon className="h-3 w-3 text-emerald-400" />
										<span className="text-emerald-400">Copied</span>
									</>
								) : (
									<>
										<CopyIcon className="text-muted-foreground group-hover:text-foreground h-3 w-3" />
										<span>chrome://extensions</span>
									</>
								)}
							</button>
						</div>
						<p className="text-muted-foreground mt-1 text-xs leading-relaxed">
							Open your browser extension manager and toggle the <strong>Developer mode</strong>{" "}
							switch in the top right corner.
						</p>
					</div>
				</Card>

				{/* Step 3 */}
				<Card className="flex items-start gap-4 border-white/8 bg-[#111114] p-5">
					<span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#00F5FF]/10 font-mono text-xs font-bold text-[#00F5FF] ring-1 ring-[#00F5FF]/20">
						3
					</span>
					<div className="flex-1">
						<h4 className="text-foreground text-sm font-bold">Load Unpacked</h4>
						<p className="text-muted-foreground mt-1 text-xs leading-relaxed">
							Click <strong>Load unpacked</strong> in the top left, select your unzipped folder, and
							open Threads to start juicing your feed!
						</p>
					</div>
				</Card>

				{/* Seamless Upgrades Callout */}
				<UpdateCallout />
			</div>
		</section>
	);
}
