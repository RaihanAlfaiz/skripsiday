"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Coffee, Building, BookOpen, Utensils, Award, Sparkles, X } from "lucide-react";

interface MapSpot {
  id: string;
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  tag: string;
  story: string;
  coords: { x: number; y: number }; // percentage position for interactive map grid
}

const memorySpots: MapSpot[] = [
  {
    id: "spot-1",
    title: "Kedai Kopi Langganan (Markas Dini Hari)",
    subtitle: "Saksi Bisu Malam-Malam Revisi",
    icon: <Coffee className="w-5 h-5 text-[#D4AF37]" />,
    tag: "MALAM PANJANG",
    story: "Di meja kayu sudut kedai inilah ribuan baris kalimat ditulis, diselingi tawa renyah saat lelah melanda, dan cangkir kopi yang hangat menjadi penyelamat energi kita.",
    coords: { x: 25, y: 35 },
  },
  {
    id: "spot-2",
    title: "Lorong Bimbingan & Depan Ruang Dosen",
    subtitle: "Tempat Saling Menguatkan saat Deg-degan",
    icon: <Building className="w-5 h-5 text-[#D4AF37]" />,
    tag: "DEBAR JANTUNG",
    story: "Menunggu giliran dipanggil bimbingan. Di lorong ini kita saling menggenggam tangan, merapikan naskah, dan meyakinkan bahwa kita bisa melaluinya.",
    coords: { x: 50, y: 25 },
  },
  {
    id: "spot-3",
    title: "Perpustakaan Kampus",
    subtitle: "Sudut Tenang Berbagi Cerita",
    icon: <BookOpen className="w-5 h-5 text-[#D4AF37]" />,
    tag: "PENCARIAN JURNAL",
    story: "Tumpukan buku tebal dan pencarian jurnal hingga sore. Di antara ketenangan perpustakaan, kita bisik-bisik bercanda agar tidak stres.",
    coords: { x: 75, y: 40 },
  },
  {
    id: "spot-4",
    title: "Tempat Kumpul & Makan Bersama",
    subtitle: "Pelipur Lelah Setelah Revisi ACC",
    icon: <Utensils className="w-5 h-5 text-[#D4AF37]" />,
    tag: "SELEBRASI KECIL",
    story: "Setiap kali bab naskah disetujui, di sinilah kita merayakannya dengan makanan favorit dan obrolan hangat tanpa henti.",
    coords: { x: 35, y: 70 },
  },
  {
    id: "spot-5",
    title: "Ruang Sidang Skripsi (Gedung Utama)",
    subtitle: "Puncak Perjuangan & Pelukan Lega",
    icon: <Award className="w-5 h-5 text-[#D4AF37]" />,
    tag: "MOMEN KEMENANGAN",
    story: "Pintu sidang terbuka, sorak kebahagiaan menggema, dan air mata haru menetes. Kita berlima lulus dan berhasil mengukir sejarah bersama!",
    coords: { x: 65, y: 65 },
  },
];

export default function MemoryMap() {
  const [activeSpot, setActiveSpot] = useState<MapSpot | null>(null);

  return (
    <section className="w-full py-24 px-6 bg-[#090909] relative overflow-hidden border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>PETA JEJAK KENANGAN</span>
          </div>

          <h2 className="font-serif-museum text-4xl sm:text-6xl text-white font-light tracking-[0.1em]">
            Lokasi Bersejarah Perjuangan
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-xl mx-auto italic">
            Klik pada pin lokasi di bawah ini untuk membuka kenangan di balik setiap sudut tempat yang pernah kita lewati bersama.
          </p>
        </div>

        {/* Interactive Map Visual Grid */}
        <div className="relative w-full aspect-[16/9] min-h-[400px] max-h-[550px] bg-[#111111] border border-[#D4AF37]/30 rounded-3xl overflow-hidden p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
          {/* Subtle Map Blueprint Grid lines */}
          <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

          {/* Golden Connecting Paths */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-[#D4AF37]/30 stroke-dasharray-4">
            <path d="M 25% 35% L 50% 25% L 75% 40% L 65% 65% L 35% 70% Z" fill="none" strokeWidth="2" strokeDasharray="6 6" />
          </svg>

          {/* Interactive Pins */}
          {memorySpots.map((spot) => (
            <button
              key={spot.id}
              onClick={() => setActiveSpot(spot)}
              style={{ left: `${spot.coords.x}%`, top: `${spot.coords.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 group focus:outline-none z-20"
            >
              <div className="relative flex flex-col items-center">
                {/* Glowing Pulse Ring */}
                <div className="absolute -inset-3 rounded-full bg-[#D4AF37]/20 group-hover:bg-[#D4AF37]/40 animate-ping pointer-events-none" />
                
                {/* Main Pin Badge */}
                <div className="w-11 h-11 rounded-full bg-[#090909] border border-[#D4AF37] group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-black flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300 transform group-hover:scale-110">
                  {spot.icon}
                </div>

                {/* Pin Tooltip Tag */}
                <span className="mt-2 px-3 py-1 rounded-full bg-[#090909]/90 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] uppercase font-mono tracking-widest whitespace-nowrap backdrop-blur-md group-hover:border-[#D4AF37]">
                  {spot.title.split(" (")[0]}
                </span>
              </div>
            </button>
          ))}
        </div>

        {/* Spot Details Popup Modal */}
        <AnimatePresence>
          {activeSpot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveSpot(null)}
              className="fixed inset-0 z-[10000] bg-[#090909]/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-lg w-full bg-[#111111] border border-[#D4AF37]/60 rounded-3xl p-8 shadow-[0_0_60px_rgba(212,175,55,0.3)] relative space-y-6"
              >
                <button
                  onClick={() => setActiveSpot(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#333] text-white hover:text-[#D4AF37] flex items-center justify-center transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-4">
                  <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/40 text-[#D4AF37]">
                    {activeSpot.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                      LOKASI KENANGAN • {activeSpot.tag}
                    </span>
                    <h3 className="font-serif-museum text-2xl text-white font-normal">
                      {activeSpot.title}
                    </h3>
                  </div>
                </div>

                <div className="border-t border-b border-[#222222] py-4 my-4 space-y-2">
                  <div className="text-xs text-[#D4AF37] font-mono italic">{activeSpot.subtitle}</div>
                  <p className="text-sm text-[#CCCCCC] font-light leading-relaxed italic">
                    &ldquo;{activeSpot.story}&rdquo;
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-[#A8A8A8] pt-2">
                  <span className="flex items-center gap-1.5 text-[#D4AF37]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Peta Abadi Thesis Museum
                  </span>
                  <button
                    onClick={() => setActiveSpot(null)}
                    className="px-4 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-semibold hover:bg-[#FFF6D6] transition-colors"
                  >
                    Tutup Cerita
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
