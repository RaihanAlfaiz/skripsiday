"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronDown, ArrowRight, ShieldCheck } from "lucide-react";

interface LandingHeroProps {
  onEnter: () => void;
}

export default function LandingHero({ onEnter }: LandingHeroProps) {
  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden bg-[#090909]">
      {/* Subtle Lighting Spotlights */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-[#D4AF37]/3 rounded-full blur-[160px] pointer-events-none" />

      {/* Hero Content Box */}
      <div className="max-w-4xl text-center space-y-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111]/80 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase backdrop-blur-sm"
        >
          <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
          <span>Exhibition of Sidang Skripsi</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="font-serif-museum text-4xl sm:text-7xl md:text-8xl font-light tracking-[0.2em] text-white leading-tight"
        >
          THE THESIS <br />
          <span className="gold-text-gradient font-normal">MUSEUM</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-base sm:text-xl text-[#A8A8A8] font-light tracking-wide max-w-2xl mx-auto italic"
        >
          &quot;Every thesis defense has a story worth remembering.&quot;
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6"
        >
          <button
            onClick={onEnter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] border border-[#D4AF37] text-white font-medium text-sm tracking-[0.15em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:shadow-[0_0_50px_rgba(212,175,55,0.5)]"
          >
            <span>Enter Museum</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer text-[#A8A8A8] hover:text-[#D4AF37] transition-colors"
        onClick={onEnter}
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll or Click to Begin</span>
        <ChevronDown className="w-4 h-4 animate-bounce text-[#D4AF37]" />
      </motion.div>
    </section>
  );
}
