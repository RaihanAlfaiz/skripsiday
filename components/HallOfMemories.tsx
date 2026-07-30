"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Grid, Heart, Play } from "lucide-react";
import Lightbox from "./Lightbox";

interface HallOfMemoriesProps {
  galleryImages: string[];
  onBack: () => void;
}

export default function HallOfMemories({
  galleryImages,
  onBack,
}: HallOfMemoriesProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const isVideoFile = (path: string) => {
    const lower = path.toLowerCase();
    return lower.endsWith(".mov") || lower.endsWith(".mp4") || lower.endsWith(".webm");
  };

  // Divide gallery into sections for varying luxury layouts
  const heroImage = galleryImages[0] || "/gallery/WhatsApp Image 2026-07-30 at 23.25.17.jpeg";
  const masonrySection = galleryImages.slice(1, 10);
  const horizontalStream = galleryImages.slice(10, 18);
  const polaroidWall = galleryImages.slice(18);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full min-h-screen bg-[#090909] text-white pt-28 pb-20 relative"
    >
      {/* Top Floating Navigation Header */}
      <div className="max-w-7xl mx-auto px-6 mb-8 flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-white text-xs font-medium tracking-widest uppercase hover:bg-[#D4AF37] hover:text-black transition-all duration-300 shadow-lg group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>← Kembali ke Museum</span>
        </button>

        <div className="text-xs tracking-widest text-[#D4AF37] font-mono hidden sm:block uppercase">
          RUANG DOKUMENTASI ULTIMATE • HALL OF MEMORIES
        </div>
      </div>

      {/* Main Title Section */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-4 my-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
          <Grid className="w-3.5 h-3.5" />
          <span>ARSIP DIGITAL UTAMA</span>
        </div>
        <h1 className="font-serif-museum text-4xl sm:text-7xl font-light tracking-[0.1em] text-white">
          Hall of Memories
        </h1>
        <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-xl mx-auto italic">
          Setiap momen manis, tawa lepas, video perjuangan, dan pelukan kemenangan disimulasikan di sini secara abadi.
        </p>
      </div>

      {/* Layout 1: Grand Featured Hero Media Banner */}
      {heroImage && (
        <div className="max-w-7xl mx-auto px-6 mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            onClick={() => openLightbox(0)}
            className="relative aspect-[21/9] w-full rounded-3xl overflow-hidden border border-[#D4AF37]/50 shadow-[0_0_60px_rgba(212,175,55,0.25)] cursor-pointer group bg-[#111111]"
          >
            {isVideoFile(heroImage) ? (
              <video
                src={heroImage}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
            ) : (
              <Image
                src={heroImage}
                alt="Hall of Memories Featured Highlight"
                fill
                sizes="100vw"
                className="object-cover group-hover:scale-105 transition-transform duration-1000"
                priority
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

            <div className="absolute bottom-8 left-8 right-8 flex items-end justify-between">
              <div>
                <span className="text-xs font-mono text-[#D4AF37] uppercase tracking-widest">
                  {isVideoFile(heroImage) ? "VIDEO SOROTAN UNGGULAN" : "SOROTAN KANVAS UTAMA"}
                </span>
                <h3 className="font-serif-museum text-2xl sm:text-4xl text-white font-light">
                  Momen Perjuangan Hari Sidang
                </h3>
              </div>
              <span className="px-4 py-2 rounded-full bg-[#111111]/80 border border-[#D4AF37]/50 text-xs font-medium text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                Buka Layar Penuh →
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Layout 2: Masonry Grid Layout */}
      <div className="max-w-7xl mx-auto px-6 mb-24 space-y-8">
        <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-4">
          <h2 className="font-serif-museum text-2xl sm:text-3xl text-white font-light">
            Galeri Masonry Kenangan
          </h2>
          <span className="text-xs font-mono text-[#D4AF37]">
            {galleryImages.length} MEDIA DOKUMENTASI
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((src, idx) => {
            const isVideo = isVideoFile(src);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 6) * 0.08, duration: 0.6 }}
                onClick={() => openLightbox(idx)}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#D4AF37] bg-[#111111] cursor-pointer group shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all duration-500"
              >
                {isVideo ? (
                  <>
                    <video
                      src={src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#090909]/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <Play className="w-4 h-4 fill-[#D4AF37]" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={src}
                    alt={`Masonry Exhibit ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-xs font-mono text-[#D4AF37]">ARSIP #{idx + 1}</span>
                    <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        items={galleryImages}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0))}
      />
    </motion.div>
  );
}
