"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Film, Play, Pause, Volume2, VolumeX, Sparkles, Heart } from "lucide-react";

interface VideoCinemaProps {
  media: { src: string; type: "image" | "video" }[];
}

export default function VideoCinema({ media }: VideoCinemaProps) {
  // Filter for video files
  const videoItems = media.filter((m) => m.type === "video");

  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);

  if (videoItems.length === 0) {
    return null;
  }

  const currentVideo = videoItems[activeVideoIndex];

  return (
    <section className="w-full py-28 px-6 bg-[#090909] relative overflow-hidden border-t border-[#1F1F1F]">
      {/* Background Soft Gold Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#D4AF37]/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>RUANG TEATER SINEMATIK</span>
          </div>

          <h2 className="font-serif-museum text-4xl sm:text-6xl text-white font-light tracking-[0.1em]">
            Teater Kenangan Video
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-xl mx-auto italic">
            Dokumentasi video nyata dari Google Drive yang mengabadikan gelak tawa, momen bimbingan, dan kegembiraan hari sidang skripsi.
          </p>
        </div>

        {/* Featured Main Video Screen */}
        <div className="relative w-full aspect-[16/9] max-h-[650px] bg-[#000000] border-2 border-[#D4AF37]/60 rounded-3xl overflow-hidden shadow-[0_0_70px_rgba(212,175,55,0.25)] flex items-center justify-center group">
          <video
            key={currentVideo.src}
            src={currentVideo.src}
            autoPlay={isPlaying}
            loop
            muted={isMuted}
            playsInline
            controls
            className="w-full h-full object-contain"
          />

          {/* Video Title Overlay */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-20">
            <span className="px-4 py-1.5 rounded-full bg-[#090909]/80 border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] font-mono tracking-widest uppercase backdrop-blur-md">
              SINEMA #{activeVideoIndex + 1} / {videoItems.length}
            </span>
            <div className="flex items-center gap-1.5 text-xs text-white font-serif italic bg-[#090909]/80 px-3 py-1 rounded-full border border-[#333] backdrop-blur-md">
              <Heart className="w-3.5 h-3.5 text-[#D4AF37] fill-[#D4AF37]" />
              Dokumentasi Asli Google Drive
            </div>
          </div>
        </div>

        {/* Video Thumbnail Selector Carousel */}
        <div className="space-y-4 pt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              PILIH KLIP VIDEO PERJUANGAN ({videoItems.length} KLIP VIDEO)
            </span>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-none">
            {videoItems.map((item, idx) => {
              const isActive = idx === activeVideoIndex;

              return (
                <button
                  key={idx}
                  onClick={() => setActiveVideoIndex(idx)}
                  className={`relative flex-shrink-0 w-44 aspect-[16/9] rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    isActive
                      ? "border-[#D4AF37] scale-105 shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                      : "border-[#222222] opacity-60 hover:opacity-100 hover:border-[#D4AF37]/50"
                  }`}
                >
                  <video
                    src={item.src}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#090909]/40 flex items-center justify-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[#D4AF37] text-black" : "bg-[#090909]/80 text-[#D4AF37] border border-[#D4AF37]"}`}>
                      <Play className="w-3.5 h-3.5 fill-current" />
                    </div>
                  </div>
                  <div className="absolute bottom-1.5 left-2 text-[9px] font-mono text-white bg-[#090909]/80 px-1.5 py-0.5 rounded">
                    KLIP #{idx + 1}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
