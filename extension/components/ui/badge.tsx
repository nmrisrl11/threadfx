import { type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { badgeVariants } from "./badge-variants";

function Badge({
	className,
	variant,
	...props
}: ComponentProps<"div"> & VariantProps<typeof badgeVariants>) {
	return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge };
