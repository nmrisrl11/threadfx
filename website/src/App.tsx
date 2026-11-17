import { DownloadSection } from "@/components/download/download-section";
import { FeatureSection } from "@/components/features/feature-section";
import { HeroSection } from "@/components/hero/hero-section";
import { InstallSection } from "@/components/install/install-section";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { MilestonesSection } from "@/components/milestones/milestones-section";
import { SimulatorSection } from "@/components/simulator/simulator-section";
import { useEffect, useRef, useState } from "react";

export default function App() {
	const footerRef = useRef<HTMLElement | null>(null);
	const [footerHeight, setFooterHeight] = useState<number>(0);

	useEffect(() => {
		const footerEl = footerRef.current;
		if (!footerEl) return;

		const updateHeight = () => {
			const height = Math.round(footerEl.getBoundingClientRect().height);
			if (height > 0) {
				setFooterHeight(height);
			}
		};

		updateHeight();

		const observer = new ResizeObserver(updateHeight);
		observer.observe(footerEl);
		window.addEventListener("resize", updateHeight);

		return () => {
			observer.disconnect();
			window.removeEventListener("resize", updateHeight);
		};
	}, []);

	return (
		<div className="bg-background text-foreground relative min-h-screen antialiased">
			{/* WCAG 2.4.1 Bypass Blocks: High-contrast keyboard skip link */}
			<a
				href="#main-content"
				title="Skip directly to main content"
				className="focus:bg-primary focus:text-primary-foreground focus:ring-ring sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:shadow-lg focus:ring-2 focus:outline-none"
			>
				Skip to main content
			</a>
			<Navbar />
			<main
				id="main-content"
				tabIndex={-1}
				style={{
					marginBottom: footerHeight > 0 ? `${footerHeight}px` : undefined,
				}}
				className="bg-background relative z-10 mb-[55vh] shadow-[0_24px_48px_-12px_rgba(0,0,0,0.08)] will-change-transform outline-none dark:shadow-[0_32px_64px_-16px_rgba(0,0,0,0.65)]"
			>
				<HeroSection />
				<SimulatorSection />
				<FeatureSection />
				<MilestonesSection />
				<InstallSection />
				<DownloadSection />
			</main>
			<Footer ref={footerRef} />
		</div>
	);
}
