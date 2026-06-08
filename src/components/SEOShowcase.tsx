import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, Globe, MapPin, Cpu, Check, ArrowRight, ShieldCheck, Zap, Layers, Sparkles } from "lucide-react";

interface SEOStrategy {
  id: string;
  title: string;
  shortDesc: string;
  icon: React.ReactNode;
  color: string;
  keywords: string[];
  features: string[];
  metrics: { label: string; value: string }[];
}

export default function SEOShowcase() {
  const [activeTab, setActiveTab] = useState<string>("on-page");

  const strategies: SEOStrategy[] = [
    {
      id: "on-page",
      title: "On-Page SEO",
      shortDesc: "Hyper-targeted content frameworks styled for both premium human readability & strict search bots verification.",
      icon: <Layers className="w-5 h-5" />,
      color: "from-purple-500 to-fuchsia-500",
      keywords: ["Bespoke UI/UX Mumbai", "Creative Graphic Designer Portfolio", "Figma Web Prototypes", "Brand Strategist Mumbai"],
      features: [
        "Semantic HTML schema tagging of all content blocks",
        "Meta title & customized keywords density mapping",
        "Lighthouse-verified alt attribute descriptions on all portfolio images",
        "Optimized heading hierarchies (H1 to H6 configuration)",
        "Readability scoring optimization via clear visual grid lines"
      ],
      metrics: [
        { label: "Bot Readability Score", value: "99/100" },
        { label: "Visual Structure Rank", value: "Grade A+" }
      ]
    },
    {
      id: "off-page",
      title: "Off-Page Authority",
      shortDesc: "Strategic structures built into your design assets that encourage social backlinking and high authority rating sharing.",
      icon: <Globe className="w-5 h-5" />,
      color: "from-pink-500 to-purple-600",
      keywords: ["Best App Designer India", "Award Winning Web Architect", "Freelance UX Specialist Mumbai", "Premium Interactive Designs"],
      features: [
        "Pre-configured Social Open Graph (OG) meta tags on build launch",
        "Automatic high-fidelity social share previews matching Twitter/X layouts",
        "Built-in CTA funnels to boost professional referrals and shares",
        "Integration of semantic schema link attributes to verify official profiles",
        "Encourages authority domain references via clean shareable URLs"
      ],
      metrics: [
        { label: "Domain Share Index", value: "Stellar" },
        { label: "Referral Ready Score", value: "100%" }
      ]
    },
    {
      id: "local-seo",
      title: "Mumbai Local SEO",
      shortDesc: "Dominating local search visibility for high-worth regional clients searching for premium local designers in Mumbai and India.",
      icon: <MapPin className="w-5 h-5" />,
      color: "from-fuchsia-600 to-violet-500",
      keywords: ["UI/UX Designer Mumbai", "Best Designer Bandra West", "Local Graphic Studio Mumbai", "Mumbai Web Agency Freelancer"],
      features: [
        "Advanced JSON-LD LocalBusiness & ProfessionalService schema tag structures",
        "Fully populated localized coordinates (latitude/longitude coordinates injection)",
        "Bandra, Mumbai local search density keyword injection",
        "Google Maps API compatibility templates for rapid local ranking",
        "Localized contact info structures ensuring high listing trust factors"
      ],
      metrics: [
        { label: "Regional Search Reach", value: "Top Tier" },
        { label: "Local Visibility Boost", value: "+240%" }
      ]
    },
    {
      id: "technical-seo",
      title: "Technical Audits",
      shortDesc: "Stark runtime optimizations, caching, sitemap generation, and extreme core components speed.",
      icon: <Cpu className="w-5 h-5" />,
      color: "from-violet-600 to-fuchsia-400",
      keywords: ["Fast React Frontend Mumbai", "Core Web Vitals Optimal", "Sitemap Integrated Portfolio", "Secure Single Page App"],
      features: [
        "Ultra-lightweight React asset bundle generation & build optimization",
        "Elimination of slow scripts ensuring flawless Core Web Vitals (LCP, FID)",
        "Pre-rendering dynamic asset compression and optimal font integration",
        "Self-contained automatic XML sitemap blueprint layout",
        "SSL-ready structured paths avoiding malicious redirects"
      ],
      metrics: [
        { label: "Lighthouse Performance", value: "100%" },
        { label: "Page Load Velocity", value: "0.2s" }
      ]
    }
  ];

  const currentStrategy = strategies.find((s) => s.id === activeTab) || strategies[0];

  return (
    <section className="relative px-6 py-20 md:py-24 max-w-7xl mx-auto z-10" id="seo-strategy">
      {/* Absolute Ambient Neon Glow Behind Component */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center -z-10">
        <div className="w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-[120px]" />
      </div>

      {/* Decorative Top Line */}
      <div className="flex items-center gap-4 mb-4">
        <div className="h-[1px] w-12 bg-purple-500/30" />
        <span className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400 flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5" /> High Rank Engineering
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Left Column: Headline and Tabs */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight leading-tight">
              Designs That <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-violet-300 italic">Dominate Google</span> Search
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 font-sans leading-relaxed">
              True aesthetic masterpiece means nothing if no one can find it. Aarohi hardcodes enterprise-grade search algorithms directly into the wireframe logic of your application — ensuring your brand shines at the top of national and local ranks.
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex flex-col gap-3">
            {strategies.map((strategy) => {
              const isSelected = activeTab === strategy.id;
              return (
                <button
                  key={strategy.id}
                  onClick={() => setActiveTab(strategy.id)}
                  className={`w-full text-left p-4 rounded-none border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    isSelected
                      ? "bg-purple-950/20 border-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.1)]"
                      : "bg-white/[0.01] border-white/5 text-slate-400 hover:bg-white/[0.03] hover:text-white"
                  }`}
                  id={`seo-tab-${strategy.id}`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-none ${isSelected ? "text-fuchsia-400 bg-purple-500/10" : "text-slate-500 bg-white/5"}`}>
                      {strategy.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-display font-bold">{strategy.title}</h4>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5 uppercase tracking-widest">
                        {strategy.metrics[0].label}: {strategy.metrics[0].value}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${isSelected ? "text-fuchsia-400 translate-x-1" : "text-slate-600 opacity-0 group-hover:opacity-100"}`} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Animated Strategy Block */}
        <div className="lg:col-span-7 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStrategy.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="p-6 md:p-8 bg-purple-950/5 border border-purple-500/15 rounded-none relative overflow-hidden backdrop-blur-md h-full flex flex-col justify-between"
            >
              {/* Corner decorative glowing accents */}
              <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-fuchsia-400" />
              <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-fuchsia-400" />

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-fuchsia-400 px-2 py-1 bg-purple-500/10 border border-purple-500/20">
                    Engine Module Active
                  </span>
                  <div className="flex gap-2">
                    {currentStrategy.metrics.map((metric, i) => (
                      <div key={i} className="text-right">
                        <p className="text-[9px] font-mono uppercase text-slate-500">{metric.label}</p>
                        <p className="text-xs font-mono font-bold text-white">{metric.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl md:text-2xl font-display font-medium text-white flex items-center gap-2">
                    <span className="text-fuchsia-400">✦</span> {currentStrategy.title} Solution
                  </h3>
                  <p className="text-xs text-slate-300 font-sans leading-relaxed">
                    {currentStrategy.shortDesc}
                  </p>
                </div>

                {/* Core Targeted High Value Keywords */}
                <div className="space-y-3">
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-fuchsia-400">
                    Target High-Ranking Keywords
                  </h5>
                  <div className="flex flex-wrap gap-1.5">
                    {currentStrategy.keywords.map((kw, i) => (
                      <span key={i} className="text-[11px] font-mono bg-white/[0.02] border border-white/5 text-purple-200 px-3 py-1.5 hover:border-fuchsia-400/30 transition-all">
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Feature Bullet Checklist */}
                <div className="space-y-3 pt-2">
                  <h5 className="text-[10px] font-mono uppercase tracking-widest text-purple-400">
                    Implementation Deliverables
                  </h5>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {currentStrategy.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-300 font-sans">
                        <Check className="w-3.5 h-3.5 text-fuchsia-400 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Slogan Philosophy integration proof point */}
              <div className="mt-8 pt-4 border-t border-white/5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[10px] font-mono text-slate-500 max-w-sm">
                  * "Designs touch reality, reality touches imagination, and imagination touches creativity." — Integrated fully into structured markup values.
                </p>
                <div className="inline-flex items-center gap-1 text-[11px] font-mono text-fuchsia-400 uppercase tracking-widest hover:text-white transition-colors">
                  <span>99+ Core Speed Score</span>
                  <Zap className="w-3.5 h-3.5 animate-pulse" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
