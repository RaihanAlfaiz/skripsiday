"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  currentIndex: number;
  items: string[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export default function Lightbox({
  isOpen,
  currentIndex,
  items,
  onClose,
  onPrev,
  onNext,
}: LightboxProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, onPrev, onNext]);

  if (!isOpen || items.length === 0) return null;

  const currentMedia = items[currentIndex];
  const isVideo = currentMedia?.toLowerCase().endsWith(".mov") || currentMedia?.toLowerCase().endsWith(".mp4") || currentMedia?.toLowerCase().endsWith(".webm");

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[10000] bg-[#090909]/95 backdrop-blur-2xl flex items-center justify-center select-none"
        onClick={onClose}
      >
        {/* Top Control Bar */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-50">
          <div className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase flex items-center gap-2">
            {isVideo && <Play className="w-3.5 h-3.5 fill-[#D4AF37]" />}
            <span>ARSIP MEMORI • {currentIndex + 1} / {items.length}</span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-[#111111] border border-[#333333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 shadow-lg"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-6 w-12 h-12 rounded-full bg-[#111111]/80 border border-[#333333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 z-50"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Active Media Container */}
        <motion.div
          key={currentMedia}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl max-h-[80vh] w-full h-full p-4 flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {isVideo ? (
            <video
              src={currentMedia}
              controls
              autoPlay
              playsInline
              className="max-w-full max-h-[75vh] rounded-2xl border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] object-contain"
            />
          ) : (
            <img
              src={currentMedia}
              alt={`Exhibition archive ${currentIndex + 1}`}
              className="max-w-full max-h-[75vh] rounded-2xl border border-[#D4AF37]/50 shadow-[0_0_50px_rgba(212,175,55,0.25)] object-contain"
            />
          )}
        </motion.div>

        {/* Next Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-6 w-12 h-12 rounded-full bg-[#111111]/80 border border-[#333333] hover:border-[#D4AF37] text-white hover:text-[#D4AF37] flex items-center justify-center transition-all duration-300 z-50"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Bottom Status Bar */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[11px] font-light text-[#A8A8A8] tracking-widest font-mono uppercase bg-[#111111]/80 px-4 py-1.5 rounded-full border border-[#222]">
          Gunakan panah keyboard [←] [→] untuk menjelajah • ESC untuk keluar
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
