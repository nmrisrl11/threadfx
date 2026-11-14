import { cva } from "class-variance-authority";

export const buttonVariants = cva(
	"inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
	{
		variants: {
			variant: {
				default: "bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/20",
				outline: "border-border bg-transparent hover:bg-muted text-foreground",
				secondary: "bg-secondary text-secondary-foreground hover:bg-accent",
				ghost: "hover:bg-muted hover:text-foreground",
				destructive: "bg-destructive/10 text-destructive hover:bg-destructive/20",
				gradient:
					"bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] text-white hover:opacity-95 shadow-lg shadow-[#FF2E93]/20",
			},
			size: {
				default: "h-9 px-4 py-2 gap-2",
				sm: "h-8 rounded-md px-3 text-xs gap-1.5",
				lg: "h-11 rounded-full px-8 text-base gap-2.5",
				icon: "size-9",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);
