"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Heart, Send, Sparkles, User, MessageSquare } from "lucide-react";

interface GuestNote {
  id: string;
  sender: string;
  recipient: string;
  message: string;
  date: string;
}

const initialNotes: GuestNote[] = [
  {
    id: "1",
    sender: "Sahabat Seperjuangan",
    recipient: "Untuk Semua (Amanda, Naila, Febianna, Hilman, Faisal)",
    message: "Terima kasih untuk setiap tawa di jam 3 pagi, cangkir kopi yang saling dibagikan, dan pelukan hangat setelah keluar ruang sidang. Kita hebat!",
    date: "30 Juli 2026",
  },
  {
    id: "2",
    sender: "Teman Kampus",
    recipient: "Untuk Amanda & Naila",
    message: "Kalian berdua selalu jadi inspirasi. Senyum lega kalian pas sidang bener-bener bikin haru!",
    date: "30 Juli 2026",
  },
  {
    id: "3",
    sender: "Keluarga Perjuangan",
    recipient: "Untuk Hilman, Faisal, Febianna",
    message: "Selamat guys! Perjuangan panjang akhirnya terbayar tuntas. Proud of you all!",
    date: "30 Juli 2026",
  },
];

export default function Guestbook() {
  const [notes, setNotes] = useState<GuestNote[]>(initialNotes);
  const [sender, setSender] = useState("");
  const [recipient, setRecipient] = useState("Untuk Semua Sahabat");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("thesis_museum_guestbook");
    if (saved) {
      try {
        setNotes(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!sender.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newNote: GuestNote = {
      id: Date.now().toString(),
      sender: sender.trim(),
      recipient,
      message: message.trim(),
      date: "Hari Ini",
    };

    const updated = [newNote, ...notes];
    setNotes(updated);
    localStorage.setItem("thesis_museum_guestbook", JSON.stringify(updated));

    setSender("");
    setMessage("");
    setIsSubmitting(false);
    setShowForm(false);
  };

  return (
    <section className="w-full py-24 px-6 bg-[#090909] relative overflow-hidden border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>BUKU KESAN & PESAN DIGITAL</span>
          </div>

          <h2 className="font-serif-museum text-4xl sm:text-6xl text-white font-light tracking-[0.1em]">
            Surat & Ungkapan Haru
          </h2>

          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-xl mx-auto italic">
            Tinggalkan pesan kebaikan, ucapan selamat, atau kenangan manis untuk Amanda, Naila, Febianna, Hilman, dan Faisal.
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#D4AF37] text-black text-xs font-semibold uppercase tracking-widest hover:bg-[#FFF6D6] transition-all shadow-[0_0_25px_rgba(212,175,55,0.3)] mt-4"
          >
            <Send className="w-4 h-4" />
            <span>Tulis Pesan Haru</span>
          </button>
        </div>

        {/* Modal Form Submission */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowForm(false)}
              className="fixed inset-0 z-[10000] bg-[#090909]/90 backdrop-blur-xl flex items-center justify-center p-6"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="max-w-md w-full bg-[#111111] border border-[#D4AF37]/60 rounded-3xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.3)] space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-museum text-2xl text-white">Tulis Surat Kesan</h3>
                  <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                  <div>
                    <label className="block text-[#A8A8A8] mb-1 font-mono uppercase">Nama / Dari:</label>
                    <input
                      type="text"
                      required
                      placeholder="Nama kamu..."
                      value={sender}
                      onChange={(e) => setSender(e.target.value)}
                      className="w-full bg-[#090909] border border-[#333] focus:border-[#D4AF37] rounded-xl p-3 text-white focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[#A8A8A8] mb-1 font-mono uppercase">Ditujukan Kepada:</label>
                    <select
                      value={recipient}
                      onChange={(e) => setRecipient(e.target.value)}
                      className="w-full bg-[#090909] border border-[#333] focus:border-[#D4AF37] rounded-xl p-3 text-white focus:outline-none transition-colors"
                    >
                      <option value="Untuk Semua Sahabat">Untuk Semua Sahabat (Kelompok Skripsi)</option>
                      <option value="Untuk Amanda">Untuk Amanda</option>
                      <option value="Untuk Naila">Untuk Naila</option>
                      <option value="Untuk Febianna">Untuk Febianna</option>
                      <option value="Untuk Hilman">Untuk Hilman</option>
                      <option value="Untuk Faisal">Untuk Faisal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[#A8A8A8] mb-1 font-mono uppercase">Pesan / Kesan Haru:</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tuliskan ungkapan manis atau doa di sini..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full bg-[#090909] border border-[#333] focus:border-[#D4AF37] rounded-xl p-3 text-white focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="w-1/2 py-3 rounded-full border border-[#333] text-[#A8A8A8] hover:text-white uppercase font-semibold tracking-wider"
                    >
                      Batal
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-1/2 py-3 rounded-full bg-[#D4AF37] text-black uppercase font-semibold tracking-wider hover:bg-[#FFF6D6] transition-colors"
                    >
                      Kirim Pesan
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notes.map((n, idx) => (
            <motion.div
              key={n.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-[#111111] border border-[#222222] hover:border-[#D4AF37]/60 p-6 rounded-2xl shadow-xl relative group flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#1F1F1F] pb-3">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                    <User className="w-3 h-3" />
                    {n.sender}
                  </span>
                  <span className="text-[10px] text-[#666] font-mono">{n.date}</span>
                </div>

                <div className="text-xs text-[#D4AF37] font-medium font-serif italic">
                  {n.recipient}
                </div>

                <p className="text-xs sm:text-sm text-[#CCCCCC] font-light italic leading-relaxed">
                  &ldquo;{n.message}&rdquo;
                </p>
              </div>

              <div className="flex justify-end pt-2 text-[#D4AF37]">
                <Heart className="w-4 h-4 fill-[#D4AF37]" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
