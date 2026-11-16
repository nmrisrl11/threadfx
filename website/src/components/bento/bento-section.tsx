import { AudioSpecCard } from "@/components/bento/audio-spec-card";
import { ParticleSpecCard } from "@/components/bento/particle-spec-card";
import { PrivacySpecCard } from "@/components/bento/privacy-spec-card";
import { SidepanelSpecCard } from "@/components/bento/sidepanel-spec-card";

export function BentoSection() {
	return (
		<section
			id="features"
			className="section-scroll-fade mx-auto max-w-5xl scroll-mt-20 px-6 py-20"
		>
			<div className="mb-10 text-center">
				<h2 className="text-foreground text-2xl font-bold tracking-tight sm:text-3xl">
					Engineered for Tactile Delight
				</h2>
				<p className="text-muted-foreground mt-2 text-sm">
					Four architectural pillars built with zero bloat and native browser standards.
				</p>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-12">
				<AudioSpecCard />
				<ParticleSpecCard />
				<SidepanelSpecCard />
				<PrivacySpecCard />
			</div>
		</section>
	);
}
