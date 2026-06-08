import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Sparkles, Flame, Play, Eye, ArrowRight, ShieldAlert, BadgeCheck, Compass } from "lucide-react";

interface HeroSectionProps {
  onOpenQuote: () => void;
}

export default function HeroSection({ onOpenQuote }: HeroSectionProps) {
  // Parallax calculations for the portrait box
  const portraitTargetRef = useRef<HTMLDivElement>(null);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);

  const handleMouseMovePortrait = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!portraitTargetRef.current) return;
    const rect = portraitTargetRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Displacement ratio (e.g. up to 14px slide movement)
    const currentX = (e.clientX - rect.left) / width - 0.5;
    const currentY = (e.clientY - rect.top) / height - 0.5;

    setPosX(currentX * 28);
    setPosY(currentY * 28);
  };

  const handleMouseLeavePortrait = () => {
    setPosX(0);
    setPosY(0);
  };

  // Image paths populated from generated assets
  const portraitUrl = "/src/assets/images/aarohi_portrait_1780900990084.png";
  const logoUrl = "/src/assets/images/studio_logo_1780900032322.png";

  return (
    <section className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden z-10 px-6 max-w-7xl mx-auto" id="hero">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
        
        {/* Left Column: Premium Text & Animated Headlines */}
        <div className="space-y-6 lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Subtle top indicator category tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md text-slate-300"
          >
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
              Elite UI/UX & GRAPHIC CONSULTANT
            </span>
          </motion.div>

          {/* Epic Main Headline with slow letter animations */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-[84px] leading-[0.9] font-black tracking-tighter uppercase mb-4 font-display text-white max-w-2xl"
          >
            DESIGN <br />
            <span className="text-stroke-white text-transparent tracking-tight">THAT CUTS</span> <br />
            THROUGH
          </motion.h1>

          {/* New beautifully styled Inscription Slogan Card under the headline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="w-full max-w-lg p-4 bg-purple-950/15 border border-purple-500/20 rounded-none relative overflow-hidden group mb-2"
          >
            {/* Corner glowing lines */}
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-fuchsia-400 group-hover:scale-125 transition-transform" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-fuchsia-400 group-hover:scale-125 transition-transform" />
            
            {/* Text content with quote marks */}
            <p className="text-xs font-mono tracking-wide text-fuchsia-300 italic leading-relaxed">
              "Designs touch reality, reality touches imagination, and imagination touches creativity."
            </p>
            <div className="mt-1 flex items-center justify-between text-[9px] font-mono uppercase tracking-widest text-purple-400">
              <span>Aarohi Creative Philosophy</span>
              <span>✦ Spark of Genius ✦</span>
            </div>
          </motion.div>

          {/* Lightweight description tagline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xs sm:text-sm md:text-base text-slate-300 max-w-lg font-sans leading-relaxed"
          >
            High-end UI/UX & Motion Graphics design files for brands that demand a premium edge. Hello, I am <strong className="text-fuchsia-400 font-semibold">Aarohi</strong>, a Mumbai-based freelance designer translating pure imaginations into functional reality through elite creative solutions.
          </motion.p>

          {/* Rating Proof Point metrics */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-wrap gap-6 items-center py-4 border-y border-white/10 w-full max-w-md"
          >
            <div>
              <span className="text-2xl md:text-3xl font-display font-bold text-white block">
                98%
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Client Loyalty Score
              </span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl md:text-3xl font-display font-bold text-cyan-400 block">
                100+
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Blueprints Completed
              </span>
            </div>
            <div className="w-px h-8 bg-white/10 hidden sm:block" />
            <div>
              <span className="text-2xl md:text-3xl font-display font-bold text-purple-400 block">
                12 Hour
              </span>
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                Avg Response Speed
              </span>
            </div>
          </motion.div>

          {/* CTAs with persistent neon glow button */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 w-full"
          >
            {/* Primary Action */}
            <button
              onClick={onOpenQuote}
              className="relative px-8 py-4 rounded-none font-display text-xs font-bold tracking-widest uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.35)] group text-center cursor-pointer"
              id="hero-floating-cta"
            >
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <Flame className="w-4 h-4 text-amber-500 animate-pulse fill-current" />
                Get Quote
              </span>
            </button>

            {/* Secondary Link to Services */}
            <a
              href="#services"
              className="px-8 py-4 rounded-none border border-white/20 hover:border-white/40 bg-transparent text-slate-300 hover:text-white font-display text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-1.5 transition-all"
              id="hero-explore-plans"
            >
              <span>View Offers</span>
              <ArrowRight className="w-4 h-4 text-cyan-450 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </div>

        {/* Right Column: Parallax Portrait Frame with Center Rotating 3D Logo */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Glowing backplate radial rings behind portrait */}
          <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-cyan-500/10 to-pink-500/5 blur-[90px] animate-pulse pointer-events-none" />

          {/* Rotating 3D Logo Animation in Center Layer */}
          {/* Posited floating overlay, slow 3D rotation, glows with drop-shadows */}
          <motion.div
            className="absolute -top-6 -left-6 w-24 h-24 sm:w-28 sm:h-28 z-30 pointer-events-none rounded-xl overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 p-2 shadow-2xl flex flex-col items-center justify-center text-center gap-1"
            animate={{
              rotateY: [0, 180, 360],
              y: [0, -8, 0],
            }}
            transition={{
              rotateY: { duration: 10, repeat: Infinity, ease: "linear" },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <img
              src={logoUrl}
              alt="Design Studio 3D Hex Logo"
              referrerPolicy="no-referrer"
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain filter drop-shadow-[0_0_8px_rgba(163,232,255,0.7)]"
            />
            <span className="text-[8px] font-mono text-[#a3e8ff] tracking-widest uppercase">
              Studio Logo
            </span>
          </motion.div>

          {/* Active Portrait Container with slight parallax mouse tracking */}
          <div
            ref={portraitTargetRef}
            onMouseMove={handleMouseMovePortrait}
            onMouseLeave={handleMouseLeavePortrait}
            className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-950/80 aspect-[3/4] w-full max-w-sm cursor-grab group"
            id="parallax-portrait-frame"
          >
            {/* Shimmer wave across portrait */}
            <div className="absolute inset-x-0 -skew-y-12 bg-white/[0.04] h-20 top-0 pointer-events-none z-10 transition-transform duration-[1500m] group-hover:translate-y-[400px]" />

            {/* Parallax Image layers */}
            <div
              className="w-full h-full transition-transform duration-300 ease-out absolute inset-0"
              style={{
                transform: `translateX(${posX}px) translateY(${posY}px) scale(1.03)`,
              }}
            >
              <img
                src={portraitUrl}
                alt="Aarohi Senior Freelancer Designer Portrait"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover select-none"
              />
            </div>

            {/* Flat high-fidelity framing border overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#050507] via-transparent to-transparent opacity-80" />
            
            {/* Bottom meta detail on portrait */}
            <div className="absolute bottom-5 left-5 right-5 z-20 flex justify-between items-end">
              <div className="space-y-1">
                <span className="text-[9px] font-mono tracking-widest text-[#a3e8ff] uppercase flex items-center gap-1 select-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Available to Book
                </span>
                <h3 className="text-lg font-display text-white font-medium select-none">
                  Aarohi
                </h3>
              </div>
              <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg backdrop-blur-md text-[10px] font-mono text-slate-300 select-none uppercase tracking-wider">
                Figma Head of Studio
              </div>
            </div>
            
            {/* Elegant luxury framing brackets */}
            <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/30 pointer-events-none" />
            <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/30 pointer-events-none" />
            <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/30 pointer-events-none" />
            <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/30 pointer-events-none" />
          </div>

          {/* Rotating decorative rings floating near portrait */}
          <div className="absolute -bottom-10 right-4 w-32 h-32 border border-dashed border-cyan-500/10 rounded-full animate-spin pointer-events-none hidden md:block" style={{ animationDuration: "35s" }} />
          <div className="absolute top-1/3 -right-12 w-20 h-20 border border-white/5 rounded-full animate-spin pointer-events-none" style={{ animationDuration: "12s" }} />

        </div>
      </div>
    </section>
  );
}
