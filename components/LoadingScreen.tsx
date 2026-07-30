"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFinished(true);
            setTimeout(onComplete, 800);
          }, 300);
          return 100;
        }
        return prev + Math.floor(Math.random() * 8) + 4;
      });
    }, 80);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-[#090909] flex flex-col items-center justify-center px-6 overflow-hidden select-none"
        >
          {/* Subtle background glow */}
          <div className="absolute w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none" />

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center space-y-4 relative z-10"
          >
            <span className="text-[11px] uppercase tracking-[0.4em] text-[#D4AF37] font-medium">
              Digital Archive • Sidang Skripsi
            </span>
            <h1 className="font-serif-museum text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.25em] text-white">
              THE THESIS MUSEUM
            </h1>
            <p className="text-xs sm:text-sm text-[#A8A8A8] font-light tracking-widest italic max-w-md mx-auto">
              &quot;Every thesis defense has a story worth remembering.&quot;
            </p>
          </motion.div>

          {/* Progress Bar Container */}
          <div className="mt-16 w-64 sm:w-80 space-y-3 relative z-10">
            <div className="h-[2px] w-full bg-[#1F1F1F] rounded-full overflow-hidden relative">
              <motion.div
                className="h-full bg-gradient-to-r from-[#D4AF37]/60 via-[#D4AF37] to-[#FFF6D6]"
                style={{ width: `${progress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>
            <div className="flex justify-between items-center text-[10px] tracking-widest text-[#A8A8A8]">
              <span>CURATING EXHIBITS</span>
              <span className="text-[#D4AF37] font-mono">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
