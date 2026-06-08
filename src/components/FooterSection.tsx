import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, Mail, Figma, Linkedin, Github, Dribbble, Check, Copy, Heart, Gem } from "lucide-react";

export default function FooterSection({
  onOpenQuote,
}: {
  onOpenQuote: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const email = "jainaarohi267@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialLinks = [
    { name: "Figma", icon: Figma, url: "https://figma.com", color: "hover:text-[#F24E1E]" },
    { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com", color: "hover:text-[#0A66C2]" },
    { name: "Dribbble", icon: Dribbble, url: "https://dribbble.com", color: "hover:text-[#EA4C89]" },
    { name: "GitHub", icon: Github, url: "https://github.com", color: "hover:text-white" },
  ];

  return (
    <footer className="relative bg-[#040406] border-t border-white/5 py-12 md:py-20 z-10" id="contact">
      {/* Footer subtle highlight glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70vw] h-[15vw] rounded-full bg-gradient-to-t from-cyan-500/5 to-transparent blur-[70px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
        {/* About studio column */}
        <div className="space-y-4 lg:col-span-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-none bg-cyan-400 text-black flex items-center justify-center font-display font-black text-xs tracking-widest">
              DS
            </div>
            <span className="text-lg font-display font-bold uppercase tracking-wider">
              Design Studio by Aarohi
            </span>
          </div>
          <p className="text-xs md:text-sm text-slate-400 max-w-sm font-sans leading-relaxed">
            Crafting premium luxury UI/UX solutions, interactive modern blueprints, and custom brand assets for fast-paced international products and visionary software teams.
          </p>

          {/* Glowing social icons */}
          <div className="flex gap-4 pt-2">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.name}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className={`w-9 h-9 rounded-none bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-slate-400 transition-all ${s.color} hover:border-cyan-400 hover:scale-105`}
                  aria-label={`Link to Aarohi's ${s.name}`}
                  id={`social-link-${s.name.toLowerCase()}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Studio operations column */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold">
            Studio Design Hours
          </h4>
          <ul className="space-y-2 text-xs text-slate-400 font-sans">
            <li className="flex justify-between border-b border-white/10 pb-1">
              <span>Monday – Friday</span>
              <span className="text-white font-medium">9 AM – 7 PM IST</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-1">
              <span>Saturday Reviews</span>
              <span className="text-white font-medium">10 AM – 3 PM IST</span>
            </li>
            <li className="flex justify-between border-b border-white/10 pb-1">
              <span>Sunday Concepting</span>
              <span className="text-pink-400 italic font-medium">Offline Zen</span>
            </li>
          </ul>
        </div>

        {/* Immediate copy contact column */}
        <div className="space-y-4">
          <h4 className="text-xs font-mono uppercase tracking-widest text-[#ffd3e8] font-bold">
            Work with Aarohi
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed font-sans">
            Ready to unlock higher client conversions? Complete the custom builder flow or start a direct conversation.
          </p>

          <div className="space-y-2">
            {/* Kopier-Widget with premium design */}
            <button
              onClick={handleCopyEmail}
              className="w-full px-4 py-3 rounded-none bg-[#050505] border border-white/15 hover:border-white/30 transition-all text-left flex items-center justify-between text-xs text-slate-300 font-mono hover:text-white group cursor-pointer"
              aria-label="Copy Aarohi professional email"
              id="btn-copy-email"
            >
              <div className="flex items-center gap-2 overflow-hidden truncate">
                <Mail className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span className="truncate">{email}</span>
              </div>
              <div className="flex-shrink-0 ml-2">
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                )}
              </div>
            </button>

            {/* Tap to prompt */}
            <button
              onClick={onOpenQuote}
              className="w-full text-center py-2.5 px-3 bg-[#0a0a0a] border border-white/10 hover:border-cyan-400 text-cyan-400 text-[10px] font-mono uppercase tracking-widest rounded-none transition-all cursor-pointer"
              id="footer-quote-pulse"
            >
              ✨ Live Quote Checklist
            </button>
          </div>
        </div>
      </div>

      {/* Extreme bottom copyright bar */}
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 border-t border-white/5 text-center flex flex-col sm:flex-row items-center sm:justify-between gap-4 text-xs text-slate-500 font-sans">
        <p>
          &copy; {new Date().getFullYear()} Design Studio by Aarohi. All Rights Reserved.
        </p>
        <p className="flex items-center gap-1">
          <span>Crafted with meticulous luxury</span>
          <Heart className="w-3.5 h-3.5 text-pink-500 fill-current animate-pulse" />
          <span>and fine typography</span>
        </p>
      </div>
    </footer>
  );
}
