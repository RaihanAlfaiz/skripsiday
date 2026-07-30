"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillator1Ref = useRef<OscillatorNode | null>(null);
  const oscillator2Ref = useRef<OscillatorNode | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (gainNodeRef.current && audioCtxRef.current) {
        gainNodeRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
        setTimeout(() => {
          setIsPlaying(false);
        }, 500);
      }
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioCtx();
        }

        const ctx = audioCtxRef.current;
        if (ctx.state === "suspended") {
          ctx.resume();
        }

        // Master Gain
        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0, ctx.currentTime);
        masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm ambient synth oscillators (Deep warm museum atmosphere)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(164.81, ctx.currentTime); // E3 chord harmony

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(350, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(masterGain);

        osc1.start();
        osc2.start();

        oscillator1Ref.current = osc1;
        oscillator2Ref.current = osc2;

        setIsPlaying(true);
      } catch (e) {
        console.error("Audio initialization error:", e);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleAudio}
      aria-label="Toggle Museum Ambient Sound"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#111111]/80 backdrop-blur-md border border-[#D4AF37]/30 text-white hover:border-[#D4AF37] hover:shadow-[0_0_20px_rgba(212,175,55,0.2)] transition-all duration-300 group"
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
          <span className="text-xs font-medium tracking-wider text-[#D4AF37]">AMBIENT ON</span>
          <span className="flex items-center gap-0.5 h-3 ml-1">
            <span className="w-0.5 h-full bg-[#D4AF37] animate-bounce [animation-delay:0.1s]" />
            <span className="w-0.5 h-full bg-[#D4AF37] animate-bounce [animation-delay:0.3s]" />
            <span className="w-0.5 h-full bg-[#D4AF37] animate-bounce [animation-delay:0.2s]" />
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-[#A8A8A8] group-hover:text-white transition-colors" />
          <span className="text-xs font-medium tracking-wider text-[#A8A8A8] group-hover:text-white transition-colors">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
}
