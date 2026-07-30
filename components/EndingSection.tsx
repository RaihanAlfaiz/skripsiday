"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart } from "lucide-react";
import { Member } from "../app/api/members/route";

interface EndingSectionProps {
  members: Member[];
}

export default function EndingSection({ members }: EndingSectionProps) {
  return (
    <section className="relative w-full min-h-screen py-32 px-6 bg-[#090909] flex flex-col items-center justify-center text-center overflow-hidden border-t border-[#1F1F1F]">
      {/* Background Slow Moving Lighting */}
      <div className="absolute w-[600px] h-[600px] bg-[#D4AF37]/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-4xl space-y-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="w-12 h-12 rounded-full bg-[#111111] border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37]"
        >
          <Sparkles className="w-5 h-5 animate-pulse" />
        </motion.div>

        {/* Main Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="space-y-4"
        >
          <h2 className="font-serif-museum text-4xl sm:text-7xl font-light text-white tracking-[0.15em] leading-tight">
            Lima cerita berbeda. <br />
            <span className="gold-text-gradient font-normal">Satu perjalanan yang indah.</span>
          </h2>
        </motion.div>

        {/* Five Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-4 text-sm sm:text-xl font-serif-museum text-[#E5E5E5] tracking-widest"
        >
          {members.map((m, idx) => (
            <React.Fragment key={m.id}>
              <span className="hover:text-[#D4AF37] transition-colors">{m.name}</span>
              {idx < members.length - 1 && <span className="text-[#D4AF37]">•</span>}
            </React.Fragment>
          ))}
        </motion.div>

        {/* Final Touching Message */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="pt-8 space-y-4 max-w-2xl mx-auto"
        >
          <p className="font-serif-museum text-xl sm:text-2xl text-[#A8A8A8] font-light italic leading-relaxed">
            &ldquo;Terima kasih telah bertahan di saat ingin menyerah, terima kasih telah saling merangkul di saat lelah teramat sangat.&rdquo;
          </p>
          <p className="font-serif-museum text-2xl sm:text-4xl text-white font-normal tracking-wide pt-2">
            Ini bukanlah akhir. <br />
            Ini adalah awal indah dari babak kehidupan kita selanjutnya.
          </p>
        </motion.div>

        {/* Heart Tribute */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="pt-12 flex items-center justify-center gap-2 text-xs text-[#888888] tracking-widest uppercase font-mono"
        >
          <span>Dibuat dengan segenap kasih sayang untuk</span>
          <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          <span>Amanda • Naila • Febianna • Hilman • Faisal</span>
        </motion.div>
      </div>
    </section>
  );
}
