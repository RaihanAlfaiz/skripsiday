"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Heart, Sparkles, HeartHandshake, Quote } from "lucide-react";
import Timeline from "./Timeline";
import SharedGallery from "./SharedGallery";
import MuseumItem from "./MuseumItem";
import QuoteSection from "./QuoteSection";
import { Member } from "../app/api/members/route";

interface PersonalExhibitionProps {
  member: Member;
  galleryImages: string[];
  onBack: () => void;
}

export default function PersonalExhibition({
  member,
  galleryImages,
  onBack,
}: PersonalExhibitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-[#090909] text-white pt-28 pb-20 relative"
    >
      {/* Return to Museum Top Floating Action */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-white text-xs font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Kembali ke Museum</span>
        </button>

        <div className="text-xs tracking-widest text-[#D4AF37] font-mono hidden sm:block uppercase">
          RUANG APRESIASl • {member.name.toUpperCase()}
        </div>
      </div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-12">
        {/* Left Info Column */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/60 text-[#D4AF37] text-xs font-medium tracking-widest uppercase flex items-center gap-2">
              <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
              Sahabat Perjuangan
            </span>
            <span className="px-4 py-1.5 rounded-full bg-[#111111] border border-[#333333] text-[#A8A8A8] text-xs font-medium tracking-widest uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Sidang Skripsi Selesai
            </span>
          </div>

          <h1 className="font-serif-museum text-5xl sm:text-7xl font-light text-white tracking-[0.1em] leading-tight">
            Untuk Sahabat Kita, <br />
            <span className="gold-text-gradient font-normal">{member.name}</span>
          </h1>

          {/* Sweet Appreciation Title Card */}
          <div className="bg-[#111111] border border-[#D4AF37]/30 p-6 rounded-2xl space-y-3 relative overflow-hidden shadow-xl">
            <div className="flex items-center gap-2 text-xs text-[#D4AF37] font-mono uppercase tracking-widest">
              <HeartHandshake className="w-4 h-4" />
              <span>{member.appreciationTitle}</span>
            </div>
            <p className="text-sm sm:text-base text-[#E5E5E5] font-light leading-relaxed italic">
              &ldquo;{member.appreciationMessage}&rdquo;
            </p>
          </div>

          {/* Emotional Quote */}
          <div className="flex items-start gap-3 pt-2">
            <Quote className="w-6 h-6 text-[#D4AF37] shrink-0 mt-1" />
            <p className="text-sm text-[#A8A8A8] font-light italic leading-relaxed">
              &ldquo;{member.quote}&rdquo;
            </p>
          </div>
        </div>

        {/* Right Large Cinematic Image Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-5 relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] bg-[#111111]"
        >
          <Image
            src={member.portrait}
            alt={member.name}
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#090909]/85 backdrop-blur-md border border-[#D4AF37]/30 flex items-center justify-between">
            <span className="text-xs font-serif-museum text-white">Kenangan Indah {member.name}</span>
            <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
          </div>
        </motion.div>
      </div>

      {/* Story Timeline */}
      <Timeline timeline={member.timeline} memberName={member.name} />

      {/* Memorabilia Relics */}
      <MuseumItem />

      {/* Shared Journey Gallery */}
      <SharedGallery images={galleryImages} />

      {/* Quote Section */}
      <QuoteSection quote="Sidang skripsi mungkin telah berakhir, namun kasih sayang dan kenangan ini akan selalu hidup selamanya." />

      {/* Bottom Return Button */}
      <div className="max-w-7xl mx-auto px-6 pt-12 text-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#111111] border border-[#D4AF37] text-white text-xs font-medium tracking-[0.2em] uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-500 shadow-[0_0_30px_rgba(212,175,55,0.2)] group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Kembali ke Lobi Museum</span>
        </button>
      </div>
    </motion.div>
  );
}
