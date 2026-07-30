"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Laptop, Coffee, StickyNote, Book, Presentation, X, Heart } from "lucide-react";

interface MemorabiliaObject {
  id: string;
  name: string;
  icon: React.ReactNode;
  tagline: string;
  description: string;
  exhibitNumber: string;
}

const memorabiliaItems: MemorabiliaObject[] = [
  {
    id: "thesis-cover",
    name: "Berkas Naskah Skripsi",
    icon: <FileText className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Saksi Bisu Perjuangan",
    description: "Bukan sekadar lembaran naskah biasa, tapi tumpahan air mata, doa orang tua, dan genggaman tangan sahabat yang tak pernah melepas kita saat jemari hampir menyerah.",
    exhibitNumber: "KENANGAN 01",
  },
  {
    id: "laptop",
    name: "Layar & Laptop Perjuangan",
    icon: <Laptop className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Penerang Malam Panik",
    description: "Saksi bisu malam-malam tanpa tidur, berpendar hangat hingga terbit fajar, dan panggilan video darurat tempat kita saling meyakinkan: 'Kita pasti lulus bareng.'",
    exhibitNumber: "KENANGAN 02",
  },
  {
    id: "coffee",
    name: "Cangkir Kopi Dini Hari",
    icon: <Coffee className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Hangat Penawar Lelah",
    description: "Seteguk demi seteguk hangat kopi menemani rasa lelah yang teramat sangat. Menjadi penyambung energi dan tawa hambar di jam 3 pagi.",
    exhibitNumber: "KENANGAN 03",
  },
  {
    id: "notes",
    name: "Coretan & Catatan Bimbingan",
    icon: <StickyNote className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Jejak Keteguhan",
    description: "Coretan yang pernah membuat jantung berdebar keras, namun kini menjadi bukti betapa gigihnya kita melangkah tanpa pernah mundur sedikit pun.",
    exhibitNumber: "KENANGAN 04",
  },
  {
    id: "references",
    name: "Buku & Jurnal Referensi",
    icon: <Book className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Cerita Di Perpustakaan",
    description: "Tumpukan berkas yang kita buka bersama, di mana bisik-bisik semangat dan canda tawa menyelinap di antara rasa cemas menghadapi sidang.",
    exhibitNumber: "KENANGAN 05",
  },
  {
    id: "slides",
    name: "Slide Presentasi Hari Sidang",
    icon: <Presentation className="w-8 h-8 text-[#D4AF37]" />,
    tagline: "Momentum Kemenangan",
    description: "Slide yang disusun dengan kehati-hatian dan cinta. Mengantarkan kita pada momen penuh haru di mana pelukan lega menyambut kemenangan kita.",
    exhibitNumber: "KENANGAN 06",
  },
];

export default function MuseumItem() {
  const [activeItem, setActiveItem] = useState<MemorabiliaObject | null>(null);

  return (
    <section className="w-full py-24 px-6 bg-[#090909]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
            SIMBOL PERJUANGAN
          </span>
          <h2 className="font-serif-museum text-4xl sm:text-5xl text-white font-light tracking-[0.1em]">
            Benda-Benda Bersejarah
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-lg mx-auto italic">
            Klik pada setiap peninggalan museum untuk membuka kenangan di balik perjalanan sidang skripsi.
          </p>
        </div>

        {/* Relics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {memorabiliaItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              onClick={() => setActiveItem(item)}
              className="bg-[#111111] border border-[#222222] hover:border-[#D4AF37] p-8 rounded-2xl cursor-pointer group shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.2)] transition-all duration-500 relative"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="p-4 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] group-hover:border-[#D4AF37]/50 group-hover:bg-[#D4AF37]/10 transition-all">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase bg-[#111111] px-2.5 py-1 rounded-full border border-[#D4AF37]/30">
                  {item.exhibitNumber}
                </span>
              </div>

              <h3 className="font-serif-museum text-xl text-white group-hover:text-[#D4AF37] transition-colors">
                {item.name}
              </h3>
              <p className="text-xs text-[#A8A8A8] mt-1 font-light italic">
                {item.tagline}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Artifact Details Popup Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[10000] bg-[#090909]/90 backdrop-blur-xl flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-lg w-full bg-[#111111] border border-[#D4AF37]/60 rounded-3xl p-8 shadow-[0_0_60px_rgba(212,175,55,0.3)] relative space-y-6"
            >
              <button
                onClick={() => setActiveItem(null)}
                className="absolute top-6 right-6 w-9 h-9 rounded-full bg-[#1A1A1A] border border-[#333] text-white hover:text-[#D4AF37] flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-[#1A1A1A] border border-[#D4AF37]/40 text-[#D4AF37]">
                  {activeItem.icon}
                </div>
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">
                    {activeItem.exhibitNumber}
                  </span>
                  <h3 className="font-serif-museum text-2xl text-white font-normal">
                    {activeItem.name}
                  </h3>
                </div>
              </div>

              <div className="border-t border-b border-[#222222] py-4 my-4">
                <p className="text-sm text-[#CCCCCC] font-light leading-relaxed italic">
                  &quot;{activeItem.description}&quot;
                </p>
              </div>

              <div className="flex items-center justify-between text-xs text-[#A8A8A8] pt-2">
                <span className="flex items-center gap-1.5 text-[#D4AF37]">
                  <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
                  Tersimpan di Thesis Museum
                </span>
                <button
                  onClick={() => setActiveItem(null)}
                  className="px-4 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-semibold hover:bg-[#FFF6D6] transition-colors"
                >
                  Tutup Kenangan
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
