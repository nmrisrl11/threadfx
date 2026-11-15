import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { APP_INFO } from "@data/app";
import type { BurstMode, ConfettiPaletteId } from "@data/particles";
import {
	CONFETTI_PALETTES,
	CONFETTI_PALETTE_LIST,
	DEFAULT_BURST_MODE,
	DEFAULT_CONFETTI_PALETTE,
	DEFAULT_EMOJI,
	QUICK_EMOJIS,
} from "@data/particles";
import type { SoundPack, SoundPackId } from "@data/presets";
import { INTERACTION_SOUNDS, SOUND_PACKS, SOUND_PACK_LIST, applyPitch } from "@data/presets";
import { zzfx } from "@data/zzfx";
import confetti from "canvas-confetti";
import {
	ActivityIcon,
	ArrowRightIcon,
	CheckIcon,
	DownloadIcon,
	ExternalLinkIcon,
	HeartIcon,
	LaptopIcon,
	LayersIcon,
	MessageCircleIcon,
	RepeatIcon,
	Share2Icon,
	SlidersIcon,
	SparklesIcon,
	Volume2Icon,
	ZapIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export default function App() {
	const [selectedPack, setSelectedPack] = useState<SoundPackId>("bubble");
	const [volume, setVolume] = useState<number>(0.5);
	const [pitch, setPitch] = useState<number>(1.0);
	const [isLiked, setIsLiked] = useState<boolean>(false);
	const [likeCount, setLikeCount] = useState<number>(24);
	const [repostCount, setRepostCount] = useState<number>(4);
	const [confettiActive, setConfettiActive] = useState<boolean>(true);
	const [burstMode, setBurstMode] = useState<BurstMode>(DEFAULT_BURST_MODE);
	const [selectedPalette, setSelectedPalette] =
		useState<ConfettiPaletteId>(DEFAULT_CONFETTI_PALETTE);
	const [selectedEmoji, setSelectedEmoji] = useState<string>(DEFAULT_EMOJI);

	// Keyboard hotkeys 1 through 8 to audition sound packs
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			const target = e.target as HTMLElement | null;
			if (
				target instanceof HTMLInputElement ||
				target instanceof HTMLTextAreaElement ||
				target?.isContentEditable
			) {
				return;
			}

			const num = parseInt(e.key, 10);
			if (num >= 1 && num <= 8) {
				const targetPack = SOUND_PACK_LIST[num - 1];
				if (targetPack) {
					e.preventDefault();
					setSelectedPack(targetPack.id);
					const pitched = applyPitch(targetPack.params, pitch);
					zzfx(volume, ...pitched);
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [volume, pitch]);

	const handleSimulatedLike = (e: React.MouseEvent<HTMLButtonElement>) => {
		const nextState = !isLiked;
		setIsLiked(nextState);
		setLikeCount((prev) => (nextState ? prev + 1 : prev - 1));

		if (nextState) {
			// 1. Play procedural ZzFX audio with pitch
			const pack = SOUND_PACKS[selectedPack] || SOUND_PACKS.bubble;
			const pitched = applyPitch(pack.params, pitch, 0.03);
			zzfx(volume, ...pitched);

			// 2. Trigger Confetti / Emoji
			if (confettiActive) {
				const rect = e.currentTarget.getBoundingClientRect();
				const x = (rect.left + rect.width / 2) / window.innerWidth;
				const y = (rect.top + rect.height / 2) / window.innerHeight;

				if (burstMode === "emoji" && selectedEmoji) {
					const emojiShape = confetti.shapeFromText({
						text: selectedEmoji,
						scalar: 1.8,
					});
					confetti({
						particleCount: 30,
						spread: 55,
						startVelocity: 25,
						ticks: 120,
						shapes: [emojiShape],
						scalar: 1.8,
						flat: true,
						origin: { x, y },
						disableForReducedMotion: false,
					});
				} else {
					const palette = CONFETTI_PALETTES[selectedPalette] || CONFETTI_PALETTES.rose;
					confetti({
						particleCount: 35,
						spread: 60,
						startVelocity: 25,
						ticks: 120,
						origin: { x, y },
						colors: palette.colors,
						disableForReducedMotion: false,
					});
				}
			}
		} else {
			// Retraction: gentle descending tone, zero particles
			const pitched = applyPitch([...INTERACTION_SOUNDS.unlike], pitch);
			zzfx(volume, ...pitched);
		}
	};

	const handleSimulatedRepost = (e: React.MouseEvent<HTMLButtonElement>) => {
		setRepostCount((prev) => prev + 1);
		const pitched = applyPitch([...INTERACTION_SOUNDS.repost], pitch);
		zzfx(volume, ...pitched);

		if (confettiActive) {
			const rect = e.currentTarget.getBoundingClientRect();
			const x = (rect.left + rect.width / 2) / window.innerWidth;
			const y = (rect.top + rect.height / 2) / window.innerHeight;
			confetti({
				particleCount: 20,
				spread: 45,
				startVelocity: 20,
				ticks: 90,
				origin: { x, y },
				colors: ["#10B981", "#34D399", "#00F5FF", "#FFFFFF"],
				disableForReducedMotion: false,
			});
		}
	};

	const testSound = (pack: SoundPack) => {
		setSelectedPack(pack.id);
		const pitched = applyPitch(pack.params, pitch);
		zzfx(volume, ...pitched);
	};

	return (
		<div className="bg-background text-foreground min-h-screen selection:bg-[#FF2E93] selection:text-white">
			{/* Background ambient glow */}
			<div className="pointer-events-none fixed top-0 left-1/2 -z-10 h-[350px] w-[800px] -translate-x-1/2 bg-gradient-to-b from-[#7928CA]/15 via-[#FF2E93]/10 to-transparent blur-3xl" />

			{/* Navigation */}
			<nav className="border-border/50 mx-auto flex h-20 max-w-6xl items-center justify-between border-b px-6">
				<div className="flex items-center gap-3">
					<img
						src="/icons/128.png"
						alt={APP_INFO.name}
						width="36"
						height="36"
						className="h-9 w-9 rounded-xl object-contain shadow-lg shadow-[#FF2E93]/20 select-none"
						loading="eager"
						decoding="async"
					/>
					<div>
						<span className="bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-lg font-bold tracking-tight text-transparent">
							{APP_INFO.name}
						</span>
						<Badge variant="cyber" className="ml-2 hidden sm:inline-flex">
							{APP_INFO.versionTag}
						</Badge>
					</div>
				</div>

				<div className="flex items-center gap-4">
					<a
						href={APP_INFO.author.url}
						target="_blank"
						rel="noreferrer"
						className="text-muted-foreground hover:text-foreground hidden items-center gap-1.5 text-xs transition-colors sm:flex"
					>
						<span>{APP_INFO.author.handle}</span>
						<ExternalLinkIcon className="h-3 w-3" />
					</a>

					<Button asChild size="sm" variant="gradient">
						<a href={APP_INFO.urls.download}>
							<DownloadIcon className="h-4 w-4" />
							<span>Download .zip</span>
						</a>
					</Button>
				</div>
			</nav>

			{/* Hero Section */}
			<main className="mx-auto max-w-6xl px-6 pt-16 pb-24">
				<div className="mx-auto max-w-3xl space-y-6 text-center">
					{/* 3D Master Hero Icon */}
					<div className="relative mx-auto flex h-24 w-24 items-center justify-center">
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-[#FF2E93]/25 via-[#7928CA]/30 to-[#00F5FF]/25 blur-xl" />
						<img
							src="/icons/512.webp"
							alt={`${APP_INFO.name} 3D Brand Emblem`}
							width="96"
							height="96"
							className="relative h-24 w-24 -rotate-3 rounded-2xl shadow-2xl transition-transform duration-300 select-none hover:scale-105 hover:rotate-0"
							draggable={false}
							loading="eager"
							decoding="async"
						/>
					</div>

					<div className="border-border bg-card text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs">
						<span className="h-2 w-2 animate-pulse rounded-full bg-[#00F5FF]" />
						<span>Procedural Audio • Particle Dynamics • Tactile Feedback</span>
					</div>

					<h1 className="text-4xl leading-tight font-extrabold tracking-tight sm:text-6xl">
						Turn silent scrolling <br className="hidden sm:inline" />
						<span className="bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-transparent">
							into a tactile experience.
						</span>
					</h1>

					<p className="text-muted-foreground mx-auto max-w-2xl text-base leading-relaxed sm:text-lg">
						Modern social feeds are designed for continuous engagement, yet every interaction
						remains flat and silent. ThreadFX electrifies your feeds with zero-latency procedural
						sound effects, physics-driven particle bursts, and responsive micro-motion — starting
						with Threads.
					</p>

					<div className="inline-flex items-center gap-2 pt-1 font-mono text-xs text-zinc-400">
						<span className="inline-block h-1.5 w-1.5 rounded-full bg-[#FF2E93]" />
						<span>Flagship Launch Platform: Threads</span>
						<span className="text-zinc-600">•</span>
						<span className="text-zinc-500">Multi-Platform Engine</span>
					</div>

					<div className="flex flex-col items-center justify-center gap-4 pt-4 sm:flex-row">
						<Button asChild size="lg" variant="gradient">
							<a href="/download">
								<DownloadIcon className="h-4 w-4" />
								<span>Download ThreadFX (Free Unpacked)</span>
							</a>
						</Button>

						<Button asChild size="lg" variant="outline">
							<a href="#install-guide">
								<span>Install Guide</span>
								<ArrowRightIcon className="h-4 w-4" />
							</a>
						</Button>
					</div>
				</div>

				{/* Interactive Soundboard & Simulator */}
				<div className="mx-auto mt-20 max-w-4xl">
					<div className="mb-8 text-center">
						<h2 className="text-2xl font-bold tracking-tight">Interactive Like Simulator</h2>
						<p className="text-muted-foreground mt-1 text-sm">
							Select a procedural sound pack and particle palette, or hit keys 1–8 to audition!
						</p>
					</div>

					<Card className="grid grid-cols-1 gap-6 p-6 shadow-2xl sm:p-8 md:grid-cols-12">
						{/* Control Column */}
						<div className="md:border-border space-y-5 md:col-span-6 md:border-r md:pr-6">
							{/* 1. Choose Sound Pack */}
							<div>
								<div className="mb-2.5 flex items-center justify-between">
									<span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
										1. Choose Sound Profile
									</span>
									<span className="text-muted-foreground/60 font-mono text-[10px]">
										Hotkeys [1-8]
									</span>
								</div>
								<div className="grid grid-cols-2 gap-2">
									{SOUND_PACK_LIST.map((pack, index) => {
										const isSelected = selectedPack === pack.id;
										return (
											<button
												key={pack.id}
												onClick={() => testSound(pack)}
												className={`cursor-pointer rounded-xl border p-2.5 text-left transition-colors duration-150 ${
													isSelected
														? "border-[#FF2E93] bg-[#181818] shadow-md shadow-[#FF2E93]/15"
														: "border-border bg-[#0E0E0E] hover:border-[#383838]"
												}`}
											>
												<div className="mb-1 flex items-center justify-between">
													<div className="flex items-center gap-1.5">
														<span className="text-muted-foreground/60 font-mono text-[10px]">
															{pack.frequency}Hz
														</span>
														<kbd className="border-border/60 text-muted-foreground/50 rounded border px-1 py-0.5 font-mono text-[9px] leading-none">
															{index + 1}
														</kbd>
													</div>
													{isSelected && <CheckIcon className="h-3.5 w-3.5 text-[#FF2E93]" />}
												</div>
												<div className="text-foreground text-xs font-bold">{pack.name}</div>
											</button>
										);
									})}
								</div>
							</div>

							{/* Dual Channel Dynamics: Volume & Pitch Sliders */}
							<div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
								{/* Volume Slider */}
								<div className="border-border space-y-2 rounded-xl border bg-[#0E0E0E] p-3">
									<div className="flex items-center justify-between text-xs">
										<div className="text-muted-foreground flex items-center gap-1.5">
											<Volume2Icon className="h-3.5 w-3.5 text-[#FF2E93]" />
											<span>Volume</span>
										</div>
										<span className="text-foreground font-mono text-[11px]">
											{Math.round(volume * 100)}%
										</span>
									</div>
									<Slider
										value={[volume]}
										min={0}
										max={1}
										step={0.05}
										onValueChange={(vals: number[]) => setVolume(vals[0])}
										className="w-full"
									/>
								</div>

								{/* Pitch Slider */}
								<div className="border-border space-y-2 rounded-xl border bg-[#0E0E0E] p-3">
									<div className="flex items-center justify-between text-xs">
										<div className="text-muted-foreground flex items-center gap-1.5">
											<SlidersIcon className="h-3.5 w-3.5 text-[#00F5FF]" />
											<span>Pitch</span>
										</div>
										<span className="text-foreground font-mono text-[11px]">
											{pitch.toFixed(2)}x
										</span>
									</div>
									<Slider
										value={[pitch]}
										min={0.5}
										max={2.0}
										step={0.05}
										onValueChange={(vals: number[]) => setPitch(vals[0])}
										className="w-full"
									/>
								</div>
							</div>

							{/* Visual Effects & Particle Dynamics */}
							<div className="border-border space-y-3 rounded-xl border bg-[#0E0E0E] p-3.5">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2">
										<SparklesIcon className="h-4 w-4 text-[#00F5FF]" />
										<span className="text-xs font-semibold">Particle Bursts</span>
									</div>
									<Switch checked={confettiActive} onCheckedChange={setConfettiActive} />
								</div>

								{confettiActive && (
									<div className="space-y-3 pt-1">
										{/* Segmented Mode Selector */}
										<div className="border-border/60 bg-muted/40 grid grid-cols-2 rounded-lg border p-0.5 text-xs">
											<button
												type="button"
												onClick={() => setBurstMode("palette")}
												className={`cursor-pointer rounded-md py-1 text-center font-medium transition-colors ${
													burstMode === "palette"
														? "bg-card text-foreground shadow-xs"
														: "text-muted-foreground hover:text-foreground"
												}`}
											>
												Color Palettes
											</button>
											<button
												type="button"
												onClick={() => setBurstMode("emoji")}
												className={`cursor-pointer rounded-md py-1 text-center font-medium transition-colors ${
													burstMode === "emoji"
														? "bg-card text-foreground shadow-xs"
														: "text-muted-foreground hover:text-foreground"
												}`}
											>
												Emoji Reactions
											</button>
										</div>

										{burstMode === "palette" ? (
											<div className="grid grid-cols-3 gap-1.5">
												{CONFETTI_PALETTE_LIST.map((p) => {
													const isSelected = selectedPalette === p.id;
													return (
														<button
															key={p.id}
															type="button"
															onClick={() => setSelectedPalette(p.id)}
															className={`cursor-pointer rounded-lg border p-1.5 text-left transition-colors ${
																isSelected
																	? "border-[#00F5FF] bg-[#181818]"
																	: "border-border/60 bg-background/50 hover:border-border"
															}`}
														>
															<div className="mb-1 flex gap-1">
																{p.colors.slice(0, 3).map((c, i) => (
																	<span
																		key={i}
																		className="h-2 w-2 rounded-full border border-black/20"
																		style={{ backgroundColor: c }}
																	/>
																))}
															</div>
															<span className="text-foreground block truncate text-[10px] font-medium">
																{p.name}
															</span>
														</button>
													);
												})}
											</div>
										) : (
											<div className="grid grid-cols-4 gap-1.5">
												{QUICK_EMOJIS.map((emoji) => {
													const isSelected = selectedEmoji === emoji;
													return (
														<button
															key={emoji}
															type="button"
															onClick={() => setSelectedEmoji(emoji)}
															className={`flex h-8 cursor-pointer items-center justify-center rounded-lg border text-base transition-colors ${
																isSelected
																	? "border-[#FF2E93] bg-[#181818]"
																	: "border-border/60 bg-background/50 hover:border-border"
															}`}
														>
															{emoji}
														</button>
													);
												})}
											</div>
										)}
									</div>
								)}
							</div>
						</div>

						{/* Simulated Threads Post Column */}
						<div className="flex flex-col justify-center md:col-span-6">
							<span className="text-muted-foreground mb-3 block text-xs font-semibold tracking-wider uppercase">
								2. Tap Post Reactions to Test Live
							</span>

							<div className="bg-canvas border-border space-y-4 rounded-2xl border p-5 sm:p-6">
								<div className="flex items-center gap-3">
									<div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#383838] to-[#262626] text-sm font-bold">
										N
									</div>
									<div>
										<div className="flex items-center gap-1.5">
											<span className="text-sm font-bold">nmrisrl</span>
											<span className="text-muted-foreground text-xs">• 2h</span>
										</div>
										<span className="text-muted-foreground text-xs">Creator of ThreadFX</span>
									</div>
								</div>

								<p className="text-sm leading-relaxed text-[#EDEDED]">
									Testing tactile social interactions! Liking or reposting this thread triggers
									zero-latency procedural sound synthesis, custom particle dynamics, and responsive
									micro-motion. Try tapping the heart or repost below!
								</p>

								{/* Simulated Action Bar */}
								<div className="border-border flex items-center gap-6 border-t pt-2">
									{/* Like Heart Button */}
									<button
										type="button"
										onClick={handleSimulatedLike}
										className="group flex cursor-pointer items-center gap-2 transition-transform active:scale-110"
										aria-label={isLiked ? "Unlike" : "Like"}
									>
										<HeartIcon
											className={`h-5 w-5 transition-all ${
												isLiked
													? "scale-110 fill-[#FF2E93] text-[#FF2E93] drop-shadow-[0_0_12px_#FF2E93]"
													: "text-muted-foreground group-hover:text-foreground"
											}`}
										/>
										<span
											className={`font-mono text-xs font-medium ${
												isLiked ? "text-[#FF2E93]" : "text-muted-foreground"
											}`}
										>
											{likeCount}
										</span>
									</button>

									{/* Reply Button */}
									<div className="text-muted-foreground flex items-center gap-1.5 text-xs">
										<MessageCircleIcon className="h-4 w-4" />
										<span className="font-mono">18</span>
									</div>

									{/* Repost Button */}
									<button
										type="button"
										onClick={handleSimulatedRepost}
										className="group text-muted-foreground hover:text-foreground flex cursor-pointer items-center gap-1.5 text-xs transition-colors"
										aria-label="Repost"
									>
										<RepeatIcon className="h-4 w-4 transition-transform group-hover:rotate-45" />
										<span className="font-mono">{repostCount}</span>
									</button>

									{/* Share Button */}
									<div className="text-muted-foreground flex items-center gap-1.5 text-xs">
										<Share2Icon className="h-4 w-4" />
										<span className="font-mono">12</span>
									</div>
								</div>
							</div>
						</div>
					</Card>
				</div>

				{/* Feature Suite */}
				<div className="mt-28 space-y-8">
					<div className="mx-auto max-w-2xl text-center">
						<h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
							Engineered for Tactile Delight
						</h2>
						<p className="text-muted-foreground mt-2 text-sm leading-relaxed">
							Every micro-interaction is handcrafted with zero bloat, native web standards, and
							obsessive attention to physical sensory feel.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
						<Card className="space-y-3 p-6 transition-colors hover:border-[#FF2E93]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#FF2E93]">
								<ZapIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">Zero-Latency Audio Synthesis</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Procedural sound synthesis calculated mathematically via ZzFX and the native Web
								Audio API in under 15ms. Zero external MP3 downloads and zero network lag.
							</p>
						</Card>

						<Card className="space-y-3 p-6 transition-colors hover:border-[#00F5FF]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#00F5FF]">
								<SparklesIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">
								Physics-Driven Particle Bursts
							</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Hardware-accelerated particle explosions erupting directly from the tapped element,
								featuring customizable confetti palettes, spread angles, and velocity curves.
							</p>
						</Card>

						<Card className="space-y-3 p-6 transition-colors hover:border-[#7928CA]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#7928CA]">
								<HeartIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">Tactile Motion Feedback</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Micro-spring bounce dynamics and responsive button scaling that give digital
								reactions the tangible satisfaction of pressing a mechanical switch.
							</p>
						</Card>

						<Card className="space-y-3 p-6 transition-colors hover:border-[#7928CA]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#7928CA]">
								<LaptopIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">Docked Native Side Panel</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								A persistent Chrome Side Panel companion that stays docked to your screen. Audition
								sound profiles, adjust playback volume, and tune particle dynamics with instant
								sync.
							</p>
						</Card>

						<Card className="space-y-3 p-6 transition-colors hover:border-[#FF2E93]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#FF2E93]">
								<ActivityIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">Lifetime Sensory Metrics</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Real-time local interaction odometer tracking lifetime likes juiced. Persists
								securely in browser storage with zero external tracking or analytics telemetry.
							</p>
						</Card>

						<Card className="space-y-3 p-6 transition-colors hover:border-[#00F5FF]/40">
							<div className="bg-muted flex h-10 w-10 items-center justify-center rounded-xl text-[#00F5FF]">
								<LayersIcon className="h-5 w-5" />
							</div>
							<h3 className="text-foreground text-base font-bold">Modular Social Architecture</h3>
							<p className="text-muted-foreground text-xs leading-relaxed">
								Built with clean platform adapters—launching with deep, resilient DOM integration
								for Threads, and engineered for upcoming expansion across modern social feeds.
							</p>
						</Card>
					</div>
				</div>

				{/* 3-Step Install Guide */}
				<div id="install-guide" className="mx-auto mt-28 max-w-3xl space-y-8">
					<div className="space-y-2 text-center">
						<h2 className="text-2xl font-bold tracking-tight">How to Install in 3 Easy Steps</h2>
						<p className="text-muted-foreground text-sm">
							ThreadFX is currently distributed as an unpacked developer package.
						</p>
					</div>

					<div className="space-y-4">
						<div className="bg-card border-border flex items-start gap-4 rounded-xl border p-5">
							<span className="bg-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#FF2E93]">
								1
							</span>
							<div>
								<h4 className="text-foreground text-sm font-bold">Download & Extract</h4>
								<p className="text-muted-foreground mt-1 text-xs">
									Click the Download button to get{" "}
									<code className="text-[#00F5FF]">threadfx-latest.zip</code> and unzip it to any
									folder on your computer.
								</p>
							</div>
						</div>

						<div className="bg-card border-border flex items-start gap-4 rounded-xl border p-5">
							<span className="bg-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#7928CA]">
								2
							</span>
							<div>
								<h4 className="text-foreground text-sm font-bold">
									Enable Developer Mode in Chrome
								</h4>
								<p className="text-muted-foreground mt-1 text-xs">
									Go to <code className="text-[#00F5FF]">chrome://extensions</code> in your browser
									and turn on the <strong>Developer mode</strong> toggle in the top right.
								</p>
							</div>
						</div>

						<div className="bg-card border-border flex items-start gap-4 rounded-xl border p-5">
							<span className="bg-muted flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-[#00F5FF]">
								3
							</span>
							<div>
								<h4 className="text-foreground text-sm font-bold">Click Load Unpacked</h4>
								<p className="text-muted-foreground mt-1 text-xs">
									Click the <strong>Load unpacked</strong> button in the top left and select your
									unzipped folder. Open Threads and enjoy!
								</p>
							</div>
						</div>
					</div>
				</div>
			</main>

			{/* Footer */}
			<footer className="border-border text-muted-foreground mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 border-t px-6 py-10 text-xs sm:flex-row">
				<div className="flex flex-wrap items-center gap-2">
					<span>{APP_INFO.name} © 2026</span>
					<span>•</span>
					<a
						href={APP_INFO.urls.license}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Open Source ({APP_INFO.license})
					</a>
					<span>•</span>
					<span>
						Created by{" "}
						<a
							href={APP_INFO.author.url}
							target="_blank"
							rel="noreferrer"
							className="text-foreground font-medium hover:underline"
						>
							{APP_INFO.author.name} ({APP_INFO.author.handle})
						</a>
					</span>
				</div>

				<div className="flex items-center gap-4">
					<a
						href={APP_INFO.urls.repository}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						GitHub
					</a>
					<a
						href={APP_INFO.urls.license}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						License
					</a>
					<a
						href={APP_INFO.urls.threads}
						target="_blank"
						rel="noreferrer"
						className="hover:text-foreground transition-colors"
					>
						Threads
					</a>
					<a href={APP_INFO.urls.download} className="text-[#00F5FF] hover:underline">
						Download .zip
					</a>
				</div>
			</footer>
		</div>
	);
}
