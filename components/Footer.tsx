"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#090909] border-t border-[#1F1F1F] py-12 px-6 relative z-10 text-center">
      <div className="max-w-4xl mx-auto space-y-4">
        <h2 className="font-serif-museum text-xl tracking-[0.2em] text-[#D4AF37]">
          THE THESIS MUSEUM
        </h2>
        <p className="text-xs text-[#A8A8A8] tracking-widest uppercase">
          Preserving the laughter, revisions, and timeless friendship of Sidang Skripsi
        </p>
        <p className="text-[11px] text-[#666666]">
          Amanda • Naila • Febianna • Hilman • Faisal
        </p>
        <div className="pt-4 text-[10px] text-[#444444] tracking-wider">
          © {new Date().getFullYear()} Digital Museum Archive. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
