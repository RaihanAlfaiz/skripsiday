"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart, Grid, Play } from "lucide-react";
import Lightbox from "./Lightbox";

interface SharedGalleryProps {
  images: string[];
}

export default function SharedGallery({ images }: SharedGalleryProps) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const isVideo = (path: string) => {
    const lower = path.toLowerCase();
    return lower.endsWith(".mov") || lower.endsWith(".mp4") || lower.endsWith(".webm");
  };

  const handleOpen = (idx: number) => {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#090909]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
            MEMORI KELOMPOK
          </span>
          <h2 className="font-serif-museum text-4xl sm:text-5xl text-white font-light tracking-[0.1em]">
            Galeri Kenangan Bersama
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-lg mx-auto italic">
            Klik foto atau video dokumentasi untuk memperbesar dan merasakan kembali momentum indah tersebut.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {images.map((src, idx) => {
            const videoItem = isVideo(src);

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: (idx % 8) * 0.05, duration: 0.5 }}
                onClick={() => handleOpen(idx)}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#222222] hover:border-[#D4AF37] bg-[#111111] cursor-pointer group shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.25)] transition-all duration-500"
              >
                {videoItem ? (
                  <>
                    <video
                      src={src}
                      muted
                      loop
                      playsInline
                      autoPlay
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#090909]/80 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                      <Play className="w-3.5 h-3.5 fill-[#D4AF37]" />
                    </div>
                  </>
                ) : (
                  <Image
                    src={src}
                    alt={`Shared gallery item ${idx + 1}`}
                    fill
                    sizes="(max-width: 640px) 100vw, 25vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-[#090909]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <div className="flex justify-between items-center w-full">
                    <span className="text-[10px] font-mono text-[#D4AF37]">
                      {videoItem ? "VIDEO DOKUMENTASI" : `FOTO #${idx + 1}`}
                    </span>
                    <Heart className="w-4 h-4 text-[#D4AF37] fill-[#D4AF37]" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <Lightbox
        isOpen={lightboxOpen}
        currentIndex={lightboxIndex}
        items={images}
        onClose={() => setLightboxOpen(false)}
        onPrev={() => setLightboxIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
        onNext={() => setLightboxIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
      />
    </section>
  );
}
