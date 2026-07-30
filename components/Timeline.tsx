"use client";

import React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Sparkles, BookOpen, Lightbulb, Compass, FileCheck } from "lucide-react";

interface TimelineItem {
  stage: string;
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  timeline: TimelineItem[];
  memberName: string;
}

const iconsMap: Record<string, React.ReactNode> = {
  Proposal: <Lightbulb className="w-4 h-4 text-[#D4AF37]" />,
  Research: <BookOpen className="w-4 h-4 text-[#D4AF37]" />,
  Guidance: <Compass className="w-4 h-4 text-[#D4AF37]" />,
  Revision: <FileCheck className="w-4 h-4 text-[#D4AF37]" />,
  Defense: <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />,
  "To Be Continued...": <Sparkles className="w-4 h-4 text-[#D4AF37]" />,
};

export default function Timeline({ timeline, memberName }: TimelineProps) {
  return (
    <section className="w-full py-20 px-6 bg-[#090909]">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs uppercase tracking-[0.35em] text-[#D4AF37] font-medium">
            CHRONICLES OF DEFENSE
          </span>
          <h2 className="font-serif-museum text-3xl sm:text-5xl font-light text-white tracking-[0.1em]">
            {memberName}&apos;s Thesis Journey
          </h2>
          <p className="text-xs sm:text-sm text-[#A8A8A8] font-light max-w-md mx-auto italic">
            From the initial spark of an idea to standing victorious before the thesis committee.
          </p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-[#222222] ml-4 sm:ml-32 space-y-12 sm:space-y-16">
          {timeline.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative pl-8 sm:pl-12 group"
            >
              {/* Timeline Icon Marker */}
              <div className="absolute -left-[17px] top-0 w-8 h-8 rounded-full bg-[#111111] border border-[#D4AF37]/50 group-hover:border-[#D4AF37] group-hover:shadow-[0_0_15px_rgba(212,175,55,0.4)] flex items-center justify-center transition-all duration-300">
                {iconsMap[item.stage] || <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />}
              </div>

              {/* Date / Stage Tag (Absolute on larger screens) */}
              <div className="sm:absolute sm:-left-36 sm:top-1 text-xs font-mono tracking-widest text-[#D4AF37] uppercase mb-1 sm:mb-0">
                {item.stage}
              </div>

              {/* Content Card */}
              <div className="bg-[#111111] border border-[#1F1F1F] group-hover:border-[#D4AF37]/40 p-6 rounded-2xl shadow-xl transition-all duration-300 space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-museum text-xl text-white font-normal group-hover:text-[#D4AF37] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] text-[#A8A8A8] uppercase tracking-wider font-mono">
                    {item.date}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#A8A8A8] font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
