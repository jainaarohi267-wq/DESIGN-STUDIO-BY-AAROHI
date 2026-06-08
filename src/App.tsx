import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { HelpCircle, ChevronUp, Sparkles, MessageSquare, Gem } from "lucide-react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import SEOShowcase from "./components/SEOShowcase";
import PortfolioSection from "./components/PortfolioSection";
import TestimonialsSection from "./components/TestimonialsSection";
import FooterSection from "./components/FooterSection";
import BackgroundParticles from "./components/BackgroundParticles";
import EnquiryPopup from "./components/EnquiryPopup";

export default function App() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedProjectType, setSelectedProjectType] = useState("Premium Website Design");
  const [selectedBudget, setSelectedBudget] = useState(25000);

  // Back to top indicator button states
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openQuoteWithDetails = (projectType: string, budget: number) => {
    setSelectedProjectType(projectType);
    setSelectedBudget(budget);
    setIsQuoteOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen font-sans bg-luxury-black text-white selection:bg-cyan-500/20 selection:text-cyan-300 overflow-x-hidden">
      
      {/* 1. Animated Diamond Shimmer Background Particles */}
      <BackgroundParticles />

      {/* 2. Glassmorphic Navigation Bar */}
      <Navbar onOpenQuote={() => openQuoteWithDetails("Premium Website Design", 25000)} />

      {/* 3. Main Content Structure */}
      <main className="relative z-15">
        
        {/* Hero Banner Section */}
        <HeroSection onOpenQuote={() => openQuoteWithDetails("Premium Website Design", 25000)} />

        {/* Modular Division Bar */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Pricing & Services Section */}
        <ServicesSection onSelectQuote={openQuoteWithDetails} />

        {/* Modular Division Bar */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* High-fidelity SEO Engine Optimization Module Showcase */}
        <SEOShowcase />

        {/* Modular Division Bar */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Portfolio Showcase Grid Section */}
        <PortfolioSection onSelectProject={openQuoteWithDetails} />

        {/* Modular Division Bar */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Sliding Testimonials Section */}
        <TestimonialsSection />

        {/* Modular Division Bar */}
        <div className="w-full max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
        </div>

        {/* Interactive FAQ Quick Section to add high-fidelity depth */}
        <section className="relative px-6 py-20 max-w-4xl mx-auto z-10" id="faq">
          <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Common Inquiries
              </span>
            </div>
            <h3 className="text-2xl md:text-3xl font-display font-medium text-white tracking-tight">
              Design Partnership Logistics
            </h3>
          </div>

          <div className="space-y-4">
            <div className="p-5 rounded-none bg-neutral-950 border border-white/10 space-y-2">
              <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-cyan-400" />
                How fast is the Graphic Post delivery?
              </h4>
              <p className="text-xs text-slate-400 font-sans pl-3.5 leading-relaxed">
                Single graphic templates or custom social posts are built and completely exported inside 24 to 48 hours. Aarohi aligns with your social color strategy for instant deployment.
              </p>
            </div>

            <div className="p-5 rounded-none bg-neutral-950 border border-white/10 space-y-2">
              <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#8b5cf6]" />
                Do I receive the raw source files?
              </h4>
              <p className="text-xs text-slate-400 font-sans pl-3.5 leading-relaxed">
                Yes, absolutely! Every blueprint and layout includes highly components-structured Figma source directories, optimized vector exports, and high-fidelity style systems ready for developer handoff.
              </p>
            </div>

            <div className="p-5 rounded-none bg-neutral-950 border border-white/10 space-y-2">
              <h4 className="text-sm font-display font-bold text-white flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#d946ef]" />
                Can Aarohi implement/develop code also?
              </h4>
              <p className="text-xs text-slate-400 font-sans pl-3.5 leading-relaxed">
                Yes! While Aarohi is a premier UI/UX architect, she delivers complete, tailored React/Tailwind frontends ready for launch, fitting simple website layouts beautifully.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* 4. Luxury Footer Area */}
      <FooterSection onOpenQuote={() => openQuoteWithDetails("Premium Website Design", 25000)} />

      {/* 5. Glowing Floating Actions (CTA + Scroll up) */}
      <div className="fixed bottom-6 right-6 z-45 flex flex-col gap-3">
        {/* Back to top bullet */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              onClick={scrollToTop}
              className="w-10 h-10 rounded-none bg-zinc-900 border border-white/20 text-slate-300 hover:text-white flex items-center justify-center backdrop-blur-md hover:border-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-xl cursor-pointer"
              aria-label="Scroll back to top"
              id="floating-btn-scroll-top"
            >
              <ChevronUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Glowing floating quote helper widget */}
        <button
          onClick={() => openQuoteWithDetails("Premium Website Design", 25000)}
          className="relative w-12 h-12 rounded-none bg-white text-black flex items-center justify-center cursor-pointer shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-110 active:scale-95 transition-all group animate-bounce"
          style={{ animationDuration: "3s" }}
          aria-label="Open immediate quote checklist"
          id="floating-btn-quote-glowing"
        >
          {/* Subtle spinning sparkle halo around floating button */}
          <div className="absolute inset-0 border border-white/30 animate-pulse scale-110 group-hover:scale-125 transition-all" />
          <Gem className="w-5 h-5" />
        </button>
      </div>

      {/* 6. Submission Enquiry Modal Form */}
      <EnquiryPopup
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProjectType={selectedProjectType}
        initialBudget={selectedBudget}
      />
    </div>
  );
}
