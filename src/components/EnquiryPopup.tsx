import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Sparkles, Send, CheckCircle2, IndianRupee } from "lucide-react";
import { EnquiryForm } from "../types";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectType?: string;
  initialBudget?: number;
}

export default function EnquiryPopup({
  isOpen,
  onClose,
  initialProjectType = "Premium Website Design",
  initialBudget = 20000,
}: EnquiryPopupProps) {
  const [formData, setFormData] = useState<EnquiryForm>({
    name: "",
    email: "",
    projectType: initialProjectType,
    budgetRange: initialBudget,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [infoTab, setInfoTab] = useState<"studio" | "designer">("studio");

  React.useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        projectType: initialProjectType,
        budgetRange: initialBudget,
      }));
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen, initialProjectType, initialBudget]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      return alert("Please enter your name and email to receive your quote!");
    }

    setIsSubmitting(true);

    // Simulate luxury API response / submit animation delay
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Store submission history in localStorage so users feel persistent utility
      const priorQuotes = JSON.parse(localStorage.getItem("aarohi_quotes") || "[]");
      localStorage.setItem(
        "aarohi_quotes",
        JSON.stringify([...priorQuotes, { ...formData, date: new Date().toISOString() }])
      );
    }, 1800);
  };

  const projectTypes = [
    { label: "Premium Web Design", value: "Premium Website Design" },
    { label: "Simple Landing Page", value: "Simple Website" },
    { label: "Graphic Post / Design", value: "Graphic Design Posts" },
    { label: "Custom UI/UX Consultation", value: "Custom Consultation" },
  ];

  // Helper to render appropriate suggestion note based on budget
  const getBudgetLabel = (val: number) => {
    if (val < 5000) return "Starter level design pack (+2,000 INR average)";
    if (val < 10000) return "Sleek simple landing page or premium deck layout";
    if (val < 20000) return "Custom multi-page high-fidelity UI design files";
    if (val < 30000) return "Top-tier premium end-to-end Figma & interactive prototype";
    return "Complete dynamic Web design, customized icons, & priority review session";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop with elegant heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            id="popup-backdrop"
          />

          {/* Form Container */}
          <motion.div
            initial={{ scale: 0.9, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-4xl overflow-y-auto max-h-[92vh] rounded-none glass-card text-white z-10 border border-white/15 bg-[#090611]/95 md:overflow-hidden"
            id="popup-container"
          >
            {/* Elegant decorative top-stripe */}
            <div className="h-1 bg-purple-500 w-full" />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-none border border-white/10 z-20"
              aria-label="Close modal"
              id="btn-close-popup"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-12 min-h-[500px]">
              {/* Left Column: Form Intake Section */}
              <div className="md:col-span-7 p-6 md:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-white/10">
                {!submitSuccess ? (
                  <form onSubmit={handleSubmit} className="space-y-5" id="quote-request-form">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-fuchsia-400 animate-pulse" />
                        <span className="text-[10px] font-mono tracking-widest text-fuchsia-400 uppercase">
                          Aarohi's Design Studio
                        </span>
                      </div>
                      <h3 className="text-xl md:text-2xl font-display font-black tracking-tight text-white uppercase col-span-full">
                        Request a Custom Quote
                      </h3>
                      <p className="text-[11px] text-slate-400 font-sans">
                        Let's collaborate! Answer a few details and receive a customized tailored project roadmap.
                      </p>
                    </div>

                    {/* Name field */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono text-slate-300 uppercase tracking-widest font-semibold">
                        Your Name *
                      </label>
                      <input
                        required
                        type="text"
                        className="w-full bg-black/40 border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-fuchsia-400 transition-all font-sans"
                        placeholder="Jane Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        id="input-name"
                      />
                    </div>

                    {/* Email field */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono text-slate-300 uppercase tracking-widest font-semibold">
                        Business Email *
                      </label>
                      <input
                        required
                        type="email"
                        className="w-full bg-black/40 border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-fuchsia-400 transition-all font-sans"
                        placeholder="jane@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        id="input-email"
                      />
                    </div>

                    {/* Project type pills */}
                    <div className="space-y-1.5">
                      <label className="block text-[9px] font-mono text-slate-300 uppercase tracking-widest font-semibold">
                        Project Category
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {projectTypes.map((type) => {
                          const isSelected = formData.projectType === type.value;
                          return (
                            <button
                              key={type.value}
                              type="button"
                              onClick={() => setFormData({ ...formData, projectType: type.value })}
                              className={`px-3 py-2 rounded-none text-[11px] font-sans transition-all text-left border flex items-center justify-between ${
                                isSelected
                                  ? "bg-purple-500/10 border-fuchsia-400 text-fuchsia-300 font-medium"
                                  : "bg-black/20 border-white/5 text-slate-400 hover:border-white/15"
                              }`}
                            >
                              <span>{type.label}</span>
                              {isSelected && (
                                <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-400 animate-ping" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Budget selection slider */}
                    <div className="space-y-2 bg-black/20 p-3.5 border border-white/10">
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-300 uppercase">
                        <span>Project Budget Range</span>
                        <span className="text-fuchsia-400 font-bold flex items-center text-xs">
                          <IndianRupee className="w-3 h-3 mr-0.5" />
                          {formData.budgetRange.toLocaleString("en-IN")} INR
                        </span>
                      </div>

                      <input
                        type="range"
                        min="2000"
                        max="40000"
                        step="1000"
                        className="w-full h-1 bg-white/10 appearance-none cursor-pointer accent-fuchsia-400"
                        value={formData.budgetRange}
                        onChange={(e) =>
                          setFormData({ ...formData, budgetRange: parseInt(e.target.value) })
                        }
                        id="slider-budget"
                      />

                      <div className="flex justify-between text-[8px] text-slate-500 font-mono">
                        <span>2K INR</span>
                        <span>15K INR</span>
                        <span>30K INR</span>
                        <span>40K Max</span>
                      </div>

                      <div className="text-[10px] text-slate-400 italic font-sans flex items-center gap-1.5 pt-1.5 border-t border-white/5">
                        <div className="w-1 h-1 bg-fuchsia-400" />
                        <span>{getBudgetLabel(formData.budgetRange)}</span>
                      </div>
                    </div>

                    {/* Message box */}
                    <div className="space-y-1">
                      <label className="block text-[9px] font-mono text-slate-300 uppercase tracking-widest font-semibold">
                        Project Goals & Message
                      </label>
                      <textarea
                        rows={2}
                        className="w-full bg-black/40 border border-white/15 rounded-none px-3 py-2 text-xs focus:outline-none focus:border-fuchsia-400 transition-all font-sans resize-none"
                        placeholder="Describe your vision, requirements, or visual specifications..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        id="input-message"
                      />
                    </div>

                    {/* Pre-submission notification of Direct payment */}
                    <div className="p-2.5 bg-purple-950/20 border border-purple-500/15 text-[10px] font-sans text-purple-200">
                      <p className="font-semibold leading-relaxed">
                        ⚡ <strong className="text-fuchsia-400">Express Retainer:</strong> Paytm Transfer available at <strong className="text-white select-all font-bold">Paytm No: 9826283294 (Nitin)</strong>. *After sending amount pls send the ss to <strong className="text-white select-all font-bold">9479672606</strong> for immediate confirmation.*
                      </p>
                    </div>

                    {/* Dynamic CTA */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative py-3 rounded-none bg-white text-black text-[10px] font-display font-bold tracking-widest uppercase hover:bg-neutral-200 active:scale-[0.98] transition-all flex items-center justify-center gap-2 overflow-hidden shadow-[0_0_15px_rgba(255,255,255,0.25)] cursor-pointer"
                      id="btn-submit-enquiry"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Crafting estimation...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Proposal Request</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  /* Animated success container */
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-8 px-2 text-center space-y-5"
                    id="submit-success-view"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -360 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", damping: 12, stiffness: 200, delay: 0.15 }}
                      className="w-14 h-14 rounded-none bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    >
                      <svg
                        className="w-8 h-8 text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <motion.path
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 0.7, ease: "easeOut", delay: 0.3 }}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </motion.div>

                    <div className="space-y-1.5">
                      <h3 className="text-xl font-display font-black text-white uppercase tracking-tight">
                        Proposal Submitted!
                      </h3>
                      <p className="text-slate-350 max-w-sm mx-auto text-xs font-sans leading-relaxed">
                        Thank you, <strong className="text-fuchsia-400">{formData.name}</strong>. Aarohi will personally review your goals for <strong className="font-semibold text-white">{formData.projectType}</strong> and follow up on <strong className="text-slate-200">{formData.email}</strong> within 12 hours with a bespoke proposal.
                      </p>
                    </div>

                    <div className="bg-neutral-950/80 border border-white/10 rounded-none p-3.5 w-full text-left space-y-1.5 max-w-xs mx-auto">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-fuchsia-400 font-bold">
                        Summary receipt
                      </span>
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-400">Project Type:</span>
                        <span className="text-white text-right font-medium">{formData.projectType}</span>
                      </div>
                      <div className="flex justify-between items-center text-[11px] font-mono">
                        <span className="text-slate-400">Budget Range:</span>
                        <span className="text-fuchsia-400 font-semibold font-bold">
                          {formData.budgetRange.toLocaleString("en-IN")} INR
                        </span>
                      </div>
                    </div>

                    {/* Highly-visible, beautiful bold payment instruction requested by user */}
                    <div className="bg-purple-950/30 border border-fuchsia-500/30 rounded-none p-3.5 w-full text-left space-y-2 max-w-xs mx-auto">
                      <span className="text-[9px] font-mono uppercase tracking-widest text-fuchsia-300 font-bold block border-b border-white/10 pb-1">
                        💳 SECURE PAYMENT METHOD
                      </span>
                      <div className="space-y-1.5 text-[11px] font-sans">
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">PAYTM METHOD:</span>
                          <strong className="text-white select-all font-black">PAYTM APP</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">PAYTM NO:</span>
                          <strong className="text-fuchsia-400 select-all font-black text-xs">9826283294</strong>
                        </div>
                        <div className="flex justify-between font-mono">
                          <span className="text-slate-400">ACCOUNT HOLDER:</span>
                          <strong className="text-white select-all font-black">NITIN</strong>
                        </div>
                        <div className="pt-1.5 border-t border-white/5 mt-1 text-center">
                          <p className="text-[11px] text-fuchsia-300 tracking-wide leading-relaxed font-sans font-bold">
                            After sending amount pls send the ss to 9479672606 for confirmation.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={onClose}
                      className="px-5 py-2.5 rounded-none bg-black hover:bg-neutral-900 text-fuchsia-400 text-[10px] font-mono uppercase tracking-widest border border-white/10 hover:border-fuchsia-400 transition-all font-sans cursor-pointer"
                      id="btn-close-success"
                    >
                      Return to Studio
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Right Column: Custom Brand Story spotlight with provided photo & philosophy */}
              <div className="md:col-span-5 p-6 md:p-8 bg-[#0c0819]/50 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  {/* Tab switchers */}
                  <div className="flex border-b border-white/10 pb-2">
                    <button
                      type="button"
                      onClick={() => setInfoTab("studio")}
                      className={`text-[9px] uppercase font-mono tracking-widest pb-1 transition-all border-b mr-4 cursor-pointer ${
                        infoTab === "studio"
                          ? "text-fuchsia-400 border-fuchsia-400 font-bold"
                          : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      ✦ The Studio ✦
                    </button>
                    <button
                      type="button"
                      onClick={() => setInfoTab("designer")}
                      className={`text-[9px] uppercase font-mono tracking-widest pb-1 transition-all border-b cursor-pointer ${
                        infoTab === "designer"
                          ? "text-fuchsia-400 border-fuchsia-400 font-bold"
                          : "text-slate-500 border-transparent hover:text-slate-300"
                      }`}
                    >
                      ✦ About Aarohi ✦
                    </button>
                  </div>

                  <AnimatePresence mode="wait">
                    {infoTab === "studio" ? (
                      <motion.div
                        key="studio-tab"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <h4 className="text-xs font-mono tracking-widest text-fuchsia-300 font-bold uppercase">
                          Design Studio by Aarohi
                        </h4>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed text-justify">
                          Where clarity meets creativity, turning ideas into clean and meaningful visual identities. At Design Studio Aarohi, every project begins with understanding the story behind a brand and shaping it into a simple, thoughtful, and visually strong design. The focus is on creating work that feels modern, balanced, and easy to connect with. From logos to complete branding systems, each detail is designed with care to reflect the true essence of the brand. The approach stays minimal yet expressive, ensuring that every design communicates clearly while still carrying personality. The goal is to build visuals that not only look good but also feel right and leave a lasting impression.
                        </p>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="designer-tab"
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-3"
                      >
                        <h4 className="text-xs font-mono tracking-widest text-fuchsia-300 font-bold uppercase">
                          Creative Visionary
                        </h4>
                        <p className="text-[11px] text-slate-300 font-sans leading-relaxed text-justify">
                          Aarohi is a creative designer behind Design Studio Aarohi, focused on building simple, thoughtful, and meaningful visual identities. With a strong eye for detail and balance, she believes good design should feel natural, clear, and easy to understand. Her approach is rooted in minimalism, where every element has a purpose and nothing feels unnecessary. She enjoys turning ideas into clean visual stories that reflect the personality of a brand. From logo design to complete branding, Aarohi works with the intention of making design feel personal yet professional. Her style is modern, calm, and detail-focused, aiming to create work that connects with people and leaves a subtle but lasting impression.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Aarohi's Photo embedded beautifully at the bottom of the column */}
                <div className="space-y-3">
                  <div className="relative aspect-[4/3] w-full overflow-hidden border border-white/10 group">
                    <img
                      src="/src/assets/images/aarohi_portrait_1780900990084.png"
                      alt="Aarohi Jain - Founder and Creator"
                      className="w-full h-full object-cover grayscale brightness-95 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    {/* Glowing aesthetic border overlap */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-950/80 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Caption badge overlay */}
                    <div className="absolute bottom-2.5 left-2.5 right-2.5 flex justify-between items-center bg-black/60 backdrop-blur-md border border-white/10 px-2 py-1.5 text-[9px] font-mono tracking-wider">
                      <span className="text-white uppercase font-bold">Aarohi Jain</span>
                      <span className="text-fuchsia-400">Lead Architect</span>
                    </div>
                  </div>
                  <div className="text-[8px] uppercase tracking-widest text-slate-500 font-mono text-center">
                    CRAFTSMANSHIP BORN FROM DEDICATION
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
