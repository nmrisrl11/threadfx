import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useTheme } from "@/hooks/use-theme";
import { APP_INFO } from "@data/app";
import { ChevronDownIcon, MoonIcon, SunIcon } from "lucide-react";
import type { MouseEvent } from "react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
	{ label: "Simulator", href: "#simulator", id: "simulator" },
	{ label: "Features", href: "#features", id: "features" },
	{ label: "Milestones", href: "#milestones", id: "milestones" },
	{ label: "Install", href: "#install-guide", id: "install-guide" },
];

// All possible labels including default state for the zero-shift CSS grid stacker
const MOBILE_SECTIONS = [
	{ id: "", label: "Sections" },
	{ id: "simulator", label: "Simulator" },
	{ id: "features", label: "Features" },
	{ id: "milestones", label: "Milestones" },
	{ id: "install-guide", label: "Install" },
];

export function Navbar() {
	const [isVisible, setIsVisible] = useState(false);
	const [activeSection, setActiveSection] = useState<string>("");
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [, setTheme, isDark] = useTheme();

	useEffect(() => {
		const handleScroll = () => {
			const hero = document.getElementById("hero");
			if (hero) {
				// Show navbar once hero has scrolled 50% out of view
				const heroRect = hero.getBoundingClientRect();
				setIsVisible(heroRect.bottom <= window.innerHeight * 0.5);
			} else {
				setIsVisible(window.scrollY > 400);
			}

			// Scroll spy: identify which section is currently in the reading focal zone
			const focalPoint = window.innerHeight * 0.38;
			let current = "";

			for (const link of NAV_LINKS) {
				const el = document.getElementById(link.id);
				if (el) {
					const rect = el.getBoundingClientRect();
					if (rect.top <= focalPoint && rect.bottom > focalPoint) {
						current = link.id;
						break;
					}
				}
			}

			setActiveSection(current);
		};

		window.addEventListener("scroll", handleScroll, { passive: true });
		handleScroll();
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Auto-close mobile menu on scroll or Escape key
	useEffect(() => {
		if (!isMobileMenuOpen) return;
		const closeOnScroll = () => setIsMobileMenuOpen(false);
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				setIsMobileMenuOpen(false);
			}
		};
		window.addEventListener("scroll", closeOnScroll, { passive: true, once: true });
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("scroll", closeOnScroll);
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isMobileMenuOpen]);

	const handleNavClick = (e: MouseEvent<HTMLAnchorElement>, href: string, id: string) => {
		e.preventDefault();
		const target = document.getElementById(id);
		if (target) {
			// Offset target position to account for the floating capsule + comfortable breathing room
			const navOffset = window.innerWidth >= 640 ? 104 : 88;
			const elementPosition = target.getBoundingClientRect().top;
			const offsetPosition = elementPosition + window.pageYOffset - navOffset;

			window.scrollTo({
				top: offsetPosition,
				behavior: "smooth",
			});

			setActiveSection(id);
			setIsMobileMenuOpen(false);
			if (window.location.hash !== href) {
				window.history.replaceState(null, "", href);
			}
		}
	};

	return (
		<>
			{/* Backdrop overlay for mobile menu tap-outside */}
			{isMobileMenuOpen && (
				<div
					className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs sm:hidden"
					onClick={() => setIsMobileMenuOpen(false)}
					aria-hidden="true"
				/>
			)}

			<header
				className={`fixed inset-x-0 top-4 z-50 flex flex-col items-center px-4 transition-all duration-300 ease-out sm:top-6 ${
					isVisible
						? "pointer-events-auto translate-y-0 opacity-100"
						: "pointer-events-none -translate-y-6 opacity-0"
				}`}
			>
				{/* Floating Capsule Bar */}
				<div className="border-border bg-background/85 text-foreground shadow-chassis flex items-center gap-1.5 rounded-full border p-1.5 pl-3.5 backdrop-blur-xl sm:gap-2 sm:pl-5">
					{/* App Name Only (Points to domain root with smooth scroll) */}
					<a
						href="/"
						title={`${APP_INFO.name} — Return to top`}
						onClick={(e) => {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
							setActiveSection("");
							setIsMobileMenuOpen(false);
							if (window.location.hash) {
								window.history.replaceState(null, "", "/");
							}
						}}
						className="text-foreground focus-visible:ring-ring rounded-full px-1.5 py-0.5 text-xs font-extrabold tracking-tight transition-opacity select-none hover:opacity-80 focus-visible:ring-2 focus-visible:outline-none sm:text-sm"
					>
						{APP_INFO.name}
					</a>

					{/* Subtle Vertical Divider / Cutter (Shared across Mobile and Desktop) */}
					<div className="bg-border h-3.5 w-px sm:mx-0.5" />

					{/* Mobile Active Section Breadcrumb Dropdown Trigger (Option 2 - Zero Shift Grid Stacker) */}
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						aria-expanded={isMobileMenuOpen}
						aria-controls="mobile-nav-menu"
						aria-label="Toggle navigation sections"
						className={`focus-visible:ring-ring flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150 select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.96] sm:hidden ${
							isMobileMenuOpen
								? "bg-accent text-foreground shadow-xs"
								: "bg-surface-subtle text-muted-foreground hover:bg-accent/60 hover:text-foreground"
						}`}
					>
						{/* Zero-Layout-Shift Grid Stacker: Parent takes width of widest child ("Milestones") permanently */}
						<span className="grid grid-cols-1 grid-rows-1 items-center justify-items-start overflow-hidden text-left">
							{MOBILE_SECTIONS.map((section) => {
								const isActive = (activeSection || "") === section.id;
								return (
									<span
										key={section.id || "default"}
										aria-hidden={!isActive}
										className={`col-start-1 row-start-1 transition-all duration-200 ease-out ${
											isActive
												? "translate-y-0 opacity-100"
												: "pointer-events-none -translate-y-1.5 opacity-0 select-none"
										}`}
									>
										{section.label}
									</span>
								);
							})}
						</span>

						<ChevronDownIcon
							aria-hidden="true"
							className={`text-muted-foreground size-3 shrink-0 transition-transform duration-200 ${
								isMobileMenuOpen ? "text-foreground rotate-180" : ""
							}`}
						/>
					</button>

					{/* Desktop Navigation Links with Scroll Spy Active Indicator */}
					<nav aria-label="Main" className="hidden items-center gap-0.5 sm:flex">
						{NAV_LINKS.map((link) => {
							const isActive = activeSection === link.id;
							return (
								<a
									key={link.label}
									href={link.href}
									title={`Navigate to ${link.label} section`}
									onClick={(e) => handleNavClick(e, link.href, link.id)}
									aria-current={isActive ? "page" : undefined}
									className={`focus-visible:ring-ring rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 select-none focus-visible:ring-2 focus-visible:outline-none ${
										isActive
											? "bg-accent text-foreground shadow-xs"
											: "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
									}`}
								>
									{link.label}
								</a>
							);
						})}
					</nav>

					{/* Theme Switcher Segmented Pill (Desktop) */}
					<ThemeToggle size="sm" className="hidden sm:inline-flex" />

					{/* Quick Theme Cycle Button (Mobile) */}
					<button
						type="button"
						onClick={() => setTheme(isDark ? "light" : "dark")}
						aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
						title={isDark ? "Switch to light theme" : "Switch to dark theme"}
						className="text-muted-foreground hover:text-foreground focus-visible:ring-ring flex size-7 cursor-pointer items-center justify-center rounded-full transition-colors focus-visible:ring-2 focus-visible:outline-none active:scale-95 sm:hidden"
					>
						{isDark ? (
							<SunIcon aria-hidden="true" className="size-3.5" />
						) : (
							<MoonIcon aria-hidden="true" className="size-3.5" />
						)}
					</button>

					{/* Primary Download Pill */}
					<a
						href={APP_INFO.urls.download}
						title={`Download ${APP_INFO.name}`}
						className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold transition-all duration-200 select-none focus-visible:ring-2 focus-visible:outline-none active:scale-[0.97] sm:ml-0.5 sm:px-3.5"
					>
						Download
					</a>
				</div>

				{/* Mobile Dropdown Menu Card (Anchored directly below capsule) */}
				{isMobileMenuOpen && (
					<div
						id="mobile-nav-menu"
						className="border-border bg-card/95 text-card-foreground shadow-modal mt-2 w-56 overflow-hidden rounded-2xl border p-2 backdrop-blur-2xl transition-all sm:hidden"
					>
						<div className="text-muted-foreground px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase">
							Sections
						</div>
						<nav aria-label="Mobile navigation" className="flex flex-col gap-0.5">
							{NAV_LINKS.map((link) => {
								const isActive = activeSection === link.id;
								return (
									<a
										key={link.label}
										href={link.href}
										title={`Navigate to ${link.label} section`}
										onClick={(e) => handleNavClick(e, link.href, link.id)}
										aria-current={isActive ? "page" : undefined}
										className={`focus-visible:ring-ring flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all select-none focus-visible:ring-2 focus-visible:outline-none ${
											isActive
												? "bg-accent text-foreground font-semibold shadow-xs"
												: "text-muted-foreground hover:bg-accent/50 hover:text-foreground font-medium"
										}`}
									>
										<span>{link.label}</span>
										{isActive && <span className="bg-foreground size-1.5 rounded-full shadow-xs" />}
									</a>
								);
							})}
						</nav>

						{/* Theme Switcher in Mobile Drawer */}
						<div className="bg-border my-1.5 h-px w-full" />
						<div className="flex items-center justify-between px-2 pt-1 pb-0.5">
							<span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
								Theme
							</span>
							<ThemeToggle size="sm" />
						</div>
					</div>
				)}
			</header>
		</>
	);
}
