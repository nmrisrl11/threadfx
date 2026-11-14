import type { ComponentProps } from "react";
import { Tabs as TabsPrimitive } from "radix-ui";
import { cn } from "@/lib/utils";

function Tabs({ className, ...props }: ComponentProps<typeof TabsPrimitive.Root>) {
	return (
		<TabsPrimitive.Root
			data-slot="tabs"
			className={cn("flex flex-1 flex-col gap-3", className)}
			{...props}
		/>
	);
}

function TabsList({ className, ...props }: ComponentProps<typeof TabsPrimitive.List>) {
	return (
		<TabsPrimitive.List
			data-slot="tabs-list"
			className={cn(
				"border-border bg-surface-subtle text-muted-foreground grid w-full grid-cols-2 rounded-xl border p-1 transition-colors select-none",
				className,
			)}
			{...props}
		/>
	);
}

function TabsTrigger({ className, ...props }: ComponentProps<typeof TabsPrimitive.Trigger>) {
	return (
		<TabsPrimitive.Trigger
			data-slot="tabs-trigger"
			className={cn(
				"hover:text-foreground data-[state=active]:border-border data-[state=active]:bg-card data-[state=active]:text-foreground inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-150 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:border data-[state=active]:shadow-xs",
				className,
			)}
			{...props}
		/>
	);
}

function TabsContent({ className, ...props }: ComponentProps<typeof TabsPrimitive.Content>) {
	return (
		<TabsPrimitive.Content
			data-slot="tabs-content"
			className={cn("flex-1 outline-none", className)}
			{...props}
		/>
	);
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
