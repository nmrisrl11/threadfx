import * as React from "react";
import { Slider as SliderPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Slider({
	className,
	defaultValue,
	value,
	min = 0,
	max = 1,
	step = 0.05,
	...props
}: React.ComponentProps<typeof SliderPrimitive.Root>) {
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
				className="bg-secondary relative h-1.5 w-full grow overflow-hidden rounded-full"
			>
				<SliderPrimitive.Range data-slot="slider-range" className="bg-primary absolute h-full" />
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				className="border-primary/50 focus-visible:ring-ring block size-4 rounded-full border bg-white shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
			/>
		</SliderPrimitive.Root>
	);
}

export { Slider };
