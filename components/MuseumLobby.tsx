"use client";

import React from "react";
import { motion } from "framer-motion";
import ExhibitionCard from "./ExhibitionCard";
import { Member } from "../app/api/members/route";

interface MuseumLobbyProps {
  members: Member[];
  galleryImages: string[];
  onSelectExhibition: (id: string) => void;
}

export default function MuseumLobby({
  members,
  galleryImages,
  onSelectExhibition,
}: MuseumLobbyProps) {
  return (
    <section id="lobby-section" className="w-full min-h-screen py-28 px-6 bg-[#090909] relative">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-16">
        {/* Lobby Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium"
          >
            MUSEUM WINGS & GALLERIES
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-serif-museum text-4xl sm:text-6xl font-light text-white tracking-[0.1em]"
          >
            Choose an Exhibition
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-[#A8A8A8] font-light max-w-xl mx-auto italic"
          >
            Step into the personal halls of honor or explore the collective gallery celebrating their thesis journey.
          </motion.p>
        </div>

        {/* 6 Exhibition Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          {members.map((member, idx) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
            >
              <ExhibitionCard
                id={member.id}
                name={member.name}
                portrait={member.portrait}
                status={member.status}
                onClick={() => onSelectExhibition(member.id)}
              />
            </motion.div>
          ))}

          {/* 6th Card: Hall of Memories */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <ExhibitionCard
              id="hall-of-memories"
              name="Hall of Memories"
              portrait=""
              status="Grand Archive"
              isHallOfMemories={true}
              galleryCollageImages={galleryImages}
              onClick={() => onSelectExhibition("hall-of-memories")}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
