"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, ArrowUpRight, Play } from "lucide-react";

interface ExhibitionCardProps {
  id: string;
  name: string;
  portrait: string;
  status: string;
  isHallOfMemories?: boolean;
  galleryCollageImages?: string[];
  onClick: () => void;
}

export default function ExhibitionCard({
  name,
  portrait,
  status,
  isHallOfMemories = false,
  galleryCollageImages = [],
  onClick,
}: ExhibitionCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const defaultCollage = [
    "/gallery/WhatsApp Image 2026-07-30 at 23.25.17.jpeg",
    "/gallery/WhatsApp Image 2026-07-30 at 23.25.18.jpeg",
    "/gallery/WhatsApp Image 2026-07-30 at 23.25.19.jpeg",
    "/gallery/WhatsApp Image 2026-07-30 at 23.25.20.jpeg",
  ];

  // Combine provided images with fallback defaults to ensure 4 items
  const displayItems =
    galleryCollageImages.length >= 4
      ? galleryCollageImages.slice(0, 4)
      : [...galleryCollageImages, ...defaultCollage].slice(0, 4);

  const isVideoFile = (path: string) => {
    if (!path) return false;
    const lower = path.toLowerCase();
    return lower.endsWith(".mov") || lower.endsWith(".mp4") || lower.endsWith(".webm");
  };

  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
      className="group relative cursor-pointer rounded-2xl bg-[#111111] border border-[#222222] overflow-hidden shadow-2xl hover:border-[#D4AF37]/80 hover:shadow-[0_0_35px_rgba(212,175,55,0.25)] transition-all duration-500"
    >
      {/* Card Top Image / Collage Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#090909]">
        {isHallOfMemories ? (
          // Hall of Memories Collage Layout
          <div className="relative w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1 bg-[#090909]">
            {displayItems.map((imgSrc, idx) => {
              const video = isVideoFile(imgSrc);

              return (
                <div key={idx} className="relative w-full h-full overflow-hidden bg-[#111111]">
                  {video ? (
                    <video
                      src={imgSrc}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className={`w-full h-full object-cover transition-transform duration-700 ${
                        isHovered ? "scale-110" : "scale-100"
                      }`}
                    />
                  ) : (
                    <Image
                      src={imgSrc || defaultCollage[idx % 4]}
                      alt={`Memory ${idx + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 25vw"
                      className={`object-cover transition-transform duration-700 ${
                        isHovered ? "scale-110" : "scale-100"
                      }`}
                    />
                  )}
                </div>
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/20 to-transparent pointer-events-none" />
          </div>
        ) : (
          // Member Portrait
          <>
            <Image
              src={portrait || defaultCollage[0]}
              alt={name}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className={`object-cover object-top transition-transform duration-700 ease-out ${
                isHovered ? "scale-110 brightness-105" : "scale-100 brightness-95"
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent pointer-events-none" />
          </>
        )}

        {/* Hover Gold Overlay Edge */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#D4AF37]/60 transition-colors pointer-events-none rounded-2xl" />

        {/* Corner Badge */}
        <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#090909]/80 backdrop-blur-md border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase font-semibold tracking-wider flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 text-[#D4AF37]" />
          <span>{status}</span>
        </div>
      </div>

      {/* Card Bottom Details */}
      <div className="p-6 bg-[#111111] relative z-10 flex flex-col justify-between border-t border-[#1F1F1F]">
        <div>
          <div className="text-[10px] tracking-[0.25em] text-[#D4AF37] uppercase font-medium">
            {isHallOfMemories ? "Grand Exhibition" : "Personal Exhibition"}
          </div>
          <h3 className="font-serif-museum text-2xl font-normal text-white mt-1 group-hover:text-[#D4AF37] transition-colors flex items-center justify-between">
            <span>{name}</span>
            <div className="w-8 h-8 rounded-full bg-[#1A1A1A] border border-[#333333] flex items-center justify-center group-hover:bg-[#D4AF37] group-hover:border-[#D4AF37] group-hover:text-black transition-all">
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </h3>
        </div>

        <p className="text-xs text-[#A8A8A8] mt-3 line-clamp-1 italic font-light">
          {isHallOfMemories
            ? "A place where every journey comes together in one eternal memory."
            : `Sidang Skripsi archive and personal journey of ${name}.`}
        </p>
      </div>
    </motion.div>
  );
}
