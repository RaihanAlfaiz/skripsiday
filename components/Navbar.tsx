"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Compass, Grid, Users, BookOpen, MapPin, Ticket, Film } from "lucide-react";

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export default function Navbar({ currentView, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-[#090909]/90 backdrop-blur-md border-b border-[#222222] py-4 shadow-xl"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => onNavigate("landing")}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-9 h-9 rounded-full bg-[#111111] border border-[#D4AF37]/40 flex items-center justify-center group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.3)] transition-all">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div>
            <h1 className="font-serif-museum text-lg tracking-[0.2em] font-semibold text-white group-hover:text-[#D4AF37] transition-colors">
              THE THESIS MUSEUM
            </h1>
            <p className="text-[10px] tracking-widest text-[#A8A8A8] uppercase">
              Exhibition of Honor
            </p>
          </div>
        </button>

        {/* Navigation Items */}
        <nav className="flex items-center gap-1.5 sm:gap-3 text-xs tracking-wider uppercase font-medium">
          <button
            onClick={() => onNavigate("lobby")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "lobby"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Lobi</span>
          </button>

          <button
            onClick={() => onNavigate("cinema")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "cinema"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <Film className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden md:inline">Teater Video</span>
          </button>

          <button
            onClick={() => onNavigate("hall")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "hall"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Hall of Memories</span>
          </button>

          <button
            onClick={() => onNavigate("map")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "map"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden lg:inline">Peta</span>
          </button>

          <button
            onClick={() => onNavigate("vip")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "vip"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <Ticket className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden lg:inline">VIP Pass</span>
          </button>

          <button
            onClick={() => onNavigate("guestbook")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "guestbook"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span className="hidden lg:inline">Buku Kesan</span>
          </button>

          <button
            onClick={() => onNavigate("team")}
            className={`px-3 py-1.5 rounded-full transition-all flex items-center gap-1.5 ${
              currentView === "team"
                ? "bg-[#D4AF37]/15 text-[#D4AF37] border border-[#D4AF37]/40"
                : "text-[#A8A8A8] hover:text-white"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Sahabat</span>
          </button>
        </nav>
      </div>
    </header>
  );
}
