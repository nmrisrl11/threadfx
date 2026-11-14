import { cva } from "class-variance-authority";

export const badgeVariants = cva(
	"inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
	{
		variants: {
			variant: {
				default: "border-transparent bg-primary text-primary-foreground shadow",
				secondary: "border-transparent bg-secondary text-secondary-foreground",
				outline: "border-border text-foreground",
				cyber: "border-border bg-muted/60 text-[#00F5FF] font-mono text-[10px]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	},
);
