"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Sparkles, Camera, Play } from "lucide-react";
import Lightbox from "./Lightbox";

interface MemoryWallProps {
  images: string[];
}

export default function MemoryWall({ images }: MemoryWallProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const isVideo = (path: string) => {
    const lower = path.toLowerCase();
    return lower.endsWith(".mov") || lower.endsWith(".mp4") || lower.endsWith(".webm");
  };

  const handleOpen = (index: number) => {
    setActiveIndex(index);
    setLightboxOpen(true);
  };

  // Preset tilts for polaroid aesthetic
  const tilts = [-3, 2, -1, 3, -2, 1, -4, 2, -2, 3];

  return (
    <section className="w-full py-24 px-6 bg-[#090909] relative overflow-hidden border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <Camera className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>DINDING POLAROID ABADI</span>
          </div>
          <h2 className="font-serif-museum text-4xl sm:text-5xl text-white font-light tracking-[0.1em]">
            Memory Wall
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-lg mx-auto italic">
            Kumpulan potret polaroid dan video dokumentasi nyata dari momen-momen manis kita.
          </p>
        </div>

        {/* Polaroid Masonry Wall */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((src, idx) => {
            const tilt = tilts[idx % tilts.length];
            const videoItem = isVideo(src);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, rotate: tilt, scale: 0.9 }}
                whileInView={{ opacity: 1, rotate: tilt, scale: 1 }}
                viewport={{ once: true }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 30 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleOpen(idx)}
                className="bg-[#FAFAFA] p-4 pb-6 rounded-sm shadow-2xl cursor-pointer group border border-[#DDD] hover:border-[#D4AF37] transition-all duration-300 relative"
              >
                {/* Gold Tape Accent */}
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-[#D4AF37]/30 backdrop-blur-sm border border-[#D4AF37]/50 rotate-[-2deg] shadow-sm z-20 pointer-events-none" />

                {/* Photo Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#111111] rounded-sm">
                  {videoItem ? (
                    <>
                      <video
                        src={src}
                        muted
                        loop
                        playsInline
                        autoPlay
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-2 right-2 w-7 h-7 rounded-full bg-[#090909]/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                        <Play className="w-3.5 h-3.5 fill-[#D4AF37]" />
                      </div>
                    </>
                  ) : (
                    <Image
                      src={src}
                      alt={`Memory Wall Polaroid ${idx + 1}`}
                      fill
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  )}
                </div>

                {/* Handwritten Style Caption */}
                <div className="pt-4 flex items-center justify-between text-[#222222]">
                  <span className="font-serif italic text-xs font-semibold">
                    {videoItem ? "Momen Video" : `Kenangan #${idx + 1}`}
                  </span>
                  <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={activeIndex}
        items={images}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        onNext={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
