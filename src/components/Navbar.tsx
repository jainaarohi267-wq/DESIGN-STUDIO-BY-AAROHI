import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Sparkles, Send, Flame } from "lucide-react";

interface NavbarProps {
  onOpenQuote: () => void;
}

export default function Navbar({ onOpenQuote }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Plans & Services", href: "#services" },
    { label: "Portfolio Works", href: "#portfolio" },
    { label: "Client Ratings", href: "#testimonials" },
    { label: "Direct Consult", href: "#contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
          scrolled
            ? "py-3 bg-[#050505]/95 border-b border-white/10 shadow-xl"
            : "py-5 bg-transparent"
        }`}
        id="navigation-bar"
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Studio Brand logo with diamond bullet */}
          <a href="#" className="flex items-center gap-2 group" id="nav-brand">
            <div className="relative w-7 h-7 rounded-none bg-cyan-400 flex items-center justify-center font-display font-black text-[11px] tracking-widest text-black group-hover:rotate-12 transition-transform duration-300">
              A
              <div className="absolute inset-0 rounded-none border border-white/20 scale-105" />
            </div>
            <span className="text-sm font-display font-bold uppercase tracking-wider text-white group-hover:text-cyan-455">
              Design Studio <span className="font-light text-slate-400 font-sans tracking-normal lowercase">by Aarohi</span>
            </span>
          </a>

          {/* Nav links desktop centered */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[11px] font-mono uppercase tracking-widest text-slate-400 hover:text-white transition-colors relative group py-1"
                id={`nav-link-${link.href.replace("#", "")}`}
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Action CTA Trigger Button (Persistent Glow effect) */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenQuote}
              className="relative px-5 py-2.5 rounded-none text-xs font-display font-bold tracking-widest uppercase text-black bg-white hover:bg-neutral-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.25)] cursor-pointer"
              id="nav-get-quote-btn"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                Get Quote
              </span>
            </button>
          </div>

          {/* Burger menu toggle on Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-none bg-white/[0.02] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            id="nav-mobile-hamburger"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile slide-down menu sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full inset-x-0 bg-[#050505]/95 border-b border-white/10 py-6 px-6 space-y-5 md:hidden shadow-2xl z-40"
              id="mobile-menu-sheet"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-[#06b6d2] transition-colors py-2 border-b border-white/10"
                    id={`mobile-link-${link.href.replace("#", "")}`}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <button
                onClick={() => {
                  setIsOpen(false);
                  onOpenQuote();
                }}
                className="w-full text-center py-3.5 rounded-none bg-white text-black text-xs font-display font-bold tracking-widest uppercase shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                id="mobile-get-quote-btn"
              >
                Get Custom Quote
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Little spacer warning for HMR socket block if present, completely unobtrusive */}
    </>
  );
}
