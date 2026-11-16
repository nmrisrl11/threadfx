import { APP_INFO } from "@data/app";
import { ChevronDownIcon } from "lucide-react";
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

	// Auto-close mobile menu on scroll
	useEffect(() => {
		if (!isMobileMenuOpen) return;
		const closeOnScroll = () => setIsMobileMenuOpen(false);
		window.addEventListener("scroll", closeOnScroll, { passive: true, once: true });
		return () => window.removeEventListener("scroll", closeOnScroll);
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
				<div className="flex items-center gap-1.5 rounded-full border border-white/10 bg-neutral-950/80 p-1.5 pl-3.5 shadow-[0_4px_24px_rgba(0,0,0,0.35)] backdrop-blur-xl sm:gap-2 sm:pl-5">
					{/* App Name Only (Points to domain root with smooth scroll) */}
					<a
						href="/"
						onClick={(e) => {
							e.preventDefault();
							window.scrollTo({ top: 0, behavior: "smooth" });
							setActiveSection("");
							setIsMobileMenuOpen(false);
							if (window.location.hash) {
								window.history.replaceState(null, "", "/");
							}
						}}
						className="text-xs font-extrabold tracking-tight text-white transition-opacity select-none hover:opacity-85 sm:text-sm"
					>
						{APP_INFO.name}
					</a>

					{/* Subtle Vertical Divider / Cutter (Shared across Mobile and Desktop) */}
					<div className="h-3.5 w-px bg-white/10 sm:mx-0.5" />

					{/* Mobile Active Section Breadcrumb Dropdown Trigger (Option 2 - Zero Shift Grid Stacker) */}
					<button
						type="button"
						onClick={() => setIsMobileMenuOpen((prev) => !prev)}
						aria-expanded={isMobileMenuOpen}
						aria-label="Toggle navigation sections"
						className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors duration-150 select-none active:scale-[0.96] sm:hidden ${
							isMobileMenuOpen
								? "bg-white/16 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]"
								: "bg-white/8 text-zinc-300 hover:bg-white/12 hover:text-white"
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
							className={`size-3 shrink-0 text-zinc-400 transition-transform duration-200 ${
								isMobileMenuOpen ? "rotate-180 text-white" : ""
							}`}
						/>
					</button>

					{/* Desktop Navigation Links with Scroll Spy Active Indicator */}
					<nav className="hidden items-center gap-0.5 sm:flex">
						{NAV_LINKS.map((link) => {
							const isActive = activeSection === link.id;
							return (
								<a
									key={link.label}
									href={link.href}
									onClick={(e) => handleNavClick(e, link.href, link.id)}
									aria-current={isActive ? "page" : undefined}
									className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 select-none ${
										isActive
											? "bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
											: "text-zinc-400 hover:bg-white/6 hover:text-white"
									}`}
								>
									{link.label}
								</a>
							);
						})}
					</nav>

					{/* Primary Download Pill */}
					<a
						href={APP_INFO.urls.download}
						title={`Download ${APP_INFO.name}`}
						className="inline-flex items-center rounded-full bg-white px-3 py-1 text-xs font-semibold text-neutral-900 transition-all duration-200 select-none hover:bg-zinc-200 active:scale-[0.97] sm:ml-1 sm:px-3.5"
					>
						Download
					</a>
				</div>

				{/* Mobile Dropdown Menu Card (Anchored directly below capsule) */}
				{isMobileMenuOpen && (
					<div className="mt-2 w-52 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/95 p-1.5 shadow-[0_12px_36px_rgba(0,0,0,0.65)] backdrop-blur-2xl transition-all sm:hidden">
						<div className="px-2.5 py-1 text-[10px] font-semibold tracking-wider text-zinc-400 uppercase">
							Sections
						</div>
						<nav className="flex flex-col gap-0.5">
							{NAV_LINKS.map((link) => {
								const isActive = activeSection === link.id;
								return (
									<a
										key={link.label}
										href={link.href}
										onClick={(e) => handleNavClick(e, link.href, link.id)}
										aria-current={isActive ? "page" : undefined}
										className={`flex items-center justify-between rounded-xl px-2.5 py-2 text-xs transition-all select-none ${
											isActive
												? "bg-white/14 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.15)]"
												: "font-medium text-zinc-400 hover:bg-white/6 hover:text-white"
										}`}
									>
										<span>{link.label}</span>
										{isActive && (
											<span className="size-1.5 rounded-full bg-white shadow-[0_0_8px_white]" />
										)}
									</a>
								);
							})}
						</nav>
					</div>
				)}
			</header>
		</>
	);
}
