import React, { useEffect, useState, useRef, TouchEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { Testimonial } from "../types";

export default function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      id: "t1",
      name: "Seraphina Croft",
      role: "Design Lead & Founder",
      company: "Opal Luxe Cosmetics",
      review: "The graphics Aarohi produced for our premium holiday line were absolutely majestic. Her eye for high-end luxury diamond themes, subtle shimmer highlights, and clean typography made our launch campaigns convert at a record 12% rate! She delivers absolute world-class craft, always on time.",
      rating: 5,
      avatarSeed: "Seraphina",
    },
    {
      id: "t2",
      name: "Marcus Vance",
      role: "VP of Product",
      company: "Nexura Fintech",
      review: "Aarohi transformed our dense financial tracking dashboard from complex into incredibly intuitive. Her understanding of interactive micro-animations and structural hierarchy was phenomenal. The responsive design is perfectly seamless across both iOS and desktop views. A master UI/UX strategist!",
      rating: 5,
      avatarSeed: "Marcus",
    },
    {
      id: "t3",
      name: "Aryan Mehta",
      role: "Technical Architect",
      company: "FlowState Platform",
      review: "Dealing with designers who write clean system code or export developer-friendly files is rare. Aarohi's Figma layout trees are pixel perfect, completely styled with component classes that align with standard styling frameworks. Simply unmatched speed and artistic polish!",
      rating: 5,
      avatarSeed: "Aryan",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  // Swipe support parameters
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  const startAutoPlay = () => {
    stopAutoPlay();
    autoPlayTimer.current = setInterval(() => {
      handleNext();
    }, 6000); // 6s auto scroll
  };

  const stopAutoPlay = () => {
    if (autoPlayTimer.current) {
      clearInterval(autoPlayTimer.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }
    return () => stopAutoPlay();
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeDistance = touchStartX.current - touchEndX.current;
    if (swipeDistance > 52) {
      // swipe left => next
      handleNext();
    } else if (swipeDistance < -52) {
      // swipe right => prev
      handlePrev();
    }
  };

  const active = testimonials[currentIndex];

  return (
    <section className="relative px-6 py-20 bg-[#07070c]/50 border-y border-white/[0.03] overflow-hidden z-10" id="testimonials">
      {/* Visual background lights for carousel focus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[30vh] h-[30vh] bg-pink-500/5 blur-[80px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Carousel Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/[0.03] border border-white/5 rounded-full backdrop-blur-md">
            <Sparkles className="w-3 text-cyan-300 animate-pulse" />
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-300">
              Verified Client Trust
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-medium text-white tracking-tight">
            Loved by Fast-Growing Teams & Brands
          </h2>
        </div>

        {/* Testimonials Frame with Swipe/Tilt listeners */}
        <div
          className="relative min-h-[380px] md:min-h-[340px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, x: 50, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -50, scale: 0.96 }}
              transition={{ duration: 0.45, ease: "easeInOut" }}
              className="w-full rounded-none bg-[#0a0a0a] p-8 md:p-12 border border-white/10 flex flex-col justify-between space-y-6 relative"
              id={`testimonial-slide-${active.id}`}
            >
              {/* Giant quote background asset */}
              <Quote className="absolute top-6 left-6 w-20 h-20 text-white/[0.015] pointer-events-none" />

              <div className="space-y-6 relative z-10">
                {/* Gold Stars Glowing with subtle pulsing anim */}
                <div className="flex gap-1">
                  {Array.from({ length: active.rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
                    >
                      <Star className="w-4.5 h-4.5 fill-cyan-400 text-cyan-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Review Text */}
                <blockquote className="text-sm md:text-lg text-slate-200 font-sans leading-relaxed italic">
                  "{active.review}"
                </blockquote>
              </div>

              {/* Author Footer */}
              <div className="flex items-center gap-4 border-t border-white/10 pt-6 relative z-10">
                {/* Creative dynamic avatar initials styled like a diamond */}
                <div className="w-11 h-11 rounded-none bg-[#050505] border border-white/15 flex items-center justify-center font-display font-medium text-cyan-400 text-sm tracking-wider uppercase flex-shrink-0">
                  {active.name.split(" ").map(n => n[0]).join("")}
                </div>

                <div>
                  <h4 className="text-sm font-display font-bold text-white tracking-wide">
                    {active.name}
                  </h4>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">
                    {active.role} at <strong className="text-slate-300 font-medium">{active.company}</strong>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls with indices */}
        <div className="flex items-center justify-between mt-8 px-2">
          {/* Navigation Indicators dots */}
          <div className="flex gap-2">
            {testimonials.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-none transition-all duration-300 ${
                  currentIndex === idx ? "w-8 bg-cyan-405 bg-cyan-400" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
                id={`carousel-dot-${idx}`}
              />
            ))}
          </div>

          {/* Nav arrows with premium feel */}
          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              className="w-10 h-10 rounded-none bg-neutral-950 hover:bg-[#0c0c0c] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors transition-transform active:scale-95 cursor-pointer"
              aria-label="Previous testimonial"
              id="btn-carousel-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-10 h-10 rounded-none bg-neutral-950 hover:bg-[#0c0c0c] border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition-colors transition-transform active:scale-95 cursor-pointer"
              aria-label="Next testimonial"
              id="btn-carousel-next"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Mobile Swipe Hint */}
        <div className="text-center mt-6 block md:hidden text-[11px] font-mono text-slate-500 uppercase tracking-widest animate-pulse">
          ← Swipe left or right to browse →
        </div>
      </div>
    </section>
  );
}
