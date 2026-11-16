import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentProps<typeof SliderPrimitive.Root> {
	rangeClassName?: string;
	thumbClassName?: string;
}

function Slider({
	className,
	rangeClassName,
	thumbClassName,
	defaultValue,
	value,
	min = 0,
	max = 1,
	step = 0.05,
	...props
}: SliderProps) {
	return (
		<SliderPrimitive.Root
			data-slot="slider"
			defaultValue={defaultValue}
			value={value}
			min={min}
			max={max}
			step={step}
			className={cn(
				"relative flex w-full cursor-pointer touch-none items-center select-none",
				className,
			)}
			{...props}
		>
			<SliderPrimitive.Track
				data-slot="slider-track"
				className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-white/10"
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className={cn("absolute h-full bg-white", rangeClassName)}
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				className={cn(
					"block size-4 rounded-full border border-white/80 bg-white shadow-md transition-transform focus-visible:outline-none active:scale-110 disabled:pointer-events-none disabled:opacity-50",
					thumbClassName,
				)}
			/>
		</SliderPrimitive.Root>
	);
}

export { Slider };
