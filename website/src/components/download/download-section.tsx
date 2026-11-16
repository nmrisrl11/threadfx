import { APP_INFO } from "@data/app";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect, useMemo, useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

const TITLE_TEXT = "Ready to feel every reaction?";
const DESC_TEXT =
	"Download the free extension and turn silent scrolling into a rich, tactile experience in seconds.";

export function DownloadSection() {
	const trackRef = useRef<HTMLElement | null>(null);
	const titleRef = useRef<HTMLHeadingElement | null>(null);
	const descRef = useRef<HTMLParagraphElement | null>(null);
	const ctaRef = useRef<HTMLDivElement | null>(null);

	// Split title into word blocks with character spans for fluid text wrapping
	const titleElements = useMemo(() => {
		const words = TITLE_TEXT.split(" ");
		return words.map((word, wordIdx) => (
			<span key={wordIdx} className="mr-[0.28em] inline-block last:mr-0">
				{word.split("").map((char, charIdx) => (
					<span
						key={charIdx}
						className="download-title-char inline-block will-change-[transform,opacity,filter]"
					>
						{char}
					</span>
				))}
			</span>
		));
	}, []);

	// Split description into word spans for fluid text wrapping
	const descElements = useMemo(() => {
		const words = DESC_TEXT.split(" ");
		return words.map((word, idx) => (
			<span
				key={idx}
				className="download-desc-word mr-[0.28em] inline-block will-change-[transform,opacity,filter] last:mr-0"
			>
				{word}
			</span>
		));
	}, []);

	useIsomorphicLayoutEffect(() => {
		const track = trackRef.current;
		const title = titleRef.current;
		const desc = descRef.current;
		const cta = ctaRef.current;
		if (!track || !title || !desc || !cta) return;

		// Respect reduced motion accessibility setting
		const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		if (prefersReducedMotion) return;

		const titleChars = title.querySelectorAll(".download-title-char");
		const descWords = desc.querySelectorAll(".download-desc-word");

		const ctx = gsap.context(() => {
			// Stage 1: Initial resting states (restrained offsets, soft blur, zero snap)
			gsap.set(titleChars, {
				opacity: 0,
				yPercent: 40,
				scale: 0.95,
				filter: "blur(6px)",
				willChange: "transform, opacity, filter",
			});

			gsap.set(descWords, {
				opacity: 0,
				yPercent: 35,
				scale: 0.96,
				filter: "blur(5px)",
				willChange: "transform, opacity, filter",
			});

			gsap.set(cta, {
				opacity: 0,
				y: 20,
				scale: 0.96,
				filter: "blur(4px)",
				willChange: "transform, opacity, filter",
			});

			// Beat 1: Title floats and blurs in smoothly as the section locks into view
			gsap.to(titleChars, {
				opacity: 1,
				yPercent: 0,
				scale: 1,
				filter: "blur(0px)",
				stagger: 0.02,
				duration: 0.75,
				ease: "power3.out",
				overwrite: "auto",
				scrollTrigger: {
					trigger: track,
					start: "top top",
					toggleActions: "play none none reverse",
					fastScrollEnd: true,
				},
			});

			// Beat 2: Description floats in after user has scrolled with room (~28% down track)
			gsap.to(descWords, {
				opacity: 1,
				yPercent: 0,
				scale: 1,
				filter: "blur(0px)",
				stagger: 0.02,
				duration: 0.7,
				ease: "power3.out",
				overwrite: "auto",
				scrollTrigger: {
					trigger: track,
					start: "top -28%",
					toggleActions: "play none none reverse",
					fastScrollEnd: true,
				},
			});

			// Beat 3: CTA button floats in last (~58% down track) to complete the invitation
			gsap.to(cta, {
				opacity: 1,
				y: 0,
				scale: 1,
				filter: "blur(0px)",
				duration: 0.65,
				ease: "power3.out",
				overwrite: "auto",
				scrollTrigger: {
					trigger: track,
					start: "top -58%",
					toggleActions: "play none none reverse",
					fastScrollEnd: true,
				},
			});
		}, track);

		return () => {
			ctx.revert();
		};
	}, []);

	return (
		<section
			id="download"
			ref={trackRef}
			className="section-scroll-fade relative h-[200vh] w-full sm:h-[220vh]"
		>
			{/* Sticky Centered Presentation Stage */}
			<div className="sticky top-0 flex min-h-dvh w-full flex-col items-center justify-center overflow-hidden px-4 py-12 text-center sm:px-6">
				<div className="mx-auto flex w-full max-w-4xl flex-col items-center">
					{/* Beat 1: Title */}
					<h2
						ref={titleRef}
						className="max-w-4xl text-4xl leading-[1.18] font-extrabold tracking-tight text-white sm:text-6xl sm:leading-[1.14] lg:text-7xl"
					>
						{titleElements}
					</h2>

					{/* Beat 2: Description (Harmonious balanced spacing: 24px mobile, 28px desktop) */}
					<p
						ref={descRef}
						className="mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:mt-7 sm:text-lg lg:text-xl"
					>
						{descElements}
					</p>

					{/* Beat 3: Single Primary CTA Button (Inviting breathing room: 32px mobile, 36px desktop) */}
					<div ref={ctaRef} className="mt-8 flex items-center justify-center sm:mt-9">
						<a
							href={APP_INFO.urls.download}
							title={`Download ${APP_INFO.name} Extension (.zip)`}
							className="inline-block cursor-pointer rounded-full border border-white/60 bg-gradient-to-b from-white via-[#fafafa] to-[#e8e8e8] px-10 py-4 text-[16px] font-semibold text-neutral-900 shadow-[0_12px_32px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,1)] transition-all duration-200 ease-out select-none hover:from-white hover:to-[#f2f2f2] hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] active:scale-[0.98] sm:px-11 sm:py-4.5 sm:text-[17px]"
						>
							Download {APP_INFO.name}
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}
