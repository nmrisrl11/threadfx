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
				"peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors outline-none focus-visible:ring-2 focus-visible:ring-white/40 disabled:cursor-not-allowed disabled:opacity-50",
				"data-[state=checked]:bg-white data-[state=unchecked]:bg-white/10",
				className,
			)}
			{...props}
		>
			<SwitchPrimitive.Thumb
				data-slot="switch-thumb"
				className={cn(
					"pointer-events-none block size-4 rounded-full shadow-xs ring-0 transition-all",
					"data-[state=checked]:translate-x-4 data-[state=checked]:bg-neutral-950",
					"data-[state=unchecked]:translate-x-0 data-[state=unchecked]:bg-zinc-400",
					thumbClassName,
				)}
			/>
		</SwitchPrimitive.Root>
	);
}

export { Switch };
