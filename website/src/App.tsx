import React, { useState } from 'react';
import {
  Zap,
  Download,
  Sparkles,
  Heart,
  Volume2,
  Check,
  ShieldCheck,
  ArrowRight,
  ExternalLink,
  Laptop,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { zzfx } from './lib/zzfx';
import { SOUND_PACKS } from './lib/presets';
import type { SoundPack } from './lib/presets';

export default function App() {
  const [selectedPack, setSelectedPack] = useState<string>('bubble');
  const [volume, setVolume] = useState<number>(0.6);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(24);
  const [confettiActive, setConfettiActive] = useState<boolean>(true);

  const handleSimulatedLike = (e: React.MouseEvent<HTMLButtonElement>) => {
    const nextState = !isLiked;
    setIsLiked(nextState);
    setLikeCount((prev) => (nextState ? prev + 1 : prev - 1));

    if (nextState) {
      // 1. Play procedural ZzFX audio
      const pack = SOUND_PACKS[selectedPack] || SOUND_PACKS.bubble;
      zzfx(volume, ...pack.params);

      // 2. Trigger Confetti
      if (confettiActive) {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = (rect.left + rect.width / 2) / window.innerWidth;
        const y = (rect.top + rect.height / 2) / window.innerHeight;

        confetti({
          particleCount: 35,
          spread: 60,
          origin: { x, y },
          colors: ['#FF2E93', '#7928CA', '#00F5FF', '#FFFFFF'],
          disableForReducedMotion: false,
        });
      }
    }
  };

  const testSound = (pack: SoundPack) => {
    setSelectedPack(pack.id);
    zzfx(volume, ...pack.params);
  };

  return (
    <div className="min-h-screen bg-[#080808] text-[#F3F5F7] selection:bg-[#FF2E93] selection:text-white">
      {/* Background ambient glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#7928CA]/15 via-[#FF2E93]/10 to-transparent blur-3xl pointer-events-none -z-10" />

      {/* Navigation */}
      <nav className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between border-b border-[#262626]/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#FF2E93] to-[#7928CA] flex items-center justify-center shadow-lg shadow-[#FF2E93]/20">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-transparent">
              ThreadFX
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] font-mono text-[#8E8E93] bg-[#1C1C1C] border border-[#262626] px-2 py-0.5 rounded-full">
              v1.0.0
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://threads.com/@nmrisrl"
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1.5 text-xs text-[#8E8E93] hover:text-[#F3F5F7] transition-colors"
          >
            <span>@nmrisrl</span>
            <ExternalLink className="w-3 h-3" />
          </a>

          <a
            href="/download"
            className="flex items-center gap-2 bg-gradient-to-r from-[#FF2E93] to-[#7928CA] hover:opacity-95 text-white text-xs font-semibold px-4 py-2.5 rounded-full shadow-lg shadow-[#FF2E93]/25 transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download .zip</span>
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#262626] bg-[#121212] text-xs font-mono text-[#8E8E93]">
            <span className="w-2 h-2 rounded-full bg-[#00F5FF] animate-pulse" />
            <span>Procedural Web Audio • Zero MP3s • Manifest V3</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Bring your Threads <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] bg-clip-text text-transparent">
              to life with tactile juice.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#8E8E93] max-w-2xl mx-auto leading-relaxed">
            Threads introduced custom likes, but interactions remain silent. ThreadFX electrifies
            your feed with instant procedural sound effects, neon confetti bursts, and satisfying tactile feedback.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/download"
              className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#FF2E93] via-[#7928CA] to-[#00F5FF] text-white font-bold text-sm px-8 py-3.5 rounded-full shadow-xl shadow-[#FF2E93]/20 hover:opacity-95 transition-all active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download ThreadFX (Free Unpacked)</span>
            </a>

            <a
              href="#install-guide"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#121212] hover:bg-[#1C1C1C] border border-[#262626] text-[#F3F5F7] font-semibold text-sm px-6 py-3.5 rounded-full transition-colors"
            >
              <span>Install Guide</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Interactive Soundboard & Simulator */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Interactive Like Simulator</h2>
            <p className="text-sm text-[#8E8E93] mt-1">
              Select a sound pack and click the heart on the Threads post below to test it live!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 bg-[#121212] border border-[#262626] rounded-2xl p-6 sm:p-8 shadow-2xl">
            {/* Control Column */}
            <div className="md:col-span-5 space-y-6 md:border-r md:border-[#262626] md:pr-6">
              <div>
                <span className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider block mb-3">
                  1. Choose Sound Pack
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {Object.values(SOUND_PACKS).map((pack) => {
                    const isSelected = selectedPack === pack.id;
                    return (
                      <button
                        key={pack.id}
                        onClick={() => testSound(pack)}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'bg-[#181818] border-[#FF2E93] shadow-md shadow-[#FF2E93]/15'
                            : 'bg-[#0E0E0E] border-[#262626] hover:border-[#383838]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-lg">{pack.icon}</span>
                          {isSelected && <Check className="w-3.5 h-3.5 text-[#FF2E93]" />}
                        </div>
                        <div className="text-xs font-bold text-[#F3F5F7]">{pack.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Volume Slider */}
              <div className="bg-[#0E0E0E] border border-[#262626] rounded-xl p-3.5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-[#8E8E93]">
                    <Volume2 className="w-4 h-4 text-[#FF2E93]" />
                    <span>Volume</span>
                  </div>
                  <span className="font-mono text-[#F3F5F7]">{Math.round(volume * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={volume}
                  onChange={(e) => setVolume(parseFloat(e.target.value))}
                  className="w-full accent-[#FF2E93] cursor-pointer h-1.5 bg-[#262626] rounded-lg"
                />
              </div>

              {/* Confetti Switch */}
              <div className="flex items-center justify-between bg-[#0E0E0E] border border-[#262626] rounded-xl p-3.5">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#00F5FF]" />
                  <span className="text-xs font-medium">Confetti Explosions</span>
                </div>
                <button
                  onClick={() => setConfettiActive(!confettiActive)}
                  className={`w-9 h-5 rounded-full transition-colors p-0.5 relative ${
                    confettiActive ? 'bg-[#FF2E93]' : 'bg-[#262626]'
                  }`}
                >
                  <div
                    className={`w-4 h-4 rounded-full bg-white transition-transform ${
                      confettiActive ? 'translate-x-4' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Simulated Threads Post Column */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <span className="text-xs font-semibold text-[#8E8E93] uppercase tracking-wider block mb-3">
                2. Click the Heart to Test
              </span>

              <div className="bg-[#080808] border border-[#262626] rounded-2xl p-5 sm:p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#383838] to-[#262626] flex items-center justify-center font-bold text-sm">
                    N
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm">nmrisrl</span>
                      <span className="text-xs text-[#8E8E93]">• 2h</span>
                    </div>
                    <span className="text-xs text-[#8E8E93]">Creator of ThreadFX</span>
                  </div>
                </div>

                <p className="text-sm leading-relaxed text-[#EDEDED]">
                  Testing the new custom like effects on Threads! Liking this post will now trigger
                  satisfying procedural sound effects and neon confetti. Hit the heart below! ⚡✨
                </p>

                {/* Simulated Action Bar */}
                <div className="pt-2 flex items-center gap-6 border-t border-[#1C1C1C]">
                  <button
                    onClick={handleSimulatedLike}
                    className="flex items-center gap-2 group transition-transform active:scale-125"
                  >
                    <Heart
                      className={`w-6 h-6 transition-all ${
                        isLiked
                          ? 'text-[#FF2E93] fill-[#FF2E93] scale-110 drop-shadow-[0_0_12px_#FF2E93]'
                          : 'text-[#8E8E93] group-hover:text-white'
                      }`}
                    />
                    <span
                      className={`text-xs font-mono font-medium ${
                        isLiked ? 'text-[#FF2E93]' : 'text-[#8E8E93]'
                      }`}
                    >
                      {likeCount}
                    </span>
                  </button>

                  <span className="text-xs text-[#8E8E93]">💬 18</span>
                  <span className="text-xs text-[#8E8E93]">🔁 4</span>
                  <span className="text-xs text-[#8E8E93]">↗ 12</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-28 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1C1C] flex items-center justify-center text-[#FF2E93]">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F3F5F7]">Zero-Latency Synthesis</h3>
            <p className="text-xs leading-relaxed text-[#8E8E93]">
              Powered by ZzFX Web Audio API. Audio waveforms are calculated mathematically in
              under 15 milliseconds without downloading heavy audio files.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1C1C] flex items-center justify-center text-[#7928CA]">
              <Laptop className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F3F5F7]">Native Chrome Side Panel</h3>
            <p className="text-xs leading-relaxed text-[#8E8E93]">
              Docks neatly to the right side of your browser. Stays open while you browse Threads
              with live volume controls and real-time like stats.
            </p>
          </div>

          <div className="bg-[#121212] border border-[#262626] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#1C1C1C] flex items-center justify-center text-[#00F5FF]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-[#F3F5F7]">Minimal Permissions</h3>
            <p className="text-xs leading-relaxed text-[#8E8E93]">
              Only requests access to threads.net and local storage. No tracking, no background
              analytics, and zero invasive permissions.
            </p>
          </div>
        </div>

        {/* 3-Step Install Guide */}
        <div id="install-guide" className="mt-28 max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">How to Install in 3 Easy Steps</h2>
            <p className="text-sm text-[#8E8E93]">
              ThreadFX is currently distributed as an unpacked developer package.
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#121212] border border-[#262626] rounded-xl p-5 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-[#1C1C1C] text-[#FF2E93] font-bold text-xs flex items-center justify-center shrink-0">
                1
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#F3F5F7]">Download & Extract</h4>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Click the Download button to get <code className="text-[#00F5FF]">threadfx-latest.zip</code> and unzip it to any folder on your computer.
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#262626] rounded-xl p-5 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-[#1C1C1C] text-[#7928CA] font-bold text-xs flex items-center justify-center shrink-0">
                2
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#F3F5F7]">Enable Developer Mode in Chrome</h4>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Go to <code className="text-[#00F5FF]">chrome://extensions</code> in your browser and turn on the <strong>Developer mode</strong> toggle in the top right.
                </p>
              </div>
            </div>

            <div className="bg-[#121212] border border-[#262626] rounded-xl p-5 flex items-start gap-4">
              <span className="w-7 h-7 rounded-full bg-[#1C1C1C] text-[#00F5FF] font-bold text-xs flex items-center justify-center shrink-0">
                3
              </span>
              <div>
                <h4 className="text-sm font-bold text-[#F3F5F7]">Click Load Unpacked</h4>
                <p className="text-xs text-[#8E8E93] mt-1">
                  Click the <strong>Load unpacked</strong> button in the top left and select your unzipped folder. Open Threads and enjoy!
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#262626] py-10 max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8E8E93]">
        <div className="flex items-center gap-2">
          <span>ThreadFX © 2026</span>
          <span>•</span>
          <span>
            Created by{' '}
            <a
              href="https://threads.com/@nmrisrl"
              target="_blank"
              rel="noreferrer"
              className="text-[#F3F5F7] hover:underline"
            >
              Nomer Israel (@nmrisrl)
            </a>
          </span>
        </div>

        <div className="flex items-center gap-4">
          <a
            href="https://threads.com/@nmrisrl"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F3F5F7] transition-colors"
          >
            Threads
          </a>
          <a
            href="https://github.com/nmrisrl/threadfx"
            target="_blank"
            rel="noreferrer"
            className="hover:text-[#F3F5F7] transition-colors"
          >
            GitHub
          </a>
          <a href="/download" className="text-[#00F5FF] hover:underline">
            Download .zip
          </a>
        </div>
      </footer>
    </div>
  );
}
