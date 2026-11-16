import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useLayoutEffect, useRef } from "react";

if (typeof window !== "undefined") {
	gsap.registerPlugin(ScrollTrigger);
}

const useIsomorphicLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	container?: HTMLElement | string | null;
	distance?: number;
	direction?: "vertical" | "horizontal";
	reverse?: boolean;
	duration?: number;
	ease?: string;
	initialOpacity?: number;
	animateOpacity?: boolean;
	scale?: number;
	blur?: number;
	rotate?: number;
	tilt?: number;
	threshold?: number;
	delay?: number;
	stagger?: number;
	staggerFrom?: "start" | "end" | "center" | "random" | number;
	trigger?: "scroll" | "mount";
	once?: boolean;
	scrub?: boolean | number;
	className?: string;
	style?: React.CSSProperties;
	onStart?: () => void;
	onComplete?: () => void;
}

export function AnimatedContent({
	children,
	container,
	distance = 0,
	direction = "vertical",
	reverse = false,
	duration = 0.9,
	ease = "bounce.out",
	initialOpacity = 0,
	animateOpacity = true,
	scale = 0.85,
	blur = 6,
	rotate = 0,
	tilt = 0,
	threshold = 0.15,
	delay = 0,
	stagger = 0,
	staggerFrom = "start",
	trigger = "scroll",
	once = true,
	scrub = false,
	className = "",
	style,
	onStart,
	onComplete,
	...props
}: AnimatedContentProps) {
	const ref = useRef<HTMLDivElement>(null);
	const callbacksRef = useRef({ onStart, onComplete });

	useEffect(() => {
		callbacksRef.current = { onStart, onComplete };
	}, [onStart, onComplete]);

	useIsomorphicLayoutEffect(() => {
		const el = ref.current;
		if (!el) return undefined;

		let scroller: HTMLElement | Window | null = null;
		if (typeof container === "string") {
			scroller = document.querySelector<HTMLElement>(container);
		} else if (container) {
			scroller = container;
		}

		const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;

		const ctx = gsap.context(() => {
			const targets = stagger > 0 && el.children.length ? Array.from(el.children) : [el];
			const horizontal = direction === "horizontal";
			const axis = horizontal ? "x" : "y";
			const sign = reverse ? -1 : 1;

			gsap.set(el, { visibility: "visible" });

			if (reduce) {
				callbacksRef.current.onComplete?.();
				return;
			}

			const from: gsap.TweenVars = {
				[axis]: distance * sign,
				scale,
				opacity: animateOpacity ? initialOpacity : 1,
			};
			const to: gsap.TweenVars = {
				[axis]: 0,
				scale: 1,
				opacity: 1,
				duration,
				ease,
			};

			if (blur > 0) {
				from.filter = `blur(${blur}px)`;
				to.filter = "blur(0px)";
			}
			if (rotate) {
				from.rotation = rotate * sign;
				to.rotation = 0;
			}
			if (tilt) {
				const tiltAxis = horizontal ? "rotationY" : "rotationX";
				from[tiltAxis] = horizontal ? -tilt * sign : tilt * sign;
				to[tiltAxis] = 0;
				from.transformPerspective = 900;
				to.transformPerspective = 900;
			}
			if (stagger > 0) {
				to.stagger = { each: stagger, from: staggerFrom };
			}

			const settle = () => {
				if (scrub) return;
				gsap.set(targets, { clearProps: "filter,transform" });
			};

			const tl = gsap.timeline({
				paused: true,
				onStart: () => callbacksRef.current.onStart?.(),
				onComplete: () => {
					callbacksRef.current.onComplete?.();
					settle();
				},
			});
			tl.fromTo(targets, from, to, scrub ? 0 : Math.max(delay, 0));

			if (trigger === "mount") {
				tl.play();
				return;
			}

			const start = `top ${(1 - threshold) * 100}%`;

			if (scrub) {
				ScrollTrigger.create({
					trigger: el,
					scroller: scroller || undefined,
					start,
					end: `top ${Math.max((1 - threshold) * 100 - 45, 5)}%`,
					scrub: scrub === true ? true : Math.max(Number(scrub) || 0, 0.01),
					animation: tl,
				});
				return;
			}

			ScrollTrigger.create({
				trigger: el,
				scroller: scroller || undefined,
				start,
				once,
				onEnter: () => tl.play(),
				onLeaveBack: once ? undefined : () => tl.reverse(),
			});
		}, el);

		return () => ctx.revert();
	}, [
		container,
		distance,
		direction,
		reverse,
		duration,
		ease,
		initialOpacity,
		animateOpacity,
		scale,
		blur,
		rotate,
		tilt,
		threshold,
		delay,
		stagger,
		staggerFrom,
		trigger,
		once,
		scrub,
	]);

	return (
		<div ref={ref} className={className} style={{ visibility: "hidden", ...style }} {...props}>
			{children}
		</div>
	);
}

export default AnimatedContent;
