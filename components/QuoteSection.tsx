"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface QuoteSectionProps {
  quote?: string;
}

export default function QuoteSection({
  quote = "The defense may be over, but the memories will always remain.",
}: QuoteSectionProps) {
  return (
    <section className="w-full py-28 px-6 bg-[#090909] relative overflow-hidden flex items-center justify-center">
      {/* Glow Center */}
      <div className="absolute w-[450px] h-[450px] bg-[#D4AF37]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-4xl text-center space-y-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-12 h-12 rounded-full bg-[#111111] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]"
        >
          <Quote className="w-5 h-5" />
        </motion.div>

        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-serif-museum text-3xl sm:text-5xl md:text-6xl text-white font-light leading-tight tracking-wide"
        >
          &ldquo;{quote}&rdquo;
        </motion.blockquote>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto pt-4"
        />
      </div>
    </section>
  );
}
