import React, { useRef, useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles, AlertCircle, Eye, ShieldCheck, Zap, IndianRupee } from "lucide-react";
import { ServiceCard } from "../types";

// Dynamic custom interactive 3D Tilt & Glow card
function PricingCard({
  service,
  onSelect,
}: {
  service: ServiceCard;
  onSelect: (type: string, initialBudget: number) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(0);
  const [glowY, setGlowY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Relative mouse coordinate points from -0.5 to 0.5
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;

    // Tilt limits: maximum 10 degrees tilt rotation
    setRotateX(-mouseY * 11);
    setRotateY(mouseX * 11);

    // Glow position coordinates (percentage of card surface)
    setGlowX(((e.clientX - rect.left) / width) * 100);
    setGlowY(((e.clientY - rect.top) / height) * 100);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  // Helper pricing details
  const getBudgetInitial = (priceRange: string) => {
    // extract first number from price range e.g. "20,000 – 30,000" => 20000
    const numbers = priceRange.replace(/,/g, "").match(/\d+/g);
    return numbers ? parseInt(numbers[0]) : 5000;
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: isHovered ? "none" : "all 0.5s cubic-bezier(0.25, 1, 0.5, 1)",
      }}
      className="relative flex flex-col justify-between rounded-none glass-card overflow-hidden h-full p-6 md:p-8 border border-white/10 hover:border-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.15)] transition-all duration-350 cursor-pointer"
      onClick={() => onSelect(service.title, getBudgetInitial(service.priceRange))}
      id={`pricing-card-${service.id}`}
    >
      {/* Background Hover Glow Spot */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(circle 320px at ${glowX}% ${glowY}%, ${service.glowColor}, transparent 80%)`,
          opacity: isHovered ? 0.8 : 0,
        }}
      />

      <div className="relative z-10 space-y-6">
        {/* Tier badge & tags */}
        <div className="flex justify-between items-start">
          <span className="text-[10px] uppercase font-mono tracking-widest text-cyan-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-none flex items-center gap-1.5">
            <Zap className="w-3 h-3 fill-current text-cyan-400" />
            {service.badge || "Standard Pack"}
          </span>
          {service.id === "prem" && (
            <span className="text-[10px] font-mono tracking-wider font-bold text-pink-400 bg-pink-500/10 border border-pink-500/20 px-2.5 py-1 rounded-none animate-pulse">
              ★ POPULAR
            </span>
          )}
        </div>

        {/* Pricing & Titles */}
        <div>
          <h4 className="text-xl md:text-2xl font-display font-medium text-white mb-2 group-hover:text-cyan-400 transition-colors">
            {service.title}
          </h4>
          <p className="text-xs text-slate-400 font-sans min-h-[32px]">
            {service.description}
          </p>
        </div>

        {/* Price Tag with clean INR details */}
        <div className="py-2 border-y border-white/10 flex items-baseline gap-1">
          <span className="text-sm font-mono text-cyan-400 font-medium flex items-center">
            <IndianRupee className="w-4 h-4 mr-0.5 text-cyan-400" />
          </span>
          <span className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white">
            {service.priceRange}
          </span>
          <span className="text-xs text-slate-500 font-sans ml-1">
            {service.period}
          </span>
        </div>

        {/* Deliverables / Features List */}
        <ul className="space-y-3 pt-2">
          {service.features.map((feature, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-sans">
              <span className="w-4.5 h-4.5 rounded-none bg-white/5 border border-white/10 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                <Check className="w-3.5 h-3.5" />
              </span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Button with neon slide animation */}
      <div className="relative z-10 pt-8" style={{ transform: "translateZ(30px)" }}>
        <button
          className={`w-full py-3.5 rounded-none font-display text-[10px] font-bold tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-1.5 ${
            isHovered
              ? "bg-white text-black shadow-[0_0_20px_rgba(255,255,255,0.3)]"
              : "bg-white/5 text-slate-300 border border-white/10 hover:bg-white/10"
          }`}
        >
          <span>Instantly Estimate</span>
          <span className="text-sm">→</span>
        </button>
      </div>

      {/* Diamond Corner Shimmer Accent */}
      <div className="absolute -bottom-1 -right-1 w-12 h-12 border-b border-r border-white/5 pointer-events-none group-hover:border-white/20 transition-all" />
    </motion.div>
  );
}

export default function ServicesSection({
  onSelectQuote,
}: {
  onSelectQuote: (projectType: string, initialBudget: number) => void;
}) {
  const services: ServiceCard[] = [
    {
      id: "graph",
      title: "Graphic Design Posts",
      priceRange: "2,000 – 3,000",
      period: "per design",
      description: "Elegant, premium social posts, banners, or campaign creatives that instantly stand out.",
      features: [
        "Premium visual graphics & custom vectors",
        "Matching layout & color guidelines",
        "Includes Figma source assets & print-PDF",
        "1-2 days industry-leading delivery speeds",
        "Upto 3 refinement iterations",
      ],
      gradient: "from-pink-500/20 to-purple-500/20",
      glowColor: "rgba(236,72,153,0.08)",
      badge: "Creative Post Designer",
    },
    {
      id: "prem",
      title: "Premium Website Design",
      priceRange: "20,000 – 30,000",
      period: "per project",
      description: "Immersive multi-screen custom premium architecture with high-fidelity Figma components & layout blueprints.",
      features: [
        "Unique Bespoke Multi-Screen Designs (8 - 12 sections)",
        "Advanced interactive elements & prototypes",
        "Custom SVG Icon packs & dynamic typography setup",
        "Tailwind-optimized responsive exports",
        "Complete structural wireframes + style system guide",
        "Priority live alignment support with Aarohi",
      ],
      gradient: "from-cyan-500/20 to-indigo-500/20",
      glowColor: "rgba(6,182,212,0.08)",
      badge: "Flagship Product Design",
    },
    {
      id: "simple",
      title: "Simple Website",
      priceRange: "5,000 – 10,000",
      period: "per project",
      description: "Clean single-page landing site targeted for conversions and elegant portfolio storytelling.",
      features: [
        "Sleek High-End Hero & 4-5 Content blocks",
        "Fully custom responsive interactive sections",
        "Integrated modern contact forms & navigation",
        "Optimized clean layouts designed for React/Vite",
        "Framer-motion ready structure documentation",
        "Includes visual styles guide & branding pack",
      ],
      gradient: "from-indigo-500/20 to-pink-500/20",
      glowColor: "rgba(99,102,241,0.08)",
      badge: "Elegant Landing Page",
    },
  ];

  return (
    <section className="relative px-6 py-20 md:py-28 max-w-7xl mx-auto z-10" id="services">
      {/* Dynamic Header */}
      <div className="flex flex-col items-center text-center space-y-4 mb-16 md:mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-pink-300 animate-spin" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#ffd3e8]">
            Creative Tiers & Rates
          </span>
        </div>
        <h2 className="text-3xl md:text-5xl font-display font-medium tracking-tight text-white max-w-2xl">
          Design Plans Rooted in <span className="bg-gradient-to-r from-cyan-300 via-[#ffd3e8] to-purple-400 bg-clip-text text-transparent italic">Bespoke Quality</span>
        </h2>
        <p className="text-sm md:text-base text-slate-400 max-w-lg font-sans">
          Whether you need lightning-fast posts or complete architectural layouts, choose a baseline blueprint or request a personalized budget rate.
        </p>
      </div>

      {/* Services Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
        {/* Reordering grid items nicely to center standard premium pack: Simply list them logically */}
        <PricingCard service={services[2]} onSelect={onSelectQuote} /> {/* Simple Website */}
        <PricingCard service={services[1]} onSelect={onSelectQuote} /> {/* Premium Website */}
        <PricingCard service={services[0]} onSelect={onSelectQuote} /> {/* Graphic Design */}
      </div>

      {/* Quality commitment notification */}
      <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3 p-4 bg-white/[0.015] border border-white/5 rounded-xl max-w-2xl mx-auto text-center sm:text-left">
        <AlertCircle className="w-5 h-5 text-cyan-300 flex-shrink-0 animate-bounce" />
        <span className="text-xs text-slate-400 font-sans">
          <strong>Need a tailored enterprise pack?</strong> All baseline price cards are fully configurable. Complete the custom enquiry checklist to build a personalized timeline proposal with Aarohi.
        </span>
      </div>
    </section>
  );
}
