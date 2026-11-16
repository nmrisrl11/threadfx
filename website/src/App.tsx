import { BentoSection } from "@/components/bento/bento-section";
import { HeroSection } from "@/components/hero/hero-section";
import { InstallSection } from "@/components/install/install-section";
import { MilestonesSection } from "@/components/milestones/milestones-section";
import { SimulatorSection } from "@/components/simulator/simulator-section";
import { Footer } from "@/components/layout/footer";
// import { Navbar } from "@/components/layout/navbar";

export default function App() {
	return (
		<div className="bg-background text-foreground min-h-screen antialiased">
			{/* Navbar temporarily hidden per user request to focus on Hero visualization */}
			{/* <Navbar /> */}
			<main>
				<HeroSection />
				<SimulatorSection />
				<BentoSection />
				<MilestonesSection />
				<InstallSection />
			</main>
			<Footer />
		</div>
	);
}
