"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../../components/Navbar";
import HallOfMemories from "../../components/HallOfMemories";
import Footer from "../../components/Footer";

export default function HallOfMemoriesRoute() {
  const router = useRouter();
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const galleryRes = await fetch("/api/gallery");
        const galleryData = await galleryRes.json();
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
        LOADING HALL OF MEMORIES ARCHIVE...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#090909] text-white">
      <Navbar currentView="hall" onNavigate={() => router.push("/")} />
      <HallOfMemories
        galleryImages={galleryImages}
        onBack={() => router.push("/")}
      />
      <Footer />
    </main>
  );
}
