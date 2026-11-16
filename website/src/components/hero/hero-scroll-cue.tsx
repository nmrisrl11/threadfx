export function HeroScrollCue() {
	return (
		<div className="hero-scroll-cue flex shrink-0 flex-col items-center pt-8 pb-4">
			<a
				href="#simulator"
				aria-label="Scroll to interactive simulator"
				className="group flex flex-col items-center gap-2 text-white/50 transition-colors duration-200 select-none hover:text-white/90"
			>
				<span className="font-mono text-[11px] tracking-wider text-zinc-500 uppercase transition-colors group-hover:text-zinc-300">
					Try the Simulator
				</span>
				<div className="flex h-7 w-4.5 items-start justify-center rounded-full border border-white/20 p-1">
					<span className="h-1.5 w-1.5 animate-bounce rounded-full bg-white/60" />
				</div>
			</a>
		</div>
	);
}
