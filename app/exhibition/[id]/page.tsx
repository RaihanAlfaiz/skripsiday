"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "../../../components/Navbar";
import PersonalExhibition from "../../../components/PersonalExhibition";
import Footer from "../../../components/Footer";
import { Member } from "../../api/members/route";

export default function ExhibitionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [members, setMembers] = useState<Member[]>([]);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [membersRes, galleryRes] = await Promise.all([
          fetch("/api/members"),
          fetch("/api/gallery"),
        ]);
        const membersData = await membersRes.json();
        const galleryData = await galleryRes.json();

        if (membersData.members) setMembers(membersData.members);
        if (galleryData.images) setGalleryImages(galleryData.images);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#090909] flex items-center justify-center text-[#D4AF37] font-mono text-xs tracking-widest">
        LOADING EXHIBIT ARCHIVE...
      </div>
    );
  }

  const member = members.find((m) => m.id === id);

  if (!member) {
    return (
      <div className="min-h-screen bg-[#090909] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="font-serif-museum text-3xl text-[#D4AF37]">Exhibit Not Found</h1>
        <p className="text-sm text-[#A8A8A8]">The requested member exhibition wing does not exist.</p>
        <button
          onClick={() => router.push("/")}
          className="px-6 py-2.5 rounded-full bg-[#111111] border border-[#D4AF37] text-xs uppercase tracking-widest text-white"
        >
          Return to Museum
        </button>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <Navbar currentView={member.id} onNavigate={() => router.push("/")} />
      <PersonalExhibition
        member={member}
        galleryImages={galleryImages}
        onBack={() => router.push("/")}
      />
      <Footer />
    </main>
  );
}
