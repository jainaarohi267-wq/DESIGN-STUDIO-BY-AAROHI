import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Eye, ArrowUpRight, ArrowDownLeft, Compass } from "lucide-react";
import { ProjectItem } from "../types";

export default function PortfolioSection({
  onSelectProject,
}: {
  onSelectProject: (type: string, initialBudget: number) => void;
}) {
  const categories = ["All Creative Projects", "UI/UX Layouts", "Vibrant Branding"];
  const [selectedCategory, setSelectedCategory] = useState("All Creative Projects");

  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "Apex Wealth Mobile Platform",
      category: "UI/UX Layouts",
      description: "A luxury high-tech crypto portfolio visual system. Built using glowing neon grids, rich data tables, and glassmorphic micro-charts.",
      image: "https://picsum.photos/seed/apexwealth/800/600",
      tags: ["Figma Wireframes", "Interactive Prototyping", "Design System"],
      year: "2026",
    },
    {
      id: "p2",
      title: "Opal Aura Brand Identity",
      category: "Vibrant Branding",
      description: "Diamond-crafted minimalist campaign posts, social graphics, and luxury packaging blueprints for high-end organic skincare.",
      image: "https://picsum.photos/seed/opalaura/800/600",
      tags: ["Brand Identity", "Social Graphics", "Vector Icons"],
      year: "2026",
    },
    {
      id: "p3",
      title: "Velo Electric Superbikes",
      category: "UI/UX Layouts",
      description: "An immersive dark-mode electric superbike homepage showing sleek parallel layouts, custom pricing blocks, and visual specs.",
      image: "https://picsum.photos/seed/velobike/800/600",
      tags: ["Vite Blueprint", "Tailwind styling", "Responsive Wireframe"],
      year: "2025",
    },
    {
      id: "p4",
      title: "Solitude Meditation Portal",
      category: "UI/UX Layouts",
      description: "An oasis of quietude. Clean minimal Zen breathing loop dashboard designed with spacious negatives and slow soft transitions.",
      image: "https://picsum.photos/seed/solitude/800/600",
      tags: ["Heuristic Review", "Hi-fi Figma Files", "Calming Canvas"],
      year: "2025",
    },
  ];

  const filteredProjects = selectedCategory === "All Creative Projects"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section className="relative px-6 py-20 md:py-28 max-w-7xl mx-auto z-10" id="portfolio">
      {/* Portfolio header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
            <Compass className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
              Curated Showcase
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-medium text-white tracking-tight">
            Designed to <span className="bg-gradient-to-r from-cyan-300 via-pink-300 to-indigo-400 bg-clip-text text-transparent italic">Captivate Sensors</span>
          </h2>
          <p className="text-xs md:text-sm text-slate-400 max-w-md">
            Dive into Aarohi's select works blending sleek grid architectures, high-contrast typography, and diamond-glass interactive widgets.
          </p>
        </div>

        {/* Filter categories tabs with glassy glow */}
        <div className="flex flex-wrap gap-2 self-start md:self-end">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-none text-xs font-mono uppercase tracking-widest transition-all duration-300 border ${
                selectedCategory === cat
                  ? "bg-white text-zinc-950 border-white font-bold shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  : "bg-white/[0.02] text-slate-300 border-white/10 hover:border-white/30 hover:bg-white/[0.04]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of gallery projects */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((p, index) => (
            <motion.div
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.93, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 15 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative rounded-none overflow-hidden bg-black/40 border border-white/10 hover:border-cyan-400 transition-all flex flex-col justify-between"
              id={`portfolio-item-${p.id}`}
            >
              {/* Image Frame with hover scale and overlay */}
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-950">
                <img
                  src={p.image}
                  alt={p.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                
                {/* Dark gradient gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/25 to-transparent z-10" />

                {/* Live hover tag */}
                <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-black/80 backdrop-blur-md rounded-none border border-white/15 text-xs font-mono text-cyan-400 uppercase tracking-widest shadow-xl">
                    <span>Premium UI</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Display tags in lower left corner */}
                <div className="absolute bottom-4 left-4 z-20 flex flex-wrap gap-1.5">
                  {p.tags.slice(0, 2).map((tag, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded-none text-[10px] font-mono text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Text Meta Container */}
              <div className="p-6 md:p-8 space-y-4 bg-[#050505] backdrop-blur-xl relative z-20 flex-grow flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                    <span>{p.category}</span>
                    <span>{p.year}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold uppercase text-white group-hover:text-cyan-400 transition-colors">
                    {p.title}
                  </h3>
                  <p className="text-xs text-slate-400 font-sans leading-relaxed">
                    {p.description}
                  </p>
                </div>

                {/* Instant Quote Request Action triggers enquiry form tailored with initial stats */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                    Aarohi Creative Work
                  </span>
                  <button
                    onClick={() => onSelectProject(p.category === "Vibrant Branding" ? "Graphic Design Posts" : "Premium Website Design", p.category === "Vibrant Branding" ? 3000 : 25000)}
                    className="flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-white transition-colors group-hover:translate-x-1 transition-transform"
                  >
                    <span>Request Similar Layout</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
