import { memo } from "react";

export const DataHeader = memo(function DataHeader() {
	return (
		<div className="flex items-center justify-between gap-1.5 px-0.5">
			<span className="text-muted-foreground text-xs font-medium">Data & Storage</span>
		</div>
	);
});
