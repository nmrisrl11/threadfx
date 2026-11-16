import { FeatureBento } from "@/components/landing/bento/feature-bento";
import { Footer } from "@/components/landing/footer";
import { Hero } from "@/components/landing/hero";
import { InstallGuide } from "@/components/landing/install/install-guide";
import { MilestonesStrip } from "@/components/landing/milestones/milestones-strip";
// import { Navbar } from "@/components/landing/navbar";
import { SimulatorDeck } from "@/components/landing/simulator/simulator-deck";

export default function App() {
	return (
		<div className="bg-background text-foreground min-h-screen antialiased selection:bg-[#FF2E93] selection:text-white">
			{/* Navbar temporarily hidden per user request to focus on Hero visualization */}
			{/* <Navbar /> */}
			<main>
				<Hero />
				<SimulatorDeck />
				<FeatureBento />
				<MilestonesStrip />
				<InstallGuide />
			</main>
			<Footer />
		</div>
	);
}
