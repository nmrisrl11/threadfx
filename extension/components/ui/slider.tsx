import type { ComponentProps } from "react";
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
}: ComponentProps<typeof SliderPrimitive.Root>) {
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
				className="bg-input relative h-1.5 w-full grow overflow-hidden rounded-full"
			>
				<SliderPrimitive.Range
					data-slot="slider-range"
					className="bg-foreground absolute h-full rounded-full"
				/>
			</SliderPrimitive.Track>
			<SliderPrimitive.Thumb
				data-slot="slider-thumb"
				className="bg-foreground border-border focus-visible:ring-ring block size-3.5 rounded-full border shadow-xs transition-transform hover:scale-110 focus-visible:ring-2 focus-visible:outline-none active:scale-95 disabled:pointer-events-none disabled:opacity-50"
			/>
		</SliderPrimitive.Root>
	);
}

export { Slider };
