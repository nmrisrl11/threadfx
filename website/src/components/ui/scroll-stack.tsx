import React, { Children, isValidElement, useEffect, useRef } from "react";

export interface ScrollStackProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	itemScale?: number;
	dimAmount?: number;
	blurAmount?: number;
	itemMargin?: number;
	itemStackDistance?: number;
	stackOffset?: number;
	preset?: "focus" | "stack" | "default";
	onActiveIndexChange?: (index: number) => void;
}

export interface ScrollStackItemProps extends React.HTMLAttributes<HTMLDivElement> {
	children: React.ReactNode;
	className?: string;
	style?: React.CSSProperties;
}

export const ScrollStackItem = React.forwardRef<HTMLDivElement, ScrollStackItemProps>(
	function ScrollStackItem({ children, className = "", style, ...props }, ref) {
		return (
			<div
				ref={ref}
				data-scroll-stack-item="true"
				className={`relative w-full ${className}`}
				style={style}
				{...props}
			>
				{children}
			</div>
		);
	},
);

export function ScrollStack({
	children,
	className = "",
	itemScale = 0.06,
	dimAmount = 0.35,
	blurAmount = 3,
	itemMargin = 48,
	itemStackDistance = 14,
	stackOffset = 96,
	onActiveIndexChange,
	...props
}: ScrollStackProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const activeIndexRef = useRef<number>(0);
	const rafIdRef = useRef<number | null>(null);

	const items = Children.toArray(children).filter(isValidElement);

	useEffect(() => {
		const transitionRange = 180; // Distance in pixels over which the card transitions from foreground to stacked

		const updateCardTransforms = () => {
			const itemElements = itemsRef.current.filter(Boolean) as HTMLDivElement[];
			if (itemElements.length === 0) return;

			// Respect reduced motion accessibility setting
			const prefersReduced =
				typeof window !== "undefined" &&
				window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

			if (prefersReduced) {
				for (const el of itemElements) {
					el.style.transform = "none";
					el.style.filter = "none";
				}
				return;
			}

			// 1. Calculate progress for each item
			// progress[i] = 0 when item is below its sticky threshold, 1 when pinned at sticky threshold
			const progress: number[] = new Array(itemElements.length).fill(0);
			let currentActive = 0;

			for (let i = 0; i < itemElements.length; i++) {
				const el = itemElements[i];
				const rect = el.getBoundingClientRect();
				const targetTop = stackOffset + i * itemStackDistance;

				if (rect.top <= targetTop) {
					progress[i] = 1;
					currentActive = i;
				} else if (rect.top < targetTop + transitionRange) {
					progress[i] = (targetTop + transitionRange - rect.top) / transitionRange;
				} else {
					progress[i] = 0;
				}
			}

			// 2. Apply depth-of-field transform and filter directly to DOM nodes (60/120fps hardware accelerated)
			for (let i = 0; i < itemElements.length; i++) {
				const el = itemElements[i];

				// Depth is the accumulated progress of all cards after this one
				let depth = 0;
				for (let j = i + 1; j < itemElements.length; j++) {
					depth += progress[j];
				}

				const scale = Math.max(0.65, 1 - depth * itemScale);
				const brightness = Math.max(0.12, 1 - depth * dimAmount);
				const blur = depth * blurAmount;

				el.style.transform = `scale(${scale.toFixed(4)})`;
				el.style.filter =
					blur > 0.01 || brightness < 0.99
						? `brightness(${brightness.toFixed(3)}) blur(${blur.toFixed(2)}px)`
						: "none";
			}

			// 3. Notify parent of active index change if different
			if (currentActive !== activeIndexRef.current) {
				activeIndexRef.current = currentActive;
				onActiveIndexChange?.(currentActive);
			}
		};

		const handleScroll = () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}
			rafIdRef.current = requestAnimationFrame(() => {
				updateCardTransforms();
				rafIdRef.current = null;
			});
		};

		// Initial calculation
		updateCardTransforms();

		window.addEventListener("scroll", handleScroll, { passive: true });
		window.addEventListener("resize", handleScroll, { passive: true });

		return () => {
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}
			window.removeEventListener("scroll", handleScroll);
			window.removeEventListener("resize", handleScroll);
		};
	}, [
		itemScale,
		dimAmount,
		blurAmount,
		itemStackDistance,
		stackOffset,
		items.length,
		onActiveIndexChange,
	]);

	return (
		<div
			ref={containerRef}
			className={`relative flex w-full flex-col items-center ${className}`}
			{...props}
		>
			{items.map((child, index) => {
				const targetTop = stackOffset + index * itemStackDistance;
				const isLast = index === items.length - 1;

				return (
					<div
						key={index}
						ref={(node) => {
							itemsRef.current[index] = node;
						}}
						data-scroll-stack-card={index}
						className="relative w-full will-change-transform"
						style={{
							position: "sticky",
							top: `${targetTop}px`,
							zIndex: index + 10,
							marginBottom: isLast ? "0px" : `${itemMargin}px`,
							transformOrigin: "top center",
							transition: "transform 0.1s ease-out, filter 0.1s ease-out",
						}}
					>
						{child}
					</div>
				);
			})}
		</div>
	);
}

export default ScrollStack;
