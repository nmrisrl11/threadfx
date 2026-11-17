import { cn } from "@/lib/utils";
import * as React from "react";
import { Switch as SwitchPrimitive } from "radix-ui";

interface SwitchProps extends React.ComponentProps<typeof SwitchPrimitive.Root> {
	thumbClassName?: string;
}

function Switch({ className, thumbClassName, ...props }: SwitchProps) {
	return (
		<SwitchPrimitive.Root
			data-slot="switch"
			className={cn(
				"peer focus-visible:ring-ring focus-visible:ring-offset-background data-[state=checked]:bg-foreground data-[state=unchecked]:bg-input inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"data-[state=checked]:bg-background data-[state=unchecked]:bg-foreground/60 pointer-events-none block size-4 rounded-full shadow-xs ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0",
					thumbClassName,
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
