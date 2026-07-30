"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Ticket, ShieldCheck, Sparkles, Award, X } from "lucide-react";
import { Member } from "../app/api/members/route";

interface VipPassBadgeProps {
  members: Member[];
}

export default function VipPassBadge({ members }: VipPassBadgeProps) {
  const [selectedPass, setSelectedPass] = useState<Member | null>(null);

  return (
    <section className="w-full py-24 px-6 bg-[#090909] relative overflow-hidden border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <Ticket className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>TIKET KEHORMATAN MUSEUM DIGITAL</span>
          </div>

          <h2 className="font-serif-museum text-4xl sm:text-6xl text-white font-light tracking-[0.1em]">
            VIP Museum Passes
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-xl mx-auto italic">
            Kartu kehormatan seumur hidup yang membuktikan keabadian perjuangan dan persahabatan Amanda, Naila, Febianna, Hilman, dan Faisal.
          </p>
        </div>

        {/* 5 Passes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -10, scale: 1.03 }}
              onClick={() => setSelectedPass(member)}
              className="bg-[#111111] border border-[#D4AF37]/50 rounded-2xl p-5 cursor-pointer group shadow-[0_0_25px_rgba(212,175,55,0.15)] hover:shadow-[0_0_40px_rgba(212,175,55,0.35)] hover:border-[#D4AF37] transition-all duration-500 relative flex flex-col justify-between"
            >
              {/* Top Golden Holographic Bar */}
              <div className="flex items-center justify-between border-b border-[#D4AF37]/30 pb-3 mb-4">
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">
                  VIP PASS • 2026
                </span>
                <Award className="w-4 h-4 text-[#D4AF37]" />
              </div>

              {/* Portrait */}
              <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-[#090909] border border-[#222222] mb-4">
                <Image
                  src={member.portrait}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, 20vw"
                  className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-60" />
              </div>

              {/* Details */}
              <div className="space-y-1 text-center">
                <div className="text-[9px] uppercase font-mono tracking-widest text-[#D4AF37]">
                  ANGGOTA KEHORMATAN
                </div>
                <h3 className="font-serif-museum text-lg text-white font-normal group-hover:text-[#D4AF37] transition-colors">
                  {member.name}
                </h3>
                <p className="text-[10px] text-[#A8A8A8] italic line-clamp-1">
                  {member.appreciationTitle}
                </p>
              </div>

              {/* Barcode Mock */}
              <div className="mt-4 pt-3 border-t border-[#1F1F1F] flex items-center justify-between text-[8px] font-mono text-[#666]">
                <span>PASS #{member.id.toUpperCase()}-2026</span>
                <span className="text-[#D4AF37]">LIFETIME</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Selected Pass Modal View */}
        <AnimatePresence>
          {selectedPass && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPass(null)}
              className="fixed inset-0 z-[10000] bg-[#090909]/90 backdrop-blur-xl flex items-center justify-center p-6 select-none"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.9, rotateY: 15 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full bg-[#111111] border-2 border-[#D4AF37] rounded-3xl p-8 shadow-[0_0_70px_rgba(212,175,55,0.4)] relative space-y-6 overflow-hidden"
              >
                {/* Background Holographic Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#D4AF37]/5 to-transparent pointer-events-none" />

                <button
                  onClick={() => setSelectedPass(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#333] text-white hover:text-[#D4AF37] flex items-center justify-center transition-colors z-20"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Pass Header */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#D4AF37] text-black flex items-center justify-center font-bold">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37]">
                      OFFICIAL LIFETIME MUSEUM PASS
                    </div>
                    <h3 className="font-serif-museum text-2xl text-white">
                      {selectedPass.name}
                    </h3>
                  </div>
                </div>

                {/* Large Portrait Frame */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden border border-[#D4AF37]/50 shadow-xl bg-[#090909]">
                  <Image
                    src={selectedPass.portrait}
                    alt={selectedPass.name}
                    fill
                    sizes="400px"
                    className="object-cover object-top"
                  />
                </div>

                {/* Details Box */}
                <div className="bg-[#090909] border border-[#222222] p-4 rounded-xl space-y-2 text-xs">
                  <div className="flex justify-between border-b border-[#1F1F1F] pb-2">
                    <span className="text-[#A8A8A8] font-mono">STATUS:</span>
                    <span className="text-[#D4AF37] font-semibold">LULUS SIDANG SKRIPSI</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1F1F1F] pb-2">
                    <span className="text-[#A8A8A8] font-mono">GELAR PERJUANGAN:</span>
                    <span className="text-white font-medium">{selectedPass.appreciationTitle}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-[#A8A8A8] font-mono">HAK AKSES:</span>
                    <span className="text-[#D4AF37] font-mono">MUSEUM ANGGOTA SEUMUR HIDUP</span>
                  </div>
                </div>

                {/* Barcode & Footer */}
                <div className="flex items-center justify-between text-[10px] font-mono text-[#888] pt-2 border-t border-[#1F1F1F]">
                  <div className="flex items-center gap-1.5 text-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Verified Thesis Museum Exhibit
                  </div>
                  <button
                    onClick={() => setSelectedPass(null)}
                    className="px-4 py-2 rounded-full bg-[#D4AF37] text-black font-semibold hover:bg-[#FFF6D6] transition-colors"
                  >
                    Tutup Pass
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
