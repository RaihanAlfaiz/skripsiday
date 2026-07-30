"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Member } from "../app/api/members/route";

interface TheTeamProps {
  members: Member[];
  onSelectMember?: (id: string) => void;
}

export default function TheTeam({ members, onSelectMember }: TheTeamProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section className="w-full py-28 px-6 bg-[#090909] relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111111] border border-[#D4AF37]/40 text-[#D4AF37] text-xs uppercase font-medium tracking-[0.3em]">
            <Heart className="w-3.5 h-3.5 fill-[#D4AF37]" />
            <span>IKATAN SAHABAT SEJATI</span>
          </div>
          <h2 className="font-serif-museum text-4xl sm:text-6xl text-white font-light tracking-[0.1em]">
            Lima Jiwa Perjuangan
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-md mx-auto italic">
            Disatukan oleh niat mulia, dikuatkan oleh malam-malam revisi, diabadikan oleh kasih sayang persahabatan.
          </p>
        </div>

        {/* 5 Member Portraits Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {members.map((member, idx) => {
            const isDimmed = hoveredId !== null && hoveredId !== member.id;
            const isHovered = hoveredId === member.id;

            return (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                onMouseEnter={() => setHoveredId(member.id)}
                onMouseLeave={() => setHoveredId(null)}
                onClick={() => onSelectMember && onSelectMember(member.id)}
                className={`relative rounded-2xl bg-[#111111] border border-[#222222] overflow-hidden cursor-pointer transition-all duration-500 ${
                  isDimmed ? "opacity-35 blur-[1px] scale-95" : "opacity-100 scale-100"
                } ${
                  isHovered
                    ? "border-[#D4AF37] shadow-[0_0_40px_rgba(212,175,55,0.35)] z-20 scale-105"
                    : ""
                }`}
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <Image
                    src={member.portrait}
                    alt={member.name}
                    fill
                    sizes="(max-width: 640px) 100vw, 20vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-transparent to-transparent" />
                </div>

                <div className="p-4 text-center bg-[#111111] border-t border-[#1F1F1F]">
                  <h3 className="font-serif-museum text-xl font-normal text-white group-hover:text-[#D4AF37] transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-[10px] font-light text-[#D4AF37] mt-1 line-clamp-1 italic">
                    {member.appreciationTitle}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="text-center pt-8">
          <p className="font-serif-museum text-xl sm:text-3xl text-white font-light tracking-wide italic">
            &ldquo;Lima cerita berbeda. Satu perjalanan indah yang takkan pernah terlupakan.&rdquo;
          </p>
        </div>
      </div>
    </section>
  );
}
