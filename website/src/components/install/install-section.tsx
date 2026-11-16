import { StepDeveloperCard } from "@/components/install/step-developer-card";
import { StepDownloadCard } from "@/components/install/step-download-card";
import { StepLoadCard } from "@/components/install/step-load-card";
import { StepUpdatesCard } from "@/components/install/step-updates-card";
import { ScrollStack } from "@/components/ui/scroll-stack";
import { DownloadIcon } from "lucide-react";

export function InstallSection() {
	return (
		<section
			id="install-guide"
			className="section-scroll-fade relative min-h-dvh w-full px-4 py-16 sm:px-6 sm:py-24"
		>
			<div className="mx-auto w-full max-w-4xl">
				{/* Section Header */}
				<div className="mb-12 text-center sm:mb-16">
					<div className="mb-2.5 flex items-center justify-center gap-1.5 font-mono text-[11px] tracking-wider text-zinc-400 uppercase">
						<DownloadIcon className="size-3.5 text-zinc-400" />
						<span>Setup &amp; Installation</span>
					</div>

					<h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl">
						Install in under a minute.
					</h2>
					<p className="mx-auto mt-3 max-w-2xl text-base leading-relaxed text-zinc-400 sm:max-w-3xl sm:text-lg">
						Download the package, enable Developer mode, and select the folder.
						<br className="hidden sm:inline" />
						No store waiting, no accounts required, and ready in seconds.
					</p>
				</div>

				{/* ReactBits ScrollStack (Depth-of-field card stacking with focus scaling, dimming & blur) */}
				<ScrollStack
					preset="focus"
					itemScale={0.06}
					dimAmount={0.35}
					blurAmount={3}
					stackOffset={96}
					itemStackDistance={14}
					itemMargin={40}
					className="w-full pb-32"
				>
					<StepDownloadCard id="step-1" className="scroll-mt-28" />
					<StepDeveloperCard id="step-2" className="scroll-mt-28" />
					<StepLoadCard id="step-3" className="scroll-mt-28" />
					<StepUpdatesCard id="step-4" className="scroll-mt-28" />
				</ScrollStack>
			</div>
		</section>
	);
}
